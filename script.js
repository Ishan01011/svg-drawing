const svg = document.getElementById("drawingArea");
const colorPicker = document.getElementById("colorPicker");

let isDrawing = false;
let currentLine = null;

svg.addEventListener("mousedown", function(e) {
  isDrawing = true;

  currentLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("stroke", colorPicker.value);
  currentLine.setAttribute("stroke-width", "2");

  const pos = getMousePos(e);
  currentLine.setAttribute("points", pos.x + "," + pos.y);

  svg.appendChild(currentLine);
});

svg.addEventListener("mousemove", function(e) {
  if (!isDrawing) return;

  const pos = getMousePos(e);
  let points = currentLine.getAttribute("points");
  currentLine.setAttribute("points", points + " " + pos.x + "," + pos.y);
});

svg.addEventListener("mouseup", function() {
  isDrawing = false;
  currentLine = null;
});

svg.addEventListener("mouseleave", function() {
  isDrawing = false;
  currentLine = null;
});

function getMousePos(e) {
  const rect = svg.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function clearCanvas() {
  svg.innerHTML = "";
}
