var xmin;
var xmax;
var ymin;
var ymax;
var xstep;
var ystep;

var x0 = 0;
var y0 = 0;

var actual;

let equation = [];
var dx;
var dir = -0.01;
var rendered = false;

const clientWidth = window.innerWidth;
let mobile
if(clientWidth < 700) {
    mobile = true;
}else {
    mobile = false;
}

function setup() {
  if(mobile === false){
   createCanvas(500, 500);
  }else {
    createCanvas(screen.width -40, 500/2);
  }
  stroke(255);
  noFill();
  
  xmin = 0;
  xmax = 5;
  ymin = 0;
  ymax = ymin + (xmax-xmin);
  xstep = (xmax-xmin)/width;
  ystep = (ymax-ymin)/height;
  
  dx = xmax;
  actual = 2*Math.log(xmax+1);
  
  calculate();
}

function draw() {
  
  if(rendered) {
    return;
  }
  background(0);
  
  text(actual,30,30);
  plotPoints(equation);
  
  push();
  stroke(0,255,255);
  fill(255);
  euler(x0,y0);
  
  pop();

  if(frameCount%30) {
    dx+=dir;
  }
  if(dx < 0.001) {
    dir = 0;
    dx = 0.001;
  }
  else if(dx === 0.001) {
    rendered = true;
  }
}

function euler(xn,yn) {
  if(xn >= xmax) {
    return;
  }
  
  
  var yn2 = 2/(xn+1);
  line(mapx(xn),mapy(yn),mapx(xn+dx),mapy(yn2*dx+yn));
  
  if(xn+dx >= xmax) {
    var approx = yn+(xmax-xn)*yn2;
    text(approx,30,60);
  }
  ellipse(mapx(xn),mapy(yn),5);
    
  euler(xn+dx,yn2*dx+yn);
    
}

function calculate() {
  for(var i = 0; i < width; i++) {
    var x = unmapx(i);
    var y = 2*Math.log(x+1);
    
    equation.push(createVector(mapx(x), mapy(y)));
  }
}

function plotPoints(p) {
  beginShape();
  for(var i = 0; i < p.length; i++) {
    vertex(p[i].x,p[i].y);
  }
  endShape();
}




function unmapx(x) {
  var xp = xmin+xstep*x;
  return xp;
}

function unmapy(y) {
  var yp = ymax-ystep*y;
  return yp;
}

function mapx(x) {
  xp = (x-xmin)/xstep;
  return xp;
}

function mapy(y) {
  yp = (y-ymax)/(-ystep);
  return yp;
}

keyPressed = function() {
  if(keyCode === 32) {
    rendered = !rendered;
  }
}