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