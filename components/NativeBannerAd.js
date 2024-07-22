// components/NativeBannerAd.js
import React, { useState } from 'react';
import styles from '../styles/NativeBannerAd.module.css';

const NativeBannerAd = () => {
  const [visible, setVisible] = useState(true);

  const closeAd = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.adOverlay}>
      <div className={styles.adContent}>
        <button className={styles.closeButton} onClick={closeAd}>
          ×
        </button>
        <div className={styles.adInnerContent}>
          <h2>Discover Amazing Movies!</h2>
          <p>Stream the latest movies in HD. Explore our collection and enjoy your favorites now!</p>
          <button className={styles.ctaButton}>Watch Now</button>
        </div>
      </div>
    </div>
  );
};

export default NativeBannerAd;
