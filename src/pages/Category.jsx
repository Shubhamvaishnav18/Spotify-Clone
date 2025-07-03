import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryPlaylists } from '../api/spotify';
import PlaylistCard from '../components/PlaylistCard';

const Category = ({ playTrack }) => {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryPlaylists(id);
        setPlaylists(response.data.playlists.items);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spotify-green"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Category Playlists</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlists.map(playlist => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              playTrack={playTrack}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;