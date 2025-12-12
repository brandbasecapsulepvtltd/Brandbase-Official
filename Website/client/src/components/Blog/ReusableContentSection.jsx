// ReusableContentSection.jsx
import React from 'react';

// Component for a single article card
const ArticleCard = ({ blog }) => (
  <a href={`/blogs/${blog.metadata.category}/${blog.metadata.slug}`} className="group block h-full">
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
      <img
        src={blog.metadata.featuredImage}
        alt={blog.metadata.title}
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
    <div className="pt-2">
      <p className="text-xs font-semibold text-gray-500 mb-1">ARTICLE</p>
      <h3 className="text-base font-bold mb-1 leading-snug text-gray-900 group-hover:text-indigo-600 transition">
        {blog.metadata.title}
      </h3>
      <p className="text-sm text-gray-700">
        {blog.metadata.description}
      </p>
    </div>
  </a>
);

// Main component to render the entire section
const ReusableContentSection = ({ allBlogs = [] }) => {
  // Group blogs by category
  const groupedByCategory = allBlogs.reduce((acc, blog) => {
    const category = blog.metadata.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {});

  // Convert to array for rendering
  const categories = Object.keys(groupedByCategory);

  if (categories.length === 0) {
    return (
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">No articles found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category, index) => {
          const categoryBlogs = groupedByCategory[category].slice(0, 3); // Show max 3 per category
          
          return (
            <div key={category} className={`${index > 0 ? 'mt-12 md:mt-20' : ''}`}>
              {/* Section Header */}
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <a href={`/blog/${category}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
                  View all
                </a>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {categoryBlogs.map((blog, articleIndex) => (
                  <ArticleCard
                    key={articleIndex}
                    blog={blog}
                  />
                ))}
              </div>
              
              {/* Add a horizontal line separator visually between the main sections */}
              {index < categories.length - 1 && (
                  <hr className="mt-12 md:mt-20 border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReusableContentSection;