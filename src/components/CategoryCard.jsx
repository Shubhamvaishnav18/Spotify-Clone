import { FaPlay } from 'react-icons/fa';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-spotify-light p-4 rounded-md hover:bg-spotify-gray transition group cursor-pointer">
      <div className="relative mb-4">
        <img 
          src={category.icons[0]?.url || 'https://via.placeholder.com/150'} 
          alt={category.name} 
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
      </div>
      <h3 className="text-white font-medium truncate">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;