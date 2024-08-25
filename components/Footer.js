import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-[#000]">
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a href="/" className="flex items-center justify-center text-gray-900">
              <img src="/logo.png" alt="Logo" width={500} height={150} className="rounded-3xl" />
            </a>
            <p className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent mt-2 text-center text-sm" >
            Explore. Stream. Online.  
            </p>
            <p className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent mt-2 text-center text-sm" >
            HD Movies and TV Series Free
            </p>
            <div className="flex justify-center mt-4">
            <a href="https://www.youtube.com/channel/UCiYD6dTKTk0cRnhCo-3SKzw/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/channel/UCiYD6dTKTk0cRnhCo-3SKzw" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
  </div>


            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <p className="flex flex-col items-center justify-center px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">
                About Us
              </p>
              <nav className="flex flex-col items-center justify-center list-none mb-10">
                <li>
                  <a href="/intro/contact" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">Contact</a>
                </li>
                <li>
                  <a href="/intro/privacy" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">Privacy Policy</a>
                </li>
                <li>
                  <a href="/intro/tearms" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">Terms of Use</a>
                </li>
                <li>
                  <a href="/intro/dmca" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">D.M.C.A</a>
                </li>
                <li>
                  <a href="/intro/cookiepolicy" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800">Cookie Policy</a>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="bg-black">
          <div className="flex flex-col items-center justify-center container mx-auto py-4 px-5  flex-wrap sm:flex-row">
            <p className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800  text-center sm:text-left">
            123moviesonline™ —{' '}
              <a href="https://twitter.com/MxplayerMovies" rel="noopener noreferrer" className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold hover:text-blue-800 ml-1" target="_blank">
                Explore. Stream. Online. All rights reserved. © 2024 
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
