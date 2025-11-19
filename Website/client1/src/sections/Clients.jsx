import { useState } from "react";
import Tag from "../Components/Tag";

// Clients Section with Brand Logos
export default function Clients() {
  const [showAll, setShowAll] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const clientData = [
    {
      id: 1,
      logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Maldives.png?updatedAt=1763185882506",
      name: "Maldives Tourism",
      description: "We developed a comprehensive digital marketing campaign that increased their international tourist bookings by 45% within 6 months through targeted social media advertising and SEO optimization.",
      projectImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Digital Marketing",
      location: "Maldives",
      date: "March 15, 2024",
      results: "45% increase in bookings"
    },
    {
      id: 2,
      logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Dynalog.png?updatedAt=1763186566545",
      name: "Dynalog Systems",
      description: "Complete website redesign and development with integrated CRM system. The new platform improved user engagement by 60% and reduced bounce rate by 35%.",
      projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Web Development",
      location: "Mumbai",
      date: "January 20, 2024",
      results: "60% engagement increase"
    },
    {
      id: 3,
      logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Jindal.png?updatedAt=1763186852154",
      name: "Jindal Industries",
      description: "Managed their annual corporate event with 500+ attendees. Provided end-to-end event management including digital invitations, live streaming, and post-event analytics.",
      projectImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Event Management",
      location: "Delhi",
      date: "November 20, 2023",
      results: "500+ attendees"
    },
    {
      id: 4,
      logo: "https://hybec.net/wp-content/uploads/2024/07/hybec-1-01-1536x525.png",
      name: "Hybec Technologies",
      description: "Developed a custom mobile application for their service platform, resulting in 200% growth in user base and 4.8-star rating on app stores.",
      projectImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "App Development",
      location: "Bangalore",
      date: "February 10, 2024",
      results: "200% user growth"
    },
    {
      id: 5,
      logo: "https://datalog.co.in/wp-content/uploads/2025/07/datalog_logo.png",
      name: "DataLog Solutions",
      description: "Implemented advanced SEO strategy that moved them from page 4 to top 3 positions on Google for 15+ key search terms within 4 months.",
      projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "SEO Optimization",
      location: "Pune",
      date: "December 5, 2023",
      results: "Top 3 Google rankings"
    },
    {
      id: 6,
      logo: "https://vigneto.in/cdn/shop/files/vigneto_TRANSPARENT_b2e1522f-b15f-4142-8935-ceb13fcd10b8.png?v=1645980179&width=180",
      name: "Vigneto Wines",
      description: "Created and managed their e-commerce platform with integrated inventory management, resulting in 300% increase in online sales.",
      projectImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "E-commerce Development",
      location: "Nashik",
      date: "October 15, 2023",
      results: "300% sales increase"
    },
    {
      id: 7,
      logo: "https://media.licdn.com/dms/image/v2/C560BAQHIFCrhNO4Y4Q/company-logo_200_200/company-logo_200_200/0/1635166882858?e=1764806400&v=beta&t=NY1Ps_0c1Oyrs06TeiJrqBRM9P_w6F9s21B7gpPHt6o",
      name: "TechNova Solutions",
      description: "Managed their product launch event with international press coverage and live demonstrations across multiple cities.",
      projectImage: "https://images.unsamp.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Event Management",
      location: "Hyderabad",
      date: "September 8, 2023",
      results: "International press coverage"
    },
    {
      id: 8,
      logo: "https://tse3.mm.bing.net/th/id/OIP.D4bhXlJvEhwQRdsmcjh7GgHaHZ?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      name: "Global Enterprises",
      description: "Complete digital transformation including website, mobile app, and cloud infrastructure migration.",
      projectImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Digital Transformation",
      location: "Chennai",
      date: "August 22, 2023",
      results: "Complete digital overhaul"
    },
    {
      id: 9,
      logo: "https://www.mobil.co.in/-/media/project/wep/mobil/mobil-in/new-mobil-logo.png",
      name: "Mobil Energy",
      description: "Corporate rebranding and website development with focus on sustainability and modern energy solutions.",
      projectImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "Branding & Web Development",
      location: "Gurgaon",
      date: "July 30, 2023",
      results: "Successful rebranding"
    },
    {
      id: 10,
      logo: "https://www.elgi.com/in/wp-content/themes/ELGi/images/elgi__logo.png",
      name: "ELGI Industries",
      description: "Managed their international dealer conference with participants from 25+ countries and live product demonstrations.",
      projectImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "International Event",
      location: "Coimbatore",
      date: "June 12, 2023",
      results: "25+ countries participation"
    },
    {
      id: 11,
      logo: "https://tapariaroofings.com/wp-content/uploads/2023/04/Untitled-design.png",
      name: "Taparia Roofings",
      description: "E-commerce platform development with advanced product customization features and real-time inventory tracking.",
      projectImage: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "E-commerce Development",
      location: "Ahmedabad",
      date: "May 5, 2023",
      results: "Real-time inventory system"
    },
    {
      id: 12,
      logo: "https://mahalaxmiloomspares.com/wp-content/uploads/2023/12/FINAL-LOGO2.png",
      name: "Mahalaxmi Looms",
      description: "Digital marketing campaign focusing on export market expansion with multilingual content and international SEO.",
      projectImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "International Marketing",
      location: "Surat",
      date: "April 18, 2023",
      results: "Export market expansion"
    },
       {
      id: 13,
      logo: "https://mahalaxmiloomspares.com/wp-content/uploads/2023/12/FINAL-LOGO2.png",
      name: "Mahalaxmi Looms",
      description: "Digital marketing campaign focusing on export market expansion with multilingual content and international SEO.",
      projectImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      service: "International Marketing",
      location: "Surat",
      date: "April 18, 2023",
      results: "Export market expansion"
    }
  ];

  // Calculate how many logos to show (2 rows × 6 logos = 12)
  const clientsToShow = showAll ? clientData : clientData.slice(0, 12);
  const hasMoreClients = clientData.length > 12;

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