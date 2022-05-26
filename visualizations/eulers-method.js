//env vars
const bgcolor = BGCOLOR

const w = 800, h1 = 600;
const f = (x) => Math.sin(x);
const dydx = (x, y) => Math.cos(x);

let back;
let anim = true;
let paused = true;

function setup() {
  
    c = getColors();
    
    createCanvas(w, h1);
    setWindow(-4, 4, -3, 3);
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
    const n = 1;


    // lines
    for(let i = 0; i < n; i ++) {
        
    }
    
    
    // labels
    textSize(20);
    noStroke();
    fill(255);
    text("dy/dx = " + round(m*1000)/1000, 200, 100);
    fill(c.y);
    text("h = " + round(h*1000)/1000, (p2.i+p1.i)/2-5, p1.j + 50);

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
