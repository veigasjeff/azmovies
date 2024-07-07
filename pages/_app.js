import '@styles/globals.css';
import Footer from '../components/Footer';
import Hamburger from '../components/Hamburger';
import { PageTransition } from "../components/PageTransition";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";
import Script from 'next/script';

// import 'bootstrap/dist/css/bootstrap.min.css';



function Application({ Component, pageProps }) {
 

  return ( 
  
      
     <div className="center">
     {/* <Script
        src="https://js.wpadmngr.com/static/adManager.js"
        data-admpid="82683"
        strategy="afterInteractive"
      /> */}
   
   {/* <Script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/665943ac981b6c564776a33e/1hv6b0nbo';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
          style={{ marginTop: '20px' }}
        /> */}

      
 <Script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=664f7ed93a56e900196c14e4&product=sticky-share-buttons&source=platform" async="async"></Script>
        <GoogleAnalytics measurementId="G-WW7QEH0KS9" />
        {/* <Script async data-id="101405628" src="//static.getclicky.com/js"></Script> */}
     
        <PageTransition>  
          <Hamburger />
         <Component {...pageProps} />
          <Footer />
        </PageTransition>
     </div>
  
  );
}




export default Application;
