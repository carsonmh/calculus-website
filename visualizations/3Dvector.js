
let mouseDown = false;
let smx = 0;
let yrot = 169;
let res = 59;

let myFont;

let px = 4, py = 3, pz = 2;
let pmx = 0;
let pmy = 0;


function preload() {
  myFont = loadFont('./Montserrat.ttf');
}


function setup() {
  createCanvas(800, 600, WEBGL);
  
  setAttributes('premultipliedAlpha', true);
  // colors
  c = getColors();
}


let sx = 0; sy = 0; sz = 0;

function draw() {
  background(BGCOLOR);
  const w = 300;
  const h = 300;
  textFont(myFont);
  textAlign(CENTER, CENTER);
  
  
  push();
  
  translate(0, 100, -200);
  rotateX(-0.1);//map(mouseY, 0, height, -PI, PI));
  rotateY(map(yrot, 0, 450, -PI, PI));
  strokeWeight(3);
  
  
  
  stroke(255);
  const b = 40;
  noFill();
  line(0, 0, 0, w, 0, 0);
  line(0, -b, 0, b, -b, 0);
  line(b, 0, 0, b, -b, 0);
  
  line(0, 0, 0, 0, -h, 0);
  line(0, -b, 0, 0, -b, b);
  line(0, 0, b, 0, -b, b);
  
  line(0, 0, 0, 0, 0, w);
  line(0, 0, b, b, 0, b);
  line(b, 0, b, b, 0, 0);
  
  
  fill(255);
  textSize(25);
  
  push();
  translate(w, 0, 0);
  text("X", 40, -4);
  rotateZ(-PI/2);
  noStroke();
  cone(5, 20);
  pop();
  
  push();
  translate(0, -h, 0);
  text("Y", 0, -40);
  rotateZ(PI);
  noStroke();
  cone(5, 20);
  pop();
  
  
  push();
  translate(0, 0, w);
  rotateX(PI/2);
  noStroke();
  cone(5, 20);
  pop();
  push();
  translate(0, 0, w+40);
  rotateY(PI/2);
  text("Z", 0, 0);
  pop();
  
  
  let dx = 0, dy = 0, dz = 0;
  const interval = 100;
  if(sx/50 < px) dx = 2;
  else if(sy/50 > -py) dy = -1.5;
  else if(sz/50 < pz) dz = 1.25;
  sx += dx; sy += dy; sz += dz;
  stroke(c.r);
  line(0, -1, 2, sx, -1, 2);
  stroke(c.o);
  line(sx, 0, 0, sx, sy, 0);
  stroke(c.i);
  line(sx, sy, 0, sx, sy, sz);
  push();
  translate(sx, sy, sz);
  fill(c.g);
  noStroke();
  sphere(10);
  pop();
  
  
  pop();
  
  
  if(mouseIsPressed) {
    if(!mouseDown) smx = mouseX-yrot;
    mouseDown = true;
  }
  
  if(mouseDown) {
    yrot = mouseX-smx;
  } else {
    pmx = mouseX;
    pmy = mouseY;
  }

  
  
  // labels
  textSize(30);
  noStroke();
  fill(255);
  // const n = floor(w/res);
  const mx = floor(sx/50);
  const my = floor(-sy/50);
  const mz = floor(sz/50);
  let tw = textWidth("( ");
  push();
  translate(width*0.25, -height*0.4);
  fill(c.r);
  text(mx, tw, 0);
  tw += textWidth(mx + ", ");
  fill(c.o);
  text(my, tw, 0);
  tw += textWidth(my + ", ");
  fill(c.i);
  text(mz, tw, 0);
  tw += textWidth(mz);
  fill(255);
  text("(", 0, 0);
  text(", ", textWidth("( " + mx), 0);
  text(", ", textWidth("( " + mx + ", " + my), 0);
  text(")", tw, 0);
  pop();
}



function mouseClicked() {
  mouseDown = false;
  if(pmx != mouseX || pmy != mouseY) return;
  sx = 0; sy = 0; sz = 0;
  px = floor(random(6)) + 1;
  py = floor(random(6)) + 1;
  pz = floor(random(6)) + 1;
}




function nround(x, n) {
  const p = n || 1;
  return round(x * pow(10, p)) / pow(10, p);
} 


function tintColor(c, m, a) {
  return color( red(c)*m, green(c)*m, blue(c)*m, a || 255);
}
