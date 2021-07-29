var gravity = 6;
var planets = [];
var prevPoints = [ [], [], [] ];
var stars = [];

class Planet {
  constructor(x, y, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass;
    this.color = color;
    this.velocity = [0, 0];
    this.accel = [0, 0];
  }

  drawPlanet(index) {
    prevPoints[index].push(this.x);
    prevPoints[index].push(this.y);
    colorMode(RGB, 1);
    strokeWeight(0);
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  movePlanet() {    
    this.velocity[0] = this.velocity[0] + this.accel[0];
    this.velocity[1] = this.velocity[1] + this.accel[1];
    if (this.velocity[0] + this.x < 0 || this.velocity[0] + this.x > 800)
    {
      this.velocity[0] *= -1;
      this.accel[0] *= -1;

    }
    if (this.velocity[1] + this.y < 0 || this.velocity[1] + this.y > 800)
    {
      this.velocity[1] *= -1;
      this.accel[1] *= -1;
    }
    this.x = this.velocity[0] + this.x;
    this.y = this.velocity[1] + this.y;   
    
  }
  
  drawPath(index)
  {
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < prevPoints[index].length-1; i+=2)
    {
      curveVertex(prevPoints[index][i], prevPoints[index][i+1]);
    }
    endShape();
  }
}

function distance(mass1, mass2) {
  return dist(mass1.x, mass1.y, mass2.x, mass2.y);
}

function force(mass1, mass2) {
  return (gravity * mass1.mass * mass2.mass) / distance(mass1, mass2) ** 2;
}

function angle(mass1, mass2) {
  return Math.atan2(mass2.y - mass1.y, mass2.x - mass1.x);
}

function calculation(mass1, mass2) {
  let f = (gravity * mass1.mass * mass2.mass) / (distance(mass1, mass2) ** 2);

  let direction1 = angle(mass1, mass2);
  let direction2 = direction1 + Math.PI;
  mass1.accel[0] = Math.cos(direction1) / (mass1.mass * f );
  mass1.accel[1] = Math.sin(direction1) / (mass1.mass * f );
  mass2.accel[0] = Math.cos(direction2) / (mass2.mass * f );
  mass2.accel[1] = Math.sin(direction2) / (mass2.mass * f );
}

function update(newMass, newGravity) {
  for (var i = 0; i < planets.length; i++) {
    planets[i].mass = newMass;
    planets[i].radius = newMass / 2 + 7;
    //planets[i].radius = 0;
  }
  gravity = newGravity;
}

function createStars(starCount)
{
  for (var i = 0; i < starCount; i++)
  {
    var x = random(0, 600);
    var y = random(0, 600);
    fill(255);
    stars[i] = [x,y];
  }
}


function Reset() {
  planets = [];
  planets.push(new Planet(random(210, 390), random(210, 390), 50, color(53, 155, 232), 10));
  planets.push(new Planet(random(210, 390), random(210, 390), 50, color(91, 165, 222), 10));
  planets.push(new Planet(random(210, 390), random(210, 390), 50, color(92, 180, 247), 10));
  prevPoints = [ [], [], [] ];
}

function setup() {
  frameRate(10);
  var canvas = createCanvas(800, 800);
  canvas.parent("displayCanvas");

  // create reset button
  button = createButton('RESET');
  button.position(725, 990);
  button.mousePressed(Reset);

  // create sliders
  sliderMass = createSlider(5, 20, 10);
  sliderMass.position(550, 1000);
  sliderGravity = createSlider(5, 25, 5);
  sliderGravity.position(850, 1000);

  planets.push(new Planet(random(150, 450), random(150, 450), 50, color(53, 155, 232), 8));
  planets.push(new Planet(random(150, 450), random(150, 450), 50, color(91, 165, 222), 8));
  planets.push(new Planet(random(150, 450), random(150, 450), 50, color(92, 180, 247), 8));
  
  createStars(70);
}


function draw() {
  background(0);
  //frameRate(10);

  fill(255);
  for (var i = 0; i < stars.length; i++)
  {
    circle(stars[i][0], stars[i][1], 1);
  }
  
  fill(200);
 // rect(0, 800, 600, 100);

  let newMass = sliderMass.value();
  let newGravity = sliderGravity.value();
  update(newMass, newGravity);

  // update acceleration
  for (let i = 0; i < planets.length; i++) {
    planets[i].accel[0] = 0;
    planets[i].accel[1] = 0;
  }

  // iterate through planets and have them interact with each other
  for (let i = 0; i < planets.length; i++) {
    for (let j = 1; i < planets.length; i++) {
      calculation(planets[i], planets[j]);
    }
  }

  // iterate through planets and update paths
  for (let i = 0; i < planets.length; i++) {
    planets[i].drawPath(i);
    planets[i].drawPlanet(i);
    planets[i].movePlanet();
  }
}