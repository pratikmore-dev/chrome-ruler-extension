(function () {
  if (document.getElementById("chrome-ruler")) return;

  const ruler = document.createElement("div");
  ruler.id = "chrome-ruler";
  ruler.style.position = "absolute";
  ruler.style.top = "100px";
  ruler.style.left = "100px";
  ruler.style.width = "300px";
  ruler.style.height = "40px";
  ruler.style.background = "rgba(0,0,0,0.1)";
  ruler.style.border = "1px solid #333";
  ruler.style.zIndex = "999999";
  ruler.style.cursor = "move";
  ruler.style.transformOrigin = "center center";

  ruler.innerHTML = `<div style="color:#000;font-size:12px;padding:2px;">Ruler</div>`;

  document.body.appendChild(ruler);

  // Dragging
  let isDragging = false, startX, startY, startLeft, startTop;
  ruler.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(ruler.style.left, 10);
    startTop = parseInt(ruler.style.top, 10);
    e.preventDefault();
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    ruler.style.left = startLeft + (e.clientX - startX) + "px";
    ruler.style.top = startTop + (e.clientY - startY) + "px";
  });
  document.addEventListener("mouseup", () => (isDragging = false));
})();
