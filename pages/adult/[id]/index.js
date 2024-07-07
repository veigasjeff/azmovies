import { useRouter } from 'next/router'
import adultData from '../../../public/adult.json'
import latestData from '../../../public/latest.json'
import { useEffect, useState, useRef } from 'react'
import AdultSkipAds from '../../../components/AdultSkipAds'
import Head from 'next/head'
import Image from 'next/image'
import Rating from '../../../components/Rating'
import Pagination from '../../../components/Pagination'
import MP3Player from '../../../components/MP3Player'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'

const adultDetail = ({ adultItem }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  let ogType;

  switch (adultItem.type) {
    case 'movie':
      ogType = 'video.movie';
      break;
    case 'episode':
      ogType = 'video.episode';
      break;
    case 'tv_show':
      ogType = 'video.tv_show';
      break;
    default:
      ogType = 'video.other';
  }
  
  useEffect(() => {
    // Logic to fetch browsers for the current page
  }, [currentPage])

  const [latest, setLatest] = useState(latestData)
  const [playerReady, setPlayerReady] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  const { badgegroup } = adultItem; // Extract badgegroup from adultItem
  const isAdult = badgegroup === ' Adult'; // Check if badgegroup is " Adult"
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoPlayerRef = useRef(null);

  const parseVideoItem = item => {
    if (!item) return { id: '', thumbnail: '' };
    const [id, params] = item.split('?');
    const thumbnail = new URLSearchParams(params).get('thumbnail');
    return { id, thumbnail };
  };

  const movieVideoItem =
    adultItem.videoadultitem && adultItem.videoadultitem.length > 0
      ? parseVideoItem(adultItem.videoadultitem[0])
      : { id: '', thumbnail: '' };

  const movieVideoMoviesItem =
    adultItem.videomoviesitem && adultItem.videomoviesitem.length > 0
      ? parseVideoItem(adultItem.videomoviesitem[0])
      : { id: '', thumbnail: '' };

  const src = `https://short.ink/${movieVideoItem.id || movieVideoMoviesItem.id}?thumbnail=${movieVideoItem.thumbnail || movieVideoMoviesItem.thumbnail}`;
  const thumbnail = movieVideoItem.thumbnail || movieVideoMoviesItem.thumbnail;

  
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
    let timer
    if (showTimer && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [showTimer, seconds])

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AZadult™ - Explore. Discover. Watch.',
      url: 'https://azadult.vercel.app/',
      image: [
        'https://azadult.vercel.app/wp-content/uploads/2023/05/favicon.ico'
      ],
      logo: {
        '@type': 'ImageObject',
        url: 'https://azadult.vercel.app/logo.png',
        width: 280,
        height: 100
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://azadult.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            'https://azadult.vercel.app/search?q={search_term_string}'
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
        name: 'AZadult™.',
        item: 'https://azadult.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'adult',
        item: adultItem.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: adultItem.name,
        item: adultItem.siteurl
      }
    ]
  })

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person', 'Organization'],
        '@id': 'https://gravatar.com/dradult2022/#person',
        name: 'Dr adult'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://azadult.vercel.app/#website',
        url: 'https://azadult.vercel.app/',
        name: 'AZadult™ - Explore. Discover. Watch.',
        publisher: {
          '@id': 'https://gravatar.com/dradult2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${adultItem.siteurl}#webpage`,
        url: adultItem.siteurl,
        name: `Watch ${adultItem.name} | AZadult™.`,
        datePublished: adultItem.datePublished,
        dateModified: adultItem.dateModified,
        isPartOf: {
          '@id': 'https://azadult.vercel.app/#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://azadult.vercel.app/author/adultmagazine./',
        name: 'Dr adult',
        url: 'https://azadult.vercel.app/author/adultmagazine./',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/dradult2022',
          url: 'https://gravatar.com/dradult2022',
          caption: 'Dr adult',
          inLanguage: 'en-US'
        },
        sameAs: ['https://azadult.vercel.app/']
      },
      {
        '@type': 'Article',
        '@id': `${adultItem.siteurl}#article`,
        headline: `Watch ${adultItem.name} | AZadult™.`,
        datePublished: adultItem.datePublished,
        dateModified: adultItem.dateModified,
        articleSection: 'adult',
        author: {
          '@id': 'https://azadult.vercel.app/author/adultItem/'
        },
        publisher: {
          '@id': 'https://gravatar.com/dradult2022/#person'
        },
        description: adultItem.synopsis,
        image: adultItem.image,
        name: `Watch ${adultItem.name} | AZadult™.`,
        isPartOf: {
          '@id': `${adultItem.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${adultItem.siteurl}#webpage`
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${adultItem.siteurl}#blogPost`,
        headline: `Watch ${adultItem.name} | AZadult™.`,
        datePublished: adultItem.datePublished,
        dateModified: adultItem.dateModified,
        articleSection: 'adult',
        author: {
          '@id': 'https://azadult.vercel.app/author/adultmagazine./'
        },
        publisher: {
          '@id': 'https://gravatar.com/dradult2022/#person'
        },
        description: adultItem.synopsis,
        image: adultItem.image,
        name: `Watch ${adultItem.name} | AZadult™.`,
        '@id': `${adultItem.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${adultItem.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${adultItem.siteurl}#webpage`
        }
      }
    ]
  })

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${adultItem.siteurl}#webpage`, // Add a comma here
    name: adultItem.title,
    url: adultItem.siteurl,
    description: adultItem.synopsis,
    image: adultItem.image,
    datePublished: adultItem.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: adultItem.title,
        urlTemplate: adultItem.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: adultItem.country
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AZadult™ - Explore. Discover. Watch.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://azadult.vercel.app/og_image.jpg'
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

  const ldJsonData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${adultItem.siteurl}`,
    name: adultItem.title,
    url: adultItem.siteurl,
    description: adultItem.synopsis,
    image: adultItem.image,
    genre: adultItem.genre,
    datePublished: adultItem.datePublished,
    director: {
      '@type': 'Person',
      name: adultItem.director
    },
    actor: adultItem.starring.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: adultItem.title,
        urlTemplate: adultItem.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: adultItem.country
    },

    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AZadult™ - Explore. Discover. Watch.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://azadult.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  })

  const adultSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: adultItem.title,
    description: adultItem.text,
    uploadDate: adultItem.datePublished,
    thumbnailUrl: adultItem.backimage,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: adultItem.videourl
  })

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title> {adultItem && adultItem.name}</title>
        <link rel='canonical' href={adultItem && adultItem.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta property='og:type' content='video.episode' />
        <meta property='og:type' content='video.tv_show' />
        <meta property='og:type' content='video.other' />
        <meta
          property='og:title'
          content={`${adultItem && adultItem.name} - AZadult™.`}
        />
        <meta
          property='og:description'
          content='Welcome to AZ adult™ – your go-to spot for free online adult! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ adult™!'
        />

        <meta property='og:url' content={`${adultItem && adultItem.url}`} />
        <meta
          name='keywords'
          content={`${adultItem && adultItem.keywords}`}
        />
        <meta property='og:site_name' content='AZadult™' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content={`${adultItem && adultItem.group}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='adult' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`${adultItem && adultItem.backimage}`}
        />
       
        <meta
          property='og:video:url'
          content={`${adultItem && adultItem.siteurl}`}
        />
        <meta
          property='og:video:secure_url'
          content={`${adultItem && adultItem.videourl}`}
        />
        <meta property='og:image:width' content='1280px' />
        <meta property='og:image:height' content='720px' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:label1' content='Est. reading time' />
        <meta name='twitter:data1' content='1 minute' />
        <meta
          property='description'
          content='Welcome to AZ adult™ – your go-to spot for free online adult! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ adult™!'
        />
        <meta
          name='google-site-verification'
          content='BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s'
        />
        <meta
          name='facebook-domain-verification'
          content='zifsy861dlzorbop8eww76tsqlf7t4'
        />
        <meta
          name='dailymotion-domain-verification'
          content='dmv6sg06w9r5eji88'
        />
      </Head>
      <Script src='../../propler/ads.js' defer />
      <Script src='../../propler/ads2.js' defer />
      {isAdult && <AdultSkipAds movie={adultItem} />}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: ldJsonData }}
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
        dangerouslySetInnerHTML={{ __html: adultSchema }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
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
            marginBottom: '12px'
          }}
        >
          {adultItem.name}
        </h1>
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
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../movies/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Movies <span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../tvshow/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Tv Show <span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../adult/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Adult <span className='p'></span>
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
          style={{ marginTop: '15px' }}
        >
          <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
            For Request or Demand Adult Join Telegram
            <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
          </span>
        </a>
        <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='adult'
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
              src={adultItem.channelposter}
              alt={adultItem.title}
              width={300}
              height={300}
              quality={90}
              // objectFit='cover'
              loading='lazy'
              style={{
                width: '400px', // Ensures the image is displayed at this width
                height: '500px', // Ensures the image is displayed at this height
                margin: 'auto',
                marginBottom: '20px',
                borderRadius: '50px',
                boxShadow: '0 0 10px 0 #fff',
                marginTop: '50px',
                filter:
                  'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
              }}
            />

            <div
              style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}
            >
              <div className='flex flex-col items-center justify-center'>
                <h2
                  className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                  }}
                >
                  {adultItem.title}
                </h2>
              </div>

              <p
                className='text-black text-2xl font-semibold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  textShadow: '2px 1px 1px #000000'
                }}
              >
                Genre: {adultItem.genre}
              </p>
              <p
                className='text-black text-2xl font-semibold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  textShadow: '2px 1px 1px #000000'
                }}
              >
                Director: {adultItem.directorname}
              </p>
              <p
                className='text-black text-2xl font-semibold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  textShadow: '2px 1px 1px #000000'
                }}
              >
                Starring: {adultItem.starring}
              </p>
              <p
                className='text-black text-2xl font-semibold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  textShadow: '2px 1px 1px #000000'
                }}
              >
                Origin Country: {adultItem.country}
              </p>
              <p
                className='text-black text-2xl font-semibold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  textShadow: '2px 1px 1px #000000'
                }}
              >
                Language: {adultItem.language}
              </p>

              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={adultItem.directorimg}
                  alt={adultItem.directorname}
                  title={adultItem.directorname}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)',
                    boxShadow: '0 0 10px 0 #C0C0C0' // Shadow effect with black color
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adultItem.actor1img}
                  alt={adultItem.actor1}
                  title={adultItem.actor1}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adultItem.actor2img}
                  alt={adultItem.actor2}
                  title={adultItem.actor2}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adultItem.actor3img}
                  alt={adultItem.actor3}
                  title={adultItem.actor3}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adultItem.actor4img}
                  alt={adultItem.actor4}
                  title={adultItem.actor4}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adultItem.actor5img}
                  alt={adultItem.actor5}
                  title={adultItem.actor5}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.2) hue-rotate(5deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
              </div>

              <Rating />

                <p
        className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Watch Online Adult & TV Series.
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
        {isAdult && (
          <>
            {/* {thumbnail && (
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                width="560"
                height="315"
              />
            )} */}
          <iframe
                  frameBorder='0'
                  src={src}
                  width='100%'
                  height='450px'
                  allowFullScreen
                  scrolling='0'
                  title='Video Player'
                  style={{
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                  }}
                ></iframe>
          </>
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt='Video Thumbnail'
            style={{
              position: 'absolute',
              top: '2px',
              left: '10px',
              width: '100px',
              height: '56px',
              borderRadius: '10px'
            }}
          />
        )}
             
              </div>

              <div className='flex flex-col items-center justify-center'></div>
              {adultItem.mp3player && (
                <MP3Player mp3Url={adultItem.mp3player} />
              )}

              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='adult'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              /> */}
              <div
                className='flex flex-col items-center justify-center'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              >
                {!showTimer ? (
                  <button
                    onClick={() => setShowTimer(true)}
                    className='animate-pulse bg-gradient-to-r from-amber-500 to-pink-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  >
                    Download Now
                  </button>
                ) : (
                  <>
                    <p className='text-3xl font-bold mb-4'>
                      Your download link will be ready in {seconds} seconds...
                    </p>

                    <Script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></Script>
                    <lottie-player
                      src='https://lottie.host/58d9c7ed-a39e-4cb6-b78a-e7cb1f9bf9cd/RHWR24wQSd.json'
                      background='#D3D3D3'
                      speed='1'
                      style={{ width: '250px' }}
                      loop
                      autoplay
                      direction='1'
                      mode='normal'
                    ></lottie-player>
                    <p
                      className='text-3xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-pink-500 text-black py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                      style={{
                        marginTop: '20px'
                      }}
                    >
                      Official Trailer.
                    </p>

                    <div
                      style={{
                        width: '100%',
                        height: '450px',
                        overflow: 'hidden',
                        marginBottom: '20px'
                      }}
                      className='rounded-xl flex border-1 border-blue-600 bg-gray-600 p-2  items-center justify-center'
                    >
                      <div
                        itemscope
                        itemtype='https://schema.org/VideoObject'
                        style={{ display: 'none' }}
                      >
                        <meta itemprop='name' content={adultItem.title} />
                        <meta
                          itemprop='description'
                          content={adultItem.text}
                        />
                        <meta
                          itemprop='uploadDate'
                          content={adultItem.datePublished}
                        />
                        <meta
                          itemprop='thumbnailUrl'
                          content={adultItem.backimage}
                        />
                        <meta itemprop='duration' content='P34S' />
                        <meta
                          itemprop='embedUrl'
                          content={adultItem.videourl}
                        />
                      </div>
                      <iframe
                        frameborder='0'
                        type='text/html'
                        src={`https://geo.dailymotion.com/player/xkdl0.html?video=${adultItem.traileritem}&mute=true&Autoquality=1080p`}
                        width='100%'
                        height='100%'
                        allowfullscreen
                        title='Dailymotion Video Player'
                        allow='autoplay; encrypted-media'
                      ></iframe>
                    </div>
                    {showTimer && seconds <= 0 && (
                      <div>
                        {Object.keys(adultItem)
                          .filter(key => key.startsWith('downloadlink'))
                          .map((key, index) => (
                            <Link
                              key={index}
                              href={adultItem[key]}
                              target='_blank'
                            >
                              <div
                                className='bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                                style={{
                                  margin: 'auto',
                                  marginBottom: '50px',
                                  borderRadius: '50px',
                                  boxShadow: '0 0 10px 0 #fff',
                                  filter:
                                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                                }}
                              >
                                <span
                                  style={{
                                    color:
                                      key === 'downloadlink1'
                                        ? '#FF0000'
                                        : '#0efa06',
                                    fontSize: '24px',
                                    textShadow: '3px 5px 5px #000'
                                  }}
                                >
                                  <i
                                    className={
                                      key === 'downloadlink1'
                                        ? 'fa fa-magnet'
                                        : 'fa fa-download'
                                    }
                                    aria-hidden='true'
                                  ></i>{' '}
                                </span>
                                Click Here to Download {index + 1}
                              </div>
                            </Link>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                {adultItem.head2 && (
                  <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-bg text-black text-bg mt-2 text-3xl mb-2 items-center justify-center'>
                    <strong>{adultItem.head2}</strong>
                  </p>
                )}
              </div>
              <Image
                src={adultItem.image1}
                alt={adultItem.name}
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
                    'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                }}
              />
              {/* {adultItem.news1.split('\n\n').map((paragraph, idx) => (
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
              ))} */}

              <div className='flex flex-col items-center justify-center'>
                {adultItem.image2 && (
                  <Image
                    src={adultItem.image2}
                    alt={adultItem.name}
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
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image3 && (
                  <Image
                    src={adultItem.image3}
                    alt={adultItem.name}
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
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image4 && (
                  <Image
                    src={adultItem.image4}
                    alt={adultItem.name}
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
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image5 && (
                  <Image
                    src={adultItem.image5}
                    alt={adultItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    // objectFit='cover'
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image6 && (
                  <Image
                    src={adultItem.image6}
                    alt={adultItem.name}
                    width={1280}
                    height={720}
                    quality={90}
                    // objectFit='cover'
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image7 && (
                  <Image
                    src={adultItem.image7}
                    alt={adultItem.name}
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
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}

                {adultItem.image8 && (
                  <Image
                    src={adultItem.image8}
                    alt={adultItem.name}
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
                        'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                    }}
                  />
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='adult'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
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
              LATEST MOVIE NEWS.
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
                          priority
                          width={140} // Specify the desired width
                          height={140} // Specify the desired height
                          quality={90}
                          style={{
                            width: '300px', // Ensures the image is displayed at this width
                            height: '300px', // Ensures the image is displayed at this height
                            filter:
                              'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
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
          @media (max-width: 768px) {
            .text-3xl {
              font-size: 1.5rem;
            }
            .ml-2 {
              margin-left: 0.5rem;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export async function getStaticPaths () {
  const paths = adultData.map(item => ({
    params: { id: item.id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const adultItem = adultData.find(item => item.id === params.id)
  return { props: { adultItem } }
}
export default adultDetail
