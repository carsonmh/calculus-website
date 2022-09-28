//environment variables
const clientWidth = window.innerWidth;
let mobile
if(clientWidth < 700) {
    mobile = true;
}else {
    mobile = false;
}
let BGCOLOR = 'rgb(0, 0, 20)';


// window dimensions control
let xmax, xmin, xstep, ymax, ymin, ystep;

function setWindow(x_min, x_max, y_min, y_max) {
    xmin = x_min, xmax = x_max, xstep = (xmax-xmin) / width;
    ymin = y_min, ymax = y_max, ystep = (ymax-ymin) / height;
}


// initialize graphing space (to be called in setup)
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

function drawAxes() {
    const yax1 = worldToScreen(0, ymin), yax2 = worldToScreen(0, ymax);  // top bottom
    line(yax1.i, yax1.j, yax2.i, yax2.j);
    const xax1 = worldToScreen(xmin, 0), xax2 = worldToScreen(xmax, 0);
    line(xax1.i, xax1.j, xax2.i, xax2.j);
}

function drawGridlines() {
    for(let i = round(ymin) - ymin; i < ymax-ymin; i ++) {
        line(0, height - i/ystep, width, height - i/ystep);
    }
    for(let i = round(xmin) - xmin; i < xmax-xmin; i ++) {
        line(i/xstep, height, i/xstep, 0);
    }
}

function makePolarGraph(){
    //makes the layout for the polar graph
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

// utilities

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

function slopeField(dydx, xres, yres, len, clr) {
    const deltaX = (xmax - xmin) / xres;
    const deltaY = (ymax - ymin) / yres;
    for(let x = xmin; x < xmax; x += deltaX) {
      for(let y = ymin; y < ymax; y += deltaY) {
        const m = dydx(x, y);
        const p1 = worldToScreen(x, y);
        const tanline = (xi) => m*(xi-x) + y;
        const p2 = worldToScreen(x+len, tanline(x+len));
        const d = createVector(p2.i-p1.i, p2.j-p1.j).normalize();
        
        push();
        translate(p1.i, p1.j);
        if(clr) clr(m);
        line(0, 0, d.x*len, d.y*len);
        translate(d.x*len, d.y*len);
        rotate(atan2(d.y*len, d.x*len));
        line(0, 0, -2, 2);
        line(0, 0, -2, -2);
        pop();
      }    
    }
  }

function nround(x, n) {
    const p = n || 1;
    return round(x * pow(10, p)) / pow(10, p);
} 

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


function tintColor(c, m, a) {
    return color( red(c)*m, green(c)*m, blue(c)*m, a || 255);
}




// world/screen coordinate conversions

function screenToWorld(i, j) {
    return {x: xmin + i * xstep, y: ymax - j * ystep};
}

function worldToScreen(x, y) {
    return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}
function wts(x, y) {
    return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}  

function screenY(f, i) {
    const x = screenToWorld(i, 0).x;
    return worldToScreen(0, f(x)).j;
}

function ptw(r, theta) {    //converts r and theta to x and y coordinates
    return {x: (r * sin(theta)), y: (r * cos(theta))}
}

function pts(r, theta) {     //converts polar coordinates to coordinates that we can use with code
    wc = ptw(r, theta);
    sc = worldToScreen(wc.x, wc.y);
    return {i: sc.i, j: sc.j}
}

// play button

function playButton() {
    fill(0, 180);
    rect(0, 0, width, height);
    const r = 40;
    push();
    translate(width/2 + (r / 3), height/2);
    fill(255, 100);
    strokeWeight(3);
    stroke(255);
    triangle(-r, -r, r, 0, -r, r);
    pop();
}
  