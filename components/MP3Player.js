// // // components/MP3Player.js

import { useEffect, useRef, useState } from 'react';

const MP3Player = ({ mp3Urls }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLastTrack, setIsLastTrack] = useState(false); // New state to check if it's the last track
    const audioRef = useRef(null);

    useEffect(() => {
        if (mp3Urls.length === 0) return;

        // Calculate total duration
        const calculateTotalDuration = async () => {
            let total = 0;
            for (const url of mp3Urls) {
                const audio = new Audio(url);
                await new Promise((resolve) => {
                    audio.addEventListener('loadedmetadata', () => {
                        total += audio.duration;
                        resolve();
                    });
                });
            }
            setTotalDuration(total);
        };

        calculateTotalDuration();

        const handleTrackEnd = () => {
            if (currentTrackIndex < mp3Urls.length - 1) {
                // If not the last track, go to the next track
                setCurrentTrackIndex(currentTrackIndex + 1);
            } else {
                // If it's the last track, stop playback
                setIsLastTrack(true);
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            }
        };

        // Update audio source when currentTrackIndex changes
        if (audioRef.current) {
            audioRef.current.src = mp3Urls[currentTrackIndex];
            audioRef.current.play().catch((error) => console.error('Playback error:', error));
            audioRef.current.addEventListener('ended', handleTrackEnd);

            // Update current time
            const updateCurrentTime = () => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime);
                }
            };

            audioRef.current.addEventListener('timeupdate', updateCurrentTime);

            // Cleanup
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('ended', handleTrackEnd);
                    audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
                    audioRef.current.pause();
                    audioRef.current.src = '';
                }
            };
        }
    }, [currentTrackIndex, mp3Urls]);

    // Format time in MM:SS or HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} controls controlsList="nodownload">
                <source src={mp3Urls[currentTrackIndex]} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="duration-info">
                <p>
                    Current Track Duration: {formatTime(audioRef.current ? audioRef.current.duration : 0)} / Total Playlist Duration: {formatTime(totalDuration)}
                </p>
                <p>
                    Current Time: {formatTime(currentTime)}
                </p>
                {isLastTrack && <p>End of Playlist</p>}
            </div>
            <style jsx>{`
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
                .duration-info {
                    margin-top: 10px;
                    text-align: center;
                }
                .duration-info p {
                    margin: 5px 0;
                }
            `}</style>
        </div>
    );
};

export default MP3Player;

// // components/MP3Player.js

// // components/MP3Player.js

// import { useEffect, useRef, useState } from 'react'

// const MP3Player = ({ mp3Urls }) => {
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
//   const [totalDuration, setTotalDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [isLastTrack, setIsLastTrack] = useState(false)
//   const [cumulativeDuration, setCumulativeDuration] = useState(0)
//   const audioRef = useRef(null)

//   useEffect(() => {
//     if (mp3Urls.length === 0) return

//     // Calculate total duration and track durations
//     const calculateDurations = async () => {
//       let total = 0
//       let cumulative = 0
//       const trackDurations = []

//       for (const url of mp3Urls) {
//         const audio = new Audio(url)
//         await new Promise(resolve => {
//           audio.addEventListener('loadedmetadata', () => {
//             const duration = audio.duration
//             trackDurations.push(duration)
//             total += duration
//             if (audioRef.current && audioRef.current.src === url) {
//               cumulative += duration
//             }
//             resolve()
//           })
//         })
//       }
//       setTotalDuration(total)
//       setCumulativeDuration(cumulative)
//       return trackDurations
//     }

//     const updateTrack = async () => {
//       const trackDurations = await calculateDurations()

//       const handleTrackEnd = () => {
//         if (currentTrackIndex < mp3Urls.length - 1) {
//           setCurrentTrackIndex(currentTrackIndex + 1)
//         } else {
//           setIsLastTrack(true)
//           if (audioRef.current) {
//             audioRef.current.pause()
//           }
//         }
//       }

//       // Update audio source when currentTrackIndex changes
//       if (audioRef.current) {
//         audioRef.current.src = mp3Urls[currentTrackIndex]
//         audioRef.current
//           .play()
//           .catch(error => console.error('Playback error:', error))
//         audioRef.current.addEventListener('ended', handleTrackEnd)

//         // Update current time and cumulative duration
//         const updateCurrentTime = () => {
//           if (audioRef.current) {
//             setCurrentTime(audioRef.current.currentTime)
//             const currentTrackDuration = trackDurations[currentTrackIndex]
//             const cumulative = trackDurations
//               .slice(0, currentTrackIndex + 1)
//               .reduce((a, b) => a + b, 0)
//             setCumulativeDuration(cumulative)
//           }
//         }

//         audioRef.current.addEventListener('timeupdate', updateCurrentTime)

//         // Cleanup
//         return () => {
//           if (audioRef.current) {
//             audioRef.current.removeEventListener('ended', handleTrackEnd)
//             audioRef.current.removeEventListener(
//               'timeupdate',
//               updateCurrentTime
//             )
//             audioRef.current.pause()
//             audioRef.current.src = ''
//           }
//         }
//       }
//     }

//     updateTrack()
//   }, [currentTrackIndex, mp3Urls])

//   // Format time in MM:SS or HH:MM:SS
//   const formatTime = seconds => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${hours > 0 ? `${hours}:` : ''}${minutes
//       .toString()
//       .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   return (
//     <div className='audio-player'>
//       <audio ref={audioRef} controls controlsList='nodownload'>
//         <source src={mp3Urls[currentTrackIndex]} type='audio/mpeg' />
//         Your browser does not support the audio element.
//       </audio>
//       <div className='duration-info px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl hover:text-blue-800 font-bold mt-2'>
//         <p>
//           Current Track Duration:{' '}
//           {formatTime(audioRef.current ? audioRef.current.duration : 0)}
//           <br />
//           Cumulative Duration: {formatTime(cumulativeDuration)}
//           <br />
//           Total Playlist Duration: {formatTime(totalDuration)}
//         </p>
//         <p>Current Time: {formatTime(currentTime)}</p>
//         {isLastTrack && <p>End of Playlist</p>}
//       </div>
//       <style jsx>{`
//         .audio-player {
//           max-width: 450px; /* Medium size, adjust as needed */
//           width: 100%;
//           margin: auto;
//           padding: 20px;
//           border-radius: 50px;
//         }
//         .audio-player audio {
//           width: 100%;
//           outline: none;
//         }
//         .duration-info {
//           margin-top: 10px;
//           text-align: center;
//         }
//         .duration-info p {
//           margin: 5px 0;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default MP3Player























// components/MP3Player.js

// import { useEffect, useRef, useState } from 'react';

// const MP3Player = ({ mp3Urls }) => {
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [cumulativeDuration, setCumulativeDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (mp3Urls.length === 0) return;

//     // Calculate total duration and track durations
//     const calculateDurations = async () => {
//       let total = 0;
//       const trackDurations = [];

//       for (const url of mp3Urls) {
//         const audio = new Audio(url);
//         await new Promise(resolve => {
//           audio.addEventListener('loadedmetadata', () => {
//             const duration = audio.duration;
//             trackDurations.push(duration);
//             total += duration;
//             resolve();
//           });
//         });
//       }
//       setTotalDuration(total);
//       return trackDurations;
//     };

//     const updateTrack = async () => {
//       const trackDurations = await calculateDurations();

//       const handleTrackEnd = () => {
//         if (currentTrackIndex < mp3Urls.length - 1) {
//           setCurrentTrackIndex(prevIndex => prevIndex + 1);
//         }
//       };

//       if (audioRef.current) {
//         audioRef.current.src = mp3Urls[currentTrackIndex];
//         audioRef.current.play().catch(error => console.error('Playback error:', error));
//         audioRef.current.addEventListener('ended', handleTrackEnd);

//         // Update current time and cumulative duration
//         const updateCurrentTime = () => {
//           if (audioRef.current) {
//             setCurrentTime(audioRef.current.currentTime);
//             const cumulative = trackDurations
//               .slice(0, currentTrackIndex + 1)
//               .reduce((a, b) => a + b, 0);
//             setCumulativeDuration(cumulative);
//           }
//         };

//         audioRef.current.addEventListener('timeupdate', updateCurrentTime);

//         // Cleanup
//         return () => {
//           if (audioRef.current) {
//             audioRef.current.removeEventListener('ended', handleTrackEnd);
//             audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
//             audioRef.current.pause();
//             audioRef.current.src = '';
//           }
//         };
//       }
//     };

//     updateTrack();
//   }, [currentTrackIndex, mp3Urls]);

//   // Format time in MM:SS or HH:MM:SS
//   const formatTime = seconds => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="audio-player">
//       <audio ref={audioRef} controls controlsList="nodownload">
//         <source src={mp3Urls[currentTrackIndex]} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//       <div className="duration-info px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl hover:text-blue-800 font-bold mt-2">
//         <p>
//           Current Track Duration:{' '}
//           {formatTime(audioRef.current ? audioRef.current.duration : 0)}
//           <br />
//           Cumulative Duration: {formatTime(cumulativeDuration)}
//           <br />
//           Total Playlist Duration: {formatTime(totalDuration)}
//         </p>
//         <p>Current Time: {formatTime(currentTime)}</p>
//       </div>
//       <style jsx>{`
//         .audio-player {
//           max-width: 450px; /* Medium size, adjust as needed */
//           width: 100%;
//           margin: auto;
//           padding: 20px;
//           border-radius: 50px;
//         }
//         .audio-player audio {
//           width: 100%;
//           outline: none;
//         }
//         .duration-info {
//           margin-top: 10px;
//           text-align: center;
//         }
//         .duration-info p {
//           margin: 5px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MP3Player;







// import { useEffect, useRef, useState } from 'react';

// const MP3Player = ({ mp3Urls }) => {
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [cumulativeDuration, setCumulativeDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (mp3Urls.length === 0) return;

//     // Calculate total duration and track durations
//     const calculateDurations = async () => {
//       let total = 0;
//       const trackDurations = [];

//       for (const url of mp3Urls) {
//         const audio = new Audio(url);
//         await new Promise(resolve => {
//           audio.addEventListener('loadedmetadata', () => {
//             const duration = audio.duration;
//             trackDurations.push(duration);
//             total += duration;
//             resolve();
//           });
//         });
//       }
//       setTotalDuration(total);
//       return trackDurations;
//     };

//     const updateTrack = async () => {
//       const trackDurations = await calculateDurations();

//       const handleTrackEnd = () => {
//         if (currentTrackIndex < mp3Urls.length - 1) {
//           setCurrentTrackIndex(prevIndex => prevIndex + 1);
//         }
//       };

//       if (audioRef.current) {
//         audioRef.current.src = mp3Urls[currentTrackIndex];
//         audioRef.current.play().catch(error => console.error('Playback error:', error));
//         audioRef.current.addEventListener('ended', handleTrackEnd);

//         // Update current time and cumulative duration
//         const updateCurrentTime = () => {
//           if (audioRef.current) {
//             setCurrentTime(audioRef.current.currentTime);
//             const cumulative = trackDurations
//               .slice(0, currentTrackIndex + 1)
//               .reduce((a, b) => a + b, 0);
//             setCumulativeDuration(cumulative);
//           }
//         };

//         audioRef.current.addEventListener('timeupdate', updateCurrentTime);

//         // Cleanup
//         return () => {
//           if (audioRef.current) {
//             audioRef.current.removeEventListener('ended', handleTrackEnd);
//             audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
//             audioRef.current.pause();
//             audioRef.current.src = '';
//           }
//         };
//       }
//     };

//     updateTrack();
//   }, [currentTrackIndex, mp3Urls]);

//   // Format time in MM:SS or HH:MM:SS
//   const formatTime = seconds => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="audio-player">
//       <audio ref={audioRef} controls controlsList="nodownload">
//         <source src={mp3Urls[currentTrackIndex]} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//       <div className="duration-info px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl hover:text-blue-800 font-bold mt-2">
//         <p>
//           Current Track Duration:{' '}
//           {formatTime(audioRef.current ? audioRef.current.duration : 0)}
//           <br />
//           Cumulative Duration: {formatTime(cumulativeDuration)}
//           <br />
//           Total Playlist Duration: {formatTime(totalDuration)}
//         </p>
//         <p>Current Time: {formatTime(currentTime)}</p>
//       </div>
//       <style jsx>{`
//         .audio-player {
//           max-width: 450px; /* Medium size, adjust as needed */
//           width: 100%;
//           margin: auto;
//           padding: 20px;
//           border-radius: 50px;
//         }
//         .audio-player audio {
//           width: 100%;
//           outline: none;
//         }
//         .duration-info {
//           margin-top: 10px;
//           text-align: center;
//         }
//         .duration-info p {
//           margin: 5px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MP3Player;









































// import { useEffect, useRef, useState } from 'react';

// const MP3Player = ({ mp3Urls }) => {
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [cumulativeDuration, setCumulativeDuration] = useState(0);
//   const [trackDurations, setTrackDurations] = useState([]);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (mp3Urls.length === 0) return;

//     // Calculate total duration and track durations
//     const calculateDurations = async () => {
//       let total = 0;
//       const durations = [];

//       for (const url of mp3Urls) {
//         const audio = new Audio(url);
//         await new Promise(resolve => {
//           audio.addEventListener('loadedmetadata', () => {
//             const duration = audio.duration;
//             durations.push(duration);
//             total += duration;
//             resolve();
//           });
//         });
//       }
//       setTrackDurations(durations);
//       setTotalDuration(total);
//     };

//     calculateDurations();
//   }, [mp3Urls]);

//   useEffect(() => {
//     const handleTrackEnd = () => {
//       if (currentTrackIndex < mp3Urls.length - 1) {
//         setCurrentTrackIndex(prevIndex => prevIndex + 1);
//       }
//     };

//     if (audioRef.current) {
//       audioRef.current.src = mp3Urls[currentTrackIndex];
//       audioRef.current.play().catch(error => console.error('Playback error:', error));
//       audioRef.current.addEventListener('ended', handleTrackEnd);

//       // Update current time and cumulative duration
//       const updateCurrentTime = () => {
//         if (audioRef.current) {
//           setCurrentTime(audioRef.current.currentTime);
//           const cumulative = trackDurations
//             .slice(0, currentTrackIndex + 1)
//             .reduce((a, b) => a + b, 0);
//           setCumulativeDuration(cumulative);
//         }
//       };

//       audioRef.current.addEventListener('timeupdate', updateCurrentTime);

//       // Cleanup
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.removeEventListener('ended', handleTrackEnd);
//           audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
//           audioRef.current.pause();
//           audioRef.current.src = '';
//         }
//       };
//     }
//   }, [currentTrackIndex, mp3Urls, trackDurations]);

//   // Format time in MM:SS or HH:MM:SS
//   const formatTime = seconds => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="audio-player">
//       <audio ref={audioRef} controls controlsList="nodownload">
//         <source src={mp3Urls[currentTrackIndex]} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//       <div className="track-info">
//         <p>Currently Playing: {`Part ${currentTrackIndex + 1}`}</p>
//         {/* <p>Current Track URL: {mp3Urls[currentTrackIndex]}</p> */}
//       </div>
//       <div className="duration-info px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl hover:text-blue-800 font-bold mt-2">
//         <p>
//           Current Track Duration:{' '}
//           {formatTime(audioRef.current ? audioRef.current.duration : 0)}
//           <br />
//           Cumulative Duration: {formatTime(cumulativeDuration)}
//           <br />
//           Total Playlist Duration: {formatTime(totalDuration)}
//         </p>
//         <p>Current Time: {formatTime(currentTime)}</p>
//       </div>
//       <style jsx>{`
//         .audio-player {
//           max-width: 450px; /* Medium size, adjust as needed */
//           width: 100%;
//           margin: auto;
//           padding: 20px;
//           border-radius: 50px;
//         }
//         .audio-player audio {
//           width: 100%;
//           outline: none;
//         }
//         .track-info {
//           margin-top: 10px;
//           text-align: center;
//           font-weight: bold;
//         }
//         .duration-info {
//           margin-top: 10px;
//           text-align: center;
//         }
//         .duration-info p {
//           margin: 5px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MP3Player;



