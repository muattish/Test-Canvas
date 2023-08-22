
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var currentColor = "black";
var currentSize = 5;

function startDrawing(e) {
  isDrawing = true;
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  ctx.beginPath();
  ctx.moveTo(x, y); // نقل إلى نقطة البداية
}

function stopDrawing() {
  isDrawing = false;
}

function draw(x, y) {
  if (!isDrawing) return;

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentSize;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor(event) {
  currentColor = event.target.id === 'color-black' ? 'black' : 'blue';
}

function changeSize(event) {
  currentSize = event.target.value;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", function(e) {
  if (isDrawing) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    draw(x, y);
  }
});

function saveCanvas() {
  var image = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.href = image;
  link.download = "canvas_image.png";
  link.click();
}
// 