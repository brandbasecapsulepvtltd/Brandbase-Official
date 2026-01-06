"use client";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { ArrowRight } from "lucide-react";

export default function AboutSection3() {
  return (
    <section className="py-15 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2 text-xl">
              <span className="text-orange-500 animate-spin">✱</span>
              <span className="text-sm font-medium text-gray-600">
                WHO WE ARE
              </span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-white dark:bg-black rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/facebook.svg"
                  alt="fb"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-white dark:bg-black rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/instagram.svg"
                  alt="insta"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-white dark:bg-black rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/linkedin.svg"
                  alt="linkedin"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-white dark:bg-black rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/youtube.svg"
                  alt="youtube"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          <figure className="relative group">
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="https://img.freepik.com/premium-photo/interior-modern-office-with-glass-walls-tiled-floor-rows-orange-armchairs-3d-rendering_979520-62343.jpg"
              ></image>
            </svg>
          </figure>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">10+</span>
                <span className="text-gray-600">years of excellence</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">1000+</span>
                <span className="text-gray-600">projects delivered</span>
              </div>
            </div>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <div className="flex lg:text-3xl sm:text-2xl text-xl items-center gap-2 mb-2">
                <span className="text-orange-500 font-semibold">500+</span>
                <span className="text-gray-600 uppercase">projects</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">98%</span>
                <span className="text-gray-600">client satisfaction</span>
                <span className="text-gray-300 lg:hidden block">|</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8 mt-4">
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl !leading-[110%] font-semibold text-gray-900 dark:text-gray-100 mb-6 md:mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 1,
                }}
              >
                Elevating Brands Through Innovation & Excellence
              </VerticalCutReveal>
            </h1>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-gray-600">
              <div className="text-xs sm:text-base">
                <p className="leading-relaxed text-justify">
                  At BCPL, we are dedicated to excellence and innovation,
                  offering customized solutions to meet each client's specific
                  needs. With our worldwide reach, BCPL stands prepared to
                  assist your event and marketing objectives with unparalleled
                  professionalism and creativity.
                </p>
              </div>
              <div className="text-xs sm:text-base">
                <p className="leading-relaxed text-justify">
                  As a top provider of event management, digital marketing,
                  website development, and exhibition services, we excel in
                  crafting memorable experiences and achieving outstanding
                  outcomes for clients globally.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 mt-4 md:mt-0">
            <div className="text-left md:text-right">
              <div className="text-orange-500 text-xl md:text-2xl font-bold mb-1 md:mb-2">
                BRANDBASE CAPSULE
              </div>
              <div className="text-gray-600 text-xs md:text-sm mb-6 md:mb-8">
                Your Trusted Partner in Marketing & Digital Excellence
              </div>

              <div className="mb-6">
                <p className="text-gray-900 dark:text-gray-100 font-medium text-sm md:text-base mb-4">
                  At BCPL, we are committed to delivering excellence in every
                  project. Whether it's event management, digital marketing,
                  website development, or international exhibitions, we ensure
                  your brand stands out and achieves its objectives.
                </p>
              </div>

              {/* Button: w-full on mobile, then w-fit ml-auto on md and up */}
              <button className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-full md:w-fit md:ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold justify-center md:justify-start">
                LET'S COLLABORATE <ArrowRight className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
