import React from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import styles from '../../styles/movies.module.css'
import SearchComponent from '../../components/SearchComponent'
import GoogleTranslate from '../../components/GoogleTranslate'
import SocialSharing from '../../components/SocialSharing'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

const MoviePage = ({ movies }) => {
  const sections = [
    // { title: 'Latest Trailer', items: trailers },
    { title: 'Latest Movies.', items: movies }
    // { title: 'Latest TV Series.', items: tvshows }
    // { title: 'Adult Content.', items: adults }
  ]

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AZMovies™ - Explore. Discover. Download. ',
      url: 'https://azmovies.vercel.app/',
      image: ['https://azmovies.vercel.app/favicon.ico'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://azmovies.vercel.app/logo.png',
        width: 280,
        height: 80
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://azmovies.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://azmovies.vercel.app/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ])

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
        name: 'Dr Trailer',
        url: 'https://azmovies.vercel.app/author/123moviesonline/',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://azmovies.vercel.app/#organization',
        name: 'AZMovies™ - Explore. Discover. Download. ',
        url: 'https://azmovies.vercel.app'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://azmovies.vercel.app/movies/#website',
        url: 'https://azmovies.vercel.app/movies',
        name: 'AZMovies™ - Explore. Discover. Download. ',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://azmovies.vercel.app/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://azmovies.vercel.app/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://azmovies.vercel.app/movies/#webpage',
        url: 'https://azmovies.vercel.app/movies',
        name: 'Movie',
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        about: {
          '@type': 'Person',
          '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
          name: 'Dr Trailer',
          url: 'https://azmovies.vercel.app/author/123moviesonline/',
          image: {
            '@type': 'ImageObject',
            '@id': 'https://gravatar.com/drtrailer2022',
            url: 'https://gravatar.com/drtrailer2022',
            caption: 'Dr Trailer',
            inLanguage: 'en-US'
          }
        },
        isPartOf: {
          '@id': 'https://azmovies.vercel.app/#website'
        },
        inLanguage: 'en-US',
        mainEntity: [
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/movies',
            url: 'https://azmovies.vercel.app/movies',
            headline: 'AZMovies™ - Explore. Discover. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/123moviesonline/',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://azmovies.vercel.app/#organization',
              name: 'AZMovies™ - Explore. Discover. Download. ',
              url: 'https://azmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/movies',
            url: 'https://azmovies.vercel.app/movies',
            headline: 'AZMovies™ - Explore. Discover. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/123moviesonline/',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://azmovies.vercel.app/#organization',
              name: 'AZMovies™ - Explore. Discover. Download. ',
              url: 'https://azmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/movies',
            url: 'https://azmovies.vercel.app/movies',
            headline: 'AZMovies™ - Explore. Discover. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/123moviesonline/',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            }
          }
        ]
      }
    ]
  })

  const languagesSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://azmovies.vercel.app/movies',
    name: 'AZMovies™ - Movies',
    alternateName: [
      'AZMovies™ - Películas',
      'AZMovies™ - Films',
      'AZMovies™ - Filme',
      'AZMovies™ - 电影',
      'AZMovies™ - 映画',
      'AZMovies™ - 영화',
      'AZMovies™ - Filmes',
      'AZMovies™ - Film',
      'AZMovies™ - Фильмы',
      'AZMovies™ - أفلام'
    ],
    inLanguage: [
      'es',
      'fr',
      'de',
      'zh-Hans',
      'ja',
      'ko',
      'pt',
      'it',
      'ru',
      'ar'
    ]
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>AZMovies™ - Explore. Discover. Download.</title>
        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://azmovies.vercel.app/sitemap.xml'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
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
        <link rel='canonical' href='https://azmovies.vercel.app/movies' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='AZMovies™ - Explore. Discover. Download. '
        />
        <meta property='og:url' content='https://azmovies.vercel.app/movies' />
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

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: languagesSchema }}
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>
      {/* <Script
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

            webpushr('setup', { 'key': 'BIHpgrvLvdxGSRA7cHudMTBdr7EWGon3q4reCUGbDcm5uiM2CkypC83diBbYhTMaD8pY_5G0L817DCPB3UqY2CI' });
          `
        }}
      /> */}

      <GoogleTranslate />
      {/* <h1
        className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-xl shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          fontSize: '25px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '15px'
        }}
      >
        AZMovies™ - Movies Section.
      </h1> */}
      {/* <div
        className={`w-full`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          textAlign: 'center',
          backgroundColor: '#0e0e0e'
        }}
      > */}
        <h1
          className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
          style={{
            marginBottom: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            fontSize: '35px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          AZMovies™ - Movies Section.
        </h1>
      {/* </div> */}
      <SearchComponent />
      <SocialSharing />
      {/* <Script src='../../propler/ads.js' defer /> */}
      <Script src='../../propler/ads2.js' defer />
      <div
        className='shadow-lg flex items-center justify-center'
        role='navigation'
      >
        <ul
          id='menu-header-menu'
          className='menu flex flex-wrap justify-center'
          style={{ marginTop: '25px' }}
        >
          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-35' className='menu-home active'>
              <a
                href='/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Home<span className='p'></span>
              </a>
            </li>
          </button>

          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-284913' className='menu-softwarecategories'>
              <a
                href='../trailers/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Trailers<span className='p'></span>
              </a>
            </li>
          </button>
          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-11610' className='menu-graphicdesign'>
              <a
                href='../movies/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Movies<span className='p'></span>
              </a>
            </li>
          </button>
          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-84' className='menu-antivirus'>
              <a
                href='../tvshow/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                TV Series <span className='p'></span>
              </a>
            </li>
          </button>

          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-84' className='menu-antivirus'>
              <a
                href='../adult/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Adult<span className='p'></span>
              </a>
            </li>
          </button>

          <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-194' className='menu-tutorials'>
              <a
                href='../latest/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Latest News<span className='p'></span>
              </a>
            </li>
          </button>
        </ul>
      </div>
      <a
        href='https://t.me/watchmovietvshow/'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold text-2xl mt-2 flex items-center justify-center'
        style={{ marginTop: '25px' }}
      >
        <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
          For Request or Demand Movies & TV Series Join Telegram
          <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
        </span>
      </a>

      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            marginTop: '25px'
          }}
        >
          <div className={styles.movieList}>
            {section.items.length > 0 ? (
              section.items.map(item => (
                <Link key={item.id} href={item.siteurl || '/'} passHref>
                  <div className={styles.movieCard}>
                    <Image
                      src={item.image || '/default-image.jpg'}
                      alt={item.title || 'Default Title'}
                      className={styles.movieImage}
                      width={1280}
                      height={720}
                      quality={90}
                      loading='lazy'
                      layout='responsive'
                      style={{
                        width: '100%',
                        height: '200px',
                        boxShadow: '0 0 10px 0 #000',
                        filter:
                          'contrast(1.1) saturate(1.1) brightness(1.1) hue-rotate(0deg)'
                      }}
                    />
                    <h2 className={styles.movieTitle}>
                      {item.title || 'Default Title'}
                    </h2>
                    <div
                      className={styles.movieDetails}
                      style={{
                        width: '100%',
                        height: '400px'
                      }}
                    >
                      <strong
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '1px 1px 1px #000',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {' '}
                        Genre:{' '}
                      </strong>{' '}
                      <span className={styles.movieDescription}>
                        {item.genre || 'Default Description'}
                      </span>
                      <strong
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '1px 1px 1px #000',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {' '}
                        Country:{' '}
                      </strong>{' '}
                      <span className={styles.movieDescription}>
                        {item.country || 'Default Description'}
                      </span>
                      <strong
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '1px 1px 1px #000',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {' '}
                        Language:{' '}
                      </strong>{' '}
                      <span className={styles.movieDescription}>
                        {item.language || 'Default Description'}
                      </span>
                      <strong
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '1px 1px 1px #000',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {' '}
                        Starring:{' '}
                      </strong>{' '}
                      <span className={styles.movieDescription}>
                        {item.starring || 'Default Description'}
                      </span>
                      <strong
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '1px 1px 1px #000',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {' '}
                        Synopsis:{' '}
                      </strong>{' '}
                      <span className={styles.movieDescription}>
                        {item.news1 || 'Default Description'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No items to display.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps () {
  const readFile = filename => {
    const filePath = path.join(process.cwd(), 'public', filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  }

  const movies = readFile('movies.json')
  // const tvshows = readFile('tvshow.json')
  // const trailers = readFile('trailers.json')
  // const adults = readFile('adult.json')

  return {
    props: {
      movies
      // tvshows
      // trailers,
      // adults
    }
  }
}

export default MoviePage
