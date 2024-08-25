import '@styles/globals.css';
import Footer from '../components/Footer';
import Hamburger from '../components/Hamburger';
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import Script from 'next/script';
import { useEffect } from 'react';

function Application({ Component, pageProps }) {
 
  return (
    <div className="center">
      <GoogleAnalytics measurementId="G-E1Z24E5B50" />
     {/* <Script src='../../propler/ads.js' defer /> */}
     {/* <Script src='../../propler/ads2.js' defer /> */}
      
      <PageTransition>
        <Hamburger />
        <Component {...pageProps} />
        <Footer />
      </PageTransition>
    </div>
  );
}

export default Application;
