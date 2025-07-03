import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';
import SongRow from '../components/SongRow';

const Search = ({ data, playSong }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Filter data based on search query
  const filteredPlaylists = data.playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = data.albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSongs = [];
  data.playlists.forEach(playlist => {
    playlist.songs.forEach(song => {
      if (song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredSongs.push({
          ...song,
          playlistName: playlist.name,
          image: playlist.image
        });
      }
    });
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Search results for "{searchQuery}"</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-spotify-gray pb-2">
          <button 
            className={`pb-2 ${activeTab === 'all' ? 'text-white border-b-2 border-spotify-green' : 'text-spotify-lightest'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`pb-2 ${activeTab === 'songs' ? 'text-white border-b-2 border-spotify-green' : 'text-spotify-lightest'}`}
            onClick={() => setActiveTab('songs')}
          >
            Songs
          </button>
          <button 
            className={`pb-2 ${activeTab === 'playlists' ? 'text-white border-b-2 border-spotify-green' : 'text-spotify-lightest'}`}
            onClick={() => setActiveTab('playlists')}
          >
            Playlists
          </button>
          <button 
            className={`pb-2 ${activeTab === 'albums' ? 'text-white border-b-2 border-spotify-green' : 'text-spotify-lightest'}`}
            onClick={() => setActiveTab('albums')}
          >
            Albums
          </button>
        </div>
      </div>

      {activeTab === 'all' && (
        <>
          {filteredSongs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="bg-spotify-light rounded-md overflow-hidden">
                {filteredSongs.slice(0, 5).map(song => (
                  <SongRow 
                    key={song.id} 
                    song={song} 
                    playSong={playSong}
                    isCurrent={false}
                    isPlaying={false}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredPlaylists.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredPlaylists.slice(0, 6).map(playlist => (
                  <PlaylistCard 
                    key={playlist.id} 
                    playlist={playlist} 
                    playSong={playSong}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredAlbums.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredAlbums.slice(0, 6).map(album => (
                  <AlbumCard 
                    key={album.id} 
                    album={album} 
                    playSong={playSong}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'songs' && (
        <div className="bg-spotify-light rounded-md overflow-hidden">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <SongRow 
                key={song.id} 
                song={song} 
                playSong={playSong}
                isCurrent={false}
                isPlaying={false}
              />
            ))
          ) : (
            <div className="p-8 text-center text-spotify-lightest">
              No songs found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map(playlist => (
              <PlaylistCard 
                key={playlist.id} 
                playlist={playlist} 
                playSong={playSong}
              />
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-spotify-lightest">
              No playlists found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {activeTab === 'albums' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map(album => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                playSong={playSong}
              />
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-spotify-lightest">
              No albums found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;