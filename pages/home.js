import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

// Sample JSON import (this will now be fetched in getStaticProps)
import movies from "../public/moviesfull.json";

const freeSchema = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AtoZ Movies™ - Online. Stream. Download. ",
    url: "https://atozmovies.vercel.app/",
    image: ["https://atozmovies.vercel.app/favicon.ico"],
    logo: {
      "@type": "ImageObject",
      url: "https://atozmovies.vercel.app/logo.png",
      width: 280,
      height: 80,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://atozmovies.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://atozmovies.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
]);

const rankMathSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://gravatar.com/drtrailer2022",
      name: "Dr Trailer",
      url: "https://gravatar.com/drtrailer2022",
      image: {
        "@type": "ImageObject",
        "@id": "https://gravatar.com/drtrailer2022",
        url: "https://gravatar.com/drtrailer2022",
        caption: "Dr Trailer",
        inLanguage: "en-US",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://atozmovies.vercel.app/#organization",
      name: "AtoZ Movies™ - Online. Stream. Download. ",
      url: "https://atozmovies.vercel.app",
    },
    {
      "@type": "WebSite",
      "@id": "https://atozmovies.vercel.app/#website",
      url: "https://atozmovies.vercel.app",
      name: "AtoZ Movies™ - Online. Stream. Download. ",
      publisher: {
        "@type": "Organization",
        "@id": "https://atozmovies.vercel.app/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://atozmovies.vercel.app/#webpage",
      url: "https://atozmovies.vercel.app/",
      name: "Movie",
      datePublished: "2024-01-13T13:00:00+00:00",
      dateModified: "2024-01-13T13:13:00+00:00",
      about: {
        "@type": "Person",
        "@id": "https://gravatar.com/drtrailer2022",
        name: "Dr Trailer",
        url: "https://gravatar.com/drtrailer2022",
        image: {
          "@type": "ImageObject",
          "@id": "https://gravatar.com/drtrailer2022",
          url: "https://gravatar.com/drtrailer2022",
          caption: "Dr Trailer",
          inLanguage: "en-US",
        },
      },
      isPartOf: {
        "@id": "https://atozmovies.vercel.app/#website",
      },
      inLanguage: "en-US",
      mainEntity: [
        {
          "@type": "Article",
          "@id": "https://atozmovies.vercel.app/",
          url: "https://atozmovies.vercel.app/",
          headline: "AtoZ Movies™ - Online. Stream. Download. ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
          author: {
            "@type": "Person",
            "@id": "https://gravatar.com/drtrailer2022",
            name: "Dr Trailer",
            url: "https://gravatar.com/drtrailer2022",
            image: {
              "@type": "ImageObject",
              "@id": "https://gravatar.com/drtrailer2022",
              url: "https://gravatar.com/drtrailer2022",
              caption: "Dr Trailer",
              inLanguage: "en-US",
            },
          },
          publisher: {
            "@type": "Organization",
            "@id": "https://atozmovies.vercel.app/#organization",
            name: "AtoZ Movies™ - Online. Stream. Download. ",
            url: "https://atozmovies.vercel.app",
          },
        },
        {
          "@type": "Article",
          "@id": "https://atozmovies.vercel.app/",
          url: "https://atozmovies.vercel.app/",
          headline: "AtoZ Movies™ - Online. Stream. Download. ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
          author: {
            "@type": "Person",
            "@id": "https://gravatar.com/drtrailer2022",
            name: "Dr Trailer",
            url: "https://gravatar.com/drtrailer2022",
            image: {
              "@type": "ImageObject",
              "@id": "https://gravatar.com/drtrailer2022",
              url: "https://gravatar.com/drtrailer2022",
              caption: "Dr Trailer",
              inLanguage: "en-US",
            },
          },
          publisher: {
            "@type": "Organization",
            "@id": "https://atozmovies.vercel.app/#organization",
            name: "AtoZ Movies™ - Online. Stream. Download. ",
            url: "https://atozmovies.vercel.app",
          },
        },
        {
          "@type": "Article",
          "@id": "https://atozmovies.vercel.app/",
          url: "https://atozmovies.vercel.app/",
          headline: "AtoZ Movies™ - Online. Stream. Download. ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
          author: {
            "@type": "Person",
            "@id": "https://gravatar.com/drtrailer2022",
            name: "Dr Trailer",
            url: "https://gravatar.com/drtrailer2022",
            image: {
              "@type": "ImageObject",
              "@id": "https://gravatar.com/drtrailer2022",
              url: "https://gravatar.com/drtrailer2022",
              caption: "Dr Trailer",
              inLanguage: "en-US",
            },
          },
        },
      ],
    },
  ],
});

const HomePage = ({ categorizedItems }) => {
  const [currentCategory, setCurrentCategory] = useState("movie"); // Current tab
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 24; // 24 items per page

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Get paginated items based on the current page
  const getPaginatedItems = () => {
    const categoryItems = categorizedItems[currentCategory] || []; // Ensure categoryItems is always an array
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
      <div key={index} className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 ">
        <Link
          href={`/${
            currentCategory === "movie"
              ? "movies"
              : currentCategory === "tvshow"
              ? "tvshow"
              : "adult"
          }/${item.id}`}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={400}
            height={300}
            quality={90}
            title={item.title}
            priority
            className="border-2 border-blue-500 object-cover w-full h-48"
            style={{
              width: "100%",
              height: "auto",
              boxShadow: "0 0 10px 0 #0000FF",
              filter:
                "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)",
            }}
          />
        </Link>
      </div>
    ));
  };

  const totalPages = Math.ceil(
    categorizedItems[currentCategory]?.length / itemsPerPage
  );

  return (
    <>
      <Head>
        <title>AtoZ Movies™ - Home Page.</title>
        <meta
          name="description"
          content="Watch and download movies, TV shows, and adult content online for free. Join the AtoZ Movies™ community now!"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://atozmovies.vercel.app/home" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          href="https://atozmovies.vercel.app/home"
          hreflang="en-us"
        />
        <meta
          property="og:image"
          content="https://atozmovies.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AtoZ Movies™ - Explore. Discover. Online."
        />
        <meta
          name="twitter:description"
          content="Stream HD movies and TV series for free on AtoZ Movies™. Online. Stream. Download. full-length movies and shows in HD quality without registration."
        />
        <meta
          name="twitter:image"
          content="https://atozmovies.vercel.app/og_image.jpg"
        />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="1 minute" />
        <meta
          name="google-site-verification"
          content="BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: freeSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
      </Head>
      <div
        className="container mx-auto mt-3 text-center"
        style={{ marginTop: "50px", textShadow: "1px 1px 0px #000" }}
      >
        <div className="container">
          <div className="content">
            <h1 className="title">AtoZ Movies™ - Online. Stream. Download.</h1>

            <a
              href="https://t.me/watchmovietvshow/"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
              style={{
                display: "block",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <p
                style={{ display: "inline-block" }}
                className=" title text-2xl font-bold"
              >
                For Request or Demand <br />
                Movies & TV Series Join Telegram
                <i
                  className="fab fa-telegram telegram-icon"
                  style={{ marginLeft: "8px" }}
                ></i>
              </p>
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <ul className="flex justify-around border-b border-gray-300 mb-4 font-bold text-2xl">
          {["movie", "tvshow", "adult"].map((category) => (
            <li key={category} className="flex-1">
              <button
                className={`py-2 ${
                  currentCategory === category
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                } w-full font-bold`}
                onClick={() => setCurrentCategory(category)}
                style={{ marginTop: "50px" }}
              >
                {category.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: freeSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />

        {/* Movie Grid */}
        <div className="flex flex-wrap">{renderItems()}</div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 border rounded disabled:opacity-100 bg-green-500 text-white hover:bg-green-800"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Prev
            </button>

            {/* Font is bold */}
            <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 border rounded disabled:opacity-100 bg-blue-500 text-white hover:bg-blue-800"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Next
            </button>
          </div>
        )}
        <style jsx>{`
          .title {
            font-size: 1.25rem;
            font-weight: 900;
            margin-bottom: 1rem;
            text-transform: uppercase;
            text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
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
              font-size: 1rem;
            }
          }

          @media (min-width: 1024px) {
            .title {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

// SSG: Get static props at build time
export async function getStaticProps() {
  // Categorize items from the JSON
  const categorizedItems = { movie: [], tvshow: [], adult: [] };

  movies.forEach((item) => {
    if (item.badge && item.badge.includes("[ Movie ]")) {
      categorizedItems.movie.push({ id: item.id, image: item.image });
    } else if (item.badge && item.badge.includes("[ TV Show ]")) {
      categorizedItems.tvshow.push({ id: item.id, image: item.image });
    } else if (item.badge && item.badge.includes("[ Adult ]")) {
      categorizedItems.adult.push({ id: item.id, image: item.image });
    }
  });

  return {
    props: {
      categorizedItems, // Pass the categorized items as props to the component
    },
  };
}

export default HomePage;
