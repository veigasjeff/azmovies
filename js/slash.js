document.addEventListener('DOMContentLoaded', function() {
    var currentUrl = window.location.href;

    // Check if the URL ends with a slash
    if (currentUrl.endsWith('/')) {
        var newUrl = currentUrl.slice(0, -1); // Remove the trailing slash
        
        // Redirect to the new URL without the trailing slash
        if (newUrl !== currentUrl) {
            window.location.href = newUrl;
        }
    }
});