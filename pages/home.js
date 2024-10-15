import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for Next.js routing
import Head from 'next/head'
import Image from 'next/image';
// import styles from '/styles/Animation.module.css'; 

// Sample JSON import
import movies from '../public/movies.json'; // Path to the JSON file



const HomePage = () => {
  const [items, setItems] = useState({ movie: [], tvshow: [], adult: [] });  // Initialized categories as empty arrays
  const [currentCategory, setCurrentCategory] = useState('movie');  // Current tab
  const [currentPage, setCurrentPage] = useState(1);  // Current page for pagination
  const itemsPerPage = 24;  // 24 items per page

  // Fetch and categorize data on mount
  useEffect(() => {
    categorizeItems(movies); // Categorize items from the JSON
  }, []);

  // Categorizing items into movies, tv shows, adult
  const categorizeItems = (data) => {
    const categorizedItems = { movie: [], tvshow: [], adult: [] };

    data.forEach(item => {
      if (item.badge && item.badge.includes('[ Movie ]')) {
        categorizedItems.movie.push({ id: item.id, image: item.image });
      } else if (item.badge && item.badge.includes('[ TV Show ]')) {
        categorizedItems.tvshow.push({ id: item.id, image: item.image });
      } else if (item.badge && item.badge.includes('[ Adult ]')) {
        categorizedItems.adult.push({ id: item.id, image: item.image });
      }
    });

    setItems(categorizedItems);
  };

  // Get paginated items based on the current page
  const getPaginatedItems = () => {
    const categoryItems = items[currentCategory] || [];  // Ensure categoryItems is always an array
    const startIndex = (currentPage - 1) * itemsPerPage;
    return categoryItems.slice(startIndex, startIndex + itemsPerPage);
  };

  // Render the items in the grid
  const renderItems = () => {
    const currentItems = getPaginatedItems();

    if (!currentItems.length) {
      return <p>No items available.</p>;
    }

    return currentItems.map((item, index) => (
      <div key={index} className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 "> {/* 2 images side by side on mobile */}
        <Link href={`/${currentCategory === 'movie' ? 'movies' : currentCategory === 'tvshow' ? 'tvshow' : 'adult'}/${item.id}`}>
          <Image
            src={item.image}
            alt={item.title}
            width={400} // Adjust the width according to your needs
            height={300} // Adjust the height according to your needs 
            quality={90}
            title={item.title}
            //  loading='lazy'
            priority
            className="border-2 border-blue-500 object-cover w-full h-48"
            style={{ width: '100%', height: 'auto',  boxShadow: '0 0 10px 0 #0000FF', filter: 'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)' }}
          />
        </Link>
      </div>
    ));
  };

  // Pagination Logic
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(items[currentCategory]?.length / itemsPerPage);

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AtoZ Movies™ - Online. Stream. Download.',
      url: 'https://atozmovies.vercel.app/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atozmovies.vercel.app/logo.png',
        width: 280,
        height: 80
      },
      image: 'https://atozmovies.vercel.app/android-chrome-192x192.png' 
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
  ]);
  
  
  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://gravatar.com/drtrailer2022',
        name: 'Dr Trailer',
        url: 'https://gravatar.com/drtrailer2022',
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
        '@id': 'https://atozmovies.vercel.app/#organization',
        name: 'AtoZ Movies™ - Online. Stream. Download. ',
        url: 'https://atozmovies.vercel.app'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://atozmovies.vercel.app/#website',
        url: 'https://atozmovies.vercel.app',
        name: 'AtoZ Movies™ - Online. Stream. Download. ',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://atozmovies.vercel.app/#organization'
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://atozmovies.vercel.app/#webpage',
        url: 'https://atozmovies.vercel.app/',
        name: 'Movie',
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        about: {
          '@type': 'Person',
          '@id': 'https://gravatar.com/drtrailer2022',
          name: 'Dr Trailer',
          url: 'https://gravatar.com/drtrailer2022',
          image: {
            '@type': 'ImageObject',
            '@id': 'https://gravatar.com/drtrailer2022',
            url: 'https://gravatar.com/drtrailer2022',
            caption: 'Dr Trailer',
            inLanguage: 'en-US'
          }
        },
        isPartOf: {
          '@id': 'https://atozmovies.vercel.app/#website'
        },
        inLanguage: 'en-US',
        mainEntity: [
          {
            '@type': 'Article',
            '@id': 'https://atozmovies.vercel.app/',
            url: 'https://atozmovies.vercel.app/',
            headline: 'AtoZ Movies™ - Online. Stream. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
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
              '@id': 'https://atozmovies.vercel.app/#organization',
              name: 'AtoZ Movies™ - Online. Stream. Download. ',
              url: 'https://atozmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://atozmovies.vercel.app/',
            url: 'https://atozmovies.vercel.app/',
            headline: 'AtoZ Movies™ - Online. Stream. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
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
              '@id': 'https://atozmovies.vercel.app/#organization',
              name: 'AtoZ Movies™ - Online. Stream. Download. ',
              url: 'https://atozmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://atozmovies.vercel.app/',
            url: 'https://atozmovies.vercel.app/',
            headline: 'AtoZ Movies™ - Online. Stream. Download. ',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
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


    <>
      <Head>
        <title>AtoZ Movies™ - Online. Stream. Download.</title>

        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://atozmovies.vercel.app/sitemap.xml'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
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
            content='atozmovies,a to z movies,a-z movies,watch free movies,watch movies online,download movies,watch full movies,watch hd movies,123movies,gomovies,yes movies,putlocker,putlockers,soap2day'
          />
        <meta
          name='description'
          content='Stream HD movies and TV series for free on AtoZ Movies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
        />
        <link rel='canonical' href='https://atozmovies.vercel.app/' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='video.movie' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='AtoZ Movies™ - Online. Stream. Download. '
        />
        <meta property='og:url' content='https://atozmovies.vercel.app' />
        <meta
          property='og:site_name'
          content='AtoZ Movies™ - Online. Stream. Download. '
        />
        <meta
          property='og:image'
          content='https://atozmovies.vercel.app/og_image.jpg'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/jpg' />
        <meta
          name='application-name'
          content='AtoZ Movies™ - Online. Stream. Download. '
        />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://atozmovies.vercel.app/sitemap.xml'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='AtoZ Movies™ - Online. Stream. Download.  HD Movies and TV Series Free'
        />
        <meta
          name='twitter:description'
          content='Stream HD movies and TV series for free on AtoZ Movies™. Explore, stream, and download full-length movies and shows in HD quality without registration.'
        />
        <meta
          name='twitter:image'
          content='https://atozmovies.vercel.app/og_image.jpg'
        />
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
          content='dm0x7o2qx13altq75'
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
        
      </Head>

    <div className="container mx-auto mt-3 text-center" style={{ marginTop: '50px', textShadow: '1px 1px 0px #000' }}>
        <div className='container'>
        <div className='content'>
          <h1 className='title font-bold text-2xl' style={{ fontWeight: 'bold', fontSize: '35px' }}>AtoZ Movies™ - Online. Stream. Download.</h1>
          <h2 className='highlight' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Discover the Best Movies and TV Shows to Stream on AtoZ Movies™
          </h2>
          
          </div>
          </div>
      {/* Category Tabs */}
      <ul className="flex justify-around border-b border-gray-300 mb-4 font-bold text-2xl" >
        {['movie', 'tvshow', 'adult'].map(category => (
          <li key={category} className="flex-1">
            <button
              className={`py-2 ${currentCategory === category ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'} w-full font-bold`}
              onClick={() => setCurrentCategory(category)}
              style={{ marginTop: '50px' }}
            >
              {category.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>

      {/* Movie Grid */}
      <div className="flex flex-wrap">
        {renderItems()}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 border rounded disabled:opacity-100 bg-green-500 text-white hover:bg-green-800"  style={{  textShadow: '1px 1px 0px #000' }} 
          >
            Prev
          </button>
          
          {/* need font to be bold */}
          <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 border rounded disabled:opacity-100 bg-blue-500 text-white hover:bg-blue-800"
            style={{  textShadow: '1px 1px 0px #000' }} >
            Next
          </button>
        </div>
      )}
      
    </div>
    </>
  );
};

export default HomePage;













