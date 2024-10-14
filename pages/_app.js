import '@styles/globals.css';
import Header from '../components/Header'; // Import the header component
import Footer from '../components/Footer'; // Import the footer component
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import ThemeSwitch from '../components/ThemeSwitch';
import Script from 'next/script';
import Head from 'next/head';
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
    <>
    <Head>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </Head>
    <div className="center">
      <GoogleAnalytics measurementId="G-65SVDZN562" />
    
    
      <PageTransition>
        
        <Header />
        <main>
        <ThemeSwitch />
        <Component {...pageProps} />
      </main>

        <Footer />
      </PageTransition>
    </div>
    </>
  );
}

export default Application;
