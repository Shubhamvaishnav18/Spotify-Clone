import { FaPlay } from 'react-icons/fa';

const AlbumCard = ({ album, playSong }) => {
  return (
    <div className="bg-spotify-light p-4 rounded-md hover:bg-spotify-gray transition group cursor-pointer">
      <div className="relative mb-4">
        <img 
          src={album.image} 
          alt={album.title} 
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button 
          className="absolute bottom-2 right-2 bg-spotify-green rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-105"
          onClick={() => playSong(album.songs[0])}
        >
          <FaPlay className="text-black ml-1" />
        </button>
      </div>
      <h3 className="text-white font-medium truncate">{album.title}</h3>
      <p className="text-spotify-lightest text-sm truncate">{album.artist} • {album.year}</p>
    </div>
  );
};

export default AlbumCard;