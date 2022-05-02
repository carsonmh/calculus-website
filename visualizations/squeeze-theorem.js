var x = 20;

function setup (){
  size = 400;
  cnv = createCanvas(size, size);
  buttonShow = true;
  playAnimation = false;
}

function draw (){
  background(230);
  fill(10, 68, 112);
  strokeWeight(1.5);
  stroke(0);
  width=100;
  height=55;
  buttonPosx = size/2 - width/2;
  buttonPosy = size/2 - height/2;
  if(buttonShow === true){
      rect(buttonPosx, buttonPosy, width, height, 10);
    fill(0);
    strokeJoin(ROUND);
      triangle(buttonPosx + 0.43 * width, buttonPosy + 0.38 * height, buttonPosx + 0.43 * width, buttonPosy + 0.62 * height, buttonPosx + 0.57 * width, buttonPosy + 0.5 * height);
  }
  if(playAnimation === true) {
    play();
  }
}

function play (){
  // insert code for animation here //
  ellipse(x, 50, 80, 80);
  x += 1;
}

function mouseClicked() {
  if((buttonPosx < mouseX && mouseX < (buttonPosx + width)) && (buttonPosy < mouseY && mouseY < (buttonPosy + height))) {
    buttonShow = false;
    playAnimation = true;
  }
}
