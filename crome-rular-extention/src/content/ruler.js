// Inject a ruler into the current webpage
// import Ruler from '../components/Ruler.svelte'

(function () {
  // Avoid injecting multiple times
  if (document.getElementById("chrome-ruler")) return;

  // Create ruler container
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

  // Add text markings (basic)
  ruler.innerHTML = `
    <div style="color:#000;font-size:12px;padding:2px;">Ruler (drag + rotate)</div>
  `;

  document.body.appendChild(ruler);

  // --- Drag functionality ---
  let isDragging = false;
  let startX, startY, startLeft, startTop;

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
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    ruler.style.left = startLeft + dx + "px";
    ruler.style.top = startTop + dy + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // --- Rotate functionality with "R" key ---
  let rotation = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
      rotation += 15; // rotate by 15 degrees
      ruler.style.transform = `rotate(${rotation}deg)`;
    }
  });
})();
