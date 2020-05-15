// javascript

var c;

var vel = 1;

var movX = 1;
var movY = 1;

var stateX = 1;
var stateY = 1;

var nrData = 50;
var data = ['type','r','w','h','x','y'];

var realTime; 

function init(){
		
	var myCanvas = document.getElementById('canvas');
	c = myCanvas.getContext("2d");
	
	myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	
	for(let  i = 0; i < nrData; i++){
		drawObs(i);
	}
	
	realTime = setInterval(function(){ movement(movX, movY); }, );
	
	
}

function Circle(){
	
	this.display = function(color, x, y, r){
		//alert((x-1)+ " | "+ (y-1)+" | "+x+" | "+y)
		
		c.fillStyle = color;
	
		c.beginPath();
		c.arc(x, y, r, 0, Math.PI * 2, true);
		c.closePath();
		c.fill();
		c.closePath();
		
	}
	
	this.setReferencePoint = function(x,y){
		
		this.X0 = x;
		this.Y0 = y;
		
	}
	
}

function Rect(){
	
	
	this.display = function(color, x, y, W, H ){
		
		c.fillStyle = color;
		c.fillRect(x, y, W, H);
		
	};
	
	this.setReferencePoint = function(x,y){
		
		this.X0 = x;
		this.Y0 = y;
		
	}
	
}

function drawObs(nr){
	this.colors = ['red', 'blue', 'yellow', 'green', 'brown', 'grey'];
	
	this.x = Math.floor(Math.random() * innerWidth);
	this.y = Math.floor(Math.random() * innerHeight);
	this.W = Math.floor(Math.random() * 20) + 50;
	this.H = Math.floor(Math.random() * 20) + 50;
	
	rect = new Rect();
		
		data[nr] = {'w': this.W,
					'h': this.H,
					'x': this.x,
					'y': this.y
					}; 
	
	
	rect.display(colors[Math.floor(Math.random() * 6)], x, y, W, H);	
	//c.fillText("X: "+this.x+" | Y: "+this.y+"W: "+this.W+"H: "+this.H, this.x, this.y);	
	
	
}

function movement(x,y){
	//c.clearRect(0,0, window.innerWidth, window.innerHeight);
	c.clearRect(x, y, 7, 7);
	c.clearRect(x-7, y-7, 7, 7);
	c.clearRect(x-7, y, 7, 7);
	c.clearRect(x, y-7, 7, 7);
	
	if(nrData == 0)
		over();
	
	for(let i = 0; i < nrData; i++){
	
		if( ((movY >= data[i]['y'] && movY <= (data[i]['y']+data[i]['h']) ) && (movX == data[i]['x'] || movX == data[i]['x'] + data[i]['w'])) ){
			stateX = (stateX)? 0: 1;
			
			c.clearRect(data[i]['x'], data[i]['y'], data[i]['w'], data[i]['h']);
			
			data.splice(i, 1);
			nrData--;
			
			break; 
		
		}else if(((movX >= data[i]['x'] && movX <= (data[i]['x']+data[i]['w']) ) && (movY == data[i]['y'] || movY == data[i]['y'] + data[i]['h']))){
			
			stateY = (stateY) ? 0: 1;
			
			c.clearRect(data[i]['x'], data[i]['y'], data[i]['w'], data[i]['h']);
			
			data.splice(i, 1);
			nrData--;
			
			break; 
		}
			
	}
	
	if(stateX){
		if(movX >= window.innerWidth) stateX = 0;
		else movX += vel;
					
	
	}else{
		if(movX <= 0) stateX = 1;
		else movX -= vel;
	}
	
	if(stateY){
		if(movY >= window.innerHeight) stateY = 0;
		else movY += vel;
	
	}else{		
		if(movY <= 0) stateY = 1;
		else movY -= vel;
	
	}
	
	//console.log(movX, movY)
	circ = new Circle();
	circ.display('black', x, y, 5);
	
}

function over(){
	c.transform(1, 0.00099, 0, 1, 0, 0);
	c.clearRect(0,0, window.innerWidth, window.innerHeight);
	c.font = "30px Arial";
	c.strokeText("GAME OVER", window.innerWidth/2, window.innerHeight/2);
	
	setTimeout(function(){ clearInterval(realTime); },2000);
}

init();
