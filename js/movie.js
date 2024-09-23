function openMoviePopup(videoUrl, posterUrl, serverName, movieName) {
  var popup = document.getElementById("popup");
  var iframe = document.getElementById("popup-iframe");
  if (popup && iframe) {
    popup.style.display = "block";
    iframe.style.display = "block"; // Show the iframe
    // Set the video source URL
    iframe.src = videoUrl;
    // Set the poster source URL
    iframe.poster = posterUrl;
    document.body.style.overflow = "hidden"; // Prevent scrolling

    // Update popup title for the movie
    var popupTitle = document.querySelector("#popup-content p");
    if (popupTitle) {
      popupTitle.textContent = "Watch " + movieName + " - " + serverName + "";
    }
  }
}

function closePopup() {
  var popup = document.getElementById("popup");
  var iframe = document.getElementById("popup-iframe");
  if (popup && iframe) {
    popup.style.display = "none";
    iframe.style.display = "none"; // Hide the iframe when closing the popup
    // Reset the video source URL
    iframe.src = "";
    // Reset the poster source URL
    iframe.poster = "";
    document.body.style.overflow = ""; // Re-enable scrolling
  }
}
