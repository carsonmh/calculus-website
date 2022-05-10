//env vars
const bgcolor = BGCOLOR;

const w = 800, h1 = 600;
const f = (x) => pow(x, 3) - x;
const f1 = (x) => 3*pow(x, 2) - 1;
const xmin = -2, xmax = 2, xstep = (xmax-xmin) / w;
const ymin = -3, ymax = 3, ystep = (ymax-ymin) / h1;

let back;
let label = true;
let anim = true;
let time = 0;
let playAnimation = false;

function setup() {
  // colors
  c = {
     r: color(204, 2, 2),
     o: color(230, 146, 56),
     y: color(241, 194, 49),
     g: color(105, 168, 79),
     c: color(69, 130, 141),
     b: color(62, 132, 198),
     i: color(102, 78, 167),
     v: color(166, 77, 120),
  };
  
  createCanvas(w, h1);
  // textAlign(CENTER, CENTER);
  background(bgcolor);
  
  // axes
  stroke(255, 100);
  const yax1 = worldToScreen(0, ymin), yax2 = worldToScreen(0, ymax);  // top bottom
  line(yax1.i, yax1.j, yax2.i, yax2.j);
  const xax1 = worldToScreen(xmin, 0), xax2 = worldToScreen(xmax, 0);
  line(xax1.i, xax1.j, xax2.i, xax2.j);
  
  // grid lines
  stroke(255, 50);
  for(let i = 0; i < ymax-ymin; i ++) {
    line(0, i/ystep, width, i/ystep);
  }
  for(let i = 0; i < xmax-xmin; i ++) {
    line(i/xstep, height, i/xstep, 0);
  }
  
  
  // function graph
  strokeWeight(2);
  stroke(c.g);
  graph(f);
  
  back = get(0, 0, width, height);
}



let h = 3;
function draw() {
  if(playAnimation === true){
      play();
  }
  else {
  bwidth=100;
  bheight=55;
  buttonPosx = w/2 - bwidth/2;
  buttonPosy = h1/2 - bheight/2;
      fill(150);
      strokeWeight(1.3);
      stroke(0);
      rect(buttonPosx, buttonPosy, bwidth, bheight, 10);
      fill(0);
      strokeJoin(ROUND);
      triangle(buttonPosx + 0.43 * bwidth, buttonPosy + 0.38 * bheight, buttonPosx + 0.43 * bwidth, buttonPosy + 0.62 * bheight, buttonPosx + 0.57 * bwidth, buttonPosy + 0.5 * bheight);
  }
}

function play (){
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
  
}


// user input

function mouseClicked() {
    if(playAnimation === true){
        time = mouseX;
        anim = !anim;
    }if((buttonPosx < mouseX && mouseX < (buttonPosx + width)) && (buttonPosy < mouseY && mouseY < (buttonPosy + height))) {
        playAnimation = true;
      }
}

function keyReleased() {
  if(keyCode == 32) {
    label = !label;
  }
}



// utilities

function dash(x1, y1, x2, y2) {
  let dx = x2-x1;
  let dy = y2-y1;
  let d = sqrt( sq(dx) + sq(dy) );
  let a = atan2( dy / dx );
  
  push();
  translate(min(x1, x2), min(y1, y2));
  rotate(a);
  for(let i = 0; i < floor(d/10); i ++) {
    line(0, i*10, 0, i*10+2);  
  }
  pop();
}


function graph(f, res, start, end, clr) {
  if(!start) start = 0;
  if(!end) end = width;
  noFill();
  let pi = start;
  let pj = screenY(f, pi);
  for(let i = start+1; i < end; i += res || 1) {
    const x = screenToWorld(i, 0).x;
    const j = worldToScreen(0, f(x)).j;
    if(clr) clr(f(x));
    line(pi, pj, i, j);
    pi = i, pj = j;
  }
  return {i: pi, j: pj};
}


function nround(x, n) {
  const p = n || 1;
  return round(x * pow(10, p)) / pow(10, p);
} 




// world/screen coordinate conversions

function screenToWorld(i, j) {
  return {x: xmin + i * xstep, y: ymax - j * ystep};
}

function worldToScreen(x, y) {
  return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}

function screenY(f, i) {
  const x = screenToWorld(i, 0).x;
  return worldToScreen(0, f(x)).j;
}
