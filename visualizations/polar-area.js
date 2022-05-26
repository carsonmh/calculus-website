const xmin = -2.5;
const xmax = 2.5;
const ymin = -2.5;
const ymax = 2.5;
const sw = 400;
const sh = 400;
const xstep = (xmax-xmin)/sw;
const ystep = (ymax-ymin)/sh;
let BGCOLOR = 'rgb(0, 0, 20)';
const S = 1;
let d = 0;
const clientWidth = window.innerWidth;
let mobile
if(clientWidth < 700) {
    mobile = true;
}else {
    mobile = false;
}

function setup() {
  if(mobile === false){
    createCanvas(sw, sh);

  }else {
    createCanvas(screen.width - 40, sh);
  }
  angleMode(DEGREES);
  strokeWeight(1);
  stroke(255, 0, 0);
  c = getColors();
}

function draw() {
  makePolarGraph();
  strokeWeight(2);
  stroke(62, 132, 198);
  noFill();
  beginShape();
  for(let i=0;i<d;i+=5) {
    vertex(pts(1 - S * sin(i), i).i, pts(1 - S * sin(i), i).j);
  }
  vertex(pts(1 - S * sin(d), d).i, pts(1 - S * sin(d), d).j)
  endShape();
  fill(62, 132, 198, 100);
  noStroke();
  // arc(200, 200, 80, 80, 0, 180);
  let pr, pt;
  for(let i=0;i < d-5;i+=5) {
    triangle(wts(0, 0).i, wts(0, 0).j, pts(1 - S * sin(i), i).i, pts(1 - S * sin(i), i).j, pts(1 - S * sin(i+5), i+5).i, pts(1 - S *sin(i+5), i+5).j);
    pr = 1 - S * sin(i+5);
    pt = i+5;
  }
  triangle(wts(0, 0).i, wts(0, 0).j, pts(1 - S * sin(d), d).i, pts(1 - S * sin(d), d).j, pts(pr, pt).i, pts(pr, pt).j);
  d += 1;
  if(d >= 360) {
    d = 0;
  }
}


//converts polar coordinates to coordinates that we can use with code
function pts(r, theta) {
  wc = ptw(r, theta);
  sc = wts(wc.x, wc.y);
  return {i: sc.i, j: sc.j}
}

//converts x and y to code coordinates
function wts(x, y) {
  return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}

//converts r and theta to x and y coordinates
function ptw(r, theta) {
  return {x: (r * sin(theta)), y: (r * cos(theta))}
}

function getColors() {
    return {
        r: color(204, 2, 2),
        o: color(230, 146, 56),
        y: color(241, 194, 49),
        g: color(105, 168, 79),
        c: color(69, 130, 141),
        b: color(62, 132, 198),
        i: color(102, 78, 167),
        v: color(166, 77, 120),
    }
}


//makes the layout for the polar graph
function makePolarGraph(){
  background(BGCOLOR);
  noFill();
  stroke(255, 50);
  strokeWeight(1);
  circle(wts(0, 0).i, wts(0, 0).j, (1 * (2/xstep)));
  circle(wts(0, 0).i, wts(0, 0).j, (2 * (2/xstep)));
  circle(wts(0, 0).i, wts(0, 0).j, (3 * (2/xstep)));
  circle(wts(0, 0).i, wts(0, 0).j, (4 * (2/xstep)));
  circle(wts(0, 0).i, wts(0, 0).j, (5 * (2/xstep)));
  strokeWeight(2);
  stroke(150, 75);
  line(wts(0, 5).i, wts(0, 5).j, wts(0, -5).i, wts(0, -5).j);
  line(wts(5, 0).i, wts(5, 0).j, wts(-5, 0).i, wts(-5, 0).j);
}
