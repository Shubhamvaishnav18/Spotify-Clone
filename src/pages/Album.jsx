import { useParams } from 'react-router-dom';
import SongRow from '../components/SongRow';

const Album = ({ data, playSong }) => {
  const { id } = useParams();
  const album = data.find(a => a.id === id);

  if (!album) {
    return <div className="text-white">Album not found</div>;
  }

  return (
    <div>
      <div className="flex items-end mb-8">
        <img 
          src={album.image} 
          alt={album.title} 
          className="w-48 h-48 object-cover shadow-lg mr-6"
        />
        <div>
          <p className="text-white uppercase text-xs mb-2">Album</p>
          <h1 className="text-4xl font-bold text-white mb-4">{album.title}</h1>
          <p className="text-spotify-lightest text-sm">{album.artist} • {album.year} • {album.songs.length} songs</p>
        </div>
      </div>

      <div className="bg-spotify-light rounded-md overflow-hidden">
        <div className="grid grid-cols-12 items-center p-4 bg-spotify-gray bg-opacity-40">
          <div className="col-span-1 text-center text-spotify-lightest">#</div>
          <div className="col-span-5 text-spotify-lightest">Title</div>
          <div className="col-span-4 text-spotify-lightest">Album</div>
          <div className="col-span-1 text-right text-spotify-lightest">Duration</div>
          <div className="col-span-1"></div>
        </div>
        {album.songs.map((song, index) => (
          <SongRow 
            key={song.id} 
            song={{
              ...song,
              artist: album.artist,
              album: album.title,
              image: album.image
            }} 
            playSong={playSong}
            isCurrent={false}
            isPlaying={false}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;