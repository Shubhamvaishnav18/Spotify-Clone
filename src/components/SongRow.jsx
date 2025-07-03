import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillHeartFill, BsThreeDots } from 'react-icons/bs';

const SongRow = ({ song, isCurrent, isPlaying, playSong }) => {
  return (
    <div 
      className={`grid grid-cols-12 items-center p-2 rounded-md hover:bg-spotify-gray ${isCurrent ? 'bg-spotify-gray' : ''}`}
      onClick={() => playSong(song)}
    >
      <div className="col-span-1 flex items-center justify-center">
        {isCurrent && isPlaying ? (
          <FaPause className="text-spotify-green" />
        ) : (
          <FaPlay className="text-spotify-lightest group-hover:text-white" />
        )}
      </div>
      <div className="col-span-5 flex items-center">
        <img 
          src={song.image || 'https://i.scdn.co/image/ab67616d00001e02e1a0e0e9c7a9b0e0e0e0e0e0'} 
          alt={song.title} 
          className="w-10 h-10 object-cover mr-3"
        />
        <div>
          <h4 className={`text-sm ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>{song.title}</h4>
          <p className="text-spotify-lightest text-xs">{song.artist}</p>
        </div>
      </div>
      <div className="col-span-4 text-spotify-lightest text-sm">{song.album}</div>
      <div className="col-span-1 text-spotify-lightest text-sm text-right">{song.duration}</div>
      <div className="col-span-1 flex justify-end">
        <button className="text-spotify-lightest hover:text-white mx-2">
          <BsFillHeartFill />
        </button>
        <button className="text-spotify-lightest hover:text-white">
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
};

export default SongRow;