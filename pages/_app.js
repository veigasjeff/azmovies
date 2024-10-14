import '@styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import ThemeSwitch from '../components/ThemeSwitch';
import { useEffect } from 'react';
import Head from 'next/head';

function Application({ Component, pageProps }) {

  useEffect(() => {
    // Dynamically load the Ko-fi widget script
    const kofiScript = document.createElement('script');
    kofiScript.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    kofiScript.async = true;

    kofiScript.onload = () => {
      console.log("Ko-fi widget loaded.");
      if (typeof kofiWidgetOverlay !== 'undefined') {
        kofiWidgetOverlay.draw('payat', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff'
        });
      }
    };

    document.body.appendChild(kofiScript);

    return () => {
      document.body.removeChild(kofiScript);
    };
  }, []);

  useEffect(() => {
    // Dynamically load the ShareThis script
    const shareThisScript = document.createElement('script');
    shareThisScript.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=670cf6950661ee0019d47caf&product=sticky-share-buttons';
    shareThisScript.async = true;

    shareThisScript.onload = () => {
      console.log('ShareThis script loaded.');
    };

    document.body.appendChild(shareThisScript);

    return () => {
      document.body.removeChild(shareThisScript);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
      </Head>
      
      <div className="center">
        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-E1Z24E5B50" />
        
        <PageTransition>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>
            <ThemeSwitch />
            <Component {...pageProps} />
          </main>

          {/* Footer */}
          <Footer />
        </PageTransition>
      </div>
    </>
  );
}

export default Application;
