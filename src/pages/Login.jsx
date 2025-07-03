import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, loginUrl } from '../api/spotify';
import { FaSpotify } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // If we're not properly wrapped in a Router, fallback to direct link
  if (!window.location.pathname.includes('/callback')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-spotify-green to-black p-4">
        <div className="text-center max-w-md">
          <FaSpotify className="text-6xl text-white mb-8 mx-auto" />
          <h1 className="text-4xl font-bold text-white mb-6">Spotify 2.0</h1>
          <p className="text-white mb-8">
            Listen to millions of songs, podcasts, and audiobooks with enhanced features.
          </p>
          <a
            href={loginUrl}
            className="bg-white text-black rounded-full px-8 py-3 font-bold hover:bg-spotify-lightest transition duration-300 inline-block"
          >
            Login with Spotify
          </a>
        </div>
      </div>
    );
  }

  // If we're in the callback flow, just show loading
  return (
    <div className="flex items-center justify-center min-h-screen bg-spotify-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spotify-green"></div>
    </div>
  );
};

export default Login;