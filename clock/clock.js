

function setup() {
	var canvas = createCanvas(800, 800);
    canvas.parent("displayCanvas");
    angleMode(DEGREES);
}

function draw() {
	background(0);

	let hr = hour();
	let min = minute();
	let sec = second();

	noStroke();
	fill(255);
	textSize(32);

	// if hour is less than 12, we are in the AM
	if (hr < 12) {
		// add a 0 behind mins if less than 10
		if (min < 10) 
			if (sec < 10)
				text( (hr) + ':0' + min + ':0' + sec + ' AM', 350, 50);
			else 
				text( (hr) + ':0' + min + ':' + sec + ' AM', 350, 50);
		else 
			if (sec < 10)
				text( (hr) + ':' + min + ':0' + sec + ' AM', 350, 50);
			else 
				text( (hr) + ':' + min + ':' + sec + ' AM', 350, 50);
	}

	// hours are greater than 12. 
	else {
		if (min < 10) 
			if (sec < 10)
				text( (hr ) + ':0' + min + ':0' + sec + ' PM', 350, 50);
			else 
				text( (hr ) + ':0' + min + ':' + sec + ' PM', 350, 50);
		else 
			if (sec < 10)
				text( (hr ) + ':' + min + ':0' + sec + ' PM', 350, 50);
			else 
				text( (hr ) + ':' + min + ':' + sec + ' PM', 350, 50);


	}

	translate(400, 400);
	rotate(-90);

	strokeWeight(18);
	noFill();

	// draw seconds
	stroke(55, 132, 245);
	let secEnd = map(sec, 0, 60, 0, 360);
	arc(0, 0, 600, 600, 0, secEnd);
	
	push();
	rotate(secEnd);
	stroke(225);
	line(0, 0, 220, 0);
	circle(0, 0, 20);

	pop();


	// draw minutes
	stroke(155, 191, 250);
	let minEnd = map(min, 0, 60, 0, 360);
	arc(0, 0, 550, 550, 0, minEnd);

	push();
	rotate(minEnd);
	stroke(225);
	line(0, 0, 160, 0);
	pop();


	// draw hours
	stroke(191, 211, 242);
	let hrEnd = map(hr % 12, 0, 12, -90, 360);
	arc(0, 0, 500, 500, 0, hrEnd);

	push();
	rotate(hrEnd);
	stroke(225);
	line(0, 0, 110, 0);
	pop();


	

}
