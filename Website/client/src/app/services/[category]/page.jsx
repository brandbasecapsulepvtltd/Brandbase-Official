// app/services/[category]/page.jsx
import Link from 'next/link';
import { getServicesByCategory } from '@/Data/masterData';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = [...new Set(servicesData.map(service => service.category))];
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryServices = getServicesByCategory(category);
  
  if (categoryServices.length === 0) {
    notFound();
  }
  
  // Format category name for display
  const formattedCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{formattedCategory}</h1>
        <p className="text-gray-600">
          Explore our {formattedCategory.toLowerCase()} services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryServices.map((service) => (
          <Link
            key={service.id}
            href={`/services/${category}/${service.slug}`}
            className="group block border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {service.data.hero.headline}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {service.data.hero.subHeadline}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {service.data.hero.features?.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs bg-gray-100 rounded-full"
                >
                  {feature.name}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}