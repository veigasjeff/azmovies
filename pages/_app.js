import '@styles/globals.css'
import Footer from '../components/Footer'
import Hamburger from '../components/Hamburger'
import { PageTransition } from '../components/PageTransition'
import GoogleAnalytics from '@bradgarropy/next-google-analytics'
import Script from 'next/script'

function Application ({ Component, pageProps }) {
  return (
    <div className='center'>
      <Script
        type='text/javascript'
        src='https://platform-api.sharethis.com/js/sharethis.js#property=664f7ed93a56e900196c14e4&product=sticky-share-buttons&source=platform'
        async='async'
      ></Script>
      <GoogleAnalytics measurementId='G-WW7QEH0KS9' />

      <PageTransition>
        <Hamburger />
        <Component {...pageProps} />
        <Footer />
      </PageTransition>
    </div>
  )
}

export default Application
