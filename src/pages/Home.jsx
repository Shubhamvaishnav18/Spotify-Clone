import { useState } from 'react';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';

const Home = ({ data, playSong }) => {
  const [activeTab, setActiveTab] = useState('featured');

  // Safe access to featured data with fallbacks
  const featuredData = data?.featured || [];
  const newReleases = featuredData.find(f => f.name === 'New Releases')?.items || [];
  const featuredPlaylists = featuredData.find(f => f.name === 'Featured Playlists')?.items || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Good afternoon</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data?.playlists?.slice(0, 6).map(playlist => (
            <div 
              key={playlist.id} 
              className="bg-spotify-light bg-opacity-40 rounded flex items-center overflow-hidden hover:bg-opacity-60 transition cursor-pointer"
              onClick={() => playSong(playlist.songs[0])}
            >
              <img 
                src={playlist.image} 
                alt={playlist.name} 
                className="w-16 h-16 object-cover"
              />
              <div className="ml-4">
                <h3 className="text-white font-medium">{playlist.name}</h3>
              </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featuredPlaylists.map(item => {
              if (!item) return null;
              
              if (item.type === 'playlist') {
                const playlist = data?.playlists?.find(p => p.id === item.id);
                return playlist ? (
                  <PlaylistCard 
                    key={item.id} 
                    playlist={playlist} 
                    playSong={playSong}
                  />
                ) : null;
              } else {
                const album = data?.albums?.find(a => a.id === item.id);
                return album ? (
                  <AlbumCard 
                    key={item.id} 
                    album={album} 
                    playSong={playSong}
                  />
                ) : null;
              }
            })}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {newReleases.map(item => {
              if (!item) return null;
              
              if (item.type === 'playlist') {
                const playlist = data?.playlists?.find(p => p.id === item.id);
                return playlist ? (
                  <PlaylistCard 
                    key={item.id} 
                    playlist={playlist} 
                    playSong={playSong}
                  />
                ) : null;
              } else {
                const album = data?.albums?.find(a => a.id === item.id);
                return album ? (
                  <AlbumCard 
                    key={item.id} 
                    album={album} 
                    playSong={playSong}
                  />
                ) : null;
              }
            })}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Genres & Moods</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data?.genres?.map(genre => (
            <div 
              key={genre.id} 
              className="bg-gradient-to-br from-purple-600 to-blue-400 p-4 rounded-md cursor-pointer hover:opacity-90 transition"
            >
              <h3 className="text-white font-medium">{genre.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;