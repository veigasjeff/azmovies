document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const dropdownList = document.getElementById('dropdownList');

  let movies = []; // Array to hold movie data

  // Fetch data from JSON file
  fetch('https://atozmovies.vercel.app/movies.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok.');
          }
          return response.json();
      })
      .then(data => {
          movies = data; // Store movie data in the array
          console.log('Movies data fetched:', movies); // Log the data to check
      })
      .catch(error => {
          console.error('Error fetching movie data:', error);
      });

  // Function to filter and display search results
  searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      console.log('Search query:', query); // Log the query
      dropdownList.innerHTML = ''; // Clear previous results

      if (query) {
          const filteredMovies = movies.filter(movie => 
              movie.name.toLowerCase().includes(query)
          );
          console.log('Filtered movies:', filteredMovies); // Log filtered results

          filteredMovies.forEach(movie => {
              const listItem = document.createElement('li');
              listItem.className = 'dropdownItem';

              const link = document.createElement('a');
              link.href = movie.siteurl; // Ensure siteurl exists in your JSON
              link.innerHTML = `<img src="${movie.image}" alt="${movie.name}" class="thumbnail" /> ${movie.name}`;

              listItem.appendChild(link);
              dropdownList.appendChild(listItem);
          });

          dropdownList.style.display = filteredMovies.length > 0 ? 'block' : 'none';
      } else {
          dropdownList.style.display = 'none'; // Hide dropdown if query is empty
      }
  });
});