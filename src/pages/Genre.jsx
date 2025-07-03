import { useParams } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';

const Genre = ({ data, playSong }) => {
  const { id } = useParams();
  const genre = data.find(g => g.id === id);

  if (!genre) {
    return <div className="text-white">Genre not found</div>;
  }

  // In a real app, you would fetch genre-specific data from an API
  const genrePlaylists = [
    {
      id: 'g1',
      name: `${genre.name} Hits`,
      description: `The hottest ${genre.name} tracks right now`,
      image: genre.image,
      songs: [
        { id: 's1', title: 'Top Hit 1', artist: 'Artist 1', duration: '3:20', album: 'Album 1' },
        { id: 's2', title: 'Top Hit 2', artist: 'Artist 2', duration: '3:45', album: 'Album 2' },
      ]
    },
    {
      id: 'g2',
      name: `${genre.name} Classics`,
      description: `Timeless ${genre.name} tracks`,
      image: genre.image,
      songs: [
        { id: 's3', title: 'Classic 1', artist: 'Artist 3', duration: '4:10', album: 'Album 3' },
        { id: 's4', title: 'Classic 2', artist: 'Artist 4', duration: '3:55', album: 'Album 4' },
      ]
    }
  ];

  const genreAlbums = [
    {
      id: 'ga1',
      title: `Best of ${genre.name} 2023`,
      artist: 'Various Artists',
      year: '2023',
      image: genre.image,
      songs: [
        { id: 's5', title: 'Track 1', duration: '3:20' },
        { id: 's6', title: 'Track 2', duration: '3:45' },
      ]
    },
    {
      id: 'ga2',
      title: `${genre.name} Essentials`,
      artist: 'Various Artists',
      year: '2022',
      image: genre.image,
      songs: [
        { id: 's7', title: 'Essential 1', duration: '4:10' },
        { id: 's8', title: 'Essential 2', duration: '3:55' },
      ]
    }
  ];

  return (
    <div>
      <div className="relative mb-8 h-64 overflow-hidden rounded-md">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 flex items-end p-8"
          style={{ backgroundImage: `linear-gradient(to top, #121212, transparent), url(${genre.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="z-20">
            <p className="text-white uppercase text-xs mb-2">Genre</p>
            <h1 className="text-5xl font-bold text-white">{genre.name}</h1>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Popular playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {genrePlaylists.map(playlist => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              playSong={playSong}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Featured albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {genreAlbums.map(album => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              playSong={playSong}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre;