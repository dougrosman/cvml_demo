let w = 640;
let h = 360;
let capture;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("#sketch-parent");
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
}

function draw() {
  background(255);
  
  capture.loadPixels();
  // let threshold = 127;
  let threshold = map(mouseX, 0, width, 0, 255, true);
  let threshold2 = threshold+50;
  
  for(let y = 0; y < capture.height; y++) {
    for(let x = 0; x < capture.width; x++) {
      const index = (x + y * capture.width) * 4;
      
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      
      let totalBrightness = r + g + b;
      
      let brightness = totalBrightness/3;
      
      if(brightness < threshold) {
        capture.pixels[index] = 0;
        capture.pixels[index+1] = 0;
        capture.pixels[index+2] = 0;
      } else if(brightness > threshold && brightness < threshold2) {
        capture.pixels[index] = x;
        capture.pixels[index+1] = y;
        capture.pixels[index+2] = 255;
      }
      else {
        capture.pixels[index] = 255;
        capture.pixels[index+1] = 255;
        capture.pixels[index+2] = 255;
      }
    }
  }
  capture.updatePixels();
  
  image(capture, 0, 0);
}