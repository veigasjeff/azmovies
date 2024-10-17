import { useState, useRef } from "react"; // Import useState and useRef
import tvshow from "../../../public/tvshow.json"; // Ensure the correct path for your JSON file
import styles from "../../../styles/MovieDetail.module.css"; // Import CSS for the MovieDetail component
import AdultSkipAds from "../../../components/AdultSkipAds";
import GoogleTranslate from "../../../components/GoogleTranslate";
import SocialSharing from "../../../components/SocialSharing";
import SearchComponent from "../../../components/SearchComponent";

import Rating from "../../../components/Rating";
import buttonStyles from "../../../styles/Button.module.css"; // Rename the import for the button styles
import HomeStyles from "@styles/styles.module.css";
import Slider from "../../../components/Slider";
import Link from "next/link"; // Ensure you import Link from Next.js
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

export default function MovieDetail({ movie }) {
  const router = useRouter();

  // Show a loading state if page is not ready
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AtoZ tvshow™",
    url: "https://atozmovies.vercel.app/",
    logo: {
      "@type": "ImageObject",
      url: "https://atozmovies.vercel.app/logo.png",
      width: 280,
      height: 100,
    },
  });

  const webSiteSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://atozmovies.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://atozmovies.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AtoZ tvshow™",
        item: "https://atozmovies.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: movie.name,
        item: movie.siteurl,
      },
    ],
  });

  const tvshowchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    url: movie.siteurl,
    description: movie.synopsis,
    image: movie.image,
    genre: movie.genre,
    datePublished: movie.datePublished,
    director: {
      "@type": "Person",
      name: movie.directorname,
    },
    actor: movie.starring.map((actor) => ({
      "@type": "Person",
      name: actor,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      "ratingValue": movie.ratingValue,      // Use the ratingValue from the movie object
      "bestRating": "10",                     // Highest rating
      "worstRating": "0",                     // Lowest rating
      "ratingCount": movie.ratingCount,       // Use the ratingCount from the movie object
      "reviewCount": "0"                      // Set to "0" as per your requirement
    },
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: movie.siteurl,
      },
    },
  });

  const videoSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: movie.title,
    description: movie.synopsis,
    uploadDate: movie.datePublished,
    thumbnailUrl: movie.image1,
    duration: movie.duration,
    embedUrl: movie.videourl,
  });

  // Determine if the content is a TV show or adult material
  const isTVShow = movie.type === "TV"; // Update this condition based on your JSON structure
  const isAdult = movie.isAdult === true; // Update this condition based on your JSON structure

  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [iframeAccordionExpanded, setIframeAccordionExpanded] = useState(false);
  const playerRef = useRef(null);
  const currentIndexRef = useRef(0);

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  if (!movie) return <div>Loading...</div>;

  const { videomovieitem, videomovies, image1 } = movie;

  // Check if videomovies contains episode data
  const isMovies = videomovies[0] && videomovies[0].includes("/");

  // Extract current video data
  const currentVideoId = videomovieitem[currentEpisodeIndex];
  const currentVideoData = videomovies[currentEpisodeIndex] || {}; // Ensure currentEpisodeIndex is within bounds

  // Default to episode 1 and season 1 if not defined
  const episode = isMovies ? currentVideoData.episode || 1 : null;
  const season = isMovies ? currentVideoData.season || 1 : null;

  // Construct video sources based on whether it's a TV show or a movie
  const videoSources = videomovies.map((item) => {
    const isItemMovies = item.includes("/");
    const [id, itemSeason, itemEpisode] = isItemMovies
      ? item.split("/")
      : [item, null, null];

    return {
      name: isItemMovies ? `Episode ${itemEpisode}` : "Movie",
      urls: [
        `https://short.ink/${currentVideoId}?thumbnail=${image1}`,
        isItemMovies
          ? `https://vidsrc.me/embed/tv?imdb=${id}&season=${itemSeason}&episode=${itemEpisode}`
          : `https://vidsrc.me/embed/movie?imdb=${id}`,
        isItemMovies
          ? `https://vidsrc.pro/embed/tv/${id}/${itemSeason}/${itemEpisode}`
          : `https://vidsrc.pro/embed/movie/${id}`,
        isItemMovies
          ? `https://vidsrc.cc/v2/embed/tv/${id}/${itemSeason}/${itemEpisode}`
          : `https://vidsrc.cc/v2/embed/movie/${id}`,
        isItemMovies
          ? `https://ffmovies.lol/series/?imdb=${id}`
          : `https://ffmovies.lol/movies/?imdb=${id}`,
        isItemMovies
          ? `https://autoembed.co/tv/imdb/${id}-${itemSeason}-${itemEpisode}`
          : `https://autoembed.co/movie/imdb/${id}`,
        isItemMovies
          ? `https://multiembed.mov/directstream.php?video_id=${id}&s=${itemSeason}&e=${itemEpisode}`
          : `https://multiembed.mov/directstream.php?video_id=${id}`,
      ],
    };
  });

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videoSources.length;
      console.log("Next Episode Index:", nextIndex);
      return nextIndex;
    });
  };

  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + videoSources.length) % videoSources.length;
      console.log("Previous Episode Index:", newIndex);
      return newIndex;
    });
  };

  const handlePlayerSelect = (index) => {
    setCurrentPlayerIndex(index);
  };

  // Ensure currentVideoSources is always valid
  const currentVideoSources = videoSources[currentEpisodeIndex]?.urls || [];
  const src = currentVideoSources[currentPlayerIndex] || ""; // Default to an empty string if not available

  const prevEpisodeNumber = episode - 1 < 1 ? videoSources.length : episode - 1;
  const nextEpisodeNumber = (episode % videoSources.length) + 1;

  const toggleIframeAccordion = () => {
    setIframeAccordionExpanded((prev) => !prev);
  };

  // State to manage the visibility of additional download links
  const [showAdditionalLinks, setShowAdditionalLinks] = useState(false);

  // Function to toggle additional download links
  const handleToggleLinks = () => {
    setShowAdditionalLinks((prev) => !prev);
  };

  return (
    <div>
      <Head>
        <title>{movie.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={movie.synopsis} />
        <link rel="canonical" href={movie.siteurl} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.synopsis} />
        <meta property="og:image" content={movie.image1} />
        <meta name="keywords" content={movie.keywords} />
        <meta
          name="keywords"
          content="atozmovies,a to z movies,a-z movies,watch free movies,watch movies online,download movies,watch full movies,watch hd movies,123movies,gomovies,yes movies,putlocker,putlockers,soap2day"
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
        <meta name="twitter:image" content={`${movie.image1}`} />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="1 minute" />
        <meta
          name="google-site-verification"
          content="BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webSiteSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: tvshowchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: videoSchema }}
        />
      </Head>
      <SocialSharing />
      {isAdult && <AdultSkipAds movie={movie} />}
      <Script src="../../propler/ads.js" defer />
      <Script src="../../propler/ads2.js" defer />
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
      {/* <div
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
          // backgroundColor: '#D3D3D3'
          // backgroundColor: '#000'
        }}
      >
        <GoogleTranslate />
      </div> */}
      <span className="px-0 bg-clip-text text-sm text-black font-bold mt-2">
        <SearchComponent />
      </span>
      <div className={buttonStyles.buttonContainer}>
        <button
          onClick={() => router.push("/home")} // Navigates to the home page
          className={buttonStyles.downloadButton}
        >
          Home Page
        </button>
      </div>
      {/* TV Show Description */}
      {/* Movie Description (Default) */}
      {!isTVShow && !isAdult && (
        <>
          <h2 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl  font-bold mt-2">
            {movie.title} Online and Experience Top-Tier Streaming
          </h2>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Dive into the world of cinema with <strong>{movie.title}</strong>,
            available to stream right here. At <strong>AtoZ tvshow™</strong>, we
            bring you the best in entertainment, offering an extensive library
            of tvshow and TV shows, including the latest blockbusters like{" "}
            <strong>{movie.title}</strong>. Whether you're a fan of action,
            drama, comedy, or any other genre, you'll find exactly what you're
            looking for.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Streaming <strong>{movie.title}</strong> on{" "}
            <strong>AtoZ tvshow™</strong> guarantees a seamless viewing
            experience with high-definition quality and uninterrupted playback.
            Our platform is designed to make it easy for you to discover and
            enjoy your favorite films. With regularly updated content, you will
            always have access to the newest releases, ensuring you can watch{" "}
            <strong>{movie.title}</strong> and other top titles as soon as
            they're available.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Don't miss out on the opportunity to stream{" "}
            <strong>{movie.title}</strong>
            online. Join the millions of satisfied viewers who trust{" "}
            <strong>AtoZ tvshow™</strong> for their entertainment needs. Start
            streaming now and experience the thrill of watching{" "}
            <strong>{movie.title}</strong> today!
          </p>
        </>
      )}

      {/* Adult Content Description */}
      {isAdult && (
        <>
          <h2 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl hover:text-blue-800 font-bold mt-2">
            {movie.title} Online - Stream Premium Adult Content
          </h2>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Indulge in the finest selection of adult entertainment with{" "}
            <strong>{movie.title}</strong>. At <strong>AtoZ tvshow™</strong>, we
            offer a vast library of premium adult content, including the latest
            and most popular titles like <strong>{movie.title}</strong>. Our
            platform is designed for those who seek high-quality, discreet
            streaming of adult films, ensuring a seamless and private viewing
            experience.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Streaming <strong>{movie.title}</strong> on{" "}
            <strong>AtoZ tvshow™</strong> provides you with a user-friendly
            interface and crystal-clear video quality. Our adult content is
            regularly updated, giving you access to new releases as soon as they
            become available. Whether you're exploring new genres or returning
            to your favorites, <strong>{movie.title}</strong> and other top
            titles are available at your fingertips.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            For a premium experience in adult entertainment, look no further
            than <strong>{movie.title}</strong> on <strong>AtoZ tvshow™</strong>
            . Our platform ensures your privacy and security while you enjoy the
            content you love. Start streaming <strong>{movie.title}</strong>{" "}
            today and discover why <strong>AtoZ tvshow™</strong> is the trusted
            choice for adult content.
          </p>
        </>
      )}

      {/* Movie Description (Default)
      {!isTVShow && !isAdult && ( */}
      {/* TV Show Description */}
      {isTVShow && (
        <>
          <h2 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl  font-bold mt-2">
            {movie.title} Online and Experience Top-Tier Streaming
          </h2>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Dive into the world of cinema with <strong>{movie.title}</strong>,
            available to stream right here. At <strong>AtoZ tvshow™</strong>, we
            bring you the best in entertainment, offering an extensive library
            of tvshow and TV shows, including the latest blockbusters like{" "}
            <strong>{movie.title}</strong>. Whether you're a fan of action,
            drama, comedy, or any other genre, you'll find exactly what you're
            looking for.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Streaming <strong>{movie.title}</strong> on{" "}
            <strong>AtoZ tvshow™</strong> guarantees a seamless viewing
            experience with high-definition quality and uninterrupted playback.
            Our platform is designed to make it easy for you to discover and
            enjoy your favorite films. With regularly updated content, you will
            always have access to the newest releases, ensuring you can watch{" "}
            <strong>{movie.title}</strong> and other top titles as soon as
            they're available.
          </p>
          <p className={styles.year} style={{ textShadow: "1px 1px 0px #000" }}>
            Don't miss out on the opportunity to stream{" "}
            <strong>{movie.title}</strong>
            online. Join the millions of satisfied viewers who trust{" "}
            <strong>AtoZ tvshow™</strong> for their entertainment needs. Start
            streaming now and experience the thrill of watching{" "}
            <strong>{movie.title}</strong> today!
          </p>
        </>
      )}
      <div className="movie-container">
        <h1 className={styles.title} style={{ textShadow: "1px 1px 0px #000" }}>
          {movie.title}
        </h1>
        {/* <img src={movie.image} alt={movie.title} width={500} height={750} /> */}
        {/* <h1 className={styles.title} style={{ textShadow: '1px 1px 0px #000' }}>{movie.title} </h1> */}
        <div className="animated-border">
          <Image
            src={movie.image}
            alt={movie.title}
            title={movie.name}
            width={500} // Adjust the width according to your needs
            height={750} // Adjust the height according to your needs
            quality={90}
            style={{
              width: "400px", // Ensures the image is displayed at this width
              height: "500px", // Ensures the image is displayed at this height
              objectFit: "cover", // Ensures the image covers the dimensions
              margin: "auto",
              // marginTop: '50px',
              // marginBottom: '20px',
              borderRadius: "50px", // Rounded corners for the image
              boxShadow: "0 0 10px 0 #000", // Shadow effect
              filter:
                "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)", // Image filter effects
            }}
          />
        </div>
        <div className="movie-info">
          <div
            className={styles.centeredDetails}
            style={{ textShadow: "1px 1px 0px #000" }}
          >
            <p className={styles.year}>
              <strong>Released Date:</strong> {movie.year}
            </p>
            <p className={styles.rating}>
              <strong>IDBM Rating:</strong> {movie.rating}
            </p>
            <p className={styles.genre}>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p className={styles.Originalnetwork}>
              <strong>Original Network:</strong> {movie.Originalnetwork}
            </p>
            <p className={styles.directorname}>
              <strong>Director:</strong> {movie.directorname}
            </p>
            <p className={styles.starring}>
              <strong>Starring:</strong> {movie.starring}
            </p>
            <p className={styles.country}>
              <strong>Country:</strong> {movie.country}
            </p>
            <p className={styles.language}>
              <strong>Language:</strong> {movie.language}
            </p>
            <p className={styles.avgTime}>
              <strong>Duration:</strong> {movie.avgTime}
            </p>
            <p className={styles.synopsis}>
              <strong>Synopsis:</strong> {movie.synopsis}
            </p>
          </div>
        </div>

        {/* <div className="trailer">
          <h2>Watch Trailer</h2>
          <iframe 
            src={movie.videourl} 
            width="640" 
            height="360" 
            frameBorder="0" 
            allow="autoplay; fullscreen" 
            allowFullScreen>
          </iframe>
        </div> */}
        <h2 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2">
          Watch Official Trailer {movie.name}
        </h2>
        {/* <main style={{ width: '100%', display: 'block' }}>
          <section> */}
        <div className={styles.iframeWrapper}>
          <div className={styles.iframeContainer}>
            <iframe
              className={styles.iframe}
              frameBorder="0"
              src={`https://geo.dailymotion.com/player/xjrxe.html?video=${movie.traileritem}&mute=true&Autoquality=1080p`}
              allowFullScreen
              title="Dailymotion Video Player"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        </div>
        {/* </section>
        </main> */}

        <div className="actors">
          <h2 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2">
            Cast
          </h2>
          <div className="actor-list">
            <div className={`${HomeStyles.imageGrid} mt-5`}>
              <img
                className={`${HomeStyles.image} img-fluid lazyload image animated1-border`} // "image" class applies your CSS
                src={movie.directorimg}
                alt={movie.directorname}
                title={movie.directorname}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  animation: "pulse 2s infinite",
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />

              <img
                className={`${HomeStyles.image} img-fluid lazyload animated1-border`}
                src={movie.actor1img}
                alt={movie.actor1}
                title={movie.actor1}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />
              <img
                className={`${HomeStyles.image} img-fluid lazyload animated1-border`}
                src={movie.actor2img}
                alt={movie.actor2}
                title={movie.actor2}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />
              <img
                className={`${HomeStyles.image} img-fluid lazyload animated1-border`}
                src={movie.actor3img}
                alt={movie.actor3}
                title={movie.actor3}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />
              <img
                className={`${HomeStyles.image} img-fluid lazyload animated1-border`}
                src={movie.actor4img}
                alt={movie.actor4}
                title={movie.actor4}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />
              <img
                className={`${HomeStyles.image} img-fluid lazyload animated1-border`}
                src={movie.actor5img}
                alt={movie.actor5}
                title={movie.actor5}
                quality={90}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                  boxShadow: "0 0 10px 0 #000", // Shadow effect with black color
                  filter:
                    "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)", // Image filter
                }}
                loading="lazy"
                layout="responsive"
              />
            </div>
          </div>
        </div>

        <Rating />
      </div>
      <div className="relative z-10 mt-4 space-y-4">
        <button
          onClick={handleNextEpisode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          style={{
            textShadow: "1px 1px 0px #000",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Next Episode
        </button>
      </div>

      {/* Video Player */}
      <div
        className={styles.videoPlayerContainer}
        style={{ marginTop: "30px" }}
      >
        {src ? (
          <iframe
            ref={playerRef}
            src={src}
            width="100%"
            height="600px"
            allowFullScreen
            allow="fullscreen; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            style={{ borderRadius: "15px" }}
          />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
      <div className="relative z-10 mt-4 space-y-4">
        <button
          onClick={handlePreviousEpisode}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          style={{
            textShadow: "1px 1px 0px #000",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Previous Episode
        </button>
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="flex flex-wrap justify-center mb-4 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text hover:text-blue-800 text-bg font-semibold mt-2">
          {currentVideoSources.map((source, index) => (
            <button
              key={index}
              onClick={() => handlePlayerSelect(index)}
              className={`mx-2 my-1 px-4 py-2 rounded ${
                currentPlayerIndex === index
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-green-500 hover:text-white transition duration-300 ease-in-out`}
              style={{
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "10px 20px",
                margin: "5px",
                textShadow: "1px 1px 0px #000",
              }}
            >
              Player {index + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Previous Episode Button - Display only if it's a TV show */}

      <div className="flex flex-col items-center justify-center">
        {/* Render the button for Season 2 if linkurl exists */}
        {movie.linkurl && (
          <Link href={movie.linkurl}>
            <div
              className={`px-4 py-2 border rounded mx-2 my-1 ${
                movie.linkurl ? "bg-red-500 text-white" : "bg-gray-200"
              } hover:bg-green-700 hover:text-white`}
              style={{
                fontFamily: "Poppins, sans-serif",
                marginTop: "20px",
                textShadow: "1px 1px 0px #000",
                filter:
                  "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)",
              }}
            >
              Click to Watch Next Season
            </div>
          </Link>
        )}

        {/* Render the button for Season 1 if linkurl2 exists */}
        {movie.linkurl2 && (
          <Link href={movie.linkurl2}>
            <div
              className={`px-4 py-2 border rounded mx-2 my-1 ${
                movie.linkurl2 ? "bg-red-500 text-white" : "bg-gray-200"
              } hover:bg-green-700 hover:text-white`}
              style={{
                fontFamily: "Poppins, sans-serif",
                marginTop: "20px",
                textShadow: "1px 1px 0px #000",
                filter:
                  "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)",
              }}
            >
              Click to Watch Previous Season
            </div>
          </Link>
        )}
      </div>
      {/* Download button section */}
      <button
        onClick={handleToggleLinks}
        className="animate-pulse bg-gradient-to-r from-amber-500 to-pink-500 text-black font-bold py-2 px-4 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-xl"
      >
        Download Now
      </button>

      {/* Display multiple download links */}
      {showAdditionalLinks && (
        <div>
          {Object.keys(movie)
            .filter((key) => key.startsWith("downloadlink"))
            .map((key, index) => (
              <Link key={index} href={movie[key]} target="_blank">
                <div
                  className="bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300"
                  style={{
                    margin: "auto",
                    marginTop: "10px", // Adjusted margin
                    borderRadius: "8px", // Adjusted border radius
                    boxShadow: "0 0 10px 0 #fff",
                    textShadow: "1px 1px 0px #000",
                    filter:
                      "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
                    width: "fit-content", // Makes button width fit content
                  }}
                >
                  <span
                    className="animate-pulse"
                    style={{
                      color: key === "downloadlink1" ? "#FF0000" : "#0efa06",
                      fontSize: "20px", // Consistent font size
                      textShadow: "3px 5px 5px #000",
                    }}
                  >
                    <i
                      className={
                        key === "downloadlink1"
                          ? "fa fa-magnet"
                          : "fa fa-download"
                      }
                      aria-hidden="true"
                    ></i>{" "}
                  </span>
                  Download
                </div>
              </Link>
            ))}
        </div>
      )}
      <Slider tvshow={tvshow} />

      <style jsx>{`
        .animated-border {
  position: relative;
  display: inline-block;
  border-radius: 55px;
  padding: 5px;
  /* Creates space for the border */
  background: conic-gradient(from 0deg, #ff4545, #00ff99, #006aff, #ff0095, #ff4545);
  background-size: 300% 300%;
  animation: spin-border 3s linear infinite;
}

.animated-border {
  border: 5px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
}

@keyframes spin-border {
  from {
    background-position: 0%;
  }

  to {
    background-position: 100%;
  }
}
  @keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animated1-border {
  animation: pulse 2s infinite; /* Or adjust the duration */
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

}

@media (min-width: 1024px) {


  .telegram-link {
    font-size: 2.5rem;
  }
      `}</style>

      <style jsx>{`
        .animated1-border {
          position: relative;
          display: inline-block;
          border-radius: 15px;
          padding: 5px;
          /* Creates space for the border */
          background: conic-gradient(
            from 0deg,
            #ff4545,
            #00ff99,
            #006aff,
            #ff0095,
            #ff4545
          );
          background-size: 300% 300%;
          animation: spin-border 3s linear infinite;
        }

        .animated-border {
          border: 5px solid transparent;
          background-clip: padding-box, border-box;
          background-origin: padding-box, border-box;
        }

        @keyframes spin-border {
          from {
            background-position: 0%;
          }

          to {
            background-position: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Use getStaticPaths to generate static pages
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "tvshow.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const tvshow = JSON.parse(fileContents);

  const paths = tvshow.map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: true };
}

// Use getStaticProps to fetch movie data at build time
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "public", "tvshow.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const tvshow = JSON.parse(fileContents);

  const movie = tvshow.find((movie) => movie.id === params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
}
