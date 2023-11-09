const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isDrawing = false;
let pencilColor = "#000000";
let pencilThickness = 5;
let eraserType = "circle";
let eraserThickness = 10;

canvas.width = 800;
canvas.height = 600;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDrawing);

document.getElementById("pencilButton").addEventListener("click", setPencil);
document.getElementById("eraserButton").addEventListener("click", setEraser);
document.getElementById("clearButton").addEventListener("click", clearCanvas);
document.getElementById("colorPicker").addEventListener("input", setColor);
document
  .getElementById("pencilThickness")
  .addEventListener("change", setPencilThickness);
document.getElementById("eraserType").addEventListener("change", setEraserType);
document
  .getElementById("eraserThickness")
  .addEventListener("change", setEraserThickness);

function startDrawing(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );
}

function draw(e) {
  if (!isDrawing) return;

  context.lineTo(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );
  context.lineWidth = pencilThickness;
  context.strokeStyle = pencilColor;
  context.lineCap = "round";
  context.stroke();
}

function endDrawing() {
  isDrawing = false;
}

function setPencil() {
  canvas.style.cursor = "crosshair";
  canvas.removeEventListener("mousedown", startErasing);
  canvas.addEventListener("mousedown", startDrawing);
}

function setEraser() {
  canvas.style.cursor = "pointer";
  canvas.removeEventListener("mousedown", startDrawing);
  // canvas.addEventListener("mousedown", startErasing);
  canvas.addEventListener("mousemove", startErasing);
}

function startErasing(e) {
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;

  if (eraserType === "circle") {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, eraserThickness / 2, 0, Math.PI * 2);
    context.fill();
    context.globalCompositeOperation = "source-over";
  } else if (eraserType === "square") {
    context.clearRect(
      x - eraserThickness / 2,
      y - eraserThickness / 2,
      eraserThickness,
      eraserThickness
    );
  } else if (eraserType === "diamond") {
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI / 4);
    context.clearRect(
      -eraserThickness / 2,
      -eraserThickness / 2,
      eraserThickness,
      eraserThickness
    );
    context.restore();
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(e) {
  pencilColor = e.target.value;
}

function setPencilThickness(e) {
  pencilThickness = e.target.value;
}

function setEraserType(e) {
  eraserType = e.target.value;
}

function setEraserThickness(e) {
  eraserThickness = e.target.value;
}
