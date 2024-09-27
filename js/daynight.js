// script.js
const modeToggleBtn = document.getElementById("modeToggleBtn");
const body = document.body;

modeToggleBtn.addEventListener("click", toggleMode);

function toggleMode() {
    body.classList.toggle("night-mode");
}
  // Add a click event listener to the back button
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", goBack);

  function goBack() {
    // Use JavaScript to navigate back to the previous page
    window.history.back();
  }