//env vars
const bgcolor = BGCOLOR;

const w = 800, h1 = 600;
const dydx = (x, y) => y/6 * (6 - y);
const maxRect = 350;

let back;
let label = true;
let anim = true;
let time = 0;
let paused = true;


let px, py;
let dx, dy;


function setup() {
    
    c = getColors();
    
    createCanvas(w, h1);
    const r = 8;
    setWindow(-4, r, -2, r);
    background(bgcolor);
    
    // axes
    stroke(255, 200);
    drawAxes();
    
    // grid lines
    stroke(255, 30);
    drawGridlines();
    
    // function graph
    strokeWeight(1);
    slopeField(dydx, 20, 20, 16, (m) => {
      const r = 1.2;
      const t = (constrain(m, -r, r)+r) / (r*2);
      stroke(lerpColor(c.y, c.b, t));
    });
    
    back = get(0, 0, width, height);
}



let h = 3;
function draw() {
    image(back, 0, 0);
    
    const wm = screenToWorld(mouseX, mouseY);
    eulersMethod(wm.x, wm.y, 20, xmax);
}

function eulersMethod(x, y, steps, target, dX) {
    const m = dydx(x, y);
    const deltaX = dX || (target-x) / steps;
    const deltaY = m*deltaX;
    const sp = worldToScreen(x, y);
    const sp2 = worldToScreen(x + deltaX, y + deltaY);
    fill(255);
    noStroke();
    circle(sp.i, sp.j, 8);
    stroke(255);
    line(sp.i, sp.j, sp2.i, sp2.j);
    if(x >= target) return;
    eulersMethod(x + deltaX, y + deltaY, steps, target, deltaX);
}