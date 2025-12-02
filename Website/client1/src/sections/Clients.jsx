import { useState } from "react";
import Tag from "../Components/Tag";

// Clients Section with Brand Logos
export default function Clients({ data }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Calculate how many logos to show (2 rows × 6 logos = 12)
  const clientsToShow = showAll ? data.clientData : data.clientData.slice(0, 12);
  const hasMoreClients = data.clientData.length > 12;

  // Split clients into rows of 6
  const rows = [];
  for (let i = 0; i < clientsToShow.length; i += 6) {
    rows.push(clientsToShow.slice(i, i + 6));
  }

  const openModal = (client) => {
    setSelectedClient(client);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedClient(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-20 mt-10 mx-auto">
      {/* Title */}
      <div className="mx-auto text-center mb-6">
        <Tag>Our Clients</Tag>
        <h2 className="text-4xl lg:text-6xl font-medium mt-4">
          Trusted by Top  
          <span className="text-[#FF6600]"> 200+ </span>
          Industry Leaders
        </h2>
      </div>
      {/* End Title */}

      {/* Dynamic Grid Rows with Animation */}
      <div className="space-y-8 mt-10">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid grid-cols-3 md:grid-cols-6 gap-6"
          >
            {row.map((client) => (
              <div 
                key={client.id} 
                className="flex items-center justify-center py-4 lg:py-6 group relative cursor-pointer"
                onClick={() => openModal(client)}
              >
                {/* 3D Hover Container */}
                <div className="relative transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:z-10">
                  {/* Shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md scale-95 group-hover:scale-105"></div>
                  
                  {/* Main logo with 3D effect */}
                  <img 
                    src={client.logo} 
                    className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:shadow-2xl group-hover:shadow-[#FF6600]/20 rounded-2xl p-3 bg-white/20 backdrop-blur-sm border border-white/10 group-hover:border-[#FF6600]/30"
                    alt={`${client.name} logo`}
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-[#FF6600] opacity-0 group-hover:opacity-5 transition-all duration-500 ease-out transform group-hover:scale-110"></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* View More Button with Smooth Animation */}
      {hasMoreClients && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="py-4 px-8 inline-flex items-center gap-x-3 text-base font-semibold rounded-full border-2 border-[#FF6600] bg-transparent text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF6600]/30 focus:outline-hidden focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2"
          >
            {showAll ? 'Show Less' : 'View More'}
            <svg 
              className={`shrink-0 size-5 transition-all duration-500 ease-out ${showAll ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 scale-95 opacity-0 animate-in fade-in-0 zoom-in-95"
            style={{ animation: 'modalEnter 0.5s ease-out forwards' }}
          >
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedClient.projectImage} 
                alt={selectedClient.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                <img 
                  src={selectedClient.logo} 
                  alt={selectedClient.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedClient.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#FF6600] text-white rounded-full text-sm font-medium">
                      {selectedClient.service}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {selectedClient.location}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {selectedClient.date}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-green-800 font-semibold text-lg">
                    {selectedClient.results}
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedClient.description}
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600">45%</div>
                  <div className="text-sm text-blue-800">Growth Increase</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">6M</div>
                  <div className="text-sm text-green-800">Project Duration</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-purple-800">Client Satisfaction</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <button className="py-3 px-8 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6600]/25">
                  View Full Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}