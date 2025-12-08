import React from 'react';

const WebsiteServices = ({ data }) => {
  return (
    <section className="bg-white py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 uppercase tracking-tighter leading-none mb-2">
            {data.title}
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-orange-600">
            {data.subtitle}
          </h2>
          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-orange-100 rounded-[32px] p-8 flex flex-col items-center text-center transition-all duration-300 h-full border border-gray-200 hover:shadow-lg hover:shadow-orange-100 relative overflow-hidden"
            >
              <div className="mb-6 w-full h-55 flex items-center justify-center overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-full object-contain drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight group-hover:text-[25px] transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 text-[17px] leading-relaxed mb-6 font-medium">
                {service.description}
              </p>

              <div className="mt-auto">
                <a 
                  href={service.link} 
                  className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-all duration-500 uppercase tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 inline-block"
                >
                  Learn More →
                </a>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteServices;