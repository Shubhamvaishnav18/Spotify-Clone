import axios from 'axios';

const SPOTIFY_API = 'https://api.spotify.com/v1';
const CLIENT_ID = 'ad0a6353cb864bf9a732ddeb7acb62cc'; // Register at Spotify Developer Dashboard
const REDIRECT_URI = 'https://spotify-clone-chi-blond.vercel.app/callback';

// Helper function to get access token from URL
export const getAccessToken = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

// Initialize axios instance
const spotifyAPI = axios.create({
  baseURL: SPOTIFY_API,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`
  }
});

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

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=ad0a6353cb864bf9a732ddeb7acb62cc&response_type=token&redirect_uri=https://spotify-clone-chi-blond.vercel.app/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;