//env vars
const bgcolor = BGCOLOR;

const w = 800, h1 = 600;
const f = (x) => -pow(x-4, 2) + 16;
const maxRect = 350;

let back;
let label = true;
let anim = true;
let time = 0;
let paused = true;


function setup() {
    
    c = getColors();
    
    if(mobile === false){
        createCanvas(w, h1);
    }else {
        createCanvas(screen.width - 40, h1/2);
    }
    setWindow(-2, 10, -2, 18);
    background(bgcolor);
    
    // axes
    stroke(255, 100);
    drawAxes();
    
    // grid lines
    stroke(255, 30);
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
    const n = anim ? floor(time/30) + 2 : constrain(map(mouseX, 0, width, 2, maxRect), 2, maxRect);
    const a = 0, b = 8, deltaX = (b-a) / n;
    
    // Riemmen Sum
    const clr = c.b;
    let area = 0;
    
    fill(red(clr), green(clr), blue(clr), 50);
    
    for(let i = a; i < b-0.001; i += deltaX) {
        const tcorner = worldToScreen(i, f(i));  // top left corner of rect
        const bcorner = worldToScreen(i, 0);     // bottom left corner of rect
        const w = deltaX/xstep;
        noStroke();
        rect(tcorner.i, tcorner.j, w, bcorner.j-tcorner.j);
        stroke(clr);
        line(tcorner.i, tcorner.j, tcorner.i, bcorner.j-2);
        line(tcorner.i, tcorner.j, tcorner.i+w, tcorner.j);
        line(tcorner.i+w, tcorner.j, tcorner.i+w, bcorner.j-2);
        
        area += deltaX * f(i);
    }
    
    // animation
    time ++;
    time %= maxRect*30;
    
    // labels
    if(!label) return;
    textSize(20);
    noStroke();
    fill(255);
    text("n: " + floor(n), width*0.25, 35);
    text("Area: " + nround(area, 3), width*0.6, 35);

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
    if(keyCode == 27 && paused == false) {
        setup();
        paused = true;
    }
}

