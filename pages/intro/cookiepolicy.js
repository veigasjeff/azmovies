import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import GoogleTranslate from '../../components/GoogleTranslate';
import SocialSharing from '../../components/SocialSharing';

const cookiepolicy = () => {
  const containerStyle = {
    margin: '24px auto',
    padding: '0 24px',
    maxWidth: '960px'
  }

  const sectionStyle = {
    marginBottom: '32px',
    color: '#333'
  }

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  }

  const listItemStyle = {
    marginLeft: '20px'
  }

  const linkStyle = {
    fontWeight: 'bold',
    color: '#007bff',
    textDecoration: 'none'
  }

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://azmovies.vercel.app/author/ytmag/',
        name: 'Dr Trailer',
        url: 'https://azmovies.vercel.app/author/ytmag/',
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
        '@id': 'https://azmovies.vercel.app/#organization',
        name: 'AZMovies™ - Explore. Discover. Download. ',
        url: 'https://azmovies.vercel.app'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://azmovies.vercel.app/#website',
        url: 'https://azmovies.vercel.app',
        name: 'AZMovies™ - Explore. Discover. Download. ',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://azmovies.vercel.app/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://azmovies.vercel.app/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://azmovies.vercel.app/#webpage',
        url: 'https://azmovies.vercel.app/',
        name: 'Movie',
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        about: {
          '@type': 'Person',
          '@id': 'https://azmovies.vercel.app/author/ytmag/',
          name: 'Dr Trailer',
          url: 'https://azmovies.vercel.app/author/ytmag/',
          image: {
            '@type': 'ImageObject',
            '@id': 'https://gravatar.com/drtrailer2022',
            url: 'https://gravatar.com/drtrailer2022',
            caption: 'Dr Trailer',
            inLanguage: 'en-US'
          }
        },
        isPartOf: {
          '@id': 'https://azmovies.vercel.app/#website'
        },
        inLanguage: 'en-US',
        mainEntity: [
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
            headline: 'Movie',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/ytmag/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/ytmag/',
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
              '@id': 'https://azmovies.vercel.app/#organization',
              name: 'AZMovies™ - Explore. Discover. Download. ',
              url: 'https://azmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
            headline: 'Tvshow',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/ytmag/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/ytmag/',
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
              '@id': 'https://azmovies.vercel.app/#organization',
              name: 'AZMovies™ - Explore. Discover. Download. ',
              url: 'https://azmovies.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://azmovies.vercel.app/',
            url: 'https://azmovies.vercel.app/',
            headline: 'Adult',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://azmovies.vercel.app/author/ytmag/',
              name: 'Dr Trailer',
              url: 'https://azmovies.vercel.app/author/ytmag/',
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
              '@id': 'https://azmovies.vercel.app/#organization',
              name: 'AZMovies™ - Explore. Discover. Download. ',
              url: 'https://azmovies.vercel.app'
            }
          }
        ]
      }
    ]
  })


  return (
    <div>
      <Head>
        <title>AZMovies™ | Cookie Policy</title>
        <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://azmovies.vercel.app/sitemap.xml'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
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
           content='azmovies, a to z movies, a-z movies, az movies, watch free movies, watch movies online, download movies, watch full movies, watch hd movies, 123movies, gomovies, putlocker, putlockers, soap2day'
          />
          <meta
            name='description'
            content='Stream HD movies and TV series for free on AZMovies. Explore, stream, and download full-length movies and shows in HD quality without registration.'
          />
          <link rel='canonical' href='https://azmovies.vercel.app/cookiepolicy/' />
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='video.movie' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='AZMovies™ - Explore. Discover. Download. '
          />
          <meta property='og:url' content='https://azmovies.vercel.app/cookiepolicy/' />
          <meta
            property='og:site_name'
            content='AZMovies™ - Explore. Discover. Download. '
          />
          <meta
            property='og:image'
            content='https://azmovies.vercel.app/og_image.jpg'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:image:type' content='image/jpg' />
          <meta
            name='application-name'
            content='AZMovies™ - Explore. Discover. Download. '
          />
          <meta
            property='article:modified_time'
            content='2024-01-01T13:13:13+00:00'
          />
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://azmovies.vercel.app/sitemap.xml'
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta
            name='twitter:title'
            content='AZMovies™ - Explore. Discover. Download.  HD Movies and TV Series Free'
          />
          <meta
            name='twitter:description'
            content='Stream HD movies and TV series for free on AZMovies™. Explore, stream, and download full-length movies and shows in HD quality without registration.'
          />
          <meta
            name='twitter:image'
            content='https://azmovies.vercel.app/og_image.jpg'
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
            content='dmlp2t3912gbq4occ'
          />
          <meta name='monetag' content='98a412cb5612b9188cd76b9744304b6c' />

       
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

            webpushr('setup', { 'key': 'BBQBh9BNi-dtzrb7ayxfk3Kuh11sEA0hiPlNpdyHX0pueAdWd4lxPInWWXC3bcc5EsZTx8jDnZeDiJCRKkA91Lo' });
          `
          }}
        />
          
      </Head>
      <GoogleTranslate />
 <SocialSharing />
      {/* <Script src='../../propler/ads.js' defer /> */}
      <Script src='../../propler/ads2.js' defer />
      <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div
              style={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: 'auto',
                marginBottom: '12px',
                width: '100%',
                padding: '0 12px'
              }}
            >
              <h1 style={headingStyle}>Cookie Policy</h1>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                This is the Cookie Policy for AZMovies™, accessible from
                https://azmovies.vercel.app and its subdomains.
              </p>

              <h2 style={headingStyle}>What Are Cookies</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                As is common practice with nearly all professional websites,
                this site uses cookies, which are small files ed to your
                computer, to enhance your browsing experience. This page
                explains the information they collect, their purpose, and why we
                occasionally need to store these cookies. We'll also outline how
                you can prevent these cookies from being stored, though this
                might result in the reduction or disruption of certain site
                features.
              </p>

              <h2 style={headingStyle}>How We Use Cookies</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                We employ cookies for various purposes as detailed below.
                Unfortunately, in most cases, there are no universally accepted
                industry settings to disable cookies without entirely
                sacrificing the functionality and features they contribute to
                the site. It is advisable to keep all cookies enabled unless you
                are unsure whether they are necessary, in case they are used to
                provide a service you utilize.
              </p>

              <h2 style={headingStyle}>Disabling Cookies</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                You have the option to prevent cookies from being set by
                adjusting your browser settings (consult your browser's Help
                section for guidance). Be aware that disabling cookies will
                impact the functionality of this site, along with many other
                websites you visit. This usually involves the deactivation of
                certain features and functionalities on this site. Thus, it is
                recommended that you do not disable cookies.
              </p>

              <h2 style={headingStyle}>The Cookies We Set</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Forms Related Cookies: When you submit data through forms like
                those on contact pages or comment forms, cookies might be set to
                remember your user details for future interactions.
              </p>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Site Preferences Cookies: To offer you a tailored experience on
                this site, we enable you to customize your preferences for how
                the site behaves when you use it. These preferences are stored
                in cookies so that the site can recall them when you interact
                with pages affected by your choices.
              </p>

              <h2 style={headingStyle}>Third Party Cookies</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                In specific cases, we use cookies from trusted third parties.
                The following section outlines third party cookies you might
                encounter on this site.
              </p>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                This site employs Google Analytics, a widely used and reliable
                analytics solution that helps us understand your site usage for
                further improvement. These cookies track data such as time spent
                on the site and visited pages, aiding us in producing engaging
                content. For more information on Google Analytics cookies, refer
                to the official Google Analytics page.
              </p>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                The Google AdSense and/or Google AdManager service, used to
                deliver advertising, uses a DoubleClick cookie to show more
                relevant ads across the web and limit the frequency of specific
                ads shown to you. For further details on Google AdSense, consult
                the official Google AdSense privacy FAQ. Advertisements support
                the site's operational costs and development. The behavioral
                advertising cookies on this site anonymously track your
                interests to ensure relevant ad display. These ads mirror your
                interests and may appeal to you.
              </p>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Several partners advertise on our behalf; affiliate tracking
                cookies verify if customers visit via our partner sites,
                enabling proper crediting and bonus provision for purchases made
                through affiliate partners.
              </p>
              {/* Add more sections with similar structure */}
              <h2 style={headingStyle}>More Information</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                We hope this clarifies matters. As previously mentioned, if
                you're uncertain about whether you require cookies enabled, it's
                safer to keep them enabled in case they interact with features
                you use on our site.
              </p>

              <p style={{ color: '#666' }}>
                Please review these terms and conditions carefully before using
                our website. If you have any questions or concerns, please
                contact us at{' '}
                <a style={linkStyle} href='mailto:softwatebay@outlook.com'>
                  softwatebay@outlook.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

   
      </div>
    </div>
  )
}

export default cookiepolicy
