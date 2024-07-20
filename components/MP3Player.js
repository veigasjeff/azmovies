// components/MP3Player.js

import { useEffect, useState } from 'react';

const MP3Player = ({ mp3Url }) => {
    return (
        <div className="audio-player">
            <audio controls controlsList="nodownload">
                <source src={mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <style jsx>{`
                /* Basic styles for responsiveness and sizing */
                .audio-player {
                    max-width: 450px; /* Medium size, adjust as needed */
                    width: 100%;
                    margin: auto;
                    padding: 20px;
                  
                    border-radius: 50px;
                }
                .audio-player audio {
                    width: 100%;
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default MP3Player;
