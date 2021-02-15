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
  background(0);
  let stepSize = 20;
  capture.loadPixels();
  let threshold = map(mouseX, 0, width, 0, 255, true);
  for(let y = 0; y < capture.height; y+=stepSize) {
    for(let x = 0; x < capture.width; x+=stepSize) {
      const index = (x + y * capture.width) * 4;
      
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      let c = color(r, g, b);
      
      let totalBrightness = r + g + b;
      let brightness = totalBrightness/3;
      let size = map(brightness, 0, 255, stepSize/4, stepSize*1.5);
      
      // let scaleRatio;
      // if(windowWidth > windowHeight) {
      //   scaleRatio = windowHeight/capture.height;
      // } else {
      //   scaleRatio = windowWidth/capture.width;
      // }
      
      
      // RECTANGLES
      push();
        //scale(scaleRatio, scaleRatio);
        translate(capture.width, 0);
        scale(-1, 1);
        stroke(0);
        strokeWeight(0.25);
        if(brightness > threshold) {
          fill(0, 0, 255);
        } else {
          fill(c);
        }
        
        rect(x, y, size, size);
      pop();      
    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }