import React from 'react';

const CallToAction1 = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center text-black font-anton">
      <div className="text-center">
        {/* Headline */}
        <h2 className="text-[48px] md:text-[100px] font-bold leading-tight">
          GOT A PROJECT?
        </h2>

        {/* LET'S TALK Section */}
        <div className="flex items-center justify-center gap-4">
          {/* Arrow */}
          <span className="text-yellow-500 text-[50px] md:text-[60px] font-bold">→</span>

          {/* Clickable LET’S TALK */}
          <button
           onClick={() => {}}
           className="text-yellow-500 text-[50px] md:text-[100px] font-semibold underline hover:opacity-80 transition tracking-wider"
          >
            LET’S TALK
</button>


          {/* (WE’RE READY!) */}
          <span className="text-gray-900 text-xs md:text-lg mt-12 md:mt-24 ">
            (WE’RE READY!)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CallToAction1;
