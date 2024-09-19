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
            href='https://atozmovies.vercel.app/sitemap.xml'
          />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
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
            content='atozmovies,a to z movies,a-z movies,watch free movies,watch movies online,download movies,watch full movies,watch hd movies'
          />
          <meta
            name='description'
            content='Stream HD movies and TV series for free on AtoZ Movies™. Online. Stream. Download. full-length movies and shows in HD quality without registration.'
          />
          {/* <link
            rel='canonical'
            href='https://atozmovies.vercel.app/'
          /> */}
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='AtoZ Movies™ - Online. Stream. Download.'
          />
          <meta
            property='og:description'
            content='Stream HD movies and TV series for free on AtoZ Movies™. Online. Stream. Download. full-length movies and shows in HD quality without registration.'
          />
          {/* <meta
            property='og:url'
            content='https://atozmovies.vercel.app/'
          />   */}
          <meta
            property='og:site_name'
            content='AtoZ Movies™ - Online. Stream. Download.'
          />
          {/* <meta
            property='og:image'
            content='https://atozmovies.vercel.app/og_image.jpg'
          /> */}
          <meta property='og:image:width' content='1280' />
          <meta property='og:image:height' content='720' />
          <meta property='og:image:type' content='image/webp' />
          <meta
            name='application-name'
            content='AtoZ Movies™ - Online. Stream. Download.'
          />
          <meta
            property='article:modified_time'
            content='2024-01-01T13:13:13+00:00'
          />
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://atozmovies.vercel.app/sitemap.xml'
          />
          <meta name='twitter:card' content='summary_large_image' />

          <meta
            name='google-adsense-account'
            content='ca-pub-5527677677744511'
          />
          <meta
            name='google-site-verification'
            content='BZNZAUYOS1NXYRFA99F4VJ3ABKZUZHKKB0PZ3DU3L8S'
          />
          <meta
            name='facebook-domain-verification'
            content='du918bycikmo1jw78wcl9ih6ziphd7'
          />
          <meta
            name='dailymotion-domain-verification'
            content='dmdzuqt3p027t2adn'
          />
          <meta name='monetag' content='35a75bbdeae678c82776e64fb78cdac5' />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
            integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
            crossOrigin='anonymous'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap'
          />
        </Head>

        <body>
          <Main />
          <NextScript />
          {/* <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W62BF3BQ"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
