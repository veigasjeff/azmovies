// script.js
// const modeToggleBtn = document.getElementById("modeToggleBtn");
// const body = document.body;

// modeToggleBtn.addEventListener("click", toggleMode);

// function toggleMode() {
//     body.classList.toggle("night-mode");
// }
//   // Add a click event listener to the back button
//   const backBtn = document.querySelector(".back-btn");
//   backBtn.addEventListener("click", goBack);

//   function goBack() {
//     // Use JavaScript to navigate back to the previous page
//     window.history.back();
//   }
























// const modeToggleBtn = document.getElementById("theme-switch");
// const body = document.body;

// modeToggleBtn.addEventListener("click", toggleMode);

// function toggleMode() 

// {
//     body.classList.toggle("night-mode");
// }
// // {
// //   body.classList.toggle("day-mode");
// // }
//   // Add a click event listener to the back button
//   const backBtn = document.querySelector(".back-btn");
//   backBtn.addEventListener("click", goBack);

//   function goBack() {
//     // Use JavaScript to navigate back to the previous page
//     window.history.back();
//   }




const modeToggleBtn = document.getElementById("theme-switch");
const body = document.body;
const nightIcon = modeToggleBtn.querySelector("svg:nth-child(1)");
const dayIcon = modeToggleBtn.querySelector("svg:nth-child(2)");

modeToggleBtn.addEventListener("click", toggleMode);

function toggleMode() {
    body.classList.toggle("night-mode");

    // Toggle icons
    if (body.classList.contains("night-mode")) {
        nightIcon.style.display = "none"; // Hide night icon
        dayIcon.style.display = "block";  // Show day icon
    } else {
        nightIcon.style.display = "block"; // Show night icon
        dayIcon.style.display = "none";   // Hide day icon
    }
}

// Add a click event listener to the back button
const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", goBack);

function goBack() {
    // Use JavaScript to navigate back to the previous page
    window.history.back();
}