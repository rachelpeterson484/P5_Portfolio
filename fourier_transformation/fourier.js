let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];
let drawing = 0;
let count = 0;


function dft(x) {
  const fourier = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      var phi = ((Math.PI * 2) * k * n) / N;
      re += x[n] * Math.cos(phi);
      im += x[n] * Math.sin(phi) * (-1);
    }
    re /= N;
    im /= N;
    
    let freq = k;
    let amp = Math.sqrt(re * re + im * im);
    let phase = Math.atan2(im, re);
    fourier[k] = { re, im, freq, amp, phase };
  }
  return fourier;
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * Math.cos(freq * time + phase + rotation);
    y += radius * Math.sin(freq * time + phase + rotation);

    stroke(255);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}


function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent("displayCanvas");
   

  // testing purposes
  /* for (let i = 0; i < 100; i++)
  {
     y[i] = random(-100, 100);
     x[i] = random(-100, 100);
  } 
  drawing = 1;

  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);*/
}

function draw() {
  background(90);
  if (drawing == 0)
  {
    
    stroke(255);
    if (mouseIsPressed == true ) 
    {
      if (count % 6 == 0)
      {
        x.push(mouseX);
        y.push(mouseY);
      }
      count++;
      for (var i = 1; i < x.length; i++)
      {
         line(x[i], y[i], x[i-1], y[i-1]);
      } 
    }
    // if finished drawing, move on
    if (x.length != 0 && mouseIsPressed != true) {
      drawing = 1;   
    }
  }
  
  // finish calculations once, then move on and draw
  if (drawing == 1)
  {
    console.log(drawing);
    fourierX = dft(x);
    fourierY = dft(y);

    // makes rotations smoother
    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
    drawing = 2;
  }

  // repeats fourier transformation 
  if (drawing == 2)
  {
    fill(255);
    let vx = epiCycles(100, 100, 0, fourierX);
    let vy = epiCycles(100, 100, (Math.PI / 2), fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v);
    
    // draws lines from epicycles to drawing
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
 
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = (Math.PI * 2) / fourierY.length;
    time += dt;

    if (time > (Math.PI * 2)) {
      time = 0;
      path = [];
    }
  }

}


