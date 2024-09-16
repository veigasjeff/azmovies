import { useRouter } from 'next/router'
import moviesData from '../../../public/moviesfull.json'
import latestData from '../../../public/movieszip.json'
import { useEffect, useState, useRef } from 'react'
import Pagination from '../../../components/Pagination'
import AdultSkipAds from '../../../components/AdultSkipAds'
import GoogleTranslate from '../../../components/GoogleTranslate'
import SocialSharing from '../../../components/SocialSharing'
import SearchComponent from '../../../components/SearchComponent'
import styles from '@styles/iframeStyles.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'

const moviesDetail = ({ moviesp1Item }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const [latest, setLatest] = useState(latestData)
  const [playerReady, setPlayerReady] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(false)
  const [iframeAccordionExpanded, setIframeAccordionExpanded] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)
  // Determine the type of content (moviesp1Item, tvshow, or adult)
  const isTVShow = moviesp1Item.type === 'tvshow'
  const isAdult = moviesp1Item.badgegroup === 'Adult'

  const handleDownloadClick = () => {
    setShowTimer(true)
    setSeconds(30) // Example timer duration
  }

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

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  if (!moviesp1Item) return <div>Loading...</div>

  const { videomovieitem, videomovies, image1 } = moviesp1Item

  // Check if videomovies contains episode data
  const ismovies = videomovies[0] && videomovies[0].includes('/')

  // Extract current video data
  const currentVideoId = videomovieitem[currentEpisodeIndex]
  const currentVideoData = videomovies[currentEpisodeIndex] || {} // Ensure currentEpisodeIndex is within bounds

  // Default to episode 1 and season 1 if not defined
  const episode = ismovies ? currentVideoData.episode || 1 : null
  const season = ismovies ? currentVideoData.season || 1 : null

  // Construct video sources based on whether it's a TV show or a movie
  const videoSources = videomovies.map(item => {
    // Check if item contains episode data
    const isItemmovies = item.includes('/')
    const [id, itemSeason, itemEpisode] = isItemmovies
      ? item.split('/')
      : [item, null, null]

    return {
      name: isItemmovies ? `Episode ${itemEpisode}` : 'Movie',
      urls: [
        `https://short.ink/${currentVideoId}?thumbnail=${image1}`,
        isItemmovies
          ? `https://vidsrc.me/embed/tv?imdb=${id}&season=${itemSeason}&episode=${itemEpisode}`
          : `https://vidsrc.me/embed/movie?imdb=${id}`,
        isItemmovies
          ? `https://vidsrc.pro/embed/tv/${id}/${itemSeason}/${itemEpisode}`
          : `https://vidsrc.pro/embed/movie/${id}`,
        isItemmovies
          ? `https://vidsrc.cc/v2/embed/tv/${id}/${itemSeason}/${itemEpisode}`
          : `https://vidsrc.cc/v2/embed/movie/${id}`,
        isItemmovies
          ? `https://fAtoZ .lol/series/?imdb=${id}`
          : `https://fAtoZ .lol/movies/?imdb=${id}`,
        isItemmovies
          ? `https://autoembed.co/tv/imdb/${id}-${itemSeason}-${itemEpisode}`
          : `https://autoembed.co/movie/imdb/${id}`,
        isItemmovies
          ? `https://multiembed.mov/directstream.php?video_id=${id}&s=${itemSeason}&e=${itemEpisode}`
          : `https://multiembed.mov/directstream.php?video_id=${id}`
      ]
    }
  })

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % videoSources.length
      console.log('Next Episode Index:', nextIndex)
      return nextIndex
    })
  }

  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex(prevIndex => {
      const newIndex =
        (prevIndex - 1 + videoSources.length) % videoSources.length
      console.log('Previous Episode Index:', newIndex)
      return newIndex
    })
  }

  const handlePlayerSelect = index => {
    setCurrentPlayerIndex(index)
  }

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

  // Ensure currentVideoSources is always valid
  const currentVideoSources = videoSources[currentEpisodeIndex]?.urls || []
  const src = currentVideoSources[currentPlayerIndex] || '' // Default to an empty string if not available

  const prevEpisodeNumber = episode - 1 < 1 ? videoSources.length : episode - 1
  const nextEpisodeNumber = (episode % videoSources.length) + 1

  const toggleIframeAccordion = () => {
    setIframeAccordionExpanded(prev => !prev)
  }

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AtoZ ',
      url: 'https://atozmovies.vercel.app/',
      image: ['https://atozmovies.vercel.app/favicon.ico'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/logo.png',
        width: 280,
        height: 100
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://atozmovies.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://atozmovies.vercel.app/search?q={search_term_string}'
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
        name: 'AtoZ ',
        item: 'https://atozmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'moviesp1Items',
        item: moviesp1Item.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: moviesp1Item.name,
        item: moviesp1Item.siteurl
      }
    ]
  })

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person', 'Organization'],
        '@id': 'https://gravatar.com/drtrailer2022/#person',
        name: 'Dr Trailer',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://atozmovies.vercel.app#website',
        url: 'https://atozmovies.vercel.app',
        name: 'AtoZ Movies™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${moviesp1Item.siteurl}#webpage`,
        url: moviesp1Item.siteurl,
        name: `${moviesp1Item.name} | AtoZ Movies™`,
        datePublished: moviesp1Item.datePublished,
        dateModified: moviesp1Item.dateModified,
        isPartOf: {
          '@id': 'https://atozmovies.vercel.app#website',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': 'https://gravatar.com/drtrailer2022/',
        name: 'Dr Trailer',
        url: 'https://gravatar.com/drtrailer2022/',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022#image',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US',
        },
        sameAs: ['https://atozmovies.vercel.app'],
      },
      {
        '@type': 'Article',
        '@id': `${moviesp1Item.siteurl}#article`,
        headline: `${moviesp1Item.name} | AtoZ Movies™`,
        datePublished: moviesp1Item.datePublished,
        dateModified: moviesp1Item.dateModified,
        articleSection: 'moviesp1Items',
        author: {
          '@id': 'https://gravatar.com/drtrailer2022/',
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person',
        },
        description: moviesp1Item.synopsis,
        image: moviesp1Item.image,
        name: `${moviesp1Item.name} | AtoZ Movies™`,
        isPartOf: {
          '@id': `${moviesp1Item.siteurl}#webpage`,
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${moviesp1Item.siteurl}#webpage`,
        },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${moviesp1Item.siteurl}#blogPost`,
        headline: `${moviesp1Item.name} | AtoZ Movies™`,
        datePublished: moviesp1Item.datePublished,
        dateModified: moviesp1Item.dateModified,
        articleSection: 'moviesp1Items',
        author: {
          '@id': 'https://gravatar.com/drtrailer2022/',
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person',
        },
        description: moviesp1Item.synopsis,
        image: moviesp1Item.image,
        name: `${moviesp1Item.name} | AtoZ Movies™`,
        isPartOf: {
          '@id': `${moviesp1Item.siteurl}#webpage`,
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${moviesp1Item.siteurl}#webpage`,
        },
      },
    ],
  });
  
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${moviesp1Item.siteurl}#webpage`, // Add a comma here
    name: moviesp1Item.title,
    url: moviesp1Item.siteurl,
    description: moviesp1Item.synopsis,
    image: moviesp1Item.image,
    datePublished: moviesp1Item.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: moviesp1Item.title,
        urlTemplate: moviesp1Item.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: moviesp1Item.country
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AtoZ ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/og_image.jpg'
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
    '@id': `${moviesp1Item.siteurl}`,
    name: moviesp1Item.title,
    url: moviesp1Item.siteurl,
    description: moviesp1Item.synopsis,
    image: moviesp1Item.image,
    genre: moviesp1Item.genre,
    datePublished: moviesp1Item.datePublished,
    director: {
      '@type': 'Person',
      name: moviesp1Item.directorname
    },
    actor: moviesp1Item.starring.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: moviesp1Item.title,
        urlTemplate: moviesp1Item.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: moviesp1Item.country
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': moviesp1Item.siteurl,
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
      name: 'AtoZ ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  })

  const MoviesSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: moviesp1Item.title,
    description: moviesp1Item.text,
    uploadDate: moviesp1Item.datePublished,
    thumbnailUrl: moviesp1Item.image1,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: moviesp1Item.videourl
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
           {moviesp1Item && moviesp1Item.name} | AtoZ ???
        </title>
        <link rel='canonical' href={moviesp1Item && moviesp1Item.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`${moviesp1Item && moviesp1Item.name} - AtoZ `}
        />
        <meta
          property='og:description'
          content='Stream HD movies and TV series for free on AtoZ . Online. Stream. Download. full-length movies and shows in HD quality without registration.'
        />

        <meta
          property='og:url'
          content={`${moviesp1Item && moviesp1Item.url}`}
        />
        <meta
          name='keywords'
          content={`${moviesp1Item && moviesp1Item.keywords}`}
        />
        <meta property='og:site_name' content='AtoZ ' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content={`${moviesp1Item && moviesp1Item.name}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Movies' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`${moviesp1Item && moviesp1Item.image1}`}
        />

        <meta property='og:image:width' content='1280px' />
        <meta property='og:image:height' content='720px' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:label1' content='Est. reading time' />
        <meta name='twitter:data1' content='1 minute' />
        <meta name='google-site-verification' content='BZNZAUYOS1NXYRFA99F4VJ3ABKZUZHKKB0PZ3DU3L8S' />
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
          dangerouslySetInnerHTML={{ __html: MoviesSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
      
        {/* Webpushr tracking code */}
      </Head>
      <Script src='../../propler/ads.js' defer />
      <Script src='../../propler/ads2.js' defer />

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
        <div className='flex justify-center items-center my-4 gap-4'>
          <GoogleTranslate />
        </div>
        <span className='px-0 bg-clip-text text-sm text-black font-bold mt-2 '>
          <SearchComponent />
        </span>
        <SocialSharing />
        {/* TV Show Description */}
        {isTVShow && (
          <>
            <h2 className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl hover:text-blue-800 font-bold mt-2'>
              {moviesp1Item.title} Online - Stream Your Favorite TV Series
            </h2>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Explore the captivating world of{' '}
              <strong>{moviesp1Item.title}</strong>, the TV series that has
              everyone talking. At
              <strong> AtoZ </strong>, you can stream{' '}
              <strong>{moviesp1Item.title}</strong> and immerse yourself in its
              exciting episodes, whether you're catching up on past seasons or
              tuning in to the latest releases. Our platform offers a seamless
              streaming experience, making it easy to watch your favorite TV
              series online.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Streaming <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong> ensures that you won't miss a single
              moment of the action, drama, or comedy that makes this TV series a
              must-watch. With high-quality streaming and user-friendly
              navigation, <strong>AtoZ </strong> provides everything you
              need to enjoy <strong>{moviesp1Item.title}</strong>
              and other top TV series. Our library is frequently updated, so you
              can always find the latest episodes as soon as they air.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Whether you're binge-watching or following along weekly,{' '}
              <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong> is your go-to destination for
              streaming TV series online. Join our community of viewers and
              start watching <strong>{moviesp1Item.title}</strong> today. With{' '}
              <strong>AtoZ </strong>, your favorite TV series is just a
              click away.
            </p>
          </>
        )}

        {/* Adult Content Description */}
        {isAdult && (
          <>
            <h2 className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl hover:text-blue-800 font-bold mt-2'>
              {moviesp1Item.title} Online - Stream Premium Adult Content
            </h2>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Indulge in the finest selection of adult entertainment with{' '}
              <strong>{moviesp1Item.title}</strong>. At{' '}
              <strong>AtoZ </strong>, we offer a vast library of premium
              adult content, including the latest and most popular titles like{' '}
              <strong>{moviesp1Item.title}</strong>. Our platform is designed
              for those who seek high-quality, discreet streaming of adult
              films, ensuring a seamless and private viewing experience.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Streaming <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong> provides you with a user-friendly
              interface and crystal-clear video quality. Our adult content is
              regularly updated, giving you access to new releases as soon as
              they become available. Whether you're exploring new genres or
              returning to your favorites, <strong>{moviesp1Item.title}</strong>
              and other top titles are available at your fingertips.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              For a premium experience in adult entertainment, look no further
              than <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong>. Our platform ensures your privacy and
              security while you enjoy the content you love. Start streaming{' '}
              <strong>{moviesp1Item.title}</strong> today and discover why{' '}
              <strong>AtoZ </strong> is the trusted choice for adult
              content.
            </p>
          </>
        )}

        {/* moviesp1Item Description (Default) */}
        {!isTVShow && !isAdult && (
          <>
            <h2 className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl  font-bold mt-2'>
              {moviesp1Item.title} Online and Experience Top-Tier Streaming
            </h2>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Dive into the world of cinema with{' '}
              <strong>{moviesp1Item.title}</strong>, available to stream right
              here. At <strong>AtoZ </strong>, we bring you the best in
              entertainment, offering an extensive library of moviesp1Items and
              TV shows, including the latest blockbusters like{' '}
              <strong>{moviesp1Item.title}</strong>. Whether you're a fan of
              action, drama, comedy, or any other genre, you'll find exactly
              what you're looking for.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Streaming <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong> guarantees a seamless viewing
              experience with high-definition quality and uninterrupted
              playback. Our platform is designed to make it easy for you to
              discover and enjoy your favorite films. With regularly updated
              content, you will always have access to the newest releases,
              ensuring you can watch <strong>{moviesp1Item.title}</strong> and
              other top titles as soon as they're available.
            </p>
            <p className='text-lg bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mt-4'>
              Whether you're revisiting a classic or catching a new release,{' '}
              <strong>{moviesp1Item.title}</strong> on{' '}
              <strong>AtoZ </strong> is the perfect way to enjoy your
              moviesp1Item night. Join the countless users who trust us for
              their streaming needs and start watching{' '}
              <strong>{moviesp1Item.title}</strong> online today. At{' '}
              <strong>AtoZ </strong>, your entertainment is just a click
              away.
            </p>
          </>
        )}
         <a
            href='https://t.me/watchmovietvshow/'
            target='_blank'
            rel='noopener noreferrer'
            className='telegram-link'
            style={{
              display: 'block',
              textAlign: 'center',
              margin: '0 auto',
              marginTop: '20px'
            }}
          >
            <p style={{ display: 'inline-block' }}>
              For Request or Demand <br />
              Movies & TV Series Join Telegram
              <i
                className='fab fa-telegram telegram-icon'
                style={{ marginLeft: '8px' }}
              ></i>
            </p>
          </a>
        <div className='flex-container'>
          <div className='category-container'>
            <Image
              src={moviesp1Item.image}
              alt={moviesp1Item.title}
              width={300}
              height={300}
              quality={90}
              objectFit='cover'
              loading='lazy'
              style={{
                width: '400px', // Ensures the image is displayed at this width
                height: '500px', // Ensures the image is displayed at this height
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '20px',
                borderRadius: '50px',
                boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                filter:
                  'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
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
                  {moviesp1Item.title}
                </h2>
              </div>

              <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Genre: {moviesp1Item.genre}
              </p>
              <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Director: {moviesp1Item.directorname}
              </p>
              <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Starring: {moviesp1Item.starring}
              </p>
              <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Origin Country: {moviesp1Item.country}
              </p>
              <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-bg font-semibold mt-2'>
                Language: {moviesp1Item.language}
              </p>

              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={moviesp1Item.directorimg}
                  alt={moviesp1Item.directorname}
                  title={moviesp1Item.directorname}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={moviesp1Item.actor1img}
                  alt={moviesp1Item.actor1}
                  title={moviesp1Item.actor1}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={moviesp1Item.actor2img}
                  alt={moviesp1Item.actor2}
                  title={moviesp1Item.actor2}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={moviesp1Item.actor3img}
                  alt={moviesp1Item.actor3}
                  title={moviesp1Item.actor3}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={moviesp1Item.actor4img}
                  alt={moviesp1Item.actor4}
                  title={moviesp1Item.actor4}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={moviesp1Item.actor5img}
                  alt={moviesp1Item.actor5}
                  title={moviesp1Item.actor5}
                  quality={90}
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                  }}
                  loading='lazy'
                  layout='responsive'
                />
              </div>

              <h2 className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'>
                Watch Official Trailer {moviesp1Item.name}
              </h2>

              <main style={{ width: '100%', display: 'block' }}>
                <section>
                  <div className={styles.iframeWrapper}>
                    <div className={styles.iframeContainer}>
                      <iframe
                        className={styles.iframe}
                        frameBorder='0'
                        src={`https://geo.dailymotion.com/player/xjrxe.html?video=${moviesp1Item.traileritem}&mute=true&Autoquality=1080p`}
                        allowFullScreen
                        title='Dailymotion Video Player'
                        allow='autoplay; encrypted-media'
                        style={{
                          boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                         filter:
                           'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                       }}
                      ></iframe>
                    </div>
                  </div>
                </section>
              </main>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='home/page1'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
              <h1
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 'bold',
                  marginTop: '50px'
                }}
              >
                {moviesp1Item.title}
              </h1>

              {/* Button to toggle iframe */}
              <button
                onClick={toggleIframeAccordion}
                className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 'bold',
                  marginTop: '50px',
                  marginBottom: '50px'
                }}
              >
                {iframeAccordionExpanded ? 'Close Now' : 'Click to Watch'}
              </button>
              {/* Conditional rendering of Next Episode button */}
              {ismovies && !isAdult && iframeAccordionExpanded && (
                <div className='flex flex-col items-center mb-4'>
                  <button
                    onClick={handleNextEpisode}
                    disabled={videoSources.length === 0}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-4 text-xl hover:text-green-600 font-bold mt-2'
                  >
                    Next Part
                  </button>
                </div>
              )}

              {/* Container for the iframe */}
              {iframeAccordionExpanded && (
                <>
                  <div className={styles.container}>
                    <div className={styles.iframeContainer}>
                      <iframe
                        className={styles.iframe}
                        src={src}
                        allowFullScreen
                        scrolling='no'
                        title='Video Player'
                        style={{
                          boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                         filter:
                           'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                       }}
                      ></iframe>
                    </div>
                  </div>

                  <p
                    className='text-black text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-sm'
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '1px 1px 1px 0 #fff',
                      filter:
                        'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                    }}
                  >
                    *Note: Use Settings in Player to improve the Quality of
                    video to HD Quality 1080p.
                  </p>

                  {/* Conditional rendering of Previous Episode button */}
                  {ismovies && !isAdult && (
                    <div className='flex flex-col items-center mb-4'>
                      <button
                        onClick={handlePreviousEpisode}
                        disabled={videoSources.length === 0}
                        className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xl hover:text-blue-600 font-bold mt-2'
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                      >
                        Previous Part
                      </button>
                    </div>
                  )}

                  <h2
                    className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Select Player To Watch.
                  </h2>

                  <div className='flex flex-col items-center mt-4 gap-2'>
                    <div className='flex flex-wrap justify-center mb-4 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text hover:text-blue-800 text-bg font-semibold mt-2'>
                      {currentVideoSources.map((source, index) => (
                        <button
                          key={index}
                          onClick={() => handlePlayerSelect(index)}
                          className={`mx-2 my-1 px-4 py-2 rounded ${
                            currentPlayerIndex === index
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-black'
                          } hover:bg-green-500 hover:text-white transition duration-300 ease-in-out`}
                          style={{
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '10px 20px',
                            margin: '5px'
                          }}
                        >
                          Player {index + 1}
                        </button>
                      ))}
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                      {/* Render the button for Season 2 if linkurl exists */}
                      {moviesp1Item.linkurl && (
                        <Link href={moviesp1Item.linkurl}>
                          <div
                            className={`px-4 py-2 border rounded mx-2 my-1 ${
                              moviesp1Item.linkurl
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200'
                            } hover:bg-green-700 hover:text-white`}
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              marginTop: '20px',
                              filter:
                                'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                            }}
                          >
                            Click to Watch Next Season
                          </div>
                        </Link>
                      )}

                      {/* Render the button for Season 1 if linkurl2 exists */}
                      {moviesp1Item.linkurl2 && (
                        <Link href={moviesp1Item.linkurl2}>
                          <div
                            className={`px-4 py-2 border rounded mx-2 my-1 ${
                              moviesp1Item.linkurl2
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200'
                            } hover:bg-green-700 hover:text-white`}
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              marginTop: '20px',
                              filter:
                                'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                            }}
                          >
                            Click to Watch Previous Season
                          </div>
                        </Link>
                      )}
                    </div>
                    <div className={styles.container}>
                      <h2
                        className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Click to Download {moviesp1Item.name}
                      </h2>

                      {/* <div className='flex flex-col items-center justify-center'></div>

                  {moviesp1Item.mp3player && <MP3Player mp3Url={moviesp1Item.mp3player} />} */}

                      <div
                        className='flex flex-col items-center justify-center'
                        style={{
                          marginTop: '50px',
                          marginBottom: '50px'
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
                                marginBottom: '20px'
                              }}
                            >
                              {accordionExpanded
                                ? 'Click to Stop Download'
                                : 'Download Now'}
                            </button>

                            {accordionExpanded && (
                              <>
                                <div className={styles.container}>
                                  {seconds > 0 ? (
                                    <p
                                      className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl font-bold mb-4'
                                      style={{ marginTop: '50px' }}
                                    >
                                      Your download link will be ready in{' '}
                                      {seconds} seconds...
                                    </p>
                                  ) : (
                                    <p
                                      className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl font-bold mb-4'
                                      style={{ marginTop: '50px' }}
                                    >
                                      Your download links are ready.
                                    </p>
                                  )}
                                </div>

                                {seconds === 0 && (
                                  <div>
                                    {Object.keys(moviesp1Item)
                                      .filter(key =>
                                        key.startsWith('downloadlink')
                                      )
                                      .map((key, index) => (
                                        <Link
                                          key={index}
                                          href={moviesp1Item[key]}
                                          target='_blank'
                                        >
                                          <div
                                            className='bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                                            style={{
                                              margin: 'auto',
                                              marginTop: '50px',
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
                                            Download {index + 1}
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
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* </div> */}

          <div className='sidebar'>
            <p
              className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent font-bold mt-2 flex flex-col items-center justify-center text-3xl'
              style={{
                marginTop: '15px',
                marginBottom:'15px'
                             
              }}
            >
              LATEST UPDATED MOVIES
            </p>
            <div className='categorylatest-container'>
              <div className='cardlatest-container'>
                {latest.map(latestItem => (
                  <div key={latestItem.id} className='cardlatest'>
                    <a href={`/movies/${latestItem.id}`}>
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
                            boxShadow: '0 0 10px 0 #000', // Shadow effect with black color
                            filter:
                              'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' // Image filter
                          }}
                        />
                        <p className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent font-bold mt-2 flex flex-col items-center justify-center text-2xl'> 
                          {latestItem.name}
                        </p>
                        <div className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-sm font-semibold mt-2 flex flex-col items-center justify-center'>
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
               .telegram-link {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          background-clip: text;
          color: transparent;
          margin-top: 25px;
        }

        .telegram-icon {
          color: #0088cc;
          margin-left: 10px;
          font-size: 2rem;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        `}</style>
      </div>
    </div>
  )
}

export async function getStaticPaths () {
  const paths = moviesData.map(item => ({
    params: { id: item.id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const moviesp1Item = moviesData.find(item => item.id === params.id)
  return { props: { moviesp1Item } }
}
export default moviesDetail
