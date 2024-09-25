let currentCategory = 'movie'; // Current category
let items = []; // To store fetched data
const itemsPerPage = 6; // Number of items per page
let currentPage = 1; // Track the current page

// Fetch data from movies.json
async function fetchData() {
    try {
        const response = await fetch('/movies.json');
        const data = await response.json();
        items = data; // Store fetched data
        renderData(); // Render data after fetching
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function setTab(category) {
    currentCategory = category; // Set the current category
    currentPage = 1; // Reset to first page
    renderData(); // Render data based on the selected category

    // Update active tab
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.nav-link[data-category="${category}"]`).classList.add('active');
}

function renderData() {
    const dataContainer = document.getElementById('data-container');
    const paginationContainer = document.getElementById('pagination-container');

    dataContainer.innerHTML = ''; // Clear previous items
    paginationContainer.innerHTML = ''; // Clear previous pagination

    // Filter items based on the selected category
    const filteredItems = items.filter(item => item.badge.trim() === `[ ${capitalizeFirstLetter(currentCategory)} ]`);

    // Calculate total pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);

    // Display current items
    for (let i = startIndex; i < endIndex; i++) {
        const item = filteredItems[i];
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" >
            <h4>${item.name}</h4>
            <a href="${item['movie.watch']}">Watch Now</a>
        `;
        dataContainer.appendChild(div);
    }

    // If no items, display a message
    if (filteredItems.length === 0) {
        dataContainer.innerHTML = '<p>No items found.</p>';
    }

    // Render pagination
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'pagination-button';
        pageButton.onclick = () => {
            currentPage = i; // Update current page
            renderData(); // Re-render data for the new page
        };
        paginationContainer.appendChild(pageButton);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); // Fetch data and render on initial load
    setTab('movie'); // Set active tab to movies on load

    // Event listeners for tab navigation
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', () => setTab(tab.getAttribute('data-category')));
    });
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
