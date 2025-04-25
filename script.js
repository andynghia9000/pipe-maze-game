const skyzinha = document.getElementById("skyzinha");
const mazeContainer = document.querySelector(".maze-container");
let xPos = 0, yPos = 0; // Initial position of Skyzinha

// Maze and Skyzinha size
const mazeWidth = mazeContainer.offsetWidth;
const mazeHeight = mazeContainer.offsetHeight;
const skyzinhaSize = 40; // Skyzinha size

// Move Skyzinha function
function moveSkyzinha(x, y) {
  // Check if the character goes out of bounds
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

// Event for keyboard (desktop)
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

// Event for mobile control buttons
document.getElementById("up").addEventListener("click", () => moveSkyzinha(xPos, yPos - 10));
document.getElementById("down").addEventListener("click", () => moveSkyzinha(xPos, yPos + 10));
document.getElementById("left").addEventListener("click", () => moveSkyzinha(xPos - 10, yPos));
document.getElementById("right").addEventListener("click", () => moveSkyzinha(xPos + 10, yPos));

// Ensure proper size on load
window.onload = () => {
  mazeContainer.style.position = "relative"; // Ensure maze container has relative positioning
  skyzinha.style.position = "absolute"; // Ensure Skyzinha has absolute positioning
};
