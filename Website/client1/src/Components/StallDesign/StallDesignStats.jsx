const StallDesignStats = () => {
  const stats = [
    { number: "1,150+", label: "HAPPY CLIENTS" },
    { number: "1,200+", label: "PROJECTS" },
    { number: "18+", label: "COUNTRY" }
  ];

  return (
    <div className="w-full mt-10">
      {/* Background Image Section */}
      <div
        className="w-full h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.stalldesigns.com/assets/images/homepage/hall.png')",
        }}
      />

      {/* Stats Section */}
      <div className="bg-orange-300 py-16 px-4 sm:px-6 lg:px-8 w-[1200px] mx-auto -mt-20 rounded-xl shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-700 uppercase tracking-wider">
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
