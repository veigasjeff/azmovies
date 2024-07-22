import { useRouter } from 'next/router'
import trailersData from '../../../public/trailers.json'
import moviesData from '../../../public/movies.json'
import tvshowData from '../../../public/tvshow.json'
import adultData from '../../../public/adult.json'
import latestData from '../../../public/latest.json'
import GoogleTranslate from '../../../components/GoogleTranslate'
import SocialSharing from '../../../components/SocialSharing';;
import { useEffect, useState, useRef } from 'react'
import Pagination from '../../../components/Pagination'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'

// Function to get random links from each dataset
const getRandomLinks = (movies, tvshows, adults, trailers, count = 3) => {
  const shuffleArray = array => array.sort(() => 0.5 - Math.random())

  const getRandomItems = (data, count) => {
    const shuffled = shuffleArray(data)
    return shuffled.slice(0, count)
  }

  return [
    ...getRandomItems(movies, count),
    ...getRandomItems(tvshows, count),
    ...getRandomItems(adults, count)
    // ...getRandomItems(trailers, count)
  ]
}

const trailersDetail = ({ trailers }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const [randomTrailers, setRandomTrailers] = useState([])

  const [linkTargets, setLinkTargets] = useState([])

  useEffect(() => {
    // Fetch the initial random links
    setLinkTargets(getRandomLinks(moviesData, tvshowData, adultData))

    // Update the links every 30 seconds
    const interval = setInterval(() => {
      setLinkTargets(getRandomLinks(moviesData, tvshowData, adultData))
    }, 30000) // 30 seconds in milliseconds

    return () => clearInterval(interval)
  }, [])

  // Function to fetch data and set state
  const fetchData = async () => {
    try {
      const response = await fetch('https://azmovies.vercel.app/trailers.json')
      const data = await response.json()

      // Get 5 random trailers
      const randomTrailersData = getRandomItems(data, 6)
      setRandomTrailers(randomTrailersData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData() // Initial fetch

    // Set interval to update trailers every 5 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 10000);

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

  const enhancedParagraph = text => {
    const linkTargets = [
      {
        text: 'Stree 2 Official Trailer - 2024',
        url: 'https://www.imdb.com/title/tt27510174/'
      }
    ]

    linkTargets.forEach(linkTarget => {
      const regex = new RegExp(`(${linkTarget.text})`, 'g')
      text = text.replace(
        regex,
        `<a href="${linkTarget.url}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${linkTarget.text}</a>`
      )
    })

    return text
  }

  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)

  const { badgegroup } = trailers // Extract badgegroup from trailers

  const isAdult = badgegroup === ' Adult' // Check if badgegroup is " Adult"

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  const videoPlayerRef = useRef(null)

  const isTvShow = trailers.videotvitem && trailers.videotvitem.length > 0
  const handleNext = () => {
    if (isTvShow && currentEpisodeIndex < trailers.videotvitem.length - 1) {
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
    isTvShow && trailers.videotvitem[currentEpisodeIndex]
      ? parseVideoItem(trailers.videotvitem[currentEpisodeIndex])
      : { id: '', thumbnail: '' }

  const movieVideoItem =
    trailers.videotrailers && trailers.videotrailers.length > 0
      ? parseVideoItem(trailers.videotrailers[0])
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

  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const player = document.getElementById('player')
      if (player) {
        const vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
        const vh = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        )
        player.style.width = vw + 'px'
        player.style.height = vh + 'px'
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof YT === 'undefined') {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => setPlayerReady(true)
    } else {
      setPlayerReady(true)
    }
    return () => delete window.onYouTubeIframeAPIReady
  }, [])

  useEffect(() => {
    if (!playerReady || !trailers) return

    const initializePlayer = () => {
      const videoId = trailers.videoId[0]

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
      })
    }

    initializePlayer()
  }, [playerReady, trailers])

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AZ Movies™',
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
        name: 'AZ Movies™',
        item: 'https://azmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Trailer',
        item: trailers.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: trailers.name,
        item: trailers.siteurl
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
        name: 'AZ Movies™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${trailers.siteurl}#webpage`,
        url: trailers.siteurl,
        name: `${trailers.name} | AZ Movies™`,
        datePublished: trailers.datePublished,
        dateModified: trailers.dateModified,
        isPartOf: {
          '@id': 'https://azmovies.vercel.app#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://azmovies.vercel.app/author/AZ Movies/',
        name: 'Dr Trailer',
        url: 'https://azmovies.vercel.app/author/AZ Movies/',
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
        '@id': `${trailers.siteurl}#article`,
        headline: ` ${trailers.name} | AZ Movies™`,
        datePublished: trailers.datePublished,
        dateModified: trailers.dateModified,
        articleSection: 'Movies & Tv Show',
        author: {
          '@id': 'https://azmovies.vercel.app/author/AZ Movies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailers.synopsis,
        image: trailers.image,
        name: ` ${trailers.name} | AZ Movies™`,
        isPartOf: {
          '@id': `${trailers.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailers.siteurl}#webpage`
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${trailers.siteurl}#blogPost`,
        headline: ` ${trailers.name} | AZ Movies™`,
        datePublished: trailers.datePublished,
        dateModified: trailers.dateModified,
        articleSection: 'Movies & Tv Show',
        author: {
          '@id': 'https://azmovies.vercel.app/author/AZ Movies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailers.synopsis,
        image: trailers.image,
        name: ` ${trailers.name} | AZ Movies™`,
        '@id': `${trailers.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${trailers.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailers.siteurl}#webpage`
        }
      }
    ]
  })

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${trailers.siteurl}#webpage`, // Add a comma here
    name: trailers.title,
    url: trailers.siteurl,
    description: trailers.synopsis,
    image: trailers.image,
    datePublished: trailers.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: trailers.title,
        urlTemplate: trailers.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: trailers.country
    },

    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AZ Movies™',
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
    name: trailers.title,
    description: trailers.text,
    uploadDate: trailers.datePublished,
    thumbnailUrl: trailers.image,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: trailers.videourl
  })

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title>Watch Stree 2 Official Trailer | AZ Movies™</title>
        <link rel='canonical' href={trailers && trailers.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta
          property='og:video'
          content={`${trailers && trailers.videourl}`}
        />
        <meta property='og:video:width' content='1280px' />
        <meta property='og:video:height' content='720px' />
        <meta property='og:video:type' content='video/mp4' />
        <meta
          property='og:title'
          content={`${trailers && trailers.name} - AZ Movies™`}
        />
        <meta
          property='og:description'
          content='AZ Movies™ - Explore. Discover. Download Stream online HD movies with Google Translate for access in any language, worldwide.'
        />

        <meta property='og:url' content={`${trailers && trailers.siteurl}`} />
        <meta name='keywords' content={`${trailers && trailers.keywords}`} />
        <meta property='og:site_name' content='AZ Movies' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content={`${trailers && trailers.group}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
         <meta property='article:section' content='Trailers' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta property='og:image' content={`${trailers && trailers.image1}`} />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
      </Head>
<GoogleTranslate />
 <SocialSharing />
      <Script src='../../propler/ads.js' defer />
      <Script src='../../propler/ads2.js' defer />

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
            fontWeight: 'bold'
            // marginBottom: '12px'
          }}
        >
          {trailers.title}
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
              src={trailers.image}
              alt={trailers.title}
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
                boxShadow: '0 0 10px 0 #000',
                filter:
                  'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
              }}
            />
            <div
              style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}
            >
              <p className='text-black text-bg font-semibold mt-2'>
                Genre: {trailers.genre}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Director: {trailers.directorname}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Starring: {trailers.starring}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Origin Country: {trailers.country}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Language: {trailers.language}
              </p>
              <div className=' text-black text-bg font-semibold mt-2'>
                Synopsis :-
                {trailers.news1 &&
                  trailers.news1.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className='description text-black text-bg font-semibold mt-2'
                      style={{
                        marginBottom: '10px',
                        fontFamily: 'Poppins, sans-serif'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: enhancedParagraph(paragraph)
                      }}
                    />
                  ))}
              </div>
              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={trailers.directorimg}
                  alt={trailers.directorname}
                  title={trailers.directorname}
                  quality={90}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)',
                    boxShadow: '0 0 10px 0 #000' // Shadow effect with black color
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={trailers.actor1img}
                  alt={trailers.actor1}
                  title={trailers.actor1}
                  quality={90}
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
                  src={trailers.actor2img}
                  alt={trailers.actor2}
                  title={trailers.actor2}
                  quality={90}
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
                  src={trailers.actor3img}
                  alt={trailers.actor3}
                  title={trailers.actor3}
                  quality={90}
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
                  src={trailers.actor4img}
                  alt={trailers.actor4}
                  title={trailers.actor4}
                  quality={90}
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
                  src={trailers.actor5img}
                  alt={trailers.actor5}
                  title={trailers.actor5}
                  quality={90}
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
                {trailers.title}
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
                      currentEpisodeIndex === trailers.videotvitem.length - 1
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
                    {currentEpisodeIndex === trailers.videotvitem.length - 1
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
                    boxShadow: '0 0 10px 0 #000',
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    borderRadius: '20px' // Add border-radius for rounded shape
                  }}
                ></div>
                {/* <div
                        itemscope
                        itemtype='https://schema.org/VideoObject'
                        style={{ display: 'none' }}
                      >
                        <meta itemprop='name' content={trailers.title} />
                        <meta
                          itemprop='description'
                          content={trailers.text}
                        />
                        <meta
                          itemprop='uploadDate'
                          content={trailers.datePublished}
                        />
                        <meta
                          itemprop='thumbnailUrl'
                          content={trailers.backimage}
                        />
                        <meta itemprop='duration' content='P34S' />
                        <meta
                          itemprop='embedUrl'
                          content={trailers.videourl}
                        />
                      </div>
                      <iframe
                        frameborder='0'
                        src={`https://geo.dailymotion.com/player/xkdl0.html?video=${trailers.traileritem}&mute=true&Autoquality=1080p`}
                        width='100%'
                        height='100%'
                        allowfullscreen
                        title='Dailymotion Video Player'
                        allow='autoplay; encrypted-media'
                        style={{
                          boxShadow: '0 0 10px 0 #000',
                          filter:
                            'contrast(1.2) saturate(1.3) brightness(1.2) hue-rotate(15deg)'
                        }}
                      ></iframe> */}

                <p
                  className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-sm hover:text-blue-800 font-bold mt-2'
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: '0 0 10px 0 #000',
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                    // textShadow: '2px 1px 1px #000'
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
                      ? trailers.videotvitem.length
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
              {trailers.mp3player && <MP3Player mp3Url={trailers.mp3player} />}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='trailers'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #000',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
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
                      'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                  }}
                >
                  <strong> {trailers.head2} </strong>
                </p>
              </div>
              <Image
                src={trailers.image1}
                alt={trailers.name}
                width={1280}
                height={720}
                quality={90}
                loading='lazy'
                style={{
                  margin: 'auto',
                  marginTop: '50px',
                  marginBottom: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 0 10px 0 #000',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              />
              {/* {trailers.news1.split('\n\n').map((paragraph, idx) => (
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
                {trailers.head2 && (
                  <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-bg text-black text-bg mt-2 text-3xl mb-2 items-center justify-center'>
                    <strong>{trailers.head2}</strong>
                  </p>
                )}

                {trailers.image2 && (
                  <Image
                    src={trailers.image2}
                    alt={trailers.name}
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

                {trailers.image3 && (
                  <Image
                    src={trailers.image3}
                    alt={trailers.name}
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

                {trailers.image4 && (
                  <Image
                    src={trailers.image4}
                    alt={trailers.name}
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

                {trailers.image5 && (
                  <Image
                    src={trailers.image5}
                    alt={trailers.name}
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

                {trailers.image6 && (
                  <Image
                    src={trailers.image6}
                    alt={trailers.name}
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

                {trailers.image7 && (
                  <Image
                    src={trailers.image7}
                    alt={trailers.name}
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

                {trailers.image8 && (
                  <Image
                    src={trailers.image8}
                    alt={trailers.name}
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
              </div> */}
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
              MOST POPULAR TRAILER
            </p>
            <div className='categorylatest-container'>
              <div className='cardlatest-container'>
                {randomTrailers.map(trailer => (
                  <div key={trailer.id} className='cardlatest'>
                    <a href={trailer['trailers.watch']} id={trailer.id}>
                      <div className='relative'>
                        <img
                          src={trailer.image}
                          alt={trailer.title}
                          className='rounded-lg mx-auto'
                          width={1280}
                          height={720}
                          quality={90}
                          loading='lazy'
                          style={{
                            marginTop:'50px',
                            width: '1280px', // Ensures the image is displayed at this width
                            height: '350px', // Ensures the image is displayed at this height
                            boxShadow: '0 0 10px 0 #000',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        />
                        <p className='text-black text-lg font-semibold mt-2'>
                          {trailer.name}
                        </p>
                        <div className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-sm font-semibold mt-2'>
                          {trailer.text}
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

export async function getServerSideProps () {
  const res = await fetch('https://azmovies.vercel.app/trailers.json')
  const data = await res.json()
  const selectedTrailers = data.find(trailers => trailers.id === 'INDEX01')
  return {
    props: {
      trailers: selectedTrailers
    }
  }
}
export default trailersDetail
