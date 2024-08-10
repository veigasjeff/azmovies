// import '@styles/globals.css';
// import Footer from '../components/Footer';
// import Hamburger from '../components/Hamburger';
// import { PageTransition } from '../components/PageTransition';
// import GoogleAnalytics from '@bradgarropy/next-google-analytics';
// import Script from 'next/script';

// function Application({ Component, pageProps }) {
//   return (
//     <div className='center'>
//       <Script id="webpushr">
//         {`
//           (function(w,d,s,id) {
//             if(typeof(w.webpushr) !== 'undefined') return;
//             w.webpushr = w.webpushr || function() {
//               (w.webpushr.q = w.webpushr.q || []).push(arguments)
//             };
//             var js, fjs = d.getElementsByTagName(s)[0];
//             js = d.createElement(s);
//             js.id = id;
//             js.async = 1;
//             js.src = "https://cdn.webpushr.com/app.min.js";
//             fjs.parentNode.appendChild(js);
//           }(window, document, 'script', 'webpushr-jssdk'));
//           webpushr('setup', {'key': 'BF62CgftpZNZBnjQU2fKfnSn0BN4EXiaFhhNG2zzUpl6MudrZ7iOy_J-JxZrV1qLgwbP1Woa6w4HJLaYzzFVneQ'});
//         `}
//       </Script>
//       <Script
//         type='text/javascript'
//         src='https://platform-api.sharethis.com/js/sharethis.js#property=664f7ed93a56e900196c14e4&product=sticky-share-buttons&source=platform'
//         async
//       ></Script>
//       <GoogleAnalytics measurementId='G-WW7QEH0KS9' />
//       <Script async data-id="101459345" src="/1e79f2d12d364be.js"></Script>
//       <PageTransition>
//         <Hamburger />
//         <Component {...pageProps} />
//         <Footer />
//       </PageTransition>
//     </div>
//   );
// }

// export default Application;

import '@styles/globals.css';
import Footer from '../components/Footer';
import Hamburger from '../components/Hamburger';
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import Script from 'next/script';
import { useEffect } from 'react';

function Application({ Component, pageProps }) {
  useEffect(() => {
    const setupWebpushr = () => {
      if (typeof window.webpushr !== 'undefined') {
        window.webpushr('setup', {
          key: 'BIHpgrvLvdxGSRA7cHudMTBdr7EWGon3q4reCUGbDcm5uiM2CkypC83diBbYhTMaD8pY_5G0L817DCPB3UqY2CI',
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.webpushr.com/app.min.js';
    script.async = true;
    script.onload = setupWebpushr;
    document.body.appendChild(script);
  }, []);

  return (
    <div className='center'>
    
      <GoogleAnalytics measurementId='G-MHJ16WWPSB' />
      {/* <Script async data-id="101459579" src="//static.getclicky.com/js"></Script> */}
      

      <PageTransition>
   
        <Hamburger />
        <Component {...pageProps} />
        <Footer />
      </PageTransition>
    </div>
  );
}

export default Application;
