const W = 600;
const H = 600;

let i = 0;
let r = 0;
let g = 0;
let b = 0;

let colors = [r, g, b];

function setup() { 
  createCanvas(W, H);
  
  let ff_colors_by = 50;

  for(var i=0; i < ff_colors_by; i++){
      _tick_fill();
  }
} 

function draw() {
  _mod();

  stroke(r, g, b);

  drawLine(-1, i - H); 

  drawLine(1, i);    

  _tick();
  _tick_fill();
}

function _mod () {
  r %= 255;
  b %= 255;
  g %= 255;
}

function _tick() {
  i += 2;
}

function _tick_fill() {
    r +=1;
    b +=75;
    g +=6;
}

function xAxis() {
  line(0, H / 2, 
       W, H / 2);
}

function yAxis() {
  line(W / 2, 0,
       W / 2, H);
}

// y = mx + b
function drawLine(m, b) {
  m *= -1; // flip
  let x1 = 0;
  let y1 = (x1 * m) + b;
  
  let x2 = W;
  let y2 = (x2 * m) + b;
  
  line(x1, y1,
       x2, y2);
}