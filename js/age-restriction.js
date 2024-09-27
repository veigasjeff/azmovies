  // age restriction popup.js
  document.addEventListener("DOMContentLoaded", function () {
    const agePopup = document.getElementById("agePopup");
    const enterButton = document.getElementById("enterButton");
    const exitButton = document.getElementById("exitButton");
    const overlay = document.querySelector(".overlay");
    // Show the age restriction popup after a certain duration (in milliseconds)
    const popupDuration = 1000; // Change this value to set the duration
    setTimeout(function () {
      agePopup.style.display = "block";
    }, popupDuration);
  
    enterButton.addEventListener("click", function () {
      agePopup.style.display = "none";
    });
  
    exitButton.addEventListener("click", function () {
      // You can implement your own behavior for the exit button
      // For example, redirecting the user to a safe page
    });
  });