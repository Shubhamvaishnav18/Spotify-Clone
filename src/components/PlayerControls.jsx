import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';

const PlayerControls = ({
  currentSong,
  isPlaying,
  togglePlay,
  volume,
  handleVolumeChange,
  progress,
  handleProgressChange
}) => {
  return (
    <div className="bg-spotify-light h-20 border-t border-spotify-gray flex items-center px-4">
      {currentSong ? (
        <>
          <div className="w-1/4 flex items-center">
            <img 
              src={currentSong.image || 'https://i.scdn.co/image/ab67616d00001e02e1a0e0e9c7a9b0e0e0e0e0e0'} 
              alt={currentSong.title} 
              className="w-14 h-14 object-cover mr-3"
            />
            <div>
              <h4 className="text-white text-sm font-medium">{currentSong.title}</h4>
              <p className="text-spotify-lightest text-xs">{currentSong.artist}</p>
            </div>
            <button className="ml-4 text-spotify-lightest hover:text-white">
              <BsFillHeartFill />
            </button>
          </div>
          <div className="w-2/4 flex flex-col items-center">
            <div className="flex items-center space-x-6 mb-2">
              <button className="text-spotify-lightest hover:text-white">
                <FaRandom />
              </button>
              <button className="text-spotify-lightest hover:text-white">
                <FaStepBackward />
              </button>
              <button 
                className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-black hover:scale-105 transition"
                onClick={togglePlay}
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
              </button>
              <button className="text-spotify-lightest hover:text-white">
                <FaStepForward />
              </button>
              <button className="text-spotify-lightest hover:text-white">
                <FaRedo />
              </button>
            </div>
            <div className="w-full flex items-center space-x-2">
              <span className="text-xs text-spotify-lightest">0:00</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-spotify-gray rounded-full appearance-none cursor-pointer"
              />
              <span className="text-xs text-spotify-lightest">3:30</span>
            </div>
          </div>
          <div className="w-1/4 flex justify-end items-center space-x-2">
            <FaVolumeUp className="text-spotify-lightest" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-spotify-gray rounded-full appearance-none cursor-pointer"
            />
          </div>
        </>
      ) : (
        <div className="w-full text-center text-spotify-lightest">
          No song selected
        </div>
      )}
    </div>
  );
};

export default PlayerControls;