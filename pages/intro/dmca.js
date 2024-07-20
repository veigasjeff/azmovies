import React from 'react'
import Head from 'next/head'
import Script from 'next/script'


const dmca = () => {
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
        name: 'AZMovies - Explore. Discover. Connect..',
        url: 'https://azmovies.vercel.app'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://azmovies.vercel.app/#website',
        url: 'https://azmovies.vercel.app',
        name: 'AZMovies - Explore. Discover. Connect..',
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
              name: 'AZMovies - Explore. Discover. Connect..',
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
              name: 'AZMovies - Explore. Discover. Connect..',
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
              name: 'AZMovies - Explore. Discover. Connect..',
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
        <title>AZMovies | DMCA</title>
        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://azmovies.vercel.app/sitemap.xml'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='icon'
          type='image/x-icon'
          href='wp-content/uploads/2023/05/favicon.ico'
        />
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
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta
          name='keywords'
          content='azmovies, a to z movies, a-z movies, az movies, watch free movies, watch movies online, download movies, watch full movies, watch hd movies'
        />
     
        <link
          rel='canonical'
          href='https://azmovies.vercel.app/intro/tearms'
        />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='AZMovies ' />
        <meta
          property='og:description'
          content='Welcome to AZ Movies™ – your go-to spot for free online movies! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ Movies™!'
        />
        <meta
          property='og:url'
          content='https://azmovies.vercel.app/intro/tearms/'
        />
        <meta property='og:site_name' content='AZMovies ' />
        <meta
          property='og:image'
          content='https://azmovies.vercel.app/og_image.webp'
        />
        <meta property='og:image:width' content='1280' />
        <meta property='og:image:height' content='720' />
        <meta property='og:image:type' content='image/jpg' />
        <meta name='application-name' content='AZMovies ' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
           <meta
          property='description'
          content='Welcome to AZ Movies™ – your go-to spot for free online movies! Watch films from A to Z, enjoy HD streaming, and catch the latest trailers. Dive into cinema with AZ Movies™!'
        />
        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://azmovies.vercel.app/sitemap.xml'
        />
        <meta name='twitter:card' content='summary_large_image' />
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
          content='dm0zffs8dj8pcb3gd'
        />
        <meta name='monetag' content='35a75bbdeae678c82776e64fb78cdac5' />
      
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
      <Script src='../../propler/ads.js' defer /> 
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
              <h1 style={headingStyle}>
                DMCA Copyright Infringement Notification
              </h1>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                All trademarks, registered trademarks, product names, and
                company names or logos appearing on the site are the property of
                their respective owners. AZ Movies™ complies with the federal
                Digital Millennium Copyright Act (DMCA) by responding to
                credible notices of alleged infringement that adhere to the DMCA
                and other applicable laws. As part of our response protocol, we
                may take down or disable access to material hosted on the
                AZ Movies™ website that is claimed to be infringing. In such
                cases, we will earnestly attempt to establish contact with the
                developer who posted the disputed material, allowing them the
                opportunity to present a counter notification as outlined by the
                DMCA.
              </p>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Before proceeding with either a Notice of Infringing Material or
                Counter-Notification, it is recommended to seek legal advice to
                fully comprehend your rights and obligations under the DMCA and
                other relevant laws. The subsequent notice guidelines are
                designed to align with AZ Movies™ responsibilities under the
                DMCA, particularly section 512(c), and do not constitute legal
                counsel.
              </p>

              <h2 style={headingStyle}>Notice of Copyright Infringement</h2>
              <ul
                style={{
                  ...listItemStyle,
                  color: '#666',
                  marginBottom: '24px'
                }}
              >
                <li>
                  To submit a notice of infringing material on AZ Movies™, kindly
                  provide a notification containing the ensuing details:
                </li>
                <li>
                  A physical signature of a developer or development team
                  authorized to act on behalf of the owner of an exclusive right
                  that is allegedly infringed. For third-party agencies, please
                  include a copy of the "Physical Authorization Letter" to
                  verify authority over copyrighted content.
                </li>
                <li>
                  Identification of the copyrighted work claimed to be
                  infringed, or, if multiple copyrighted works at a single
                  online location are covered by one notification, furnish a
                  representative list of these works on that site.
                </li>
                <li>
                  Incorporating URLs within the email body is the most effective
                  way to expedite content identification.
                </li>
                <li>
                  Information reasonably sufficient to enable the service
                  provider to contact the complaining party, including an
                  address, telephone number, and, if available, an email address
                  where the complaining party can be reached.
                </li>
                <li>
                  A statement that the complaining party believes in good faith
                  that the material's usage, as complained of, lacks
                  authorization from the copyright owner, its agent, or the law.
                </li>
                <li>
                  A statement affirming the accuracy of the notification's
                  information, along with a declaration, made under penalty of
                  perjury, that the complaining party is authorized to act on
                  behalf of the owner of an exclusive right that is allegedly
                  infringed (Note: Under Section 512(f), individuals who
                  knowingly and materially misrepresent infringing material or
                  activity may be liable for damages).
                </li>
              </ul>

              <h2 style={headingStyle}>Contact Infringement Notice</h2>

              <p style={{ color: '#666' }}>
                Please review these terms and conditions carefully before using
                our website. If you have any questions or concerns, please
                contact us at{' '}
                <a style={linkStyle} href='mailto:ytmagpublisher@outlook.com'>
                ytmagpublisher@outlook.com
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

export default dmca
