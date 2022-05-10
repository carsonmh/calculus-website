
// window dimensions control

let xmax, xmin, xstep, ymax, ymin, ystep;

function setWindow(x_min, x_max, y_min, y_max, w, h) {
    xmin = x_min, xmax = x_max, xstep = (xmax-xmin) / w;
    ymin = y_min, ymax = y_max, ystep = (ymax-ymin) / h;
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
    for(let i = 0; i < ymax-ymin; i ++) {
        line(0, i/ystep, width, i/ystep);
    }
    for(let i = 0; i < xmax-xmin; i ++) {
        line(i/xstep, height, i/xstep, 0);
    }
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




// play button

function playButton() {
    bwidth = 100;
    bheight = 55;
    buttonPosx = (width - bwidth) / 2;
    buttonPosy = (height - bheight) / 2;
    fill(150);
    strokeWeight(1.3);
    stroke(0);
    rect(buttonPosx, buttonPosy, bwidth, bheight, 10);
    fill(0);
    strokeJoin(ROUND);
    triangle(buttonPosx + 0.43 * bwidth, buttonPosy + 0.38 * bheight, buttonPosx + 0.43 * bwidth, buttonPosy + 0.62 * bheight, buttonPosx + 0.57 * bwidth, buttonPosy + 0.5 * bheight);
}