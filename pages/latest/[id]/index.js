import { useRouter } from 'next/router'
import latestsData from '../../../public/latest.json'
import moviesData from '../../../public/movies.json'
import tvshowData from '../../../public/tvshow.json'
import trailersData from '../../../public/trailers.json'
import GoogleTranslate from '../../../components/GoogleTranslate'
import SocialSharing from '../../../components/SocialSharing'
import adultData from '../../../public/adult.json'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Pagination from '../../../components/Pagination'
import SearchComponent from '../../../components/SearchComponent';
import Script from 'next/script'

// Function to get random links from each dataset
const getRandomLinks = (movies, tvshows, adult, trailers, count = 3) => {
  const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
  
  const getRandomItems = (data, count) => {
    const shuffled = shuffleArray(data);
    return shuffled.slice(0, count);
  };

  return [
    ...getRandomItems(movies, count),
    ...getRandomItems(tvshows, count),
    ...getRandomItems(adult, count),
    ...getRandomItems(trailers, count)
  ];
};


const latestDetail = ({ latest }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const enhancedParagraph = (text) => {
    const linkTargets = [
      { text: 'Watch Online Wild Wild Punjab', url: 'https://azmovies.vercel.app/movies/watch-wild-wild-punjab-2024' },
      { text: 'Watch The Killer Trailer', url: 'https://azmovies.vercel.app/trailers/watch-the-killer-official-trailer-2024' },
      { text: 'JWM Trailers', url: 'https://azmovies.vercel.app/trailers/' },
      { text: 'JWM Movies', url: 'https://azmovies.vercel.app/movies/' },
      { text: 'JWM TV Series s', url: 'https://azmovies.vercel.app/yvshow/' },
      { text: 'JWM Adult Content', url: 'https://azmovies.vercel.app/adult/' },
    
    ];

    linkTargets.forEach((linkTarget) => {
      const regex = new RegExp(`(${linkTarget.text})`, 'g');
      text = text.replace(
        regex,
        `<a href="${linkTarget.url}" class="text-blue-500 underline">${linkTarget.text}</a>`
      );
    });
    return text;
  };

  const [linkTargets, setLinkTargets] = useState([]);

  useEffect(() => {
    // Fetch the initial random links
    setLinkTargets(getRandomLinks(moviesData, tvshowData, adultData, trailersData,));

    // Update the links every 30 seconds
    const interval = setInterval(() => {
      setLinkTargets(getRandomLinks(moviesData, tvshowData, adultData, trailersData,));
    }, 30000); // 30 seconds in milliseconds

    return () => clearInterval(interval);
  }, []);

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AZMovies™ - Explore. Discover. Download. ',
      url: 'https://azmovies.vercel.app/',
      image: [
        'https://azmovies.vercel.app/favicon.ico'
      ],
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
          urlTemplate:
            'https://azmovies.vercel.app/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ])

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
        name: 'AZMovies™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `/${latest['latest.watch']}#webpage`,
        url: `/${latest['latest.watch']}`,
        name: `${latest.name} | 123Movies™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        isPartOf: {
          '@id': 'https://azmovies.vercel.app#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://azmovies.vercel.app/author/123moviesonline/',
        name: 'Dr Trailer',
        url: 'https://azmovies.vercel.appauthor/justwatchfree/',
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
        '@id': `/${latest['latest.watch']}#article`,
        headline: ` ${latest.name} | 123Movies™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        articleSection: 'latest',
        author: {
          '@id': 'https://azmovies.vercel.appauthor/justwatchfree/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: `AZMovies™ - Explore. Discover. Download.  Stream online HD movies with Google Translate for access in any language, worldwide.`,
        image: latest.image,
        name: ` ${latest.name} | 123Movies™`,
        isPartOf: {
          '@id': `/${latest['latest.watch']}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `/${latest['latest.watch']}#webpage`
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `/${latest['latest.watch']}#blogPost`,
        headline: ` ${latest.name} | 123Movies™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        articleSection: 'latest',
        author: {
          '@id': 'https://azmovies.vercel.appauthor/justwatchfree/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: `AZMovies™ - Explore. Discover. Download.  Stream online HD movies with Google Translate for access in any language, worldwide.`,
        image: latest.image,
        name: ` ${latest.name} | 123Movies™`,
        '@id': `/${latest['latest.watch']}#richSnippet`,
        isPartOf: {
          '@id': `/${latest['latest.watch']}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `/${latest['latest.watch']}#webpage`
        }
      }
    ]
  })
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `/${latest['latest.watch']}`,
    name: latest.title,
    url: `/${latest['latest.watch']}`,
    description: latest.synopsis,
    image: latest.image,
    genre: latest.genre,
    datePublished: latest.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: latest.title,
        urlTemplate: `${latest['url']}`
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: latest.country
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AZMovies™',
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

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title> {latest && latest.name} | 123Movies™</title>
        <link rel='canonical' href={latest && latest.url} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        {/* <meta property='og:type' content='website' /> */}
        <meta
          property='og:title'
          content={`${latest && latest.name} - 123Movies™`}
        />

        <meta
          property='og:description'
          content='AZMovies™ - Explore. Discover. Download.  Stream online HD movies with Google Translate for access in any language, worldwide.'
        />
        <meta property='og:url' content={`${latest && latest.siteurl}`} />
        <meta name='keywords' content={`${latest && latest.keywords}`} />
        <meta property='og:site_name' content='AZMovies' />
        {/* <meta property='og:type' content='article' /> */}
        <meta property=' og:image:alt' content={`${latest && latest.group}`} />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='latest' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta property='og:image' content={`${latest && latest.channelposter}`} />

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

        
        
      </Head>
      <Script
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
          />
     
 <SocialSharing />
      {/* <Script src='../../propler/ads.js' defer /> */} 
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
          backgroundColor: '#0e0e0e'
        }}
      >
         <GoogleTranslate />
        <h1
         className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
         style={{
           fontFamily: 'Poppins, sans-serif',
           fontWeight: 'bold',
          //  marginBottom: '12px'
         }}
       >
        LATEST ENTERTAINMENT NEWS
        </h1>
        {/* 
        <p
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
          href='https://t.me/watchmovietvshow/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mt-2 flex items-center justify-center'
          style={{ marginTop: '25px', marginBottom:'25px' }}
        >
          <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
            For Request or Demand Movies & TV Series Join Telegram
            <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
          </span>
        </a>
      
        <span className='px-0 bg-clip-text text-sm text-black font-bold mt-2'>
          <SearchComponent />
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route='latest'
          style={{
            // marginTop: '20px',
            // marginBottom:'50px',
            borderRadius: '50px',
            boxShadow: '0 0 10px 0 #fff',
            filter:
              'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
          }}
        />
        <div className='category-container'>
          <Image
            src={latest.image}
            alt={latest.name}
            className='rounded-lg mx-auto'
                          width={1280}
                          height={720}
                          quality={90}
                          loading='lazy'
                          style={{
                            marginTop: '20px',
                            width: '1280px', // Ensures the image is displayed at this width
                            height: '350px', // Ensures the image is displayed at this height
                            boxShadow: '0 0 10px 0 #000',
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
          />
          <div
            style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}
          >
            <h2
              className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-3xl mb-2 items-center justify-center '
              style={{
                fontFamily: 'Poppins, sans-serif',
           
              }}
            >
              {latest.title}
            </h2>
            <h2 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-sm mb-2 items-center justify-center '>
              {' '}
              Author: {latest.group}.
            </h2>
            <Image
                src={latest.directorimg}
                alt={latest.group}
                width={100}
                height={100}
                quality={90}
                
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
            <div className=' text-2xl font-semibold mt-2 px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent  hover:text-blue-800 '>
      See Below for Other Links to Watch Full Content.
      <div className={`${HomeStyles.imageGrid} mt-5`} >
        {linkTargets.map((link, idx) => (
          <div key={idx} className='description bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-semibold mt-2' >
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
                filter: 'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)',
              
              }}
              loading='lazy'
            />
             {link.name}
            </a>
          </div>
        ))}
      </div>
    </div>
             
         
            {latest.head1 && (
              <p className='text-black font-bold mt-2 text-3xl mb-2 items-center justify-center '>
                <strong>{latest.head1}</strong>
              </p>
            )}
            {latest.image1 && (
              <Image
                src={latest.image1}
                alt={latest.name}
                width={1280}
                height={720}
                quality={90}
                
                loading='lazy'
                style={{
                  // width: '800px', // Ensures the image is displayed at this width
                  // height: '400px', // Ensures the image is displayed at this height
                  margin: 'auto',
                  marginBottom: '20px',
                  marginTop:'20px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
            )}
              <div className='flex flex-col items-center justify-center'>
      {latest.news1 && latest.news1.split('\n\n').map((paragraph, idx) => (
        <p
          key={idx}
          className='description bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-xl'
          style={{
            marginBottom: '10px',
            fontFamily: 'Poppins, sans-serif'
          }}
          dangerouslySetInnerHTML={{ __html: enhancedParagraph(paragraph) }}
        />
      ))}
    </div>

            {latest.head2 && (
              <p className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-3xl mb-2 items-center justify-center '>
                <strong>{latest.head2}</strong>
              </p>
            )}
            {latest.image2 && (
              <Image
                src={latest.image2}
                alt={latest.name}
                width={1280}
                height={720}
                quality={90}
                
                loading='lazy'
                style={{
                  // width: '800px', // Ensures the image is displayed at this width
                  // height: '400px', // Ensures the image is displayed at this height
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
            )}
            {latest.news2 &&
              latest.news2.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className='description bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-xl'
                  style={{
                    marginBottom: '10px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {paragraph}
                </p>
              ))}

            {latest.head3 && (
              <p className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-3xl mb-2 items-center justify-center '>
                <strong>{latest.head3}</strong>
              </p>
            )}
            {latest.image3 && (
              <Image
                src={latest.image3}
                alt={latest.name}
                width={1280}
                height={720}
                quality={90}
                
                loading='lazy'
                style={{
                  // width: '800px', // Ensures the image is displayed at this width
                  // height: '400px', // Ensures the image is displayed at this height
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
            )}
            {latest.news3 &&
              latest.news3.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className='description bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-xl'
                  style={{
                    marginBottom: '10px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {paragraph}
                </p>
              ))}

            {latest.head4 && (
              <p className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-3xl mb-2 items-center justify-center '>
                <strong>{latest.head4}</strong>
              </p>
            )}
            {/* {latest.image4 && (
              <Image
                src={latest.image4}
                alt={latest.name}
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
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
            )} */}
            <div className='flex flex-col items-center justify-center'>
      {latest.news4 && latest.news4.split('\n\n').map((paragraph, idx) => (
        <p
          key={idx}
          className='description bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 text-xl'
          style={{
            marginBottom: '10px',
            fontFamily: 'Poppins, sans-serif'
          }}
          dangerouslySetInnerHTML={{ __html: enhancedParagraph(paragraph) }}
        />
      ))}
    </div>
          </div>
          <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route='latest'
          style={{
            marginTop: '50px',
       
            borderRadius: '50px',
            boxShadow: '0 0 10px 0 #fff',
            filter:
              'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
          }}
        />
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

          .flex-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
          }

          .category-container {
            flex-grow: 1;
            max-width: calc(60% - 10px);
          }

          .sidebar {
            flex-grow: 1;
            max-width: calc(40% - 10px);
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
            // background-color: #fff;
          }

          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column;
            }

            .category-container,
            .sidebar {
              max-width: 100%;
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
  const paths = latestsData.map(latest => ({
    params: { id: latest.id } // Assuming each latest object has an "id" field
  }))
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  // Fetch the latest data based on the provided id
  const latest = latestsData.find(m => m.id === params.id)

  return {
    props: {
      latest
    }
  }
}

export default latestDetail
