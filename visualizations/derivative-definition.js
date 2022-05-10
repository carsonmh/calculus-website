//env vars
const bgcolor = BGCOLOR

const w = 700, h1 = 600;
const f = (x) => -0.15*pow(x+1, 3) + x + 1;
const xmin = -5, xmax = 3, xstep = (xmax-xmin) / w;
const ymin = -3, ymax = 3, ystep = (ymax-ymin) / h1;

let back;
let anim = true;

function setup() {
  playAnimation = false;
  
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
  const yax1 = worldToScreen(0, ymin), yax2 = worldToScreen(0, ymax);
  line(yax1.i, yax1.j, yax2.i, yax2.j);
  const xax1 = worldToScreen(xmin, 0), xax2 = worldToScreen(xmax, 0);
  line(xax1.i, xax1.j, xax2.i, xax2.j);
  
  // function graph
  beginShape();
  noFill();
  strokeWeight(2);
  stroke(c.g);
  const res = 1;
  for(let i = 0; i < width; i += res) {
    const x = screenToWorld(i, 0).x;
    const j = worldToScreen(0, f(x)).j;
    vertex(i, j);
  }
  endShape();
  
  
  back = get(0, 0, width, height);
}



let h = 3;
function draw() {
  image(back, 0, 0);
  noFill();
  width=100;
  height=55;
  buttonPosx = w/2 - width/2;
  buttonPosy = h1/2 - height/2;
  if(playAnimation === false){
    fill(150);
    strokeWeight(1.3);
    stroke(0);
    rect(buttonPosx, buttonPosy, width, height, 10);
    fill(0);
    strokeJoin(ROUND);
    triangle(buttonPosx + 0.43 * width, buttonPosy + 0.38 * height, buttonPosx + 0.43 * width, buttonPosy + 0.62 * height, buttonPosx + 0.57 * width, buttonPosy + 0.5 * height);
  }
  if(playAnimation === true){
      play();
  }
  
}

function play() {
    // dy/dx
  const x0 = -1 ;
  if(anim) {
    if(h > 0.0001) h = lerp(h, 0, 0.005);
    else h = 0.0001;
  } else h = screenToWorld(mouseX, 0).x - x0 ; 
  
  let p1 = worldToScreen(x0, f(x0)), p2 = worldToScreen(x0+h, f(x0+h));
  const m = (f(x0+h) - f(x0)) / h;
  strokeWeight(1);
  // stroke(c.y);
  // line(p2.i, p1.j, p2.i, p2.j);
  // line(p1.i, p1.j, p2.i, p1.j);
  fill(255);
  // circle(p2.i, p1.j, 2);
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
}


function mouseClicked() {
    if(playAnimation === true){
        anim = !anim;
    }else if((buttonPosx < mouseX && mouseX < (buttonPosx + width)) && (buttonPosy < mouseY && mouseY < (buttonPosy + height))) {
        playAnimation = true;
      }
}

function keyReleased() {
  if(keyCode == 32) anim = !anim;
}


// world/screen coordinate conversions

function screenToWorld(i, j) {
  return {x: xmin + i * xstep, y: ymax - j * ystep};
}

function worldToScreen(x, y) {
  return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}
