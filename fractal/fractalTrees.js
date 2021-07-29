
var angle = PI/4;


function setup() {
	var canvas = createCanvas(800, 800);
    canvas.parent("displayCanvas");

    slider = createSlider(0, TWO_PI, PI/4, PI/8);
}

function draw() 
{
	background(0);
	angle = slider.value();

	// move origin to buttom center
	translate(400, height);

	stroke(255);
	branch(225);

}

function branch(length) 
{
	// draw branch
	line(0, 0, 0, -length);
	translate(0, -length);

	// draw branches going out of prev branch
	if (length > 3)
	{
		push();
		rotate(angle);
		branch(length * (2/3));
		pop();

		push();
		rotate(-angle);
		branch(length * (2/3));
		pop();
	}
}