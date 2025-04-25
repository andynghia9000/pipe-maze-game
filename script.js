const skyzinha = document.getElementById("skyzinha");
const mazeContainer = document.querySelector(".maze-container");
let xPos = 0, yPos = 0; // Starting position

// Maze dimensions
const mazeWidth = mazeContainer.offsetWidth;
const mazeHeight = mazeContainer.offsetHeight;
const skyzinhaSize = 40; // The size of the skyzinha

// Function to move the skyzinha
function moveSkyzinha(x, y) {
  // Check boundaries
  if (x >= 0 && x <= mazeWidth - skyzinhaSize) {
    xPos = x;
  }
  if (y >= 0 && y <= mazeHeight - skyzinhaSize) {
    yPos = y;
  }

  // Update position
  skyzinha.style.left = `${xPos}px`;
  skyzinha.style.top = `${yPos}px`;
}

// Event listeners for keyboard (desktop)
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveSkyzinha(xPos, yPos - 10);
      break;
    case "ArrowDown":
      moveSkyzinha(xPos, yPos + 10);
      break;
    case "ArrowLeft":
      moveSkyzinha(xPos - 10, yPos);
      break;
    case "ArrowRight":
      moveSkyzinha(xPos + 10, yPos);
      break;
  }
});

// Event listeners for mobile controls
document.getElementById("up").addEventListener("click", () => moveSkyzinha(xPos, yPos - 10));
document.getElementById("down").addEventListener("click", () => moveSkyzinha(xPos, yPos + 10));
document.getElementById("left").addEventListener("click", () => moveSkyzinha(xPos - 10, yPos));
document.getElementById("right").addEventListener("click", () => moveSkyzinha(xPos + 10, yPos));
