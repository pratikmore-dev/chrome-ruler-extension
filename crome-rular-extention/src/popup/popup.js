document.getElementById("toggleRuler").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: toggleRuler
    });
  });
});

document.getElementById("rotateRuler").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: rotateRuler
    });
  });
});

// Functions that will run inside the page
function toggleRuler() {
  const ruler = document.getElementById("chrome-ruler");
  if (ruler) {
    ruler.remove();
  } else {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("ruler.js");
    document.body.appendChild(script);
  }
}

function rotateRuler() {
  const ruler = document.getElementById("chrome-ruler");
  if (ruler) {
    let rotation = parseInt(ruler.dataset.rotation || "0", 10);
    rotation += 15;
    ruler.style.transform = `rotate(${rotation}deg)`;
    ruler.dataset.rotation = rotation.toString();
  }
}
