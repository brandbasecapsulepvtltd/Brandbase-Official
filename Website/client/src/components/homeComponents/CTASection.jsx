import ServiceColumn from "../ServiceColumn";

const services = [
  {
    name: "Web Development",
    icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    description: "Custom websites with modern frameworks and responsive design.",
  },
  {
    name: "App Development",
    icon: "https://cdn.worldvectorlogo.com/logos/flutter-logo.svg",
    description: "Native and cross-platform mobile applications.",
  },
  {
    name: "Digital Marketing",
    icon: "https://clipground.com/images/digital-marketing-logo-png-17.jpg",
    description: "360° marketing strategies for maximum reach and conversion.",
  },
  {
    name: "E-commerce Solutions",
    icon: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
    description: "Complete online store setup and optimization.",
  },
  {
    name: "SEO Optimization",
    icon: "https://cdn.worldvectorlogo.com/logos/google-search-console.svg",
    description: "Boost your search rankings and organic traffic.",
  },
  {
    name: "Data Analytics",
    icon: "https://cdn.worldvectorlogo.com/logos/google-analytics.svg",
    description: "Track performance and make data-driven decisions.",
  },
];

export default function CTASection() {
  return (
    <section 
      aria-labelledby="cta-section-heading"
      className="py-8 sm:py-10 md:py-12 lg:py-13 px-4 xs:px-6 sm:px-8 lg:px-8 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:pr-4 xl:pr-8">
            {/* Heading */}
            <h1 
              id="cta-section-heading"
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mt-2 sm:mt-4 leading-tight sm:leading-snug"
            >
              Transform your{" "}
              <span className="text-[#FF6A00]">digital</span> presence
            </h1>

            {/* Description */}
            <p className="text-black mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              From stunning websites to powerful mobile apps and data-driven marketing strategies — 
              we provide complete digital solutions to elevate your business.
            </p>

            {/* Feature Cards */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <article className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]">
                <div className="text-xl sm:text-2xl" aria-hidden="true">🚀</div>
                <div>
                  <h2 className="text-black font-semibold text-sm sm:text-base">Fast Delivery</h2>
                  <p className="text-black/60 text-xs sm:text-sm">2–4 weeks launch</p>
                </div>
              </article>

              <article className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]">
                <div className="text-xl sm:text-2xl" aria-hidden="true">🛡️</div>
                <div>
                  <h2 className="text-black font-semibold text-sm sm:text-base">Support & Maintenance</h2>
                  <p className="text-black/60 text-xs sm:text-sm">24/7 monitoring</p>
                </div>
              </article>
            </div>

            {/* Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row gap-3 sm:gap-4">
              {/* Outline button */}
              <button 
                className="relative overflow-hidden group px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-colors duration-300 text-[#FF6A00] bg-white border border-[#FF6A00] shadow-lg hover:text-white text-sm sm:text-base"
                aria-label="Schedule a call to discuss your digital project"
              >
                <a 
                  href="/appointment" 
                  className="relative z-10"
                  aria-label="Schedule a call with our team"
                >
                  Schedule a Call
                </a>
                <span 
                  className="absolute inset-0 bg-[#FF6A00] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"
                  aria-hidden="true"
                ></span>
              </button>

              {/* Solid button */}
              <button 
                className="bg-[#FF6A00] hover:bg-[#E65D00] text-white font-semibold py-2.5 sm:py-3 md:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6A00]/25 text-sm sm:text-base"
                aria-label="View all our digital services"
              >
                View All Services
              </button>
            </div>

            {/* Trust Section */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-black/70">
              <div className="flex items-center gap-2">
                <div 
                  className="flex -space-x-1 sm:-space-x-2"
                  aria-label="150+ projects delivered"
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#FF6A00] rounded-full border-2 border-gray-900"
                      aria-hidden="true"
                    ></div>
                  ))}
                </div>
                <span className="whitespace-nowrap">150+ Projects Delivered</span>
              </div>
            </div>
          </div>

          {/* Service Columns */}
          <div 
            className="mt-8 sm:mt-10 lg:mt-0"
            role="region"
            aria-label="Our digital services showcase"
          >
            <div className="h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden grid md:grid-cols-2 gap-3 sm:gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
              <ServiceColumn services={services} />
              <ServiceColumn
                services={services.slice().reverse()}
                reverse
                className="hidden md:flex md:flex-col"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}