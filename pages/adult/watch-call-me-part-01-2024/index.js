import { useRouter } from 'next/router'
import { FaTelegram } from 'react-icons/fa'
import adultData from '../../../public/adult.json'
import moviesData from '../../../public/movies.json'
import tvshowData from '../../../public/tvshow.json'
import trailersData from '../../../public/trailers.json'
import latestData from '../../../public/latest.json'
import GoogleTranslate from '../../../components/GoogleTranslate'
import { useEffect, useState, useRef } from 'react'
import Pagination from '../../../components/Pagination'
import SocialSharing from '../../../components/SocialSharing'
import AdultSkipAds from '../../../components/AdultSkipAds'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'

// Function to get random links from each dataset
const getRandomLinks = (movies, tvshows, latest, trailers, count = 3) => {
  const shuffleArray = array => array.sort(() => 0.5 - Math.random())

  const getRandomItems = (data, count) => {
    const shuffled = shuffleArray(data)
    return shuffled.slice(0, count)
  }

  return [
    ...getRandomItems(movies, count),
    ...getRandomItems(tvshows, count),
    ...getRandomItems(latest, count),
    ...getRandomItems(trailers, count)
  ]
}

const adultDetail = ({ adult }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const [randomAdult, setRandomAdult] = useState([])
  const [playerReady, setPlayerReady] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [accordionExpanded, setAccordionExpanded] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)
  const { badgegroup } = adult // Extract badgegroup from adult
  const isAdult = badgegroup === ' Adult' // Check if badgegroup is " Adult"
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const videoPlayerRef = useRef(null)

  const [linkTargets, setLinkTargets] = useState([])

  useEffect(() => {
    // Fetch the initial random links
    setLinkTargets(
      getRandomLinks(moviesData, tvshowData, latestData, trailersData)
    )

    // Update the links every 30 seconds
    const interval = setInterval(() => {
      setLinkTargets(
        getRandomLinks(moviesData, tvshowData, latestData, trailersData)
      )
    }, 30000) // 30 seconds in milliseconds

    return () => clearInterval(interval)
  }, [])

  const parseVideoItem = item => {
    if (!item) return { id: '', thumbnail: '' }
    const [id, params] = item.split('?')
    const thumbnail = new URLSearchParams(params).get('thumbnail')
    return { id, thumbnail }
  }

  const movieVideoItem =
    adult.videoadult && adult.videoadult.length > 0
      ? parseVideoItem(adult.videoadult[0])
      : { id: '', thumbnail: '' }

  const movieVideoMoviesItem =
    adult.videomoviesitem && adult.videomoviesitem.length > 0
      ? parseVideoItem(adult.videomoviesitem[0])
      : { id: '', thumbnail: '' }

  const src = `https://short.ink/${
    movieVideoItem.id || movieVideoMoviesItem.id
  }?thumbnail=${movieVideoItem.thumbnail || movieVideoMoviesItem.thumbnail}`
  const thumbnail = movieVideoItem.thumbnail || movieVideoMoviesItem.thumbnail

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
      window.scrollTo(0, 0) // Scroll to the top of the page on route change
    }

    // Scroll to top on initial render
    window.scrollTo(0, 0)

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange)

    // Cleanup event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    let timer
    if (showTimer && accordionExpanded && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0))
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [showTimer, accordionExpanded, seconds])

  const toggleAccordion = () => {
    setAccordionExpanded(prevState => !prevState)
    if (!accordionExpanded) {
      setSeconds(30) // Reset the timer when accordion is expanded
    }
  }

  const handleStartTimer = () => {
    setShowTimer(true)
    setAccordionExpanded(true)
  }

  // Function to fetch data and set state
  const fetchData = async () => {
    try {
      const response = await fetch('https://azmovies.vercel.app/adult.json')
      const data = await response.json()

      // Get 5 random items
      const randomAdultData = getRandomItems(data, 5)
      setRandomAdult(randomAdultData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData() // Initial fetch

    // Set interval to update data every 5 seconds
    const interval = setInterval(fetchData, 10000)

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [])

  // Utility function to get random items from data
  const getRandomItems = (data, count) => {
    const shuffled = shuffleArray([...data]) // Create a copy and shuffle the array
    return shuffled.slice(0, count)
  }

  // Function to shuffle array items randomly
  const shuffleArray = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ' AZMovies™',
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
        name: ' AZMovies™',
        item: 'https://azmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Adult',
        item: adult.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: adult.name,
        item: adult.siteurl
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
        name: ' AZMovies™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${adult.siteurl}#webpage`,
        url: adult.siteurl,
        name: `${adult.name} |  AZMovies™`,
        datePublished: adult.datePublished,
        dateModified: adult.dateModified,
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
        '@id': `${adult.siteurl}#article`,
        headline: ` ${adult.name} |  AZMovies™`,
        datePublished: adult.datePublished,
        dateModified: adult.dateModified,
        articleSection: 'Adult',
        author: {
          '@id': 'https://azmovies.vercel.app/author/azmovies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: adult.synopsis,
        image: adult.image,
        name: ` ${adult.name} |  AZMovies™`,
        isPartOf: {
          '@id': `${adult.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${adult.siteurl}#webpage`
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          '@id': adult.siteurl,
          ratingValue: 8,
          ratingCount: 5,
          bestRating: '10',
          worstRating: '1'
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${adult.siteurl}#blogPost`,
        headline: ` ${adult.name} |  AZMovies™`,
        datePublished: adult.datePublished,
        dateModified: adult.dateModified,
        articleSection: 'Adult',
        author: {
          '@id': 'https://azmovies.vercel.app/author/azmovies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: adult.synopsis,
        image: adult.image,
        name: ` ${adult.name} |  AZMovies™`,
        '@id': `${adult.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${adult.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${adult.siteurl}#webpage`
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          '@id': adult.siteurl,
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
    '@id': `${adult.siteurl}#webpage`, // Add a comma here
    name: adult.title,
    url: adult.siteurl,
    description: adult.synopsis,
    image: adult.image,
    datePublished: adult.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: adult.title,
        urlTemplate: adult.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: adult.country
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': adult.siteurl,
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
      name: ' AZMovies™',
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

  const ldJsonData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${adult.siteurl}`,
    name: adult.title,
    url: adult.siteurl,
    description: adult.synopsis,
    image: adult.image,
    genre: adult.genre,
    datePublished: adult.datePublished,
    director: {
      '@type': 'Person',
      name: adult.director
    },
    actor: adult.starring.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: adult.title,
        urlTemplate: adult.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: adult.country
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': adult.siteurl,
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
      name: ' AZMovies™',
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
  })

  const adultSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: adult.title,
    description: adult.text,
    uploadDate: adult.datePublished,
    thumbnailUrl: adult.image,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: adult.videourl
  })

  const languagesSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://azmovies.vercel.app/adult/watch-pretty-boys-2024',
    name: 'Watch Adult Call Me Part 01 (2024) | 123Movies™',
    alternateName: [
      'Ver Call Me Part 01 Parte (2024) para adultos | 123Movies™',
      'Regarder Call Me Part 01 Partie (2024) pour adultes | 123Movies™',
      'Call Me Part 01 Teil (2024) für Erwachsene ansehen | 123Movies™',
      '观看 Call Me Part 01 (2024) 成人内容 | 123Movies™',
      'Call Me Part 01 パート (2024) 大人向け | 123Movies™',
      'Call Me Part 01 파트 (2024) 성인 전용 | 123Movies™',
      'Assistir Call Me Part 01 Parte (2024) para adultos | 123Movies™',
      'Guarda Call Me Part 01 Parte (2024) per adulti | 123Movies™',
      'Посмотреть Call Me Part 01 Часть (2024) для взрослых | 123Movies™',
      'مشاهدة Call Me Part 01 (2024) للكبار فقط | 123Movies™'
    ],
    inLanguage: [
      'es', 'fr', 'de', 'zh-Hans', 'ja', 'ko', 'pt', 'it', 'ru', 'ar'
    ]
  });

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title> Watch Call Me Part 01 (2024) | 123Movies™</title>
        <link rel='canonical' href={adult && adult.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta property='og:video' content={`${adult && adult.videourl}`} />
        <meta property='og:video:width' content='1280px' />
        <meta property='og:video:height' content='720px' />
        <meta property='og:video:type' content='video/mp4' />
        <meta
          property='og:title'
          content={`${adult && adult.name} -  AZMovies`}
        />
        <meta
          property='og:description'
          content='Stream HD movies and TV series for free on AZMovies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
        />

        <meta property='og:url' content={`${adult && adult.siteurl}`} />
        <meta name='keywords' content={`${adult && adult.keywords}`} />
        <meta property='og:site_name' content=' AZMovies' />
        {/* <meta property='og:type' content='article' /> */}
        <meta property=' og:image:alt' content={`${adult && adult.group}`} />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='adult' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta property='og:image' content={`${adult && adult.image1}`} />

        <meta property='og:image:width' content='1280px' />
        <meta property='og:image:height' content='720px' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
          <meta
            name='twitter:title'
            content='AZMovies™ - Explore. Discover. Online. '
          />
          <meta
            name='twitter:description'
            content='Stream HD movies and TV series for free on AZMovies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
          />
          <meta
            name='twitter:image'
            content={`${adult && adult.image1}`}
          />
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
         <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: languagesSchema }}
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
      
      <SocialSharing />
      <Script src='../../propler/ads2.js' defer />
      {/* <Script src='../../propler/ads.js' defer /> */}
      {isAdult && <AdultSkipAds movie={adult} />}

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
          backgroundColor: '#0e0e0e'
        }}
      >
           <GoogleTranslate />
        <h1
          className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold'
            // marginBottom: '12px'
          }}
        >
          {adult.title}
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
          backgroundColor: '#0e0e0e'
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
          href='https://t.me/watchmovieadult/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mt-2 flex items-center justify-center'
          style={{ marginTop: '25px', marginBottom: '25px' }}
        >
          <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
            For Request or Demand Adult Movies Join Telegram
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
              'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)'
          }}
        />
        <div className='flex-container'>
          <div className='category-container'>
            <Image
              src={adult.image}
              alt={adult.title}
              width={400}
              height={500}
              quality={90}
              loading='lazy'
              style={{
                // width: '400px', // Ensures the image is displayed at this width
                // height: '500px', // Ensures the image is displayed at this height
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
              <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Genre: {adult.genre}
              </h2>
              <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Director: {adult.directorname}
              </h2>
              <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Starring: {adult.starring}
              </h2>
              <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Origin Country: {adult.country}
              </h2>
              <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Language: {adult.language}
              </h2>
            
              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={adult.directorimg}
                  alt={adult.directorname}
                  title={adult.directorname}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adult.actor1img}
                  alt={adult.actor1}
                  title={adult.actor1}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adult.actor2img}
                  alt={adult.actor2}
                  title={adult.actor2}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adult.actor3img}
                  alt={adult.actor3}
                  title={adult.actor3}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adult.actor4img}
                  alt={adult.actor4}
                  title={adult.actor4}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={adult.actor5img}
                  alt={adult.actor5}
                  title={adult.actor5}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
              </div>

              <p
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Watch Online {adult.name}
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
              <h2
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Click to Download Episode {adult.name}
              </h2>
              {/* <div className='flex flex-col items-center justify-center'></div>
              {adult.mp3player && <MP3Player mp3Url={adult.mp3player} />} */}
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
                    onClick={handleStartTimer}
                    className='animate-pulse bg-gradient-to-r from-amber-500 to-pink-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  >
                    Download Now
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleAccordion}
                      className='animate-pulse bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                      style={{
                        // marginTop: '20px',
                        marginBottom: '20px'
                      }}
                    >
                      {accordionExpanded
                        ? 'Click to Stop Download'
                        : 'Download Now'}
                    </button>

                    {accordionExpanded && (
                      <>
                        {/* <Script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></Script>
                        <lottie-player
                          src='https://lottie.host/58d9c7ed-a39e-4cb6-b78a-e7cb1f9bf9cd/RHWR24wQSd.json'
                          background='#D3D3D3'
                          speed='1'
                          style={{ width: '250px' }}
                          loop
                          autoplay
                          direction='1'
                          mode='normal'
                        ></lottie-player> */}
                        {seconds > 0 ? (
                          <p
                            className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold mb-4'
                            style={{ marginTop: '50px' }}
                          >
                            Your download link will be ready in {seconds}{' '}
                            seconds...
                          </p>
                        ) : (
                          <p
                            className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold mb-4'
                            style={{ marginTop: '50px' }}
                          >
                            Your download link is ready.
                          </p>
                        )}

                        <div
                          style={{
                            width: '100%',
                            height: '450px',
                            overflow: 'hidden',
                            marginTop: '20px',
                            marginBottom: '20px'
                          }}
                          className='rounded-xl flex border-1 border-blue-600 bg-black p-2 items-center justify-center'
                        >
                          <div
                            itemscope
                            itemtype='https://schema.org/VideoObject'
                            style={{ display: 'none' }}
                          >
                            <meta itemprop='name' content={adult.title} />
                            <meta itemprop='description' content={adult.text} />
                            <meta
                              itemprop='uploadDate'
                              content={adult.datePublished}
                            />
                            <meta
                              itemprop='thumbnailUrl'
                              content={adult.backimage}
                            />
                            <meta itemprop='duration' content='P34S' />
                            <meta
                              itemprop='embedUrl'
                              content={adult.videourl}
                            />
                          </div>
                          <iframe
                            frameBorder='0'
                            src={`https://geo.dailymotion.com/player/xkdl0.html?video=${adult.traileritem}&mute=true&Autoquality=1080p`}
                            width='100%'
                            height='100%'
                            allowFullScreen
                            title='Dailymotion Video Player'
                            allow='autoplay; encrypted-media'
                          ></iframe>
                        </div>

                        {seconds === 0 && (
                          <div>
                            {Object.keys(adult)
                              .filter(key => key.startsWith('downloadlink'))
                              .map((key, index) => (
                                <Link
                                  key={index}
                                  href={adult[key]}
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
                                        'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)'
                                    }}
                                  >
                                    <span
                                      className='animate-pulse'
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
                                    Download Link {index + 1}
                                  </div>
                                </Link>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </>
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
                    'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)'
                }}
              />
              <div className=' text-2xl font-semibold mt-2 px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent  hover:text-blue-800 '>
                See Below for Other Links to Watch Full Content.
                <div className={`${HomeStyles.imageGrid} mt-5`}>
                  {linkTargets.map((link, idx) => (
                    <div
                      key={idx}
                      className='description text-black text-xl font-semibold mt-2'
                    >
                      <a
                        href={link.siteurl}
                        className='text-blue-500 underline'
                        // target='_blank'
                        // rel='noopener noreferrer'
                      >
                        <img
                          className={`${HomeStyles.image} img-fluid lazyload`}
                          src={link.image}
                          alt={link.name}
                          title={link.name}
                          style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            boxShadow: '0 0 10px 0 #000',
                            filter:
                              'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)'
                          }}
                          loading='lazy'
                        />
                        {link.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p
                  className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '
                  style={{
                    marginTop: '50px',
                    filter:
                      'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)'
                  }}
                >
                  <strong> {adult.head2} </strong>
                </p>
              </div>
              <Image
                src={adult.image1}
                alt={adult.name}
                width={1280}
                height={720}
                quality={90}
                loading='lazy'
                style={{
                  margin: 'auto',
                  marginTop: '50px',
                  marginBottom: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              />
          </div>
          </div>
          <div className='sidebar'>
          <h2
            className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold mt-2'
            style={{
              marginTop: '15px',
            }}
            >
              MOST POPULAR ADULT CONTENT
            </h2>
            <div className='categorylatest-container'>
              <div className='cardlatest-container'>
                {randomAdult.map(item => (
                  <div key={item.id} className='cardlatest'>
                    <a href={item['adult.watch']} id={item.id}>
                      <div className='relative'>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='rounded-lg mx-auto'
                          width={1280}
                          height={720}
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
                          {item.name}
                        </h2>
                        <h3 className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                          {item.text}
                        </h3>
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

export async function getServerSideProps () {
  const res = await fetch('https://azmovies.vercel.app/adult.json')
  const data = await res.json()
  const selectedAdult = data.find(adult => adult.id === 'INDEX15')
  return {
    props: {
      adult: selectedAdult
    }
  }
}
export default adultDetail
