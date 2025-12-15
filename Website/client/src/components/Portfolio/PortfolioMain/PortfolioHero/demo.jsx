import { ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerStagger, } from "./hero-video"

const PortfolioHero = () => {
  return (
    <ContainerScroll className="mt-25 bg-white text-center text-black">
      <ContainerStagger viewport={{ once: false }}>
        {/* Main Headline */}
        <ContainerAnimated animation="top">
          <h1 className="text-4xl font-black leading-none tracking-tighter sm:text-5xl md:text-7xl">
            Transformative Solutions for <span className="text-[#FF6600]">Digital Success</span>
          </h1>
        </ContainerAnimated>

        {/* Supporting Statement */}
        <ContainerAnimated animation="bottom">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl text-gray-700 mt-6">
            Where Strategy Meets Execution
          </h2>
        </ContainerAnimated>

        {/* Portfolio Value Proposition */}
        <ContainerAnimated animation="blur" className="my-8 md:my-10">
          <p className="text-lg md:text-xl leading-relaxed tracking-normal max-w-4xl mx-auto text-gray-600">
            Explore our portfolio of innovative projects where we've delivered exceptional results 
            through strategic digital solutions. From comprehensive marketing campaigns to 
            cutting-edge web development, our work demonstrates our commitment to excellence 
            and measurable business impact.
          </p>
        </ContainerAnimated>

        {/* Portfolio Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Driven</h3>
              <p className="text-gray-600 text-sm">High-conversion digital experiences</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Strategic Design</h3>
              <p className="text-gray-600 text-sm">User-centric design principles</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Measurable Results</h3>
              <p className="text-gray-600 text-sm">Data-backed marketing solutions</p>
            </div>
          </div>

        {/* CTAs */}
        <div className="py-5 mt-5 flex flex-col sm:flex-row justify-center items-center gap-6">
                    <button
            className="rounded-lg bg-[#FF6600] text-white hover:bg-[#E55A00] px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Explore Our Portfolio
          </button>
          <button
            className="rounded-lg border-2 border-gray-300 text-gray-700 hover:border-[#FF6600] hover:text-[#FF6600] px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
          >
            Schedule a Consultation
          </button>
        </div>
      </ContainerStagger>

      {/* Portfolio Showcase Video */}
      <ContainerInset>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            width="100%"
            height="100%"
            loop
            playsInline
            autoPlay
            muted
            className="relative z-10 block h-auto w-full max-h-[600px] object-cover"
          >
            <source
              src="https://www.pexels.com/download/video/6774633/"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Video Caption */}
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">Portfolio Showcase: Recent Project Highlight</span>
            </div>
          </div>
        </div>
      </ContainerInset>
    </ContainerScroll>
  )
}

export { PortfolioHero }