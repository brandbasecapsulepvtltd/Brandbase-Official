import React from "react";

const WeCreate = ({ data }) => {
  // Use the data passed as props
  const { header, leftFeatured, rightColumnItems } = data;

  /* ---------------------------------------------------------
     COMPONENT RETURN
  ----------------------------------------------------------*/
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-[3rem] leading-none font-bold tracking-tighter mb-4">
            <span className="text-orange-600">{header.titleOrange}</span>{" "}
            <span className="text-[#1A1A1A]">{header.titleBlack}</span>
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            {header.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Featured Section */}
          <div className="bg-white dark:bg-black rounded-3xl p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
            <div className="w-full aspect-[4/3] lg:h-[400px] overflow-hidden rounded-2xl mb-6">
              <img
                src={leftFeatured.image}
                alt="Featured Service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-grow px-2 pb-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight">
                {leftFeatured.title}
              </h2>
              <p className="text-gray-500 mt-2 mb-5 text-sm">
                {leftFeatured.subtitle}
              </p>

              <div className="flex flex-wrap gap-2">
                {leftFeatured.tags.map((tag, idx) => (
                  <Tag key={idx} label={tag.label} type={tag.type} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Items */}
          <div className="flex flex-col gap-6">
            {rightColumnItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black rounded-3xl p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#1A1A1A] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 mb-3">
                    {item.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag, idx) => (
                      <Tag key={idx} label={tag.label} type={tag.type} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

// Tag Component
const Tag = ({ label, type }) => {
  const baseStyles =
    "px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wide";

  const typeStyles =
    type === "primary"
      ? "bg-[#CCF368] text-black dark:text-white"
      : "bg-[#F4F4F5] text-gray-500";

  return <span className={`${baseStyles} ${typeStyles}`}>{label}</span>;
};

export default WeCreate;
