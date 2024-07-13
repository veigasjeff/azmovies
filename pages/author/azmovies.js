import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ytmag ({ movie }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        let searchTermLower = searchTerm.toLowerCase();
        let searchURL;
        if (searchTermLower.includes('tv show')) {
            searchURL = `https://www.google.com/search?q=site:https://azmovies.vercel.apptvshow/${encodeURIComponent(searchTermLower)}-2024`;
        } else {
            searchURL = `https://www.google.com/search?q=site:https://azmovies.vercel.appmovie/${encodeURIComponent(searchTermLower)}-2024`;
        }
        router.push(searchURL);
    };
    return (
        <div className={`w-full bg-gray-600 shadow`}>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>A to Z Movies - Explore. Discover. Download.</title>
                {/* Add your other meta tags here */}
                <script
                    type="application/ld+json"
                    className="rank-math-schema"
                    dangerouslySetInnerHTML={{
                        __html: `{
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Person",
                                    "@id": "https://gravatar.com/drtrailer2022/#person",
                                    "name": "Dr Trailer"
                                },
                                {
                                    "@type": "WebSite",
                                    "@id": "https://azmovies.vercel.app#website",
                                    "url": "https://azmovies.vercel.app",
                                    "name": "Youtube Magazine™",
                                    "publisher": {
                                        "@id": "https://gravatar.com/drtrailer2022/#person"
                                    },
                                    "inLanguage": "en-US"
                                },
                                {
                                    "@type": "ProfilePage",
                                    "@id": "https://azmovies.vercel.appauthor/ytmag/#webpage",
                                    "url": "https://azmovies.vercel.appauthor/ytmag/",
                                    "name": "Dr Trailer",
                                    "isPartOf": {
                                        "@id": "https://azmovies.vercel.app#website"
                                    },
                                    "inLanguage": "en-US",
                                    "mainEntityOfPage": {
                                        "@id": "https://azmovies.vercel.appauthor/A to Z Movies/#webpage"
                                    }
                                },
                                {
                                    "@type": "Person",
                                    "@id": "https://azmovies.vercel.appauthor/A to Z Movies/",
                                    "name": "Dr Trailer",
                                    "url": "https://azmovies.vercel.appauthor/A to Z Movies/",
                                    "image": {
                                        "@type": "ImageObject",
                                        "@id": "https://gravatar.com/drtrailer2022",
                                        "url": "https://gravatar.com/drtrailer2022",
                                        "caption": "Dr Trailer",
                                        "inLanguage": "en-US"
                                    },
                                    "sameAs": [
                                        "https://azmovies.vercel.app"
                                    ],
                                    "mainEntityOfPage": {
                                        "@id": "https://azmovies.vercel.appauthor/A to Z Movies/#webpage"
                                    }
                                }
                            ]
                        }`
                    }}
                ></script>
            </Head>
 
            <div id="main">
            <h1 className="flex flex-col text-center py-5 font-bold text-3xl items-center justify-center" style={{ color: "#40D7BC", textShadow: "5px 5px 2px #000" }}>A to Z Movies - Explore. Discover. Download. </h1>
                <div className="container" style={{justifyContent: 'center', alignItems: 'center', height: '10vh', marginTop: '100px', }}>
                    <div className="home-main">
                        <div className="hm-logo"><a title="" href="https://azmovies.vercel.app" id="logo-home"></a></div>
                        <div className="addthis_inline_share_toolbox mb10"></div>
                        <div id="hm-search">
                            <div id="search-homepage" className="search-content">
                                <form onSubmit={handleSearch}>
                                    <input
                                        className="form-control search-input"
                                        type="text"
                                        placeholder="Search.."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form>
                                <div id="search-homepage-results"></div>
                            </div>
                        </div>
                        <div className="hm-button"><a href="https://azmovies.vercel.app" className="btn btn-lg btn-successful" ></a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
