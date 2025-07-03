import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import Genre from './pages/Genre';
import PlayerControls from './components/PlayerControls';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  // Mock data for playlists, albums, and genres
  const [data, setData] = useState({
    playlists: [],
    albums: [],
    genres: [],
    featured: [],
  });

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockData = {
      playlists: [
        {
          id: '1',
          name: 'Today\'s Top Hits',
          description: 'The most popular songs right now',
          image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6',
          songs: [
            { id: 's1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', album: 'After Hours' },
            { id: 's2', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35', album: 'After Hours' },
          ]
        },
        {
          id: '2',
          name: 'Rock Classics',
          description: 'Rock legends & epic songs',
          image: 'https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c',
          songs: [
            { id: 's3', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', album: 'A Night at the Opera' },
            { id: 's4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', duration: '5:56', album: 'Appetite for Destruction' },
          ]
        }
      ],
      albums: [
        {
          id: 'a1',
          title: 'After Hours',
          artist: 'The Weeknd',
          year: '2020',
          image: 'https://i.scdn.co/image/ab67616d00001e02e1a0e0e9c7a9b0e0e0e0e0e0',
          songs: [
            { id: 's1', title: 'Blinding Lights', duration: '3:20' },
            { id: 's2', title: 'Save Your Tears', duration: '3:35' },
          ]
        },
        {
          id: 'a2',
          title: 'Thriller',
          artist: 'Michael Jackson',
          year: '1982',
          image: 'https://i.scdn.co/image/ab67616d00001e02e1a0e0e9c7a9b0e0e0e0e0e0',
          songs: [
            { id: 's5', title: 'Thriller', duration: '5:57' },
            { id: 's6', title: 'Beat It', duration: '4:18' },
          ]
        }
      ],
      genres: [
        { id: 'g1', name: 'Pop', image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6' },
        { id: 'g2', name: 'Rock', image: 'https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c' },
        { id: 'g3', name: 'Hip Hop', image: 'https://i.scdn.co/image/ab67706f00000002d0b4e0e9c7a9b0e0e0e0e0e0' },
      ],
      featured: [
        {
          id: 'f1',
          name: 'New Releases',
          items: [
            { id: 'a1', title: 'After Hours', artist: 'The Weeknd', image: 'https://i.scdn.co/image/ab67616d00001e02e1a0e0e9c7a9b0e0e0e0e0e0', type: 'album' },
            { id: 'p1', title: 'Today\'s Top Hits', artist: 'Various Artists', image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6', type: 'playlist' },
          ]
        },
        {
          id: 'f2',
          name: 'Featured Playlists',
          items: [
            { id: 'p1', title: 'Today\'s Top Hits', artist: 'Various Artists', image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6', type: 'playlist' },
            { id: 'p2', title: 'Rock Classics', artist: 'Various Artists', image: 'https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c', type: 'playlist' },
          ]
        }
      ]
    };

    setData(mockData);
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-spotify-dark">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Home data={data} playSong={playSong} />} />
                <Route path="/search" element={<Search data={data} playSong={playSong} />} />
                <Route path="/album/:id" element={<Album data={data.albums} playSong={playSong} />} />
                <Route path="/playlist/:id" element={<Playlist data={data.playlists} playSong={playSong} />} />
                <Route path="/genre/:id" element={<Genre data={data.genres} playSong={playSong} />} />
              </Routes>
            </div>
          </div>
        </div>
        <PlayerControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          progress={progress}
          handleProgressChange={handleProgressChange}
        />
      </div>
    </Router>
  );
}

export default App;