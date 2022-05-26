//env vars
const bgcolor = BGCOLOR;

const w = 800, h1 = 600;
const f = (x) => sin(x);
let maxRect = 400;

let back;
let label = true;
let anim = true;
let time = 0;
let dt = 1;
let paused = true;


function setup() {
    
    c = getColors();
    
    if(mobile === false){
        createCanvas(w, h1);
    }else {
        createCanvas(screen.width-40, h1/2);
    }
    setWindow(-2, 10, -2, 2);
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
    const n = anim ? floor(time/30) + 2 : map(constrain(mouseX, 0, width), 0, width, 2, 400);
    const a = 0, b = 8, deltaX = (b-a) / n;
    
    maxRect = min(width/(xmax-xmin) * (b-a), 500);
    
    // Riemmen Sum
    let area = 0;
    
    
    for(let x = a; x < b-0.001; x += deltaX) {
        const tcorner = worldToScreen(x, f(x));  // top left corner of rect
        const bcorner = worldToScreen(x, 0);     // bottom left corner of rect
        const w = deltaX/xstep;
        
        const clr = f(x) >= 0 ? c.b : c.o;
        
        fill(red(clr), green(clr), blue(clr), 50);
        noStroke();
        rect(tcorner.i, tcorner.j, w, bcorner.j-tcorner.j);
        stroke(clr);
        line(tcorner.i, tcorner.j, tcorner.i, bcorner.j);
        line(tcorner.i, tcorner.j, tcorner.i+w, tcorner.j);
        line(tcorner.i+w, tcorner.j, tcorner.i+w, bcorner.j);
        
        area += deltaX * f(x);
    }
    
    // animation
    if(time < maxRect*30 - 60) {
        time += dt;
        if(n > 30 && floor(time)%30 == 0)
            dt += 0.3;
    } else {
        time = maxRect*30 - 60;
    }
    
    // labels
    if(!label) return;
    textSize(20);
    noStroke();
    fill(255);
    text("n: " + floor(n), width*0.25, 35);
    text("Area: " + nround(area, 3), width*0.75, 35);

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

function touchStarted(){
    if(paused && mobile) {
      paused = false;
      loop();
      return;
    }
  }