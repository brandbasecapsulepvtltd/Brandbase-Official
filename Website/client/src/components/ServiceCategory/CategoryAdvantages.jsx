import React, { useState } from 'react';

const CategoryAdvantages = ({ data }) => {
  // Initialize with the first available section key
  const sectionKeys = Object.keys(data.sections);
  const [activeTab, setActiveTab] = useState(sectionKeys[0] || 'overview');

  const renderContent = (item, index) => {
    switch (item.type) {
      case 'text':
        return (
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      case 'image':
        return (
          <div key={index} className="mb-8">
            <div className="w-full h-67 md:h-85 rounded-lg overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        );
      case 'list':
        return (
          <ul key={index} className="space-y-4 mb-6 pl-4">
            {item.items.map((listItem, listIndex) => (
              <li key={listIndex} className="text-orange-600 font-medium cursor-pointer hover:underline">
                {listItem}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  // Safely get active data
  const activeData = data.sections[activeTab];

  // If no active data found, show error or fallback
  if (!activeData) {
    return (
      <div className="bg-white dark:bg-zinc-900 dark:bg-black p-8 font-sans min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-center mb-12">
            {data.mainTitle}
          </h1>
          <p className="text-center text-red-500">Error: Section data not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black p-8 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          {data.mainTitle}
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/4">
            <ul className="border-t border-gray-200 dark:border-zinc-800">
              {Object.entries(data.sections).map(([key, section]) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveTab(key)}
                    className={`block w-full text-left py-4 text-lg border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200 ${activeTab === key
                      ? 'text-orange-600 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-orange-600'
                      }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
              {activeData.heading}
            </h2>

            <div className="animate-fade-in text-xl">
              {activeData.content && activeData.content.map((item, index) =>
                renderContent(item, index)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdvantages;
