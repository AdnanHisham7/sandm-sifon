import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { api, getCategoriesByBrand } from '../api';

interface CategoryGridProps {
  onNavigate: (page: string, category?: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onNavigate }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesByBrand('sifon');
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-400 text-center py-20">Error: {error}</div>;

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Explore </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Collections
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our curated collections of retro-inspired ceramic artistry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <div 
                key={category._id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 hover:border-pink-500/30 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
                onClick={() => onNavigate('shop', category._id)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={api+category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center text-pink-400 font-medium group-hover:text-purple-400 transition-colors duration-300">
                    <span className="mr-2">Explore Collection</span>
                    <ArrowRight 
                      size={16} 
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate('shop')}
              className="group px-8 py-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-pink-400 font-semibold rounded-full hover:from-pink-500/20 hover:to-purple-500/20 hover:border-pink-500/50 transition-all duration-300"
            >
              <span className="flex items-center">
                View All Collections
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;