const W = 400;
const H = 400;

let i = 0;
let r = 0;
let b = 0;
let g = 0;

let colors = [r, g, b];

let ctx;

let save_gif = true;


window._webm = getWriter();


function setup() {
  ctx = createCanvas(W, H);
  background(255);
  addTag('br');
  addDownloadLink();
  for(var i = 0; i < 50; i++) {
    _tick_fill();
  }
}

function draw() {
  _mod();
  // colorMode(HSB);
  // strokeWeight(1);
  stroke(r, g, b);

  drawLine(-1, i - H);
  drawLine(1, i);

  // drawLine(0, i );
  // drawLine(1, i + 1);

  _tick();
  _tick_fill();

  // or copy the pixels from a canvas context
  // let img = document.createElement('img');
  // let frameData = ctx.canvas.toDataURL('image/png');

  // img.setAttribute('src', frameData);

  if (save_gif) {
    _webm.addFrame(ctx.canvas);
  }
  if (save_gif && i === 2 * H) {
    console.log('done');
    _webm.complete().then(function(webMBlob) {
        addDownloadVideoLink(webMBlob);
    });
    save_gif = false;
  }
}

function _mod () {
  // h %= 360;
  // i %= H;
  r %= 255;
  b %= 255;
  g %= 255;
}

function _tick() {
  i += 2;
}

function _tick_fill() {
    // h += 1;
    r += 1;
    b += 75;
    g += 6;
    // s--;
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

function dataURIToBlob(dataURI) {
  var binStr = atob(dataURI.split(',')[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr]);
}

function addImg() {
  var img = addTag('img');
  img.src = ctx.canvas.toDataURL('image/png');
}

function saveImage() {
  var c = window.document.getElementsByTagName("canvas")[0];
  var image = c.toDataURL("image/png").replace("image/png", "application/octet-stream");

  var blob = dataURIToBlob(image);
  var link = document.getElementsByTagName('a')[0];

  link.href = URL.createObjectURL(blob);
  link.download = 'line-image.png';
}

function addTag(tag) {
  let element = document.createElement(tag);
  document.body.appendChild(element);

  return element;
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

function addDownloadGifLink() {
  var link = document.createElement('a');
  link.innerHTML = 'Download Gif';

  link.setAttribute('href', 'javascript:void');
  link.setAttribute('download', 'voski-art-download.gif');


  // var image = _blob.replace("image/gif", "application/octet-stream");
  link.href = window.URL.createObjectURL(_blob);
  document.body.appendChild(link);
}


function addDownloadVideoLink(blob) {
  var link = document.createElement('a');
  link.innerHTML = 'Download Video';

  link.setAttribute('href', 'javascript:void');
  link.setAttribute('download', 'voski-art-download.webm');


  // var image = _blob.replace("image/gif", "application/octet-stream");
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
}

function getWriter() {
  return new WebMWriter({
    quality: 1.0,    // WebM image quality from 0.0 (worst) to 1.0 (best)
    // fd: null,         // Node.js file handle to write to instead of buffering to memory (optional)

    // You must supply one of:
    // frameDuration: null, // Duration of frames in milliseconds
    frameRate: 30,     // Number of frames per second
  });
}
