// slider.js
const slider = document.getElementById('slider');
    const movieName = document.getElementById('movieName'); // Element to display movie name
    let slideIndex = 0;
    let timer;
    const slideGap = 5000; // 5 seconds
    let isPaused = false;

    // Define an array to store image objects for preloading
    const imagesToPreload = [];

    function startAutoSlider(movies) {
      // Preload images
      for (const movie of movies) {
        const img = new Image();
        img.src = movie.image;
        imagesToPreload.push(img);
      }

      timer = setInterval(() => {
        if (!isPaused) {
          slideIndex = (slideIndex + 1) % movies.length;
          updateSlider(movies);
        }
      }, slideGap);
    }

    function updateSlider(movies) {
      const currentMovie = movies[slideIndex];
      slider.innerHTML = `<a href="/${currentMovie['movie.watch']}"><img src="${currentMovie.image}" alt="Movie Slide" style="border: 2px solid #40D7BC;"></a>`;

      // Display movie name
      movieName.textContent = currentMovie.name;
    }

    slider.addEventListener('mouseenter', () => {
      isPaused = true; // Pause slider on hover
    });

    slider.addEventListener('mouseleave', () => {
      isPaused = false; // Resume slider on mouse leave
    });

    fetch('/movies.json') // Update the path to your movies.json file
      .then(response => response.json())
      .then(data => {
        const movies = data;
        startAutoSlider(movies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });