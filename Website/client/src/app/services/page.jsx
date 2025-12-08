// app/services/page.jsx
import Link from 'next/link';
import { getAllCategories, servicesData } from '@/Data/masterData';

export default function ServicesPage() {
  const categories = getAllCategories();
  
  // Count services per category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = servicesData.filter(s => s.category === category).length;
    return acc;
  }, {});
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive range of digital services designed to help your business grow online.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const formattedCategory = category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          return (
            <Link
              key={category}
              href={`/services/${category}`}
              className="block border border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {formattedCategory}
                </h2>
                <p className="text-gray-500">
                  {categoryCounts[category]} service{categoryCounts[category] !== 1 ? 's' : ''} available
                </p>
              </div>
              
              <div className="space-y-2 mb-6">
                {servicesData
                  .filter(s => s.category === category)
                  .slice(0, 3)
                  .map((service) => (
                    <div key={service.id} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span>{service.data.hero.headline}</span>
                    </div>
                  ))}
                {categoryCounts[category] > 3 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{categoryCounts[category] - 3} more services
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium group-hover:underline">
                  Browse Services
                </span>
                <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}