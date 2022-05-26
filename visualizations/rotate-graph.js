const f = (x) => sqrt(x)*4;

let anim = true;
let time = 0;
let mouseDown = false;
let smx = 0;
let yrot = 166;
let res = 59;

let myFont;

function preload() {
  myFont = loadFont('Montserrat.ttf');
}


function setup() {
  if(mobile === false ){
    createCanvas(800, 600, WEBGL);
  }else {
    createCanvas(screen.width-40, 600);
  }
  
  setAttributes('premultipliedAlpha', true);
  // colors
  c = getColors();
  
}

function draw() {
  background(BGCOLOR);
  const w = 300;
  const h = 250;
  textFont(myFont);
  textAlign(CENTER, CENTER);
  
  
  push();
  
  translate(0, 50, -150);
  rotateX(-0.1);//map(mouseY, 0, height, -PI, PI));
  rotateY(map(yrot, 0, 450, -PI, PI));
  strokeWeight(3);
  
  
  
  stroke(255);
  line(-w, 0, 0, w, 0, 0);
  line(0, -h, 0, 0, h, 0);
  line(0, 0, -w, 0, 0, w);
  
  
  fill(255);
  push();
  translate(-w, 0, 0);
  textSize(25);
  text("X", -40, -4);
  rotateZ(PI/2);
  noStroke();
  cone(5, 20);
  pop();
  
  push();
  translate(w, 0, 0);
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
  translate(0, h, 0);
  rotateY(PI/2);
  noStroke();
  cone(5, 20);
  pop();
  
  push();
  translate(0, 0, -w);
  text("Z", 20, 0);
  rotateX(-PI/2);
  noStroke();
  cone(5, 20);
  pop();
  
  push();
  translate(0, 0, w);
  rotateX(PI/2);
  noStroke();
  cone(5, 20);
  pop();
  
  if(!mouseDown) {
    res = map(constrain(mouseX, 0, width-50), 0, width-50, 50, 1);
    // res = round(res/2) * 2;
  }
  let vol = 0;
  
  // let pi = 0, pj = -f(pi);
  push();
  rotateX(-(time*0.01)%TWO_PI);
  stroke(c.g);
  
  
  beginShape();
  noFill();
  // vertex(w, 0, 0);
  vertex(0, 0, 0);
  for(let i = 0; i <= w; i += 10) {
    const j = -f(i);
    vertex(i, j, 0);
  }
  endShape();
  
  
  fill(105, 168, 79, 0.41*res + 19.6);
  // noFill();
  for(let i = 0; i < w; i += res) {
    const j = -f(i);
    const x = (i/w) * 10;
    const y = f(x);
    push();
    translate(i, 0, 0)
    rotateX(-PI/2);
    rotateY(PI/2);
    if(anim)
      arc(0, 0, -j*2, -j*2, 0, (time*0.01)%TWO_PI);
    else
      circle(0, 0, -j*2);
    pop();
  }
  
  push();
  translate(w, 0, 0)
  rotateX(-PI/2);
  rotateY(PI/2);
  const j = -f(w);
  if(anim)
    arc(0, 0, -j*2, -j*2, 0, (time*0.01)%TWO_PI);
  else
    circle(0, 0, -j*2);
  pop();
  
  
  pop();
  
  
  pop();
  
  
  if(mouseIsPressed) {
    if(!mouseDown) smx = mouseX-yrot;
    mouseDown = true;
  }
  
  if(mouseDown) {
    yrot = mouseX-smx;
  }
  
  if(anim) {
    time ++;
  }
  
  
  // labels
  textSize(20);
  noStroke();
  fill(255);
  const n = floor(w/res);
  text("n: " + floor(w/res), -width*0.25, -height*0.4);
}


function keyReleased() {
  if(keyCode == 32) {
    time = 0;
    anim = !anim;
  }
}

function mouseClicked() {
  mouseDown = false;
}

function touchStarted(){
  if(paused && mobile) {
    paused = false;
    loop();
    return;
  }
}