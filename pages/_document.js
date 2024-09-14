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
            <meta
          name='description'
          content='Stream HD movies and TV series for free on AtoZ Movies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
        />
          <link rel='manifest' href='/site.webmanifest' />
          <meta name='googlebot' content='index,follow' />
          <meta name='revisit-after' content='1 days' />
          <meta
            name='robots'
            content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          />
          
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
            integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
            crossOrigin='anonymous'
            
          />
          <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
        
        </Head>

        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument
