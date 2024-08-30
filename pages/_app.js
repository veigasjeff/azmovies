import '@styles/globals.css';
import Footer from '../components/Footer';
import Hamburger from '../components/Hamburger';
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import Script from 'next/script';
import { useEffect } from 'react';

function Application({ Component, pageProps }) {
  useEffect(() => {
    // Add the Ko-fi widget script to the page
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

    return () => {
      // Cleanup if the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="center">
      <GoogleAnalytics measurementId="G-E1Z24E5B50" />
     {/* <Script src='../../propler/ads.js' defer />
     <Script src='../../propler/ads2.js' defer /> */}
      
      <PageTransition>
        <Hamburger />
        <Component {...pageProps} />
        <Footer />
      </PageTransition>
    </div>
  );
}

export default Application;
