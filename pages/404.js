import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';

export default function ErrorPage() {
    useEffect(() => {
        // Redirect to the homepage after a few seconds
        const redirectTimer = setTimeout(() => {
            window.location.href = "/";
        }, 5000); // Redirect after 5 seconds (5000 milliseconds)

        // Clear the timer when the component unmounts or changes
        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div>
            <div className="text-red-600 text-4xl font-bold flex title-font py-5 items-center justify-center">Error message: Oops! Something Went WRONG!!!
            </div>
            <div className="text-red-600 text-4xl font-bold flex title-font py-5 items-center justify-center"> You will be Auto Redirected to Home page.
            </div>
            <div className="flex items-center justify-center">
                <Image src='https://azmovies.vercel.app/404.webp' alt='404' width={800} height={400} loading="lazy" />
            </div>
            <div className="flex items-center py-5 justify-center">
                <Link href="/">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-pink-600 text-2xl font-bold rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Go Back Home 
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
