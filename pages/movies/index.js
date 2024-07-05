import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import latestData from '../../public/latest.json'
import moviesData from '../../public/movies.json'
// import Marquee from '../../components/Marquee'

import Pagination from '../../components/Pagination'
import Head from 'next/head'
import Script from 'next/script'

const uwatchfreeSchema = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AZMovies™ - Explore. Discover. Watch.',
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
        urlTemplate:
          'https://azmovies.vercel.app/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
])

const softwareSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://azmovies.vercel.app/movies/',
  headline: 'AZMovies™ - Explore. Discover. Watch.',
  url: 'https://azmovies.vercel.app/movies/',
  description:
    'Welcome to AZ Movies™ where you watch the best movies from A to Z for free online. Your online source to download and watch free online movies, the latest movie trailers, hd streaming movies, find theater movie times and more at AZ Movies™.',
  image: 'https://azmovies.vercel.app/wp-content/uploads/movies.webp',
  author: {
    '@type': 'Person',
    name: 'DrTrailer',
    url: 'https://gravatar.com/drtrailer2022'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AZMovies™ - Explore. Discover. Watch.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://azmovies.vercel.app/og_image.jpg'
    }
  },
  datePublished: '2024-06-02',
  dateModified: '2024-06-02',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://azmovies.vercel.app/movies/'
  },
  additionalProperty: {
    '@type': 'PropertyValue',
    name: 'Action Platform',
    value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
  }
})

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'AZMovies™.',
      item: 'https://azmovies.vercel.app/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Movies.',
      item: 'https://azmovies.vercel.app/movies/'
    }
  ]
})

const moviesPage = ({ items }) => {
  const [latest, setLatest] = useState(latestData)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1 // Assume there are 3 pages

  useEffect(() => {
    // Logic to fetch browsers for the current page
  }, [currentPage])

  return (
    <div className='w-full' style={{ backgroundColor: '#D3D3D3' }}>
      <Head>
        <title> AZMovies™ - Movies Section.</title>
        <link
          rel='canonical'
          href='https://azmovies.vercel.app/movies/'
        />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta
          property='og:title'
          content='  AZMovies™ - Explore. Discover. Watch.'
        />
        <meta
          property='og:description'
          content='Welcome to AZ Movies™ – your go-to spot for free online movies! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ Movies™!'
        />

        <meta
          property='og:url'
          content='https://azmovies.vercel.app/movies'
        />

        <meta property='og:site_name' content='AZMovies™' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content='https://azmovies.vercel.app/wp-content/uploads/og_image.jpg'
        />
           <meta
          property='description'
          content='Welcome to AZ Movies™ – your go-to spot for free online movies! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ Movies™!'
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Movies' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          name='keywords'
          content='azmovies, a to z movies, a-z movies, az movies, watch free movies, watch movies online, download movies, watch full movies, watch hd movies'
        />
        <meta
          property='og:image'
          content='https://azmovies.vercel.app/wp-content/uploads/og_image.jpg'
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
          content='zifsy861dlzorbop8eww76tsqlf7t4'
        />
        <meta
          name='dailymotion-domain-verification'
          content='dmv6sg06w9r5eji88'
        />
           
      </Head>
      <Script src='../../propler/ads.js' defer />
      <Script src='../../propler/ads2.js' defer />
      <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: softwareSchema }}
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

      <h1
        className='badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6  shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
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
        Latest Movies Section.
      </h1>

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
          {/* <button className='border border-black p-2 m-1 hover:bg-orange-100'>
            <li id='menu-item-194' className='menu-tutorials'>
              <a
                href='../trailer/'
                className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
              >
                Trailers<span className='p'></span>
              </a>
            </li>
          </button> */}
          {/* <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../reviews/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                   Reviews<span className='p'></span>
                </a>
              </li>
            </button>
           
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11606' className='menu-security'>
                <a
                  href='../recaps/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                   Recaps<span className='p'></span>
                </a>
              </li>
            </button>  */}
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
            For Request or Demand Movies Join Telegram
            <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
          </span>
        </a>


      <div className='container'>
        {/* <h1  className='px-0 font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>movies Section</h1> */}
        <div className='flex-container'>
          <div className='main-content'>
            <div className='card-container'>
              {moviesData.map(item => (
                <div key={item.id}>
                  {/* <div key={item.id} className='card'> */}
                  <Link href={`/movies/${item.id}`}>
                    <div className='relative'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        className='rounded-lg'
                        width={140} // Specify the desired width
                        height={140} // Specify the desired height
                        quality={90}
                        style={{
                          width: '200px', // Ensures the image is displayed at this width
                          height: '300px', // Ensures the image is displayed at this height

                          filter:
                            'contrast(1.3) saturate(1.4) brightness(1.2) hue-rotate(10deg)'
                        }}
                      />
                      <p className='text-black text-2xl font-semibold mt-2'>
                        {item.name}
                      </p>
                      <p className='text-black text-bg font-semibold mt-2'>
                        Genre: {item.genre}, Directed by: {item.directorname}
                      </p>
                      <p className='text-black text-bg font-semibold mt-2'>
                        Country of origin: {item.country} Original language:{' '}
                        {item.language}
                      </p>

                      <div className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-black text-lg font-semibold mt-2'>
                        {item.text}
                      </div>
                      <div className='animate-pulse badge bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'>
                        {item.badge}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <p
                className=' text-black text-2xl font-semibold mt-2'
                style={{
                  marginTop: '15px',
                  color: '#000',
                  font: 'bold',
                  textShadow: '1px 2px 2px #000 '
                }}
              >
                Many More Coming Soon...
              </p>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} route="movies" />
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

export async function getStaticProps () {
  try {
    const res = await fetch('https://azmovies.vercel.app/movies.json')
    const data = await res.json()

    return {
      props: {
        items: data
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        items: []
      }
    }
  }
}

export default moviesPage
