const skyzinha = document.getElementById("skyzinha");
const mazeContainer = document.querySelector(".maze-container");
let xPos = 0, yPos = 0; // Vị trí bắt đầu của Skyzinha

// Kích thước của maze và Skyzinha
const mazeWidth = mazeContainer.offsetWidth;
const mazeHeight = mazeContainer.offsetHeight;
const skyzinhaSize = 40; // Kích thước nhân vật

// Hàm di chuyển Skyzinha
function moveSkyzinha(x, y) {
  // Kiểm tra xem nhân vật có vượt ra ngoài ranh giới không
  if (x >= 0 && x <= mazeWidth - skyzinhaSize) {
    xPos = x;
  }
  if (y >= 0 && y <= mazeHeight - skyzinhaSize) {
    yPos = y;
  }

  // Cập nhật vị trí nhân vật
  skyzinha.style.left = `${xPos}px`;
  skyzinha.style.top = `${yPos}px`;
}

// Sự kiện cho bàn phím (desktop)
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

// Sự kiện cho các nút điều khiển trên mobile
document.getElementById("up").addEventListener("click", () => moveSkyzinha(xPos, yPos - 10));
document.getElementById("down").addEventListener("click", () => moveSkyzinha(xPos, yPos + 10));
document.getElementById("left").addEventListener("click", () => moveSkyzinha(xPos - 10, yPos));
document.getElementById("right").addEventListener("click", () => moveSkyzinha(xPos + 10, yPos));

// Đảm bảo các kích thước ban đầu được thiết lập chính xác
window.onload = () => {
  mazeContainer.style.position = "relative"; // Đảm bảo maze container có vị trí tương đối
  skyzinha.style.position = "absolute"; // Đảm bảo Skyzinha có vị trí tuyệt đối
};
