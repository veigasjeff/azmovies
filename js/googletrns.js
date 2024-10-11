 // Load the Google Translate script
 function loadGoogleTranslate() {
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}

// Initialize Google Translate
window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
    );
};

// Start loading Google Translate
loadGoogleTranslate();


// Load the Google Translate script only once
// function loadGoogleTranslate() {
//     const existingScript = document.querySelector('script[src*="translate.google.com"]');
//     if (!existingScript) {
//         const script = document.createElement('script');
//         script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//         document.body.appendChild(script);
//     }
// }

// // Initialize Google Translate
// window.googleTranslateElementInit = () => {
//     // Remove existing Google Translate element if it exists
//     const existingTranslateElement = document.getElementById('google_translate_element');
//     if (existingTranslateElement) {
//         existingTranslateElement.innerHTML = ''; // Clear the existing element
//     }

//     // Create a new Google Translate element
//     new window.google.translate.TranslateElement(
//         {
//             pageLanguage: 'en', // Original language of your page
//             includedLanguages: 'en,es,fr,de,it', // Specify the languages you want to include
//             layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Use a simple layout
//             autoDisplay: false // Prevent auto display of the translation toolbar
//         },
//         'google_translate_element'
//     );
// };

// // Start loading Google Translate
// loadGoogleTranslate();