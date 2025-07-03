import { FaHome, FaSearch, FaBook, FaPlus, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Spotify 2.0</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center space-x-4 text-white hover:text-spotify-green">
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex items-center space-x-4 text-white hover:text-spotify-green">
              <FaSearch className="text-xl" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center space-x-4 text-white hover:text-spotify-green">
              <FaBook className="text-xl" />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
        <div className="mt-8">
          <ul className="space-y-4">
            <li>
              <button className="flex items-center space-x-4 text-white hover:text-spotify-green">
                <div className="bg-spotify-light rounded-sm p-1">
                  <FaPlus className="text-sm" />
                </div>
                <span>Create Playlist</span>
              </button>
            </li>
            <li>
              <button className="flex items-center space-x-4 text-white hover:text-spotify-green">
                <div className="bg-gradient-to-br from-purple-500 to-blue-300 rounded-sm p-1">
                  <FaHeart className="text-sm" />
                </div>
                <span>Liked Songs</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="mt-4 border-t border-spotify-gray pt-4">
        <div className="text-spotify-lightest text-xs overflow-y-auto max-h-40">
          <a href="#" className="block py-1 hover:text-white">Legal</a>
          <a href="#" className="block py-1 hover:text-white">Privacy Center</a>
          <a href="#" className="block py-1 hover:text-white">Privacy Policy</a>
          <a href="#" className="block py-1 hover:text-white">Cookies</a>
          <a href="#" className="block py-1 hover:text-white">About Ads</a>
          <a href="#" className="block py-1 hover:text-white">Accessibility</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;