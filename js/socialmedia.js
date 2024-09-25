// // shareSocialMedia.json
// function shareSocialMedia(platform) {
//     const parentURL = window.location.href;
  
//     switch (platform) {
//       case "facebook":
//         window.open(
//           `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//             parentURL
//           )}`
//         );
//         break;
//       case "twitter":
//         window.open(
//           `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//             parentURL
//           )}&text=Check%20out%20this%20awesome%20online%20HDmovie%20content!`
//         );
//         break;
//       case "linkedin":
//         window.open(
//           `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
//             parentURL
//           )}`
//         );
//         break;
//       case "whatsapp":
//         window.open(
//           `whatsapp://send?text=Check%20out%20this%20awesome%20movie%20content!%20${encodeURIComponent(
//             parentURL
//           )}`
//         );
//         break;
//       case "email":
//         window.location.href = `mailto:?subject=Check%20out%20this%20awesome%20movie%20content!&body=Check%20out%20this%20awesome%20content!%20${encodeURIComponent(
//           parentURL
//         )}`;
//         break;
//       default:
//         console.log("Unsupported platform.");
//     }
//   }



  // shareSocialMedia.js
  function shareSocialMedia(platform) {
    const parentURL = window.location.href;

    // Fetch movie title from <title> tag
    const movieTitle = document.title;

    // Fetch movie image from <meta> tag
    const metaTags = document.head.getElementsByTagName('meta');
    let movieImage;
    let movieURL;
    for (const tag of metaTags) {
      if (tag.getAttribute('property') === 'og:image') {
        movieImage = tag.getAttribute('content');
      } else if (tag.getAttribute('property') === 'og:url') {
        movieURL = tag.getAttribute('content');
      }
    }

    // If og:url is not present, fallback to the current URL
    movieURL = movieURL || parentURL;

    if (movieTitle && movieImage) {
      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              movieURL
            )}&quote=${encodeURIComponent(movieTitle)}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              movieURL
            )}&text=Check%20out%20this%20awesome%20HD%20movie%20${encodeURIComponent(
              movieTitle
            )}`
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
              movieURL
            )}&title=${encodeURIComponent(movieTitle)}`
          );
          break;
        case "whatsapp":
          window.open(
            `whatsapp://send?text=Check%20out%20this%20awesome%20movie%20${encodeURIComponent(
              movieTitle
            )}!%20${encodeURIComponent(movieURL)}`
          );
          break;
        case "email":
          window.location.href = `mailto:?subject=Check%20out%20${encodeURIComponent(
            movieTitle
          )}!&body=Check%20out%20this%20awesome%20movie%20${encodeURIComponent(
            movieTitle
          )}!%20${encodeURIComponent(movieURL)}`;
          break;
        default:
          console.log("Unsupported platform.");
      }
    } else {
      console.error('Movie title or image not found in the HTML.');
    }
  }

