import { useRouter } from 'next/router'
import trailersData from '../../../public/trailers.json'
import latestData from '../../../public/latest.json'
import { useEffect, useState, useRef } from 'react'
import Pagination from '../../../components/Pagination'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'
export async function getStaticPaths() {
  try {
    const paths = trailersData.map(item => ({
      params: { id: item.id }
    }));

    console.log('Generated paths:', paths); // Logging paths for verification

    return { paths, fallback: false };
  } catch (error) {
    console.error('Error generating static paths:', error.message);
    return { paths: [], fallback: false }; // Return an empty array if there's an error
  }
}

export async function getStaticProps({ params }) {
  try {
    const trailersItem = trailersData.find(item => item.id === params.id);

    if (!trailersItem) {
      throw new Error(`TV Show with id ${params.id} not found`);
    }

    console.log('Fetched TV show item:', trailersItem); // Logging the fetched TV show item for verification

    return { props: { trailersItem } };
  } catch (error) {
    console.error('Error fetching TV show item:', error.message);
    return { props: { trailersItem: null, error: error.message } };
  }
}

const trailersDetail = ({ trailersItem }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const [latest, setLatest] = useState(latestData)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)

  const { badgegroup } = trailersItem // Extract badgegroup from trailersItem

  const isAdult = badgegroup === ' Adult' // Check if badgegroup is " Adult"

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  const videoPlayerRef = useRef(null)

  const isTvShow =
    trailersItem.videotvitem && trailersItem.videotvitem.length > 0
  const handleNext = () => {
    if (isTvShow && currentEpisodeIndex < trailersItem.videotvitem.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    } else if (isTvShow) {
      setCurrentEpisodeIndex(0) // Loop back to the first episode
    }
  }

  const handlePrevious = () => {
    if (isTvShow && currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  const parseVideoItem = item => {
    if (!item) return { id: '', thumbnail: '' }
    const [id, params] = item.split('?')
    const thumbnail = new URLSearchParams(params).get('thumbnail')
    return { id, thumbnail }
  }

  const currentVideoItem =
    isTvShow && trailersItem.videotvitem[currentEpisodeIndex]
      ? parseVideoItem(trailersItem.videotvitem[currentEpisodeIndex])
      : { id: '', thumbnail: '' }

  const movieVideoItem =
    trailersItem.videotrailersitem && trailersItem.videotrailersitem.length > 0
      ? parseVideoItem(trailersItem.videotrailersitem[0])
      : { id: '', thumbnail: '' }

  const src = isTvShow
    ? `https://short.ink/${currentVideoItem.id}/?thumbnail=${currentVideoItem.thumbnail}`
    : `https://short.ink/${movieVideoItem.id}/?thumbnail=${movieVideoItem.thumbnail}`

  useEffect(() => {
    const detectMobileDevice = () => {
      const userAgent =
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent
      const mobile = Boolean(
        userAgent.match(
          /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
      setIsMobileDevice(mobile)
    }

    detectMobileDevice()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0); // Scroll to the top of the page on route change
    };

    // Scroll to top on initial render
    window.scrollTo(0, 0);

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleDownloadClick = () => {
    setShowTimer(true)
    setSeconds(30) // Example timer duration
  }

  useEffect(() => {
    let timer
    if (showTimer && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [showTimer, seconds])

  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const player = document.getElementById('player');
      if (player) {
        const vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
        const vh = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );
        player.style.width = vw + 'px';
        player.style.height = vh + 'px';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof YT === 'undefined') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => setPlayerReady(true);
    } else {
      setPlayerReady(true);
    }
    return () => delete window.onYouTubeIframeAPIReady;
  }, []);

  useEffect(() => {
    if (!playerReady || !trailersItem) return;

    const initializePlayer = () => {
      const videoId = trailersItem.videoId[0];

      new YT.Player('player', {
        width: '100%',
        height: '100%',
      
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          disablekb: 1,
          playsinline: 1,
          enablejsapi: 1,
          modestbranding: 1,
          origin: window.location.origin,
          rel: 0,
          quality: 'hd1080'
        },
        events: {
          onReady: () => setPlayerReady(true)
        }
      });
    };

    initializePlayer();
  }, [playerReady, trailersItem]);

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'A to Z Trailers™',
      url: 'https://azmovies.vercel.app/',
      image: ['https://azmovies.vercel.app/favicon.ico'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://azmovies.vercel.app/logo.png',
        width: 280,
        height: 100
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

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'A to Z Trailers™',
        item: 'https://azmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Movies & Tv Show',
        item: trailersItem.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: trailersItem.name,
        item: trailersItem.siteurl
      }
    ]
  })

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person', 'Organization'],
        '@id': 'https://gravatar.com/drtrailer2022/#person',
        name: 'Dr Trailer'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://azmovies.vercel.app#website',
        url: 'https://azmovies.vercel.app',
        name: 'A to Z Trailers™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${trailersItem.siteurl}#webpage`,
        url: trailersItem.siteurl,
        name: `${trailersItem.name} | A to Z Trailers™`,
        datePublished: trailersItem.datePublished,
        dateModified: trailersItem.dateModified,
        isPartOf: {
          '@id': 'https://azmovies.vercel.app#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://azmovies.vercel.app/author/azmovies/',
        name: 'Dr Trailer',
        url: 'https://azmovies.vercel.app/author/azmovies/',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US'
        },
        sameAs: ['https://azmovies.vercel.app']
      },
      {
        '@type': 'Article',
        '@id': `${trailersItem.siteurl}#article`,
        headline: ` ${trailersItem.name} | A to Z Trailers™`,
        datePublished: trailersItem.datePublished,
        dateModified: trailersItem.dateModified,
        articleSection: 'Movies & Tv Show',
        author: {
          '@id': 'https://azmovies.vercel.app/author/azmovies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailersItem.synopsis,
        image: trailersItem.image,
        name: ` ${trailersItem.name} | A to Z Trailers™`,
        isPartOf: {
          '@id': `${trailersItem.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailersItem.siteurl}#webpage`
        },
        aggregateRating: {
          '@type': 'http://schema.org/AggregateRating',
          '@id': trailersItem.siteurl,
          ratingValue: 8,
          ratingCount: 5,
          bestRating: '10',
          worstRating: '1'
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${trailersItem.siteurl}#blogPost`,
        headline: ` ${trailersItem.name} | A to Z Trailers™`,
        datePublished: trailersItem.datePublished,
        dateModified: trailersItem.dateModified,
        articleSection: 'Movies & Tv Show',
        author: {
          '@id': 'https://azmovies.vercel.app/author/azmovies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailersItem.synopsis,
        image: trailersItem.image,
        name: ` ${trailersItem.name} | A to Z Trailers™`,
        '@id': `${trailersItem.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${trailersItem.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailersItem.siteurl}#webpage`
        },
        aggregateRating: {
          '@type': 'http://schema.org/AggregateRating',
          '@id': trailersItem.siteurl,
          ratingValue: 8,
          ratingCount: 5,
          bestRating: '10',
          worstRating: '1'
        }
      }
    ]
  })

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${trailersItem.siteurl}#webpage`, // Add a comma here
    name: trailersItem.title,
    url: trailersItem.siteurl,
    description: trailersItem.synopsis,
    image: trailersItem.image,
    datePublished: trailersItem.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: trailersItem.title,
        urlTemplate: trailersItem.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: trailersItem.country
    },
    aggregateRating: {
      '@type': 'http://schema.org/AggregateRating',
      '@id': trailersItem.siteurl,
      ratingValue: 8,
      ratingCount: 5,
      bestRating: '10',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'A to Z Trailers™',
      logo: {
        '@type': 'ImageObject',
        url: 'https://azmovies.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  }

  // Convert newsArticleSchema and videoObjects to JSON strings
  const newsArticleJson = JSON.stringify(newsArticleSchema)

  
  const trailersSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: trailersItem.title,
    description: trailersItem.text,
    uploadDate: trailersItem.datePublished,
    thumbnailUrl: trailersItem.backimage,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: trailersItem.videourl
  })

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title>
          {' '}
           {trailersItem && trailersItem.name} | A to Z Trailers™
        </title>
        <link rel='canonical' href={trailersItem && trailersItem.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`${trailersItem && trailersItem.name} - A to Z Trailers`}
        />
        <meta
          property='og:description'
          content='Welcome to A to Z Trailers™ – your go-to spot for free online trailers! Watch and enjoy HD streaming, and catch the latest tvshows. Dive into cinema with A to Z Trailers™!'
        />

        <meta
          property='og:url'
          content={`${trailersItem && trailersItem.siteurl}`}
        />
        <meta
          name='keywords'
          content={`${trailersItem && trailersItem.keywords}`}
        />
        <meta property='og:site_name' content='A to Z Trailers' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content={`${trailersItem && trailersItem.group}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Other Software' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`${trailersItem && trailersItem.backimage}`}
        />

        <meta property='og:image:width' content='1280px' />
        <meta property='og:image:height' content='720px' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:label1' content='Est. reading time' />
        <meta name='twitter:data1' content='1 minute' />
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
          content='dmv6sg06w9r5eji88'
        />

    
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: newsArticleJson }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: trailersSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
        {/* Webpushr tracking code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function (w, d, s, id) {
              if (typeof (w.webpushr) !== 'undefined') return;
              w.webpushr = w.webpushr || function () { (w.webpushr.q = w.webpushr.q || []).push(arguments) };
              var js, fjs = d.getElementsByTagName(s)[0];
              js = d.createElement(s); js.id = id; js.async = 1;
              js.src = "https://cdn.webpushr.com/app.min.js";
              fjs.parentNode.appendChild(js);
            }(window, document, 'script', 'webpushr-jssdk'));

            webpushr('setup', { 'key': 'BF62CgftpZNZBnjQU2fKfnSn0BN4EXiaFhhNG2zzUpl6MudrZ7iOy_J-JxZrV1qLgwbP1Woa6w4HJLaYzzFVneQ' });
          `
          }}
        />
      </Head>
      <Script src='../../propler/ads2.js' defer />
     <Script src='../../propler/ads.js' defer /> 


      <div
        className={`w-full`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          textAlign: 'center',
          backgroundColor: '#D3D3D3'
        }}
      >
        <h1
          className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            // marginBottom: '12px'
          }}
        >
          {trailersItem.title}
        </h1>

        {/* <p
          className='px-0 text-black font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl hover:text-blue-800 mt-2'
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            fontSize: '35px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '15px'
          }}
        >
          Select Categories.{' '}
        </p> */}
      </div>
      <div
        className={`w-full`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          textAlign: 'center',
          backgroundColor: '#D3D3D3'
        }}
      >
        <div
          className='shadow-lg flex items-center justify-center'
          role='navigation'
        >
          <ul
            id='menu-header-menu'
            className='menu flex flex-wrap justify-center'
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
                <a href='../trailers/'>
                  <h3 className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'>
                    Trailers<span className='p'></span>
                  </h3>
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
                  Tv Show<span className='p'></span>
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
          className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mt-2 flex items-center justify-center'
          style={{ marginTop: '25px', marginBottom: '25px' }}
        >
          <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
            For Request or Demand Movies Join Telegram
            <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
          </span>
        </a>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route='trailers'
          style={{
            marginTop: '50px',
            marginBottom: '50px',
            borderRadius: '50px',
            boxShadow: '0 0 10px 0 #fff',
            filter:
              'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
          }}
        />
        <div className='flex-container'>
          <div className='category-container'>
            <Image
              src={trailersItem.channelposter}
              alt={trailersItem.title}
              width={300}
              height={300}
              quality={90}
              
              loading='lazy'
              style={{
                width: '400px', // Ensures the image is displayed at this width
                height: '500px', // Ensures the image is displayed at this height
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '20px',
                borderRadius: '50px',
                boxShadow: '0 0 10px 0 #fff',
                filter:
                  'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
              }}
            />
            <div
              style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}
            >
              {/* <div
                className='flex flex-col items-center justify-center'
                style={{
                  maxWidth: '800px',
                  width: '100%',
                  marginBottom: '20px'
                }}
              >
                <h2
                  className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                  }}
                >
                  {trailersItem.title}
                </h2>
              </div> */}

              <p className='text-black text-bg font-semibold mt-2'>
                Genre: {trailersItem.genre}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Director: {trailersItem.directorname}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Starring: {trailersItem.starring}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Origin Country: {trailersItem.country}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Language: {trailersItem.language}
              </p>

              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={trailersItem.directorimg}
                  alt={trailersItem.directorname}
                  title={trailersItem.directorname}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    filter: 'contrast(1.2) saturate(1.2)',
                    boxShadow: '0 0 10px 0 #C0C0C0' // Shadow effect with black color
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailersItem.actor1img}
                  alt={trailersItem.actor1}
                  title={trailersItem.actor1}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailersItem.actor2img}
                  alt={trailersItem.actor2}
                  title={trailersItem.actor2}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailersItem.actor3img}
                  alt={trailersItem.actor3}
                  title={trailersItem.actor3}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailersItem.actor4img}
                  alt={trailersItem.actor4}
                  title={trailersItem.actor4}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailersItem.actor5img}
                  alt={trailersItem.actor5}
                  title={trailersItem.actor5}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
              </div>
              <p
                // className='text-4xl font-bold mb-4'
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif'
                  // color: '#000',
                  // textShadow: '2px 1px 1px #000000'
                }}
              >
                {trailersItem.title} 
              </p>
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                className='rounded-xl mr-8 flex flex-col border-1 border-blue-600 bg-black p-2'
              >
                {isTvShow && (
                  <button
                    onClick={handleNext}
                    disabled={
                      currentEpisodeIndex ===
                      trailersItem.videotvitem.length - 1
                    }
                    style={{
                      marginBottom: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#51AFF7',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      alignSelf: 'center'
                    }}
                  >
                    Next - Episode{' '}
                    {currentEpisodeIndex === trailersItem.videotvitem.length - 1
                      ? 1
                      : currentEpisodeIndex + 2}
                  </button>
                )}
                <div
                  id='player'
                
                  style={{
                    filter:
                      'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)',
                    // Additional styles for responsiveness
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    borderRadius: '20px' // Add border-radius for rounded shape
                  }}
                ></div>
                <p
                  className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-sm hover:text-blue-800 font-bold mt-2'
                  style={{
                    fontFamily: 'Poppins, sans-serif'
                    // color: '#000',
                    // textShadow: '2px 1px 1px #000000'
                  }}
                >
                  *Note: Use Setting in Player to improve the Quality of video
                  to HD Quality 1080p.
                </p>
                {isTvShow && (
                  <button
                    onClick={handlePrevious}
                    disabled={currentEpisodeIndex === 0}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#32CD32',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      alignSelf: 'center'
                    }}
                  >
                    Prev - Episode{' '}
                    {currentEpisodeIndex === 0
                      ? trailersItem.videotvitem.length
                      : currentEpisodeIndex}
                  </button>
                )}

                {/* <img
                  src={
                    isTvShow
                      ? currentVideoItem.thumbnail
                      : movieVideoItem.thumbnail
                  }
                  alt='Video Thumbnail'
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '10px',
                    width: '100px',
                    height: '56px',
                    borderRadius: '10px'
                  }}
                /> */}
              </div>

              <div className='flex flex-col items-center justify-center'></div>
              {trailersItem.mp3player && (
                <MP3Player mp3Url={trailersItem.mp3player} />
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='trailers'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
                 <div className='flex flex-col items-center justify-center'>
                <p
                  className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '
                  style={{
                    marginTop: '50px',
                    filter:
                      'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                  }}
                >
                  <strong> {trailersItem.head1} </strong>
                </p>
              </div>
              <Image
                src={trailersItem.image1}
                alt={trailersItem.name}
                width={1280}
                height={720}
                quality={90}
                
                loading='lazy'
                style={{
                  width: '800px', // Ensures the image is displayed at this width
                  height: '400px', // Ensures the image is displayed at this height
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              />
              {trailersItem.news1.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className='description text-black font-bold mt-2 text-xl'
                  style={{
                    marginBottom: '10px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {paragraph}
                </p>
              ))}
              <div className='flex flex-col items-center justify-center'>
                {trailersItem.head2 && (
                  <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-bg text-black text-bg mt-2 text-3xl mb-2 items-center justify-center'>
                    <strong>{trailersItem.head2}</strong>
                  </p>
                )}

                {trailersItem.image2 && (
                  <Image
                    src={trailersItem.image2}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image3 && (
                  <Image
                    src={trailersItem.image3}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image4 && (
                  <Image
                    src={trailersItem.image4}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image5 && (
                  <Image
                    src={trailersItem.image5}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image6 && (
                  <Image
                    src={trailersItem.image6}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image7 && (
                  <Image
                    src={trailersItem.image7}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {trailersItem.image8 && (
                  <Image
                    src={trailersItem.image8}
                    alt={trailersItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}
              </div>
              {/* </div>
  </div> */}
            </div>
          </div>
          <div className='sidebar'>
            <p
              className='text-black text-2xl font-bold mt-2'
              style={{
                marginTop: '15px',
                color: '#000',
                font: 'bold',
                textShadow: '1px 2px 2px #000'
              }}
            >
              LATEST ENTERTAINMENT NEWS
            </p>
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
                          width={140} // Specify the desired width
                          height={140} // Specify the desired height
                          quality={90}
                          style={{
                            width: '300px', // Ensures the image is displayed at this width
                            height: '300px', // Ensures the image is displayed at this height
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        />
                        <p className='text-black text-lg font-semibold mt-2'>
                          {latestItem.name}
                        </p>
                        <div className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-sm font-semibold mt-2'>
                          {latestItem.text}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
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
            justify-content: space-between;
          }

          .main-content {
            flex: 3; /* 60% of the width */
          }

          .sidebar {
            flex: 2; /* 40% of the width */
            padding: 10px;
            border-radius: 8px;
            margin-top: 1px;
          }

          .card-container,
          .cardlatest-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .card,
          .cardlatest {
            width: 100%;
            max-width: 100%;
            border: 1px solid #ccc;
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

          h1 {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 30px;
            line-height: 1;
            height: 30px;
          }

          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column;
            }

            .main-content,
            .sidebar {
              width: 100%;
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

// export async function getStaticPaths () {
//   const paths = trailersData.map(item => ({
//     params: { id: item.id }
//   }))

//   return { paths, fallback: false }
// }

// export async function getStaticProps ({ params }) {
//   const trailersItem = trailersData.find(item => item.id === params.id)
//   return { props: { trailersItem } }
// }
export default trailersDetail
