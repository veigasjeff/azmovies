// lib/api.js
export async function getAllMovies() {
  // Fetch your movies from the database or an API
  const response = await fetch('https://atozmovies.vercel.app/api/movies'); // Update this URL
  const data = await response.json();
  return data.movies; // Adjust according to your data structure
}

export async function getAllItems() {
  const movies = await getAllMovies(); // Call the movies function
  const tvshows = await getAllTvShows(); // Ensure you have this function defined too
  const adults = await getAllAdults(); // Ensure you have this function defined too

  return { movies, tvshows, adults }; // Return all items
}

// Example function to fetch TV shows
async function getAllTvShows() {
  const response = await fetch('https://atozmovies.vercel.app/api/tvshow');
  const data = await response.json();
  return data.tvshows; // Adjust according to your data structure
}

// Example function to fetch adult content
async function getAllAdults() {
  const response = await fetch('https://atozmovies.vercel.app/api/adult');
  const data = await response.json();
  return data.adults; // Adjust according to your data structure
}
