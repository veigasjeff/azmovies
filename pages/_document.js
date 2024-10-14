// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic meta tags for SEO */}
               
        {/* External stylesheets can be included here */}
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
