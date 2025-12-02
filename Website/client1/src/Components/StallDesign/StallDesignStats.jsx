const StallDesignStats = () => {
  const stats = [
    { number: "1,150+", label: "HAPPY CLIENTS" },
    { number: "1,200+", label: "PROJECTS" },
    { number: "18+", label: "COUNTRY" }
  ];

  return (
    <div className="w-full mt-10 px-4 sm:px-6 lg:px-8">
      {/* Background Image Section */}
      <div
        className="w-full h-[200px] sm:h-[250px] md:h-[300px] bg-cover bg-center rounded-lg"
        style={{
          backgroundImage:
            "url('https://www.stalldesigns.com/assets/images/homepage/hall.png')",
        }}
      />

      {/* Stats Section */}
      <div className="bg-orange-200 py-8 sm:py-12 md:py-16 px-6 sm:px-8 w-full max-w-[1200px] mx-auto -mt-12 sm:-mt-16 md:-mt-20 rounded-xl shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700 uppercase tracking-wide sm:tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StallDesignStats;