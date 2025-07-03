import { FaChevronDown, FaUserAlt, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-spotify-dark bg-opacity-70 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-lightest" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-white text-black rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-black bg-opacity-70 text-white rounded-full px-4 py-1 flex items-center space-x-2 hover:bg-opacity-100 transition">
          <FaUserAlt />
          <span>Profile</span>
          <FaChevronDown className="text-xs" />
        </button>
      </div>
    </header>
  );
};

export default Header;