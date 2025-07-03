import axios from 'axios';

const SPOTIFY_API = 'https://api.spotify.com/v1';
const CLIENT_ID = 'ad0a6353cb864bf9a732ddeb7acb62cc';
const REDIRECT_URI = 'https://spotify-clone-chi-blond.vercel.app/callback';

// Enhanced token handling
export const getAccessToken = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get('access_token');
  
  if (token) {
    localStorage.setItem('spotify_token', token);
    window.history.pushState({}, document.title, window.location.pathname);
    return token;
  }
  
  return localStorage.getItem('spotify_token');
};

// Initialize axios with dynamic token
export const spotifyAPI = axios.create({
  baseURL: SPOTIFY_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth interceptor
spotifyAPI.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints (keep your existing ones)
export const loginUrl = `https://accounts.spotify.com/authorize?client_id=ad0a6353cb864bf9a732ddeb7acb62cc&response_type=token&redirect_uri=https%3A%2F%2Fspotify-clone-chi-blond.vercel.app%2Fcallback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true`;
// API endpoints
export const getFeaturedPlaylists = () => spotifyAPI.get('/browse/featured-playlists?limit=6');
export const getNewReleases = () => spotifyAPI.get('/browse/new-releases?limit=6');
export const getCategories = () => spotifyAPI.get('/browse/categories?limit=6');
export const getPlaylist = (id) => spotifyAPI.get(`/playlists/${id}`);
export const getAlbum = (id) => spotifyAPI.get(`/albums/${id}`);
export const search = (query) => spotifyAPI.get(`/search?q=${query}&type=track,album,playlist&limit=10`);
export const getUserProfile = () => spotifyAPI.get('/me');
// Add this to your existing exports
export const getCategoryPlaylists = (categoryId) => spotifyAPI.get(`/browse/categories/${categoryId}/playlists?limit=50`);