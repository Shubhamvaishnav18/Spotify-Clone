import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import { loginUrl } from '../api/spotify';

const Login = () => {
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(
        errorParam === 'access_denied' 
          ? 'Please grant all requested permissions'
          : 'Login failed. Please try again.'
      );
    }
  }, [searchParams]);

  const handleLogin = () => {
    // Clear any existing errors and initiate login
    setError('');
    console.log('Redirecting to:', loginUrl);
    window.location.href = loginUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-spotify-green to-black p-4">
      <div className="text-center max-w-md">
        <FaSpotify className="text-6xl text-white mb-8 mx-auto" />
        <h1 className="text-4xl font-bold text-white mb-6">Spotify 2.0</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <p className="text-white mb-8">
          Enjoy enhanced music streaming experience
        </p>
        
        <button
          onClick={handleLogin}
          className="bg-white text-black rounded-full px-8 py-3 font-bold hover:bg-spotify-lightest transition duration-300"
        >
          Login with Spotify
        </button>
        
      </div>
    </div>
  );
};

export default Login;