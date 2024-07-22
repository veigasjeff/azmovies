import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://azmovies.vercel.app/sitemap.xml'
          />
          <link
            rel='icon'
            type='image/x-icon'
            href='/favicon.ico'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <meta name='googlebot' content='index,follow' />
          <meta name='revisit-after' content='1 days' />
          <meta
            name='robots'
            content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          />
          <meta
            name='keywords'
          content='AZ Movies, watch free movies, watch movies free online, free download movies, watch free full movies, watch free hd movies, free movies, watch movies free'
          />
            {/* <meta
              name='description'
              content='AZ Movies™ - Explore. Discover. Download'
            /> */}
          {/* <link
            rel='canonical'
            href='https://azmovies.vercel.app/'
          /> */}
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='AZ Movies™ - Explore. Discover. Download'
          />
          <meta
            property='og:description'
            content='AZ Movies™ - Explore. Discover. Download Stream online HD movies with Google Translate for access in any language, worldwide.'
          />
          <meta
            property='og:url'
            content='https://azmovies.vercel.app/'
          />  
          <meta
            property='og:site_name'
            content='AZ Movies™ - Explore. Discover. Download'
          />
          <meta
            property='og:image'
            content='https://azmovies.vercel.app/og_image.jpg'
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property='og:image:type' content='image/webp' />
          <meta
            name='application-name'
            content='AZ Movies™ - Explore. Discover. Download'
          />
          <meta
            property='article:modified_time'
            content='2024-01-01T13:13:13+00:00'
          />
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://azmovies.vercel.app/sitemap.xml'
          />
          <meta name='twitter:card' content='summary_large_image' />
      
          <meta
            name='google-adsense-account'
            content='ca-pub-5527677677744511'
          />
          <meta
            name='google-site-verification'
            content='BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s'
          />
          <meta
            name='facebook-domain-verification'
            content='du918bycikmo1jw78wcl9ih6ziphd7'
          />
          <meta
            name='dailymotion-domain-verification'
            content='dmdzuqt3p027t2adn'
          />
          
        
        </Head>

        <body>
          <Main />
          <NextScript />
          <div id="google_translate_element"></div>
       
        </body>
      </Html>
    )
  }
}

export default MyDocument
