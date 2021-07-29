let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 2.6;

var easyCam;

var points = [];

class Point 
{
	constructor(x, y, z) 
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

function setup() 
{ 
  var canvas = createCanvas(700, 700, WEBGL);
  canvas.parent("displayCanvas");
  easyCam = createEasyCam();

  background(0);
  
  sliderA = createSlider(5, 20, 2);
  sliderA.position(650, 800);
  sliderB = createSlider(10, 50, 2);
  sliderB.position(800, 800);
  sliderC = createSlider(0, 20, 1);
  sliderC.position(950, 800);
}

function draw() 
{
  scale(8);
  background(0);

  let dt = 0.01;
  a = sliderA.value();
  b = sliderB.value();
  c = sliderC.value();
  

  let dx = (a * (y-x) ) * dt;
  let dy = (x * (b-z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x = x + dx;
  y = y + dy;
  z = z + dz;
  points.push(new Point(x, y, z));

  translate(0, 0, -30);
  
  stroke(255);


  beginShape();
  strokeWeight(0.5);
  noFill();
  for (var i = 0; i < points.length; i++) 
  {
    //curveVertex(points[i].x, points[i].y);
  	vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape();  
  
}