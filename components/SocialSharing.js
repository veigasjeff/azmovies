// components/SocialSharing.js
import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import styles from '../styles/SocialSharing.module.css';

const SocialSharing = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={styles.socialContainer}>
      <FacebookShareButton url={currentUrl} className={styles.shareButton}>
        <FacebookIcon size={36} round />
      </FacebookShareButton>
      <WhatsappShareButton url={currentUrl} className={styles.shareButton}>
        <WhatsappIcon size={36} round />
      </WhatsappShareButton>
      <TwitterShareButton url={currentUrl} className={styles.shareButton}>
        <TwitterIcon size={36} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl} className={styles.shareButton}>
        <LinkedinIcon size={36} round />
      </LinkedinShareButton>
      <EmailShareButton url={currentUrl} className={styles.shareButton}>
        <EmailIcon size={36} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialSharing;
