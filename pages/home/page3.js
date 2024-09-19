import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script'
import GoogleTranslate from '../../components/GoogleTranslate';
import SocialSharing from '../../components/SocialSharing';
import SearchComponent from '../../components/SearchComponent';
import { useMediaQuery } from 'react-responsive';
import styles from '@styles/navigation.module.css'

const page3 = ({ items }) => {
  const [latest, setLatest] = useState(items || []); // Ensure items is defined, fallback to an empty array if undefined
  const router = useRouter();
  const currentPage = parseInt(router.pathname.replace('/home/page', '')) || 1;
  const totalPages = 20; // Adjust this based on the total number of pages

  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  // State to track when the component has mounted
  const [mounted, setMounted] = useState(false);

  // Media query definitions
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Ensure this runs after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until component has mounted
  if (!mounted) {
    return null;
  }

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Justwatch™ - Online. Stream. Download.',
      url: 'https://atozmovies.vercel.app/',
      image: ['https://atozmovies.vercel.app/favicon.ico'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/logo.png',
        width: 280,
        height: 80
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
  
  const softwareSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://atozmovies.vercel.app/home/page3',
    headline: 'Page 3 | Justwatch™',
    url: 'https://atozmovies.vercel.app/home/page3',
    description:
      'Justwatch™ - Stream HD movies and TV series for free on Justwatch™ Online. Stream. Download. full-length movies and shows in HD quality without registration.',
    image: 'https://atozmovies.vercel.app/og_image.jpg',
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Justwatch™ - Online. Stream. Download.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/og_image.jpg'
      }
    },
    datePublished: '2024-06-02',
    dateModified: '2024-06-02',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://atozmovies.vercel.app/home/page3'
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['movies Web Platform', 'iOS Platform', 'Android Platform']
    }
  })
  
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://atozmovies.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'movies',
        item: 'https://atozmovies.vercel.app/home/page3'
      }
    ]
  })

  return (
    <div className='w-full' style={{ backgroundColor: '#000' }}>
      <Head>
        <title> Page 3 | Justwatch™</title>
        <link rel='canonical' href='https://atozmovies.vercel.app/home/page3' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content=' Page 3 | Justwatch™' />
        <meta
          property='og:description'
          content='Justwatch™ - Stream HD movies and TV series for free on Justwatch™ Online. Stream. Download. full-length movies and shows in HD quality without registration.'
        />

        <meta property='og:url' content='https://atozmovies.vercel.app/home/page3' />

        <meta property='og:site_name' content='Justwatch™' />
        <meta property='og:type' content='article' />
        <meta
          property=' og:image:alt'
          content='https://atozmovies.vercel.app/og_image.jpg'
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Justwatch™' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
      <meta
          name='keywords'
         content='justwatch,justwatch free,justwatch 2024,watch free movies,watch movies online,download movies,watch full movies,watch hd movies'
        />
        <meta
          property='og:image'
          content='https://atozmovies.vercel.app/og_image.jpg'
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
          dangerouslySetInnerHTML={{ __html: softwareSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
      </Head>
      <SocialSharing />
       <Script src='../../propler/ads.js' defer /> 
       <Script src='../../propler/ads2.js' defer /> 
       <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent hover:text-blue-800 font-bold mt-2"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          fontSize: '35px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '15px',
        }}
      >
       Justwatch™ Movies Page 3
      </h1>
      <a
        href='https://t.me/watchmovietvshow/'
        target='_blank'
        rel='noopener noreferrer'
        className='telegram-link'
        style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}
      >
        <p style={{ display: 'inline-block' }}>
          For Request or Demand <br /> 
          Movies & TV Series Join Telegram
          <i className='fab fa-telegram telegram-icon'></i>
        </p>
      </a>
      <GoogleTranslate />
     
      <div
        className='shadow-lg flex items-center justify-center'
        role='navigation'
        style={{ marginTop: '15px' }}
      >
        <ul
          id='menu-header-menu'
          className='menu flex flex-wrap justify-center'
        >
          <button className={styles.customButton}>
            <li id='menu-item-284913'>
              <a href='../home/page1' className={styles.textContent}>
                Movies
              </a>
            </li>
          </button>

          <button className={styles.customButton}>
            <li id='menu-item-248'>
              <a href='../tv/page1' className={styles.textContent}>
                Tv Show
              </a>
            </li>
          </button>

          <button className={styles.customButton}>
            <li id='menu-item-11605'>
              <a href='../ad/page1' className={styles.textContent}>
                Adult
              </a>
            </li>
          </button>
        </ul>
      </div>
    
      <div className="flex justify-center items-center my-4 gap-4">
      {isDesktop && (
        <div className="flex flex-col justify-center items-center gap-2">
          {/* First row of pages for desktop and laptop devices */}
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/home/page1" passHref>
              <button
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? 'bg-red-500 text-white font-bold'
                    : 'bg-gray-200 hover:bg-green-500 text-black font-bold'
                }`}
              >
                Page 1
              </button>
            </Link>

            {[2, 3, 4, 5, ].map((page) => (
              <Link key={page} href={`/home/page${page}`} passHref>
                <button
                  className={`px-4 py-2 border rounded ${
                    currentPage === page
                      ? 'bg-red-500 text-white font-bold'
                      : 'bg-gray-200 hover:bg-green-500 text-black font-bold'
                  }`}
                >
                  PAGE {page}
                </button>
              </Link>
            ))}
          </div>

          {/* Second row for pages 11 and 12 */}
          {/* <div className="flex justify-center gap-2">
            {[11, ].map((page) => (
              <Link key={page} href={`/home/page${page}`} passHref>
                <button
                  className={`px-4 py-2 border rounded ${
                    currentPage === page
                      ? 'bg-red-500 text-white font-bold'
                      : 'bg-gray-200 hover:bg-green-500 text-black font-bold'
                  }`}
                >
                  PAGE {page}
                </button>
              </Link>
            ))}
          </div> */}
        </div>
      )}

      {isMobile && (
        <div className="flex justify-center items-center my-4 gap-4">
          {/* Previous button for mobile */}
          <Link href={`/home/page${previousPage}`} passHref>
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-green-500 text-black font-bold'
              }`}
              disabled={currentPage === 1}
            >
              « Previous
            </button>
          </Link>

          {/* Current page display for mobile */}
          <span className="px-4 py-2 border rounded bg-blue-500 text-white font-bold">
            Page {currentPage}
          </span>

          {/* Next button for mobile */}
          <Link href={`/home/page${nextPage}`} passHref>
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-green-500 text-black font-bold'
              }`}
              disabled={currentPage === totalPages}
            >
              Next »
            </button>
          </Link>
        </div>
      )}
    </div>
    <span className="px-0 bg-clip-text text-sm text-black font-bold mt-2 "  >
        <SearchComponent />
      </span>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latest.map((item) => {
            // Ensure item.siteurl is defined
            if (!item.siteurl) {
              console.warn(`Missing siteurl for item with id ${item.id}`); // Debugging: log missing siteurl
              return null; // Skip rendering this item
            }

            return (
              <div
                key={item.id}
                className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300"
              >
                 <Link href={item['movies.watch']} id={item.id}>
                  <div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10 badge bg-gradient-to-r from-pink-500 to-amber-500 text-white py-2 px-4 rounded-lg text-center font-bold">
                        {item.badge}
                      </div>
                      <div className="aspect-w-16 aspect-h-9 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1280}
                        height={720}
                        className='w-full h-full rounded-t-lg'
                        quality={90}
                        loading='lazy'
                        style={{
                          borderRadius: '0.5rem',
                          objectFit: 'cover' ,
                           filter:
                            'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                        }}
                      />
                    </div>
                   
                      <div className='p-4 '>
                      <h2 className='font-bold text-xl text-blue-500 flex flex-col items-center justify-center'>
                        {item.title}
                       </h2>
                      <h3 className='text-gray-700 mb-2'>{item.news1}</h3>
                        <p className='font-bold text-black mb-2 flex flex-col items-center justify-center'> Genre: </p>
                      <p className="font-bold text-black mb-2 flex flex-col items-center justify-center">
                      {item.genre}
                      </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
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

        @media (min-width: 768px) {
          .title {
            font-size: 2rem;
          }

          .highlight {
            font-size: 2rem;
          }

          .telegram-link {
            font-size: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .title {
            font-size: 2.5rem;
          }

          .highlight {
            font-size: 2.5rem;
          }

          .telegram-link {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch('https://atozmovies.vercel.app/moviesp4.json');
    const data = await res.json();

    return {
      props: {
        items: data || [], // Ensure data is an array
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        items: [], // Return an empty array to avoid issues
      },
    };
  }
}

export default page3;
