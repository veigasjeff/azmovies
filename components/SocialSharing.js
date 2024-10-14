// // components/SocialSharing.js
// import React from 'react';
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   LinkedinShareButton,
//   LinkedinIcon,
//   EmailShareButton,
//   EmailIcon,
// } from 'react-share';
// import styles from '../styles/SocialSharing.module.css';

// const SocialSharing = () => {
//   const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

//   return (
//     <div className={styles.socialContainer}>
//       <FacebookShareButton url={currentUrl} className={styles.shareButton}>
//         <FacebookIcon size={40} round />
//       </FacebookShareButton>
//       <WhatsappShareButton url={currentUrl} className={styles.shareButton}>
//         <WhatsappIcon size={40} round />
//       </WhatsappShareButton>
//       <TwitterShareButton url={currentUrl} className={styles.shareButton}>
//         <TwitterIcon size={40} round />
//       </TwitterShareButton>
//       <LinkedinShareButton url={currentUrl} className={styles.shareButton}>
//         <LinkedinIcon size={40} round />
//       </LinkedinShareButton>
//       <EmailShareButton url={currentUrl} className={styles.shareButton}>
//         <EmailIcon size={40} round />
//       </EmailShareButton>
//     </div>
//   );
// };

// export default SocialSharing;



















































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
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import styles from '../styles/SocialSharing.module.css';

const SocialSharing = ({ title, description, image }) => {
  // Get the current URL; ensures it's available in the browser context
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={styles.socialContainer}>
      <FacebookShareButton url={currentUrl} quote={description || title} className={styles.shareButton}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <WhatsappShareButton url={currentUrl} title={description || title} className={styles.shareButton}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <TwitterShareButton url={currentUrl} title={description || title} className={styles.shareButton}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl} title={description || title} className={styles.shareButton}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <TelegramShareButton url={currentUrl} title={description || title} className={styles.shareButton}>
        <TelegramIcon size={40} round />
      </TelegramShareButton>
      <EmailShareButton url={currentUrl} subject={title} body={description} className={styles.shareButton}>
        <EmailIcon size={40} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialSharing;


// This code should be placed in a component or a useEffect hook in a functional component

// import { useEffect } from 'react';

// const SocialShareButtons = () => {
//   useEffect(() => {
//     const currentUrl = window.location.href; // Get the current page URL
//     const pageTitle = document.title; // Get the current page title

//     // Function to update share link if element exists
//     const updateShareLink = (elementId, url) => {
//       const element = document.getElementById(elementId);
//       if (element) {
//         element.href = url;
//       } else {
//         console.warn(`Element with ID '${elementId}' not found.`);
//       }
//     };

//     // Update social media share links
//     updateShareLink('facebook-share', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`);
//     updateShareLink('whatsapp-share', `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle)}%20${encodeURIComponent(currentUrl)}`);
//     updateShareLink('twitter-share', `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(currentUrl)}`);
//     updateShareLink('linkedin-share', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`);
//     updateShareLink('telegram-share', `https://telegram.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`);
//     updateShareLink('email-share', `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(currentUrl)}`);
//   }, []);

//   return (
//     <div>
//       <a id="facebook-share" href="#" target="_blank" rel="noopener noreferrer">Share on Facebook</a>
//       <a id="whatsapp-share" href="#" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
//       <a id="twitter-share" href="#" target="_blank" rel="noopener noreferrer">Share on Twitter</a>
//       <a id="linkedin-share" href="#" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
//       <a id="telegram-share" href="#" target="_blank" rel="noopener noreferrer">Share on Telegram</a>
//       <a id="email-share" href="#" target="_blank" rel="noopener noreferrer">Share via Email</a>
//     </div>
//   );
// };

// export default SocialShareButtons;
