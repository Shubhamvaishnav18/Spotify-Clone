import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { getFeaturedPlaylists, getNewReleases, getCategories } from '../api/spotify';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';
import CategoryCard from '../components/CategoryCard';

const Home = ({ playTrack }) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playlistsResponse, releasesResponse, categoriesResponse] = await Promise.all([
          getFeaturedPlaylists(),
          getNewReleases(),
          getCategories()
        ]);
        
        setFeaturedPlaylists(playlistsResponse.data.playlists.items);
        setNewReleases(releasesResponse.data.albums.items);
        setCategories(categoriesResponse.data.categories.items);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spotify-green"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Good afternoon</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredPlaylists.slice(0, 6).map(playlist => (
            <div 
              key={playlist.id} 
              className="bg-spotify-light bg-opacity-40 rounded flex items-center overflow-hidden hover:bg-opacity-60 transition cursor-pointer group"
              onClick={() => playTrack(playlist.tracks.items[0]?.track)}
            >
              <img 
                src={playlist.images[0]?.url || 'https://via.placeholder.com/150'} 
                alt={playlist.name} 
                className="w-16 h-16 object-cover"
              />
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{playlist.name}</h3>
                <p className="text-spotify-lightest text-xs truncate">{playlist.description}</p>
              </div>
              <button className="mr-4 opacity-0 group-hover:opacity-100 transition">
                <FaPlay className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Featured</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-1 rounded-full text-sm ${activeTab === 'featured' ? 'bg-white text-black' : 'bg-spotify-gray text-white'}`}
              onClick={() => setActiveTab('featured')}
            >
              Featured
            </button>
            <button 
              className={`px-4 py-1 rounded-full text-sm ${activeTab === 'new' ? 'bg-white text-black' : 'bg-spotify-gray text-white'}`}
              onClick={() => setActiveTab('new')}
            >
              New Releases
            </button>
          </div>
        </div>

        {activeTab === 'featured' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {featuredPlaylists.map(playlist => (
              <PlaylistCard 
                key={playlist.id} 
                playlist={playlist} 
                playTrack={playTrack}
              />
            ))}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {newReleases.map(album => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                playTrack={playTrack}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;