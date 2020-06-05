var colori = ["white","orange","#ff3300","transparent"];
var ind_c = 0;
var ind_anim = 0;

x = 300;
y = 300;
speed = 0;
max_speed = 10;
accelero=false;
angle = 0;
mod = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
car = new Image();
car.src = "car_red.png";

window.addEventListener("keydown", keypress_handler, false);
window.addEventListener("keyup", keyup_handler, false);

var moveInterval = setInterval(function () {
    draw();
}, 40);

/*
function verTastoPremuto(event) {
  if (event.keyCode == 32) {
      cambioCampione();
  }	
}
*/

function draw() {
    context = canvas.getContext("2d");
    context.clearRect(0, 0, 1800, 1000);
    /*
    context.fillStyle = "rgb(200, 100, 220)";
    context.fillRect(50, 50, 100, 100);
    */
    
    if (accelero === false && speed > 0) {
  	  speed-=1;
    }
    
    if (accelero && speed < max_speed) {
  	  speed+=1;
    }
    
    x += (speed * mod) * Math.cos(Math.PI / 180 * angle);
    y += (speed * mod) * Math.sin(Math.PI / 180 * angle);

    //if (x > 100 && x < canvas.width-100 && y > 70 && y < canvas.height-100) {
      context.save();
      context.translate(x, y);
      context.rotate(Math.PI / 180 * angle);
      context.drawImage(car, -(car.width / 2), -(car.height / 2));
      context.restore();
    //}
}

function keyup_handler(event) {
  if (event.keyCode == 83 || event.keyCode == 87) {
    //mod = 0;
    accelero=false;
  }
}

function keypress_handler(event) {
  if (event.keyCode == 87) {
    mod = 1;
    accelero=true;
  }
  if (event.keyCode == 83) {
    mod = -1;
    accelero=true;
  }
  if (event.keyCode == 190) {
    angle -= 6;
  }
  if (event.keyCode == 189) {
    angle += 6;
  }
  if (event.keyCode == 38) {
    max_speed+=1;
  }
  if (event.keyCode == 40) {
    max_speed-=1;
  }
  if (event.keyCode == 32) {
    cambioCampione();
  }
}

function gira(angolo) {
    angle+=angolo;
}

function cambioColore(div) {
  div.style.backgroundColor = colori[ind_c];
}

function cambioCampione() {
  if (accelero) {
      accelero=false;
      x=300;
      y=300;
  }
  else {    
      accelero=true;
  }
  ind_c+=1;
  if (ind_c > colori.length-1) ind_c=0;
     document.getElementById("campione").style.backgroundColor = colori[ind_c];
}
