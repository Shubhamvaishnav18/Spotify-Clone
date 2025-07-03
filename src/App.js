import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { getAccessToken, loginUrl } from './api/spotify';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import Category from './pages/Category';
import Login from './pages/Login';
import PlayerControls from './components/PlayerControls';
import Callback from './pages/Callback';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setToken(token);
      spotifyApi.setAccessToken(token);
      
      // Get user profile
      spotifyApi.getMe().then(user => {
        setUser(user);
      });

      // Initialize player
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Spotify Clone',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          setDeviceId(device_id);
        });

        player.addListener('player_state_changed', state => {
          if (!state) return;
          
          setCurrentTrack(state.track_window.current_track);
          setIsPlaying(!state.paused);
        });

        player.connect();
      };
    }
  }, []);

  const playTrack = (track) => {
    if (!deviceId) return;
    
    spotifyApi.play({
      device_id: deviceId,
      uris: [track.uri]
    }).then(() => {
      setCurrentTrack(track);
      setIsPlaying(true);
    });
  };

  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pause();
    } else {
      player.resume();
    }
    setIsPlaying(!isPlaying);
  };

  if (!token) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-spotify-dark">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar user={user} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Home playTrack={playTrack} />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/search" element={<Search playTrack={playTrack} />} />
                <Route path="/album/:id" element={<Album playTrack={playTrack} />} />
                <Route path="/playlist/:id" element={<Playlist playTrack={playTrack} />} />
                <Route path="/category/:id" element={<Category playTrack={playTrack} />} />
              </Routes>
            </div>
          </div>
        </div>
        <PlayerControls
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playTrack={playTrack}
        />
      </div>
    </Router>
  );
}

export default App;