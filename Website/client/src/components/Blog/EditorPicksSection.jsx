// EditorPicksSection.jsx
import React from 'react';

const EditorPicksSection = ({ editorPicks = [] }) => {
  // If no editor picks, return null
  if (editorPicks.length === 0) {
    return null;
  }

  // Take first 4 editor picks
  const featuredPicks = editorPicks.slice(0, 4);
  const mainPick = featuredPicks[0];
  const sidePicks = featuredPicks.slice(1);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-10 md:mb-12 text-gray-900">
          Editor's picks
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT: Large Featured Article */}
          <div className="lg:col-span-2">
            <a href={`/blogs/${mainPick.metadata.category}/${mainPick.metadata.slug}`} className="group block h-full">
              {/* Image Container */}
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-6">
                <img 
                  src={mainPick.metadata.featuredImage} 
                  alt={mainPick.metadata.title} 
                  className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <p className="text-sm font-semibold text-gray-500 mb-1">ARTICLE</p>
              <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-snug text-gray-900 group-hover:text-indigo-600 transition duration-300">
                {mainPick.metadata.title}
              </h3>
              <p className="text-lg text-gray-700">
                {mainPick.metadata.description}
              </p>
            </a>
          </div>

          {/* RIGHT: Stack of smaller items */}
          <div className="lg:col-span-1 space-y-8 lg:space-y-10">
            {sidePicks.map((pick, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="border-t border-gray-200"></div>}
                <a href={`/blogs/${pick.metadata.category}/${pick.metadata.slug}`} className="group flex items-start pt-8">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100">
                    <img 
                      src={pick.metadata.featuredImage} 
                      alt={pick.metadata.title} 
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">ARTICLE</p>
                    <h3 className="text-lg font-bold mb-1 leading-tight text-gray-900 group-hover:text-indigo-600 transition duration-300">
                      {pick.metadata.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {pick.metadata.description}
                    </p>
                  </div>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPicksSection;