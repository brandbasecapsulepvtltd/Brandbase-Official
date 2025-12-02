import React from 'react';

const ComparisonTable = () => {
  // Data stored in JSON format as requested
  const data = {
    brand: {
      logoUrl: "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
      features: [
        "Unified web design and digital marketing services",
        "Focused on enhancing revenue generation through your website",
        "Dedicated account managers who get to know your business inside and out",
        "Awards and expertise from 1,000+ successful website redesigns",
        "Cutting-edge technology to streamline the design process and ensure ongoing success"
      ]
    },
    others: [
      {
        title: "In-house web design",
        points: [
          "Typically a small team of developers working independently from marketing efforts",
          "Limited technology and expertise to prioritize revenue-focused web design",
          "Internal teams may lack the external insights needed for impactful design",
          "In-house designers often have limited experience, affecting innovative design capabilities",
          "Limited technology and resources available for research and collaboration"
        ]
      },
      {
        title: "Typical web design agency",
        points: [
          "Often lack integrated marketing services, which can result in less effective redesigns",
          "May prioritize aesthetics or functionality over revenue-optimized design",
          "Variability in account management, with some agencies not providing personalized support",
          "Agency experience can vary, with some lacking industry-specific expertise",
          "Many agencies possess basic project management tools but may lack advanced data-driven technologies"
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Choosing the Right Web Design Partner: <span className="text-orange-600">BrandBase</span> vs. Others
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: The Brand Card (Highlighted) */}
          <div className="relative bg-orange-100 rounded-3xl p-8 shadow-sm border border-transparent hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            
            {/* Decorative Top Right Wave */}
            <div className="absolute top-0 right-0 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H100V60C100 60 80 40 50 50C20 60 0 100 0 100V0Z" fill="#efcd85ff" fillOpacity="0.5"/>
                <path d="M40 0H100V30C100 30 90 20 70 20C50 20 40 40 40 40V0Z" fill="#cf9c49ff" fillOpacity="0.2"/>
              </svg>
            </div>

            {/* Logo */}
            <div className="mb-8 relative z-10">
              <img 
                src={data.brand.logoUrl} 
                alt="Brand Logo" 
                className="h-10 object-contain" // Adjusted height to match visual weight of original
              />
            </div>

            {/* Feature List */}
            <ul className="space-y-8 relative z-10">
              {data.brand.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 2 & 3: Competitors */}
          {data.others.map((column, colIndex) => (
            <div key={colIndex} className="p-4 md:p-8 md:pt-12">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-8">
                {column.title}
              </h3>
              
              <ul className="space-y-8">
                {column.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                        <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;