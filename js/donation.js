const script = document.createElement('script');
script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
script.async = true;

script.onload = () => {
    if (typeof kofiWidgetOverlay !== 'undefined') {
        kofiWidgetOverlay.draw('payat', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#00b9fe',
            'floating-chat.donateButton.text-color': '#fff'
        });
    }
};

document.body.appendChild(script);