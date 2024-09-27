
const audioIframe = document.getElementById('audioIframe');
const predefinedEqualizationValue = 70;
const predefinedNoiseReductionValue = 40;
const audioSourceQuality = "high";

function autoAdjustSoundEnhancements() {
    const iframeWindow = audioIframe.contentWindow;

    if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage({
            command: 'autoAdjustSoundEnhancements',
            equalizationValue: predefinedEqualizationValue,
            noiseReductionValue: predefinedNoiseReductionValue,
            audioSourceQuality: audioSourceQuality
        }, '*');
    }
}

audioIframe.addEventListener('load', () => {
    autoAdjustSoundEnhancements();

    const iframeAudioElement = audioIframe.contentDocument.getElementById('audioPlayer');

    const iframeAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sourceNode = iframeAudioContext.createMediaElementSource(iframeAudioElement);

    // Load and apply the impulse response (Mills Greek Theater)
    fetch('../wp-content/themes/website/assets/274600-Future-Wave-Rise-01.wav') // Update with the actual file path
        .then(response => response.arrayBuffer())
        .then(buffer => iframeAudioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
            const convolverNode = iframeAudioContext.createConvolver();
            convolverNode.buffer = audioBuffer;
            sourceNode.connect(convolverNode);
            convolverNode.connect(iframeAudioContext.destination);
        })
        .catch(error => console.error('Error loading impulse response:', error));
});

