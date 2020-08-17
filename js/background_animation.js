var canvas = document.getElementById('animation');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

var can_w = parseInt(canvas.getAttribute('width'));
var can_h = parseInt(canvas.getAttribute('height'));
var ctx = canvas.getContext('2d');

var balls_color = {
	r: 255,
	g: 255,
	b: 255
};

var line_properties = {
	r: 255,
	g: 255,
	b: 255,
	len: 200,
	width: 1
};

var radius = 2;
var figures = [];
var figures_number = 50;
var iterations = 20;

function getRandomPosition(size){
	return Math.ceil(Math.random() * size);
}

function getRandomDirection(){
	var directions = ["up", "down", "left", "right"];
	var index = Math.floor(Math.random() * directions.length);
	return directions[index];
}

function initFigures(number){
	figures = [];
	for (var i = 0; i < number; i++)
		figures.push([{
			x: getRandomPosition(can_w),
			y: getRandomPosition(can_h),
			direction: getRandomDirection()
		}]);
}

function drawBall(x, y){
	var style = 'rgba('+balls_color.r+','+balls_color.g+','+balls_color.b+',1)';
        ctx.fillStyle = style;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
}

function drawLine(x1, y1, x2, y2){
	var lineStyle = 'rgba('+line_properties.r+','+line_properties.g+','+line_properties.b+',1)';
        ctx.strokeStyle = lineStyle;
        ctx.lineWidth = line_properties.width;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
}

function drawFigures(){
	for (var i = 0; i < figures.length; i++){
		drawBall(figures[i][0].x, figures[i][0].y);
	}
}

function iterateFigures(){
	for (var i = 0; i < figures.length; i++){
		var last = figures[i][figures[i].length - 1];
		var new_ball = {x: last.x, y: last.y, direction: getRandomDirection()};
		
		if (last.direction == "up"){
			new_ball.y -= line_properties.len;
		}
		else if (last.direction == "down"){
			new_ball.y += line_properties.len;
		}
		else if (last.direction == "left"){
			new_ball.x -= line_properties.len;
		}
		else {
			new_ball.x += line_properties.len;
		}
		
		drawLine(last.x, last.y, new_ball.x, new_ball.y);
                drawBall(new_ball.x, new_ball.y);

		figures[i].push(new_ball);
	}
}

function start(){
	canvas.style.opacity = 0.0;
	ctx.clearRect(0, 0, can_w, can_h);
	initFigures(figures_number);
	drawFigures();
	(function loop(i){
		setTimeout(function(){
			iterateFigures();
			if (--i) loop(i);
		}, 260)
	})(iterations);

	(function loop(){
                setTimeout(function(){
                        var current = parseFloat(canvas.style.opacity);
                        current += 0.005;
                        canvas.style.opacity = current;
                        if (current != 0.2)
                                loop();
                }, 80)
        })();
	
	(function loop(){
		setTimeout(function(){
			var current = parseFloat(canvas.style.opacity);
			current -= 0.005;
			canvas.style.opacity = current;
			if (current != 0)
				loop();
			else
				start();
		}, 80)
	})();
}
start()
