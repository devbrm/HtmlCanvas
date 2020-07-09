
const canvas = document.querySelector("#canvas");
const select = document.querySelector("#select");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");



ctx.lineJoin = "round";
ctx.strokeStyle = '#BADA55';

let isDrawing = false;
let direction = true;
let lastX = 0;
let lastY = 0;
let hue = 0;
let styleId = 0;
let width = 5;
let offsetX = 0;
let offsetY = 0;


function draw(e) {
  if( !isDrawing ) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();

  Array.from(select.children).forEach( (item) => {
    if (item.selected) {
      styleId = Number(item.value);
    }
  })
  
  switch(styleId) {
    case 1: style1();
    break;
    case 2: style2(e);
    break;
  }

  hue = (hue+1/ 2);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  if (hue >= 360) hue = 1;

  if (width >= 1000) direction = !direction;
  else if (width <= 5) direction = !direction;
}

//Computer
canvas.addEventListener( "mousemove", (e) => {
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  draw();
} )
canvas.addEventListener( "mouseout", () => isDrawing = false )
canvas.addEventListener( "mouseup", () => isDrawing = false )
canvas.addEventListener( "mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
} )


//mobile
canvas.addEventListener( "touchmove", (e) => {
  offsetX = e.touches[0].pageX;
  offsetY = e.touches[0].pageY;
  draw();
} )
canvas.addEventListener( "touchend", () => isDrawing = false )
canvas.addEventListener( "touchcancel", () => isDrawing = false )
canvas.addEventListener( "touchstart", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.touches[0].pageX, e.touches[0].pageY];
} )


function style1 () {
  ctx.lineCap = "round";
  ctx.lineWidth = .2;

}


function style2 (e) {
  ctx.lineCap = "round";
  ctx.lineWidth = width / 8;
  console.log(width / 7);
  [lastX, lastY] = [offsetX, offsetY]; 
  if(direction) width++;
  else width--;
}