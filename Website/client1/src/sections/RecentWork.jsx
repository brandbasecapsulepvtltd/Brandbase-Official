import Tag from "../Components/Tag";

const recentWorks = [
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/6.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-2"
  },
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/1.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-1"
  },
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/8.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-2"
  },
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/9.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-2"
  },
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/10.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-1"
  },
  {
    image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/11.jpg",
    span: "col-span-2 md:col-span-1 md:row-span-1"
  }
];

export default function RecentWork() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <Tag>Our Recent Work</Tag>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mt-3 sm:mt-4 leading-tight">
            Work We're Proud Of
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px]">
          {recentWorks.map((work, index) => (
            <div
              key={index}
              className={`${work.span} rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md`}
            >
              <img
                src={work.image}
                alt={`Recent work ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
          <button className="bg-[#FF6A00] hover:bg-[#E65D00] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6A00]/25 text-sm sm:text-base">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}