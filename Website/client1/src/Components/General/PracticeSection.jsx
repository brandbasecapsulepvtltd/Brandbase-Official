import React, { useEffect, useRef } from 'react';

const PracticeSection = () => {
  const sectionRef = useRef(null);
  const tagsRef = useRef([]);

  // Colors derived from your CSS variables
  const colors = {
    black: '#32230c',
    white: '#FFF0B3',
    pc1: '#fd7024',
    pc2: '#88b7bd',
  };

  // Tag Data to keep JSX clean
  const tags = [
    { text: "passion", val: 1.3, top: "30%", left: "30%", rotate: "10deg", dark: true },
    { text: "inovation", val: -1.5, top: "30%", left: "55%", rotate: "-15deg", dark: false },
    { text: "finance", val: 2, top: "40%", left: "28%", rotate: "6deg", dark: false },
    { text: "leadership", val: 1.2, top: "50%", left: "20%", rotate: "-8deg", dark: false },
    { text: "marketing", val: -1.4, top: "70%", left: "60%", rotate: "-10deg", dark: false },
    { text: "sales", val: 1.7, top: "50%", left: "55%", rotate: "7deg", dark: false },
    { text: "recruiting", val: -2, top: "70%", left: "20%", rotate: "3deg", dark: true },
    { text: "project management", val: 1.8, top: "60%", left: "30%", rotate: "5deg", dark: true },
    { text: "product launch", val: -1.2, top: "40%", left: "50%", rotate: "-7deg", dark: false },
    { text: "DEI", val: -1.9, top: "50%", left: "75%", rotate: "-5deg", dark: false },
  ];

  useEffect(() => {
    const handleMouseMove = (dets) => {
      tagsRef.current.forEach((elem) => {
        if (elem) {
          const position = parseFloat(elem.getAttribute("data-value"));
          const x = (window.innerWidth - dets.clientX * position) / 50;
          const y = (window.innerHeight - dets.clientY * position) / 50;
          elem.style.transform = `translate(${x}px , ${y}px)`;
        }
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      id="page3" 
      ref={sectionRef}
      className="relative w-full h-screen flex items-center border-y-2 border-[#32230c] overflow-hidden"
      style={{ backgroundColor: colors.pc2, fontFamily: '"Gabarito", sans-serif' }}
    >
      {/* --- Left Side --- */}
      <div className="flex flex-col justify-center w-1/2 h-full px-[4vw] relative text-[#FFF0B3]">
        
        {/* Text 1: Practice */}
        <div className="flex absolute" style={{ top: '3vh', left: '4vw' }}> {/* Adjusted generic pos for layout */}
          <h1 className="z-10 font-bold leading-none" style={{ fontSize: '11vw' }}>practice</h1>
          <svg
            id="star1"
            viewBox="0 0 71 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{ height: '40%', top: '3vh', right: '-21vw' }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M71 35.8695C70.0115 35.9559 69.0109 36 68 36C49.2223 36 34 20.7777 34 2C34 1.32861 34.0194 0.661766 34.0578 0H33.9421C33.9805 0.661766 34 1.32861 34 2C34 20.7777 18.7777 36 -3.05176e-05 36C18.7777 36 34 51.2223 34 70C34 70.3345 33.9951 70.6678 33.9855 71H34.0144C34.0048 70.6678 34 70.3345 34 70C34 51.2223 49.2223 36 68 36C69.0109 36 70.0115 36.0441 71 36.1305V35.8695Z"
              fill={colors.white}
            />
          </svg>
        </div>

        {/* Text 2: Your */}
        <div className="flex absolute" style={{ top: '49vh', left: '14vh' }}>
          <h1 
            className="z-[1] font-bold leading-none" 
            style={{ fontSize: '11vw', backgroundColor: colors.pc2 }}
          >
            your
          </h1>
          <svg
            id="star2"
            viewBox="0 0 71 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{ height: '25%', left: '-14vw', top: '15vh' }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M71 35.8695C70.0115 35.9559 69.0109 36 68 36C49.2223 36 34 20.7777 34 2C34 1.32861 34.0194 0.661766 34.0578 0H33.9421C33.9805 0.661766 34 1.32861 34 2C34 20.7777 18.7777 36 -3.05176e-05 36C18.7777 36 34 51.2223 34 70C34 70.3345 33.9951 70.6678 33.9855 71H34.0144C34.0048 70.6678 34 70.3345 34 70C34 51.2223 49.2223 36 68 36C69.0109 36 70.0115 36.0441 71 36.1305V35.8695Z"
              fill={colors.white}
            />
          </svg>
        </div>

        {/* Arrow SVG */}
        <svg
          id="arrow"
          viewBox="0 0 394 133"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{ height: '20%', left: '-5.5vw', top: '47vh' }}
        >
          <path
            d="M394 19L364 1.67949L364 36.3205L394 19ZM0 132H288.415V126H0V132ZM288.415 49H228.769V55H288.415V49ZM228.769 22L367 22L367 16L228.769 16L228.769 22ZM215.269 35.5C215.269 28.0442 221.314 22 228.769 22L228.769 16C218 16 209.269 24.7304 209.269 35.5H215.269ZM228.769 49C221.314 49 215.269 42.9558 215.269 35.5H209.269C209.269 46.2696 218 55 228.769 55V49ZM329.915 90.5C329.915 67.5802 311.335 49 288.415 49V55C308.021 55 323.915 70.8939 323.915 90.5H329.915ZM288.415 132C311.335 132 329.915 113.42 329.915 90.5H323.915C323.915 110.106 308.021 126 288.415 126V132Z"
            fill={colors.white}
          />
        </svg>
      </div>

      {/* --- Right Side --- */}
      <div className="relative w-1/2 h-[90%] left-0 overflow-hidden">
        {tags.map((tag, index) => (
          <h1
            key={index}
            ref={(el) => (tagsRef.current[index] = el)}
            data-value={tag.val}
            className={`
              absolute inline-block px-[10px] py-[5px] cursor-pointer
              transition-colors duration-1000 ease-in-out
              hover:bg-[#fd7024] hover:text-[#32230c]
            `}
            style={{
              top: tag.top,
              left: tag.left,
              transform: `rotate(${tag.rotate})`, // Initial rotation handled here, translation added by JS
              fontSize: '3vw',
              backgroundColor: tag.dark ? colors.black : colors.white,
              color: tag.dark ? colors.white : colors.black,
            }}
          >
            {tag.text}
          </h1>
        ))}
      </div>
    </section>
  );
};

export default PracticeSection;