xmin = -2.5;
xmax = 2.5;
ymin = -2.5;
ymax = 2.5;
sw = 400;
sh = 400;
xstep = (xmax-xmin)/sw;
ystep = (ymax-ymin)/sh;
const S = 1;
let d = 0;
const clientWidth1 = window.innerWidth;
let paused = true;

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
  playButton();
  noLoop();
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
  if(paused) playButton();
}

function mouseClicked() {
  if(paused) {
      paused = false;
      loop();
  }
}

  function touchStarted(){
    if(paused && mobile) {
      paused = false;
      loop();
      return;
    }
  }