import { useState, useEffect } from 'react'
import adultData from '../public/adult.json'
import latestData from '../public/latest.json'
import moviesData from '../public/movies.json'
import tvshowData from '../public/tvshow.json'
import trailersData from '../public/trailers.json'
import styles from '../styles/Home.module.css'
import GoogleTranslate from '../components/GoogleTranslate'
import InPagePushAd from '../components/InPagePushAd'
import NativeBannerAd from '../components/NativeBannerAd'
import SocialSharing from '../components/SocialSharing'
import SearchComponent from '../components/SearchComponent'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

// Utility function to get random items
const getRandomItems = (data, count) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const HomePage = () => {
  // const [latest, setLatest] = useState(latestData);

  const [latest, setLatest] = useState([])
  const [adult, setAdult] = useState([])
  const [movies, setMovies] = useState([])
  const [tvShow, setTvShow] = useState([])
  const [trailers, setTrailers] = useState([])

  const fetchData = async () => {
    try {
      const [latestRes, adultRes, moviesRes, tvShowRes, trailersRes] =
        await Promise.all([
          fetch('https://azmovies.vercel.app/latest.json'),
          fetch('https://azmovies.vercel.app/adult.json'),
          fetch('https://azmovies.vercel.app/movies.json'),
          fetch('https://azmovies.vercel.app/tvshow.json'),
          fetch('https://azmovies.vercel.app/trailers.json')
        ])

      const [latestData, adultData, moviesData, tvShowData, trailersData] =
        await Promise.all([
          latestRes.json(),
          adultRes.json(),
          moviesRes.json(),
          tvShowRes.json(),
          trailersRes.json()
        ])

      setLatest(getRandomItems(latestData, 3))
      setAdult(getRandomItems(adultData, 3))
      setMovies(getRandomItems(moviesData, 3))
      setTvShow(getRandomItems(tvShowData, 3))
      setTrailers(getRandomItems(trailersData, 3))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 10000) // 30000 seconds interval , 10000

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  const pageTitle = 'AZMovies™ - Explore. Discover. Download. '

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
        '@id': 'https://azmovies.vercel.app/#website',
        url: 'https://azmovies.vercel.app',
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
        '@id': 'https://azmovies.vercel.app/#webpage',
        url: 'https://azmovies.vercel.app/',
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
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
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
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
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
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
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

  return (
    <div className='w-full' style={{ backgroundColor: '#0e0e0e' }}>
      <div className='container'>
        <Head>
          <title>
          AZMovies™ - Explore. Discover. Download.  HD Movies and TV Series Free
          </title>

          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://azmovies.vercel.app/sitemap.xml'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
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
         
          <meta name="google-site-verification" content="BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s" />
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
        </Head>

        <GoogleTranslate />
        <SocialSharing />

        <div
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
        >
          <h1
            className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              fontSize: '35px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Welcome to AZMovies™
          </h1>
          <p className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl hover:text-blue-800 font-bold mt-2'>
            Explore. Discover. Download. 
          </p>
          <div
            className='shadow-lg flex items-center justify-center'
            role='navigation'
          >
            <ul
              id='menu-header-menu'
              className='menu flex flex-wrap justify-center'  style={{ marginTop: '25px' }}
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
                  <a href='../trailers/' className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'>
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
        </div>

       
        <span className='px-0 bg-clip-text text-sm text-black font-bold mt-2'>
          <SearchComponent />
        </span>

        <div className='container'>
          <div className='flex-container'>
            <div className='category-container'>
              <div className='card-container'>
                {/* Trailer section */}
                {trailers.map(item => (
                  <div key={item.id} className='card'>
                    <a href={`${item.id}`}>
                      <h2
                        className='text-black text-xl bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-amber-600 transition duration-300'
                        style={{
                          marginBottom: '20px',
                          // boxShadow: '0 0 10px 0 #fff',
                          filter:
                                'contrast(1.1) saturate(1.3) brightness(1.2) hue-rotate(0deg)'
                        }}
                      >
                        {item.name}
                      </h2>

                      <div className='relative'>
                        <a href={item['trailers.watch']} id={item.id}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            className='rounded-lg '
                            width={200} // Specify the desired width
                            height={300} // Specify the desired height
                            quality={90}
                            style={{
                              width: '200px', // Ensures the image is displayed at this width
                              height: '300px', // Ensures the image is displayed at this height
                              // boxShadow: '0 0 10px 0 #000',
                              filter:
                                'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                            }}
                          />
                        </a>
                        <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-black text-lg font-semibold mt-2'>
                          {item.text}
                        </h3>
                        <div
                          className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                          style={{
                            boxShadow: '0 0 10px 0 #fff',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        >
                          {item.badge}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <a href='../trailers/'>
                  <h3
                    className=' animate-pulse text-black text-2xl font-bold mt-2text-black hover:px-0 text-bg  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent '
                    style={{
                      marginTop: '15px'
                    }}
                  >
                    Many More Coming Soon...Click Here{' '}
                    <span className='p'></span>
                  </h3>
                </a>
                {/* <InPagePushAd />
                <NativeBannerAd /> */}
                {/* Movies section */}
                {movies.map(item => (
                  <div key={item.id} className='card'>
                    <a href={`${item.id}`}>
                      <h2
                        className='text-black text-xl bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-amber-600 transition duration-300'
                        style={{
                          marginBottom: '20px',
                          // boxShadow: '0 0 10px 0 #fff',
                          filter:
                                'contrast(1.1) saturate(1.3) brightness(1.2) hue-rotate(0deg)'
                        }}
                      >
                        {item.name}
                      </h2>

                      <div className='relative'>
                        <a href={item['movies.watch']} id={item.id}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            className='rounded-lg '
                            width={200} // Specify the desired width
                            height={300} // Specify the desired height
                            quality={90}
                            style={{
                              width: '200px', // Ensures the image is displayed at this width
                              height: '300px', // Ensures the image is displayed at this height
                              // boxShadow: '0 0 10px 0 #fff',
                              filter:
                                'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                            }}
                          />
                        </a>
                        <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-black text-lg font-semibold mt-2'>
                          {item.text}
                        </h3>
                        <div
                          className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                          style={{
                            boxShadow: '0 0 10px 0 #fff',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        >
                          {item.badge}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <a href='../movies/'>
                  <h3
                    className=' animate-pulse text-black text-2xl font-bold mt-2text-black hover:px-0 text-bg  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent '
                    style={{
                      marginTop: '15px'
                    }}
                  >
                    Many More Coming Soon...Click Here{' '}
                    <span className='p'></span>
                  </h3>
                </a>
                {/* TV Series  section */}
                {tvShow.map(item => (
                  <div key={item.id} className='card'>
                    <a href={`${item.id}`}>
                      <h2
                        className='text-black text-xl bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-amber-600 transition duration-300'
                        style={{
                          marginBottom: '20px',
                          // boxShadow: '0 0 10px 0 #fff',
                          filter:
                                'contrast(1.1) saturate(1.3) brightness(1.2) hue-rotate(0deg)'
                        }}
                      >
                        {item.name}
                      </h2>

                      <div className='relative'>
                        <a href={item['tvshow.watch']} id={item.id}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            className='rounded-lg '
                            width={200} // Specify the desired width
                            height={300} // Specify the desired height
                            quality={90}
                            style={{
                              width: '200px', // Ensures the image is displayed at this width
                              height: '300px', // Ensures the image is displayed at this height
                              // boxShadow: '0 0 10px 0 #000',
                              filter:
                                'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                            }}
                          />
                        </a>
                        <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-black text-lg font-semibold mt-2'>
                          {item.text}
                        </h3>
                        <div
                          className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                          style={{
                            boxShadow: '0 0 10px 0 #fff',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        >
                          {item.badge}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <a href='../tvshow/'>
                  <h3
                    className=' animate-pulse text-black text-2xl font-bold mt-2text-black hover:px-0 text-bg  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent '
                    style={{
                      marginTop: '15px'
                    }}
                  >
                    Many More Coming Soon...Click Here{' '}
                    <span className='p'></span>
                  </h3>
                </a>
                {/* Adult section */}
                {adult.map(item => (
                  <div key={item.id} className='card'>
                    <a href={`${item.id}`}>
                      <h2
                        className='text-black text-xl bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-amber-600 transition duration-300'
                        style={{
                          marginBottom: '20px',
                          // boxShadow: '0 0 10px 0 #fff',
                          filter:
                                'contrast(1.1) saturate(1.3) brightness(1.2) hue-rotate(0deg)'
                        }}
                      >
                        {item.name}
                      </h2>

                      <div className='relative'>
                        <a href={item['adult.watch']} id={item.id}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            className='rounded-lg '
                            width={200} // Specify the desired width
                            height={300} // Specify the desired height
                            quality={90}
                            style={{
                              width: '200px', // Ensures the image is displayed at this width
                              height: '300px', // Ensures the image is displayed at this height
                              boxShadow: '0 0 10px 0 #000',
                              filter:
                                'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                            }}
                          />
                        </a>
                        <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-black text-lg font-semibold mt-2'>
                          {item.text}
                        </h3>
                        <div
                          className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                          style={{
                            boxShadow: '0 0 10px 0 #fff',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        >
                          {item.badge}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <a href='../adult/'>
                  <h3
                    className=' animate-pulse text-black text-2xl font-bold mt-2text-black hover:px-0 text-bg  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent '
                    style={{
                      marginTop: '15px'
                    }}
                  >
                    Many More Coming Soon...Click Here{' '}
                    <span className='p'></span>
                  </h3>
                </a>
              </div>
            </div>
            <div className='sidebar'>
              <h2
                className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold mt-2'
                style={{
                  marginTop: '15px',
                }}
              >
                LATEST ENTERTAINMENT NEWS{' '}
              </h2>
              <div className='categorylatest-container'>
                <div className='cardlatest-container'>
                  {latest.map(latestItem => (
                    <div key={latestItem.id} className='cardlatest'>
                      <a href={`/latest/${latestItem.id}`}>
                        <div className='relative'>
                          <Image
                            src={latestItem.image}
                            alt={latestItem.title}
                            className='rounded-lg mx-auto'
                            width={400} // Specify the desired width
                            height={300} // Specify the desired height
                            quality={90}
                            loading='lazy'
                            style={{
                              marginTop: '50px',
                              width: '1280px', // Ensures the image is displayed at this width
                              height: '350px', // Ensures the image is displayed at this height
                              boxShadow: '0 0 10px 0 #000',
                              filter:
                                'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                            }}
                          />
                          <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-semibold mt-2'>
                            {latestItem.name}
                          </h2>
                          <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                            {latestItem.text}
                          </h3>
                          {/* <div className='badge'>{latestItem.badge}</div> */}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Global styles */
          body {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .section-title {
            color: #000;
            font-weight: bold;
            font-size: 30px;
            text-shadow: 3px 5px 5px #000;
            margin-bottom: 20px;
          }

          .flex-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .category-container {
            flex-grow: 1; /* Take remaining space */
            margin-top: 40px;
            width: calc(50% - 10px); /* Adjust width to leave space between */
          }
          .categorylatest-container {
            flex-grow: 1; /* Take remaining space */
            margin-top: 40px;
            width: calc(100% - 0px); /* Adjust width to leave space between */
          }

          .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .cardlatest-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .card {
            width: 100%; /* Card width will automatically adapt */
            max-width: 100%; /* Limit max width for larger screens */
            // border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
          }
          .cardlatest {
            width: 100%; /* Card width will automatically adapt */
            max-width: 100%; /* Limit max width for larger screens */
            // border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
          }

          .relative {
            position: relative;
          }

          .badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #000;
            padding: 5px;
            border-radius: 5px;
            font-weight: bold;
          }

          .card img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
          }

          .text-center {
            text-align: center;
          }

          // h1 {
          //   // color: #fff;
          //   font-weight: bold;
          //   // text-shadow: 3px 5px 5px #000;
          //   margin-bottom: 10px;
          //   font-size: 30px; /* Corrected property */
          //   line-height: 1; /* Optional: Adjust line height if needed */
          //   height: 30px; /* Set the desired height */
          // }

          .sidebar {
            width: calc(40% - 10px); /* Adjust width to leave space between */
            padding: 20px;
            // border: 1px solid #ccc;
            border-radius: 8px;
            margin-top: 40px;
          }

          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column; /* Stack items vertically on smaller screens */
            }

            .category-container,
            .sidebar {
              width: 100%; /* Make both full width on smaller screens */
            }

            .sidebar {
              margin-top: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default HomePage
