import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';

const PlayerControls = ({
  currentTrack,
  isPlaying,
  togglePlay,
  playTrack
}) => {
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    // In a real app, you would set the player volume here
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-spotify-light h-20 border-t border-spotify-gray flex items-center px-4">
      {currentTrack ? (
        <>
          <div className="w-1/4 flex items-center">
            <img 
              src={currentTrack.album?.images[2]?.url || 'https://via.placeholder.com/150'} 
              alt={currentTrack.name} 
              className="w-14 h-14 object-cover mr-3"
            />
            <div className="min-w-0">
              <h4 className="text-white text-sm font-medium truncate">{currentTrack.name}</h4>
              <p className="text-spotify-lightest text-xs truncate">
                {currentTrack.artists?.map(artist => artist.name).join(', ')}
              </p>
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
              <span className="text-xs text-spotify-lightest">{formatTime(progress * currentTrack.duration_ms / 100)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full h-1 bg-spotify-gray rounded-full appearance-none cursor-pointer"
              />
              <span className="text-xs text-spotify-lightest">{formatTime(currentTrack.duration_ms)}</span>
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
          Select a song to play
        </div>
      )}
    </div>
  );
};

export default PlayerControls;