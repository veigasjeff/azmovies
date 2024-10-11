
let tvShowMessageShown = false;
let movieMessageShown = false;

function loadVideo(videoPage, contentType, episodeNumber, server) {
  const videoIframe = document.getElementById("videoIframe");

  const userResponse = confirm(
    `Do you want to load ${
      contentType === "tvshow" ? "TV Show Episode " : "Movie"
    } ${episodeNumber} from Server ${server}?`
  );

  if (userResponse) {
    // If the user clicks "OK"
    if (contentType === "tvshow" && !tvShowMessageShown) {
      // Display a message for the selected TV show episode (only if it hasn't been shown before)
      alert(
        `Loading TV Show Episode ${episodeNumber} - Selected Server ${server}`
      );
      tvShowMessageShown = true; // Set the flag to true after showing the message
    } else if (contentType === "movie" && !movieMessageShown) {
      // Display a different message for movies (only if it hasn't been shown before)
      alert(`Changing Server for Movie - Selected Server ${server}`);
      movieMessageShown = true; // Set the flag to true after showing the message
    }

    // Set the new source after a short delay
    setTimeout(() => {
      videoIframe.src = videoPage;
    }, 30); // Adjust the delay as needed
  } else {
    // If the user clicks "Cancel"
    alert("Video loading canceled.");
  }
}
function translateMessage(message) {
  // Get the selected language from the Google Translate dropdown
  const selectedLanguage =
    google.translate.TranslateElement.getInstance().getSelectedLanguage();
  // Translate the message using Google Translate API
  const translation = google.translate.TranslateElement.getInstance().translate(
    message, // The original message
    { to: selectedLanguage }
  );
  return translation;
}


$(function () {
  // Function to check if the device is a mobile device
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  var lightout = false;
  $("#toggle_light, #lightout").click(function () {
    // Check if the device is mobile, if yes, display a message and return
    if (isMobileDevice()) {
      alert("This feature is not available on mobile devices.");
      return;
    }

    // Your existing code for toggling light
    $("#videoIframe").css("position", "relative").css("z-index", 8);
    $(".col-md-9").removeClass("col-md-9").addClass("col-md-12");
    $(".col-lg-9").removeClass("col-lg-9").addClass("col-lg-12");
    $(".col-xl-9").removeClass("col-xl-9").addClass("col-xl-12");
    $(".container").css({ width: "80%" });
    if (!lightout) {
      lightout = true;
      $("#lightout").css("opacity", 0.98).hide().fadeIn();
    } else {
      lightout = false;
      $("#lightout").fadeOut();
      if (resize == false) {
        $(".col-md-12").removeClass("col-md-12").addClass("col-md-9");
        $(".col-lg-12").removeClass("col-lg-12").addClass("col-lg-9");
        $(".col-xl-12").removeClass("col-xl-12").addClass("col-xl-9");
        $(".container").css({ width: "100%" });
      }
    }
    $("#toggle_light").html(
      lightout
        ? '<i class="fa fa-toggle-on" aria-hidden="true"></i> Light On'
        : '<i class="fa fa-toggle-off" aria-hidden="true"></i> Light Off'
    );
  });

  var resize = false;
  $(".theater-mode-btn").click(function () {
    // Check if the device is mobile, if yes, display a message and return
    if (isMobileDevice()) {
      alert("This feature is not available on mobile devices.");
      return;
    }

    // Your existing code for toggling resize
    $(".col-md-9").removeClass("col-md-9").addClass("col-md-12");
    $(".col-lg-9").removeClass("col-lg-9").addClass("col-lg-12");
    $(".col-xl-9").removeClass("col-xl-9").addClass("col-xl-12");
    $(".col-xl-3").css("display", "none");
    $(".container").css({ width: "80%" });
    if (!resize) {
      resize = true;
    } else {
      resize = false;
      $(".col-md-12").removeClass("col-md-12").addClass("col-md-9");
      $(".col-lg-12").removeClass("col-lg-12").addClass("col-lg-9");
      $(".col-xl-12").removeClass("col-xl-12").addClass("col-xl-9");
      $(".col-xl-3").css("display", "block");
      $(".container").css({ width: "100%" });
    }
    $(this).html(
      resize
        ? '<i class="fa fa-toggle-on" aria-hidden="true"></i> Default view'
        : '<i class="fa fa-toggle-off" aria-hidden="true"></i> Theater mode'
    );
  });
});

function openPopup(videoUrl, posterUrl, serverName) {
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

    // Update popup title
    var popupTitle = document.querySelector("#popup-content h1");
    if (popupTitle) {
      popupTitle.textContent = "Watch Official Trailer (" + serverName + ")";
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



// /////////////////////////////////////          playlist_scrol.json - no movie schema but with bookmark
fetch("/movies.json")
  .then((response) => response.json())
  .then((data) => {
    const playlistScrol = document.querySelector(".playlist_scrol");

    data.forEach((movie) => {
      // Create list item for the playlist
      const listItem = document.createElement("li");
      listItem.className = "palylist-video";
      listItem.style.marginRight = "5px";
       // Create link for the playlist item
      const link = document.createElement("a");
      link.className = "w-img";
      const urlParts = movie["movie.watch"];
      link.href = `/${urlParts}`;

      // // Create image element
      // const img = document.createElement("img");
      // img.src = `/wp-content/uploads/2023/06/${movie.poster}`;
      // img.src = `${movie.poster}`;
      // img.style.borderRadius = "10%";
      // img.style.marginTop = "5px";
      // img.style.border = "2px solid #40D7BC";
      // img.alt = movie.title;
      // Create image element
const img = document.createElement("img");

// Attempt to set the first source
img.src = `/wp-content/uploads/2023/06/${movie.poster}`;

// Create a temporary image to check if the first source is valid
const tempImg = new Image();
tempImg.src = img.src;
tempImg.onload = () => {
    // If the first image loads successfully, do nothing
    img.style.borderRadius = "10%";
    img.style.marginTop = "5px";
    img.style.border = "2px solid #40D7BC";
    img.alt = movie.title;
    // Append the image to the DOM or wherever needed
}  
tempImg.onerror = () => {
    // If the first image fails, fallback to the second source
    img.src = `${movie.poster}`;
    img.style.borderRadius = "10%";
    img.style.marginTop = "5px";
    img.style.border = "2px solid #40D7BC";
    img.alt = movie.title///////////////;
    // Append the image to the DOM or wherever needed
}


      // Append image to the link
      link.appendChild(img);
      // Append link to the list item
      listItem.appendChild(link);

      // Append the list item to the playlist
      playlistScrol.appendChild(listItem);

      // Create list item for the post
      const postItem = document.createElement("li");
      postItem.className = "post-item";

      // Create span element for the post item
      const spanItem = document.createElement("span");
      spanItem.setAttribute("itemscope", "");
      spanItem.setAttribute("itemtype", "http://schema.org/Thing");

      // Create anchor element for the post title
      const aPostTitle = document.createElement("a");
      aPostTitle.className = "post-title";
      aPostTitle.href = `/${urlParts}`;
      aPostTitle.setAttribute("itemprop", "url");
      aPostTitle.setAttribute("rel", "bookmark");
      aPostTitle.setAttribute("title", "");

      // Create span element for the post title text
      const spanPostTitle = document.createElement("span");
      spanPostTitle.setAttribute("itemprop", "name");
      spanPostTitle.textContent = ""; // Leave this empty to not display the movie name

      // Append spanPostTitle to aPostTitle
      aPostTitle.appendChild(spanPostTitle);
      // Append aPostTitle to spanItem
      spanItem.appendChild(aPostTitle);
      // Append spanItem to postItem
      postItem.appendChild(spanItem);
      // Append postItem to the playlist
      playlistScrol.appendChild(postItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });


// Display movies from both JSON files
displayMovies("/movies.json", ".playlist_scrol");
displayMovies("/playlist_scrol.json", ".playlist_scrol");

// Fetch data from movies.json and populate schema data
fetch("/movies.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((movieData, index) => {
      const movieLink = document.querySelector(
        `.post-title[itemprop='url']:nth-child(${index + 1})`
      );
      const movieName = document.querySelector(
        `[itemprop='name']:nth-child(${index + 1})`
      );

      movieLink.href = movieData.url; // Replace with the actual URL property from movieData
      movieLink.title = movieData.title; // Replace with the actual title property from movieData
      movieName.textContent = movieData.name; // Replace with the actual name property from movieData
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });


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


function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

// Call the loadCSS function with the CSS file URL
loadCSS("/my.css");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Load CSS when the element is in the viewport
      loadCSS(entry.target.dataset.src);
      observer.unobserve(entry.target);
    }
  });
});

// Add data-src attribute to elements that should lazy load CSS
document.querySelectorAll("[data-src]").forEach((el) => {
  observer.observe(el);
});

// File: google_translate.js
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
    },
    "google_translate_element"
  );
}

  // // Handle orientation change event
  // window.addEventListener("orientationchange", function () {
  //   adjustPopupSize();
  // });

  // function adjustPopupSize() {
  //   var popupIframe = document.getElementById("popup-iframe");
  //   var popupContent = document.getElementById("popup-content");
  //   var popup = document.getElementById("popup");

  //   // Check if the device is in landscape mode
  //   var isLandscape = window.orientation === 90 || window.orientation === -90;

  //   if (isLandscape) {
  //     // Set popup and iframe height to 100% of the viewport height in landscape mode
  //     popupContent.style.height = "100vh";
  //     popupIframe.style.height = "100vh";
  //     popup.style.height = "100vh";
  //   } else {
  //     // Reset popup and iframe height to auto in portrait mode
  //     popupContent.style.height = "auto";
  //     popupIframe.style.height = "auto";
  //     popup.style.height = "auto";
  //   }
  // }

  // // Call adjustPopupSize initially to set correct size on page load
  // adjustPopupSize();
