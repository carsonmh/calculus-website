//env vars
const bgcolor = BGCOLOR

const w = 800, h1 = 600;
const f = (x) => -0.15*pow(x+1, 3) + x + 1;

let back;
let anim = true;
let paused = true;

function setup() {
  
    c = getColors();
    
    if(mobile === false){
        createCanvas(w, h1);
    }else {
        createCanvas(screen.width-40, h1/3);
    }
    setWindow(-5, 3, -3, 3);
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


    // dy/dx
    const x0 = -1 ;
    if(anim) {
        if(h > 0.0001) h = lerp(h, 0, 0.005);
        else h = 0.0001;
    } else h = screenToWorld(mouseX, 0).x - x0 ; 
    
    let p1 = worldToScreen(x0, f(x0)), p2 = worldToScreen(x0+h, f(x0+h));
    const m = (f(x0+h) - f(x0)) / h;
    strokeWeight(1);
    fill(255);
    circle(p1.i, p1.j, 8);
    circle(p2.i, p2.j, 8 );
    
    
    // secant line
    const f1 = (x) => m*(x-x0) + f(x0);
    const p3 = worldToScreen(xmin, f1(xmin)), p4 = worldToScreen(xmax, f1(xmax));
    stroke(255);
    line(p3.i, p3.j, p4.i, p4.j);
    
    
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
