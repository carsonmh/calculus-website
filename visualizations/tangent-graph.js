//env vars
const bgcolor = BGCOLOR;

const w = 800, h1 = 600;
const f = (x) => pow(x, 3) - x;
const f1 = (x) => 3*pow(x, 2) - 1;

let back;
let label = true;
let anim = true;
let time = 0.5;
let paused = true;


function setup() {
    
    c = getColors();
    
    createCanvas(w, h1);
    setWindow(-2, 2, -3, 3);
    background(bgcolor);
    
    // axes
    stroke(255, 100);
    drawAxes();
    
    // grid lines
    stroke(255, 50);
    drawGridlines();
    
    // function graph
    strokeWeight(2);
    stroke(c.g);
    graph(f);
    
    back = get(0, 0, width, height);
    playButton();
    noLoop();
}



let h = 3;
function draw() {
    image(back, 0, 0);
    noFill();
    
    const inpX = anim ? time: mouseX;
    
    // graph of derivative
    const end = graph(f1, 12, 0, inpX, (y) => {
        const t = (constrain(y, -1, 1)+1) / 2;
        stroke(lerpColor(c.y, c.b, t));
    });
    
    // tangent line
    const x0 = screenToWorld(inpX, 0).x;
    const m = f1(x0);
    const y = (x) => m*(x-x0) + f(x0);
    let p1 = worldToScreen(xmin, y(xmin)), p2 = worldToScreen(xmax, y(xmax));
    const t = (constrain(m, -1, 1)+1) / 2;
    stroke(lerpColor(c.y, c.b, t));
    line(p1.i, p1.j, p2.i, p2.j);
    const dcoord = createVector( inpX, screenY(f1, inpX) )
    line(end.i, end.j, dcoord.x, dcoord.y);
    circle(dcoord.x, dcoord.y, 6);
    
    // circle on tangent line
    stroke(255);
    circle(inpX, worldToScreen(0, y(x0)).j, 6);
    
    // animation
    time ++;
    time = time%width;
    
    // labels
    if(!label) return;
    textSize(20);
    noStroke();
    fill(255);
    text("slope: " + nround(m), inpX, worldToScreen(0, y(x0)).j - 15);
    text("f '(x) = " + nround(f1(x0)), dcoord.x + 20, dcoord.y);

    if(paused) playButton();
}



// user input

function mouseClicked() {
    if(paused) {
        paused = false;
        loop();
    } else {
        time = mouseX;
        anim = !anim;
    }
}

function keyReleased() {
    if(keyCode == 32) label = !label;
    if(keyCode == 27) {
        setup();
        paused = true;
    }
}

