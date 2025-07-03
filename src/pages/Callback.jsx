import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../api/spotify';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current URL hash:', window.location.hash); // Debug
    
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    if (params.get('error')) {
      console.error('Auth error:', params.get('error'));
      navigate(`/login?error=auth_failed`, { replace: true });
    } else {
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('spotify_token', token);
        window.history.replaceState({}, '', '/'); // Clean URL
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-spotify-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spotify-green mx-auto mb-4"></div>
        <p className="text-white">Finishing authentication...</p>
      </div>
    </div>
  );
};

export default Callback;