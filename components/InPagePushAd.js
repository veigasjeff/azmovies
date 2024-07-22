// // components/InPagePushAd.js
// import React, { useState } from 'react';
// import styles from '../styles/InPagePushAd.module.css'; // Import your CSS module

// const InPagePushAd = () => {
//   const [visible, setVisible] = useState(true);

//   const closeAd = () => {
//     setVisible(false);
//   };

//   if (!visible) return null;

//   return (
//     <div className={styles.adContainer}>
//       <div className={styles.adContent}>
//         <p>Your ad content goes here</p>
//         <button className={styles.closeButton} onClick={closeAd}>
//           ×
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InPagePushAd;

// components/InPagePushAd.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/InPagePushAd.module.css';

const InPagePushAd = () => {
  const [visible, setVisible] = useState(true);

  const closeAd = () => {
    setVisible(false);
  };

  useEffect(() => {
    let timer;
    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 10000); // 10 seconds
    }
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.adContainer}>
      <div className={styles.adContent}>
        <p className={styles.adText}>Discover amazing movies streaming now! Bookmark this page for the latest movies and TV shows updates. </p>
        <button className={styles.closeButton} onClick={closeAd}>
          ×
        </button>
      </div>
    </div>
  );
};

export default InPagePushAd;
