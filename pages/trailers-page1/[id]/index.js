import { useRouter } from 'next/router'
import trailersp1Data from '../../../public/trailersp1.json'
import latestData from '../../../public/latest.json'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'


import Script from 'next/script'

const gamespage1 = ({ trailersp1Item }) => {
  const router = useRouter()
  const { id } = router.query


  const [latest, setLatest] = useState(latestData)
  const [playerReady, setPlayerReady] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)

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
          /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPgames/i
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

  const audioIframeRef = useRef(null)
  const predefinedEqualizationValue = 70
  const predefinedNoiseReductionValue = 40
  const audioSourceQuality = 'high'
  const enableNoiseCancellation = true

  useEffect(() => {
    const autoAdjustSoundEnhancements = () => {
      const iframeWindow = audioIframeRef.current.contentWindow

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage(
          {
            command: 'autoAdjustSoundEnhancements',
            equalizationValue: predefinedEqualizationValue,
            noiseReductionValue: predefinedNoiseReductionValue,
            audioSourceQuality: audioSourceQuality
          },
          '*'
        )
      }
    }

    const loadAudioProcessing = () => {
      autoAdjustSoundEnhancements()

      const iframeAudioElement =
        audioIframeRef.current.contentDocument.getElementById('audioPlayer')

      const iframeAudioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const sourceNode =
        iframeAudioContext.createMediaElementSource(iframeAudioElement)

      // Noise cancellation processing
      if (enableNoiseCancellation) {
        const noiseCancellationNode = iframeAudioContext.createBiquadFilter()
        noiseCancellationNode.type = 'highpass' // Using high-pass filter for noise cancellation
        noiseCancellationNode.frequency.value = 2000 // Adjust the cutoff frequency as needed (example: 2000 Hz)
        sourceNode.connect(noiseCancellationNode)
        noiseCancellationNode.connect(iframeAudioContext.destination)
      }

      // Load and apply the impulse response (Mills Greek Theater)
      fetch(
        '../wp-content/themes/website/assets/274600-Future-Wave-Rise-01.wav'
      ) // Update with the actual file path
        .then(response => response.arrayBuffer())
        .then(buffer => iframeAudioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
          const convolverNode = iframeAudioContext.createConvolver()
          convolverNode.buffer = audioBuffer
          sourceNode.connect(convolverNode)
          convolverNode.connect(iframeAudioContext.destination)
        })
        .catch(error => console.error('Error loading impulse response:', error))
    }

    if (audioIframeRef.current) {
      audioIframeRef.current.addEventListener('load', loadAudioProcessing)
    }

    return () => {
      if (audioIframeRef.current) {
        audioIframeRef.current.removeEventListener('load', loadAudioProcessing)
      }
    }
  }, [trailersp1Item, enableNoiseCancellation])

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'A to Z Movies',
      url: 'https://azmovies.vercel.app/',
      image: [
        'https://azmovies.vercel.app/favicon.ico'
      ],
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
          urlTemplate:
            'https://azmovies.vercel.app/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ])

  const softwareSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'http://schema.org/SoftwareApplication',
    datePublished: trailersp1Item.datePublished,
    dateModified: trailersp1Item.dateModified,
    softwareVersion: trailersp1Item.softwareVersion,
    url: trailersp1Item.siteurl,
    operatingSystem: trailersp1Item.operatingSystem,
    applicationCategory: trailersp1Item.applicationCategory,
    image: trailersp1Item.image,
    name: trailersp1Item.name,
    interactionStatistic: trailersp1Item.interactionStatistic,
    offers: {
      '@type': 'http://schema.org/Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'http://schema.org/AggregateRating',
      '@id': trailersp1Item.siteurl,
      ratingValue: 8,
      ratingCount: 5,
      bestRating: '10',
      worstRating: '1'
    }
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Windows',
        item: 'https://azmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'games',
        item: trailersp1Item.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: trailersp1Item.name,
        item: trailersp1Item.siteurl
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
        name: 'A to Z Movies',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${trailersp1Item.siteurl}#webpage`,
        url: trailersp1Item.siteurl,
        name: `${trailersp1Item.name} | A to Z Movies`,
        datePublished: trailersp1Item.datePublished,
        dateModified: trailersp1Item.dateModified,
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
        '@id': `${trailersp1Item.siteurl}#article`,
        headline: `Download ${trailersp1Item.name} | A to Z Movies`,
        datePublished: trailersp1Item.datePublished,
        dateModified: trailersp1Item.dateModified,
        articleSection: 'games',
        author: {
          '@id': 'https://azmovies.vercel.appauthor/trailersp1Item/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailersp1Item.synopsis,
        image: trailersp1Item.image,
        name: `Download ${trailersp1Item.name} | A to Z Movies`,
        isPartOf: {
          '@id': `${trailersp1Item.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailersp1Item.siteurl}#webpage`
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${trailersp1Item.siteurl}#blogPost`,
        headline: `Download ${trailersp1Item.name} | A to Z Movies`,
        datePublished: trailersp1Item.datePublished,
        dateModified: trailersp1Item.dateModified,
        articleSection: 'games',
        author: {
          '@id': 'https://azmovies.vercel.app/author/azmovies/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: trailersp1Item.synopsis,
        image: trailersp1Item.image,
        name: `Download ${trailersp1Item.name} | A to Z Movies`,
        '@id': `${trailersp1Item.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${trailersp1Item.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${trailersp1Item.siteurl}#webpage`
        }
      }
    ]
  })

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${trailersp1Item.siteurl}#webpage`, // Add a comma here
    name: trailersp1Item.title,
    url: trailersp1Item.siteurl,
    description: trailersp1Item.synopsis,
    image: trailersp1Item.image,
    datePublished: trailersp1Item.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: trailersp1Item.title,
        urlTemplate: trailersp1Item.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: trailersp1Item.country
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'A to Z Movies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://azmovies.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      'value': ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  }

  // Convert newsArticleSchema and videoObjects to JSON strings
  const newsArticleJson = JSON.stringify(newsArticleSchema)

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title> Download {trailersp1Item && trailersp1Item.name} | A to Z Movies</title>
        <link rel='canonical' href={trailersp1Item && trailersp1Item.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`${trailersp1Item && trailersp1Item.name} - A to Z Movies`}
        />
        <meta
          property='og:description'
          content='A to Z Movies is the top platform for exploring and downloading software,the premier platform for the latest releases and secure downloads.'
        />

        <meta property='og:url' content={`${trailersp1Item && trailersp1Item.siteurl}`} />
        <meta name='keywords' content={`${trailersp1Item && trailersp1Item.keywords}`} />
        <meta property='og:site_name' content='A to Z Movies' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content={`${trailersp1Item && trailersp1Item.group}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Games' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`${trailersp1Item && trailersp1Item.backimage}`}
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
          dangerouslySetInnerHTML={{ __html: softwareSchema }}
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
            fontWeight: 'bold',
            marginBottom: '12px'
          }}
        >
          {trailersp1Item.title}
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
          className='shadow-lg flex items-center justify-center '
          role='navigation'
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '15px'
          }}
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
                <a href='../browsers/'>
                  <h3 className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'>
                    Browser<span className='p'></span>
                  </h3>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-248' className='menu-operating-systems'>
                <a
                  href='../desktop/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Desktop<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11605' className='menu-3dcad'>
                <a
                  href='../multimedia/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Multimedia<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11610' className='menu-graphicdesign'>
                <a
                  href='../graphic-design/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Graphic Design<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-196' className='menu-multimedia'>
                <a
                  href='../network/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Network<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-161' className='menu-development'>
                <a
                  href='../development/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Development<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-84' className='menu-antivirus'>
                <a
                  href='../file-sharing/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  File Sharing<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-84' className='menu-antivirus'>
                <a
                  href='../security/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Security<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11606' className='menu-security'>
                <a
                  href='../games/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Games<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-35' className='menu-home active'>
                <a
                  href='../education'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Education<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-35' className='menu-home active'>
                <a
                  href='../mobile'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Mobile<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11606' className='menu-security'>
                <a
                  href='../utilities/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Utilities<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../movies/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Movies<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../latest/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Blog Post<span className='p'></span>
                </a>
              </li>
            </button>
          </ul>
        </div>

        <div className='flex-container'>
          <div className='category-container'>
            <Image
              src={trailersp1Item.channelposter}
              alt={trailersp1Item.title}
              width={300}
              height={300}
              quality={90}
              objectFit='cover'
              loading='lazy'
              style={{
                width: '400px', // Ensures the image is displayed at this width
                height: '500px', // Ensures the image is displayed at this height
                margin: 'auto',
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
              <div className='flex flex-col items-center justify-center'>
                <h2
                  className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                  }}
                >
                  {trailersp1Item.title}
                </h2>
              </div>

              <p className='text-black text-bg font-semibold mt-2'>
                Version: {trailersp1Item.version}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Developers: {trailersp1Item.developers}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                License: {trailersp1Item.license}
              </p>
              <h2 className='text-black font-bold mt-2 text-sm mb-2 items-center justify-center '>
              {' '}
              Author: {trailersp1Item.group}.
            </h2>
             <Image
                src={trailersp1Item.directorimg}
                alt={trailersp1Item.group}
                width={100}
                height={100}
                quality={90}
                objectFit='cover'
                loading='lazy'
                style={{
                  width: '50px', // Ensures the image is displayed at this width
                  height: '50px', // Ensures the image is displayed at this height
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '80px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
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
                    className='animate-pulse bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                  >
                    Download Now
                  </button>
                ) : (
                  <>
                    <p className='text-3xl font-bold mb-4'>
                      <br />
                      Your download link will be ready in {seconds} seconds...
                    </p>
                    <Script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></Script>
                    <lottie-player
                      src='https://lottie.host/291e7548-c65f-43a1-87ce-f573feab96b4/o7Ax3jP795.json'
                      background='##FFFFFF'
                      speed='1'
                      style={{ width: '150px', height: '150px' }}
                      loop
                      autoplay
                      direction='1'
                      mode='normal'
                    ></lottie-player>
                    <p className='text-3xl font-bold mb-4'>
                      Installation Video & Games Trailer.
                    </p>
                    <div
                      style={{
                        width: '100%',
                        height: '450px',
                        overflow: 'hidden'
                      }}
                      className='rounded-xl mr-8 flex border-1 border-blue-600 bg-gray-600 p-2 '
                    >
                      <div
                        itemscope
                        itemtype='https://schema.org/VideoObject'
                        style={{ display: 'none' }}
                      >
                        <meta
                          itemprop='name'
                          content={trailersp1Item.title}
                        />
                        <meta
                          itemprop='description'
                          content=  {trailersp1Item.text}
                        />
                        <meta
                          itemprop='uploadDate'
                          content=  {trailersp1Item.datePublished}
                        />
                        <meta
                          itemprop='thumbnailUrl'
                          content=  {trailersp1Item.backimage}
                        />
                        <meta itemprop='duration' content='P34S' />
                        <meta
                          itemprop='embedUrl'
                          content={trailersp1Item.videourl}
                        />
                      </div>
                      <iframe
                        frameborder='0'
                        src={`https://geo.dailymotion.com/player/xjrxe.html?video=${trailersp1Item.videoitem}&mute=true&Autoquality=1080p`}
                        width='100%'
                        height='100%'
                        allowfullscreen
                        title='Dailymotion Video Player'
                        allow='autoplay; encrypted-media'
                      ></iframe>
                    </div>

                    {showTimer && seconds <= 0 && (
                      <div>
                        {trailersp1Item.downloadlink && (
                          <Link href={trailersp1Item.downloadlink} target='_blank'>
                            <div
                              className='bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                              style={{
                                marginTop: '50px',
                                marginBottom: '10px',
                                borderRadius: '50px',
                                boxShadow: '0 0 10px 0 #fff',
                                filter:
                                  'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                              }}
                            >
                              <span
                                style={{
                                  color: '#0efa06',
                                  fontSize: '24px',
                                  textShadow: '3px 5px 5px #000'
                                }}
                              >
                                <i
                                  className='fa fa-download'
                                  aria-hidden='true'
                                ></i>{' '}
                              </span>
                              Click Here to Download
                            </div>
                          </Link>
                        )}
                        {trailersp1Item.downloadlink1 && (
                          <Link href={trailersp1Item.downloadlink1} target='_blank'>
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
                              Click Here to Download
                            </div>
                          </Link>
                        )}
                        {trailersp1Item.additionalLinks?.map((link, index) => (
                          <Link key={index} href={link.url} target='_blank'>
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
                              Click Here to Download {index + 3}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '>
                  <strong> {trailersp1Item.head1} </strong>
                </p>
              </div>
              <Image
                src={trailersp1Item.image1}
                alt={trailersp1Item.name}
                width={1280}
                height={720}
                quality={90}
                objectFit='cover'
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
              {trailersp1Item.news1.split('\n\n').map((paragraph, idx) => (
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
                <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '>
                  <strong> {trailersp1Item.head2} </strong>
                </p>
              </div>
              <Image
                src={trailersp1Item.image2}
                alt={trailersp1Item.name}
                width={1280}
                height={720}
                quality={90}
                objectFit='cover'
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
              {trailersp1Item.news2.split('\n\n').map((paragraph, idx) => (
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
                <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '>
                  <strong> {trailersp1Item.head3} </strong>
                </p>
              </div>
              <Image
                src={trailersp1Item.image3}
                alt={trailersp1Item.name}
                width={1280}
                height={720}
                quality={90}
                objectFit='cover'
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
              {trailersp1Item.news3.split('\n\n').map((paragraph, idx) => (
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
                <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '>
                  <strong> {trailersp1Item.head4} </strong>
                </p>
              </div>
              {trailersp1Item.news4.split('\n\n').map((paragraph, idx) => (
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

export async function getStaticPaths () {
  const paths = trailersp1Data.map(item => ({
    params: { id: item.id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const trailersp1Item = trailersp1Data.find(item => item.id === params.id)
  return { props: { trailersp1Item } }
}
export default gamespage1
