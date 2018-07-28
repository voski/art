const W = 400;
const H = 400;

let i = 0;
let r = 0;
let g = 0;
let b = 0;

let colors = [r, g, b];

function setup() {
  createCanvas(W, H);
  addTag('br');
  addDownloadLink();

  let ff_colors_by = 50;

  for(var i=0; i < ff_colors_by; i++){
      _tick_fill();
  }
}

function draw() {
  _mod();

  stroke(r, g, b);

  drawLine(1, 2 * H - i);
  // drawLine(-1, i - H + 1);

  drawLine(-1, H - i);
  // drawLine(1, i + 1);

  _tick();
  _tick_fill();
}

function _mod () {
  r %= 255;
  b %= 255;
  g %= 255;
}

function _tick() {
  i += 1;
}

function _tick_fill() {
    r +=8;
    b +=4;
    g +=2;
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

function saveImage() {
  var c = window.document.getElementsByTagName("canvas")[0];
  var image = c.toDataURL("image/png").replace("image/png", "application/octet-stream");

  var link = document.getElementsByTagName('a')[0];
  link.href = image;
  link.download = 'line-image';
}

function addTag(tag) {
  let element = document.createElement(tag);
  document.body.appendChild(element);
}
function addDownloadLink() {
  var link = document.createElement('a');
  link.setAttribute('href', 'javascript:void');
  link.setAttribute('download', 'voski-art-download.png');
  link.setAttribute('onclick', 'return saveImage()');
  link.innerHTML = 'Download';
  // link.style.display = 'none';
  document.body.appendChild(link);
  // <a href ="javascript:void" id="download-link" onclick='return check()'>Download</a>

}
