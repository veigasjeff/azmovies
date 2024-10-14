import { getAllItems } from '../lib/api';

export async function getServerSideProps({ res }) {
    const { movies, tvshow, adult } = await getAllItems();

    // Create the sitemap XML structure
    const sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${movies
                .map(({ id, slug }) => `
                    <url>
                        <loc>https://atozmovies.vercel.app/movies/${slug}</loc>
                        <changefreq>daily</changefreq>
                    </url>
                `)
                .join('')}
            ${tvshow
                .map(({ id, slug }) => `
                    <url>
                        <loc>https://atozmovies.vercel.app/tvshow/${slug}</loc>
                        <changefreq>daily</changefreq>
                    </url>
                `)
                .join('')}
            ${adult
                .map(({ id, slug }) => `
                    <url>
                        <loc>https://atozmovies.vercel.app/adult/${slug}</loc>
                        <changefreq>daily</changefreq>
                    </url>
                `)
                .join('')}
        </urlset>
    `;

    // Fix Content-Type header
    res.setHeader('Content-Type', 'application/xml'); // Set correct content-type to 'application/xml'

    // Write the sitemap to the response and end it
    res.write(sitemap);
    res.end();

    return {
        props: {}, // No additional props are needed for the sitemap
    };
}

// Default export for the sitemap page
export default function Sitemap() {
    return null; // No rendering needed
}
