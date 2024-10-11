// // disableCopy.js
// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
//   showMessage("You can't right-click is disabled on this page.");
// });

// document.addEventListener("selectstart", function (event) {
//   event.preventDefault();
//   showMessage("Text selection is disabled on this page.");
// });

// document.addEventListener("dragstart", function (event) {
//   event.preventDefault();
//   showMessage("Image dragging is disabled on this page.");
// });

// function showMessage(message) {
//   const msgElement = document.createElement("div");
//   msgElement.className = "custom-message";
//   msgElement.textContent = message;
//   document.body.appendChild(msgElement);
//   // msgElement.style.backgroundColor = 'red';
//   msgElement.style.backgroundColor = "rgba(220, 20, 60, 0.4)";
//   msgElement.style.border = "1px solid #fff"; // You can customize the border color
//   msgElement.style.borderRadius = "10px"; // You can adjust the border-radius for rounded corners

//   setTimeout(function () {
//     document.body.removeChild(msgElement);
//   }, 2000);
// }


document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  showMessage('You can\'t right-click. Right-click is disabled on this page.');
});

document.addEventListener('selectstart', function (event) {
  event.preventDefault();
  showMessage('Text selection is disabled on this page.');
});

document.addEventListener('dragstart', function (event) {
  event.preventDefault();
  showMessage('Image dragging is disabled on this page.');
});

function showMessage(message) {
  // Remove any existing messages before showing a new one
  removeMessages();

  const msgElement = document.createElement('div');
  msgElement.className = 'custom-message';
  msgElement.textContent = message;

  // Set background color to red with 50% opacity
  msgElement.style.backgroundColor = 'rgba(220, 20, 60, 0.4)';

  // Add border and rounded corners
  msgElement.style.border = '1px solid #fff';  // You can customize the border color
  msgElement.style.borderRadius = '10px';  // You can adjust the border-radius for rounded corners

  document.body.appendChild(msgElement);

  setTimeout(function () {
    document.body.removeChild(msgElement);
  }, 2000);
}

function removeMessages() {
  const existingMessages = document.querySelectorAll('.custom-message');
  existingMessages.forEach(function (msg) {
    document.body.removeChild(msg);
  });
}
