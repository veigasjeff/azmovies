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
          <meta name='referrer' content='origin' />
          <meta
            name='robots'
            content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          />
          <meta
            name='keywords'
            content='azmovies, a to z movies, a-z movies, az movies, watch free movies, watch movies online, download movies, watch full movies, watch hd movies, 123movies, gomovies, putlocker, putlockers, soap2day'
          />
          <meta
            name='description'
            content='Stream HD movies and TV series for free on AZMovies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
          />
          <link rel='canonical' href='https://azmovies.vercel.app/' />
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='video.movie' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='AZMovies™ - Explore. Discover. Download. '
          />
          <meta property='og:url' content='https://azmovies.vercel.app/' />
          <meta
            property='og:site_name'
            content='AZMovies™ - Explore. Discover. Download. '
          />
          <meta
            property='og:image'
            content='https://azmovies.vercel.app/og_image.jpg'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:image:type' content='image/jpg' />
          <meta
            name='application-name'
            content='AZMovies™ - Explore. Discover. Download. '
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
            name='twitter:title'
            content='AZMovies™ - Explore. Discover. Download.  HD Movies and TV Series Free'
          />
          <meta
            name='twitter:description'
            content='Stream HD movies and TV series for free on AZMovies™. Explore, stream, and download full-length movies and shows in HD quality without registration.'
          />
          <meta
            name='twitter:image'
            content='https://azmovies.vercel.app/og_image.jpg'
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
            content='dmlp2t3912gbq4occ'
          />
          <meta name='monetag' content='98a412cb5612b9188cd76b9744304b6c' />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
            integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
            crossorigin='anonymous'
            referrerpolicy='no-referrer'
          />
          
        
        </Head>

        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function (w, d, s, id) {
              if (typeof (w.webpushr) !== 'undefined') return;
              w.webpushr = w.webpushr |function () { (w.webpushr.q = w.webpushr.q |[]).push(arguments) };
              var js, fjs = d.getElementsByTagName(s)[0];
              js = d.createElement(s); js.id = id; js.async = 1;
              js.src = "https://cdn.webpushr.com/app.min.js";
              fjs.parentNode.appendChild(js);
            }(window, document, 'script', 'webpushr-jssdk'));

            webpushr('setup', { 'key': 'BF62CgftpZNZBnjQU2fKfnSn0BN4EXiaFhhNG2zzUpl6MudrZ7iOy_J-JxZrV1qLgwbP1Woa6w4HJLaYzzFVneQ' });
          `
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
