import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Tag from '../Components/Tag';

const TestimonialSlider = () => {
  const [testimonials] = useState([
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "I Am writing to express my sincere appreciation for your hard work & your contribution have been invaluable to our team & we are grateful for all that you do. Once again, thank you for all that you do & appreciated by our visitors too.",
    "name": "Hitesh Ahuja",
    "role": "CEO, M/s Brandbase Capsule Pvt. Ltd.",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "This is certify that M/S Brandbase Capsule Pvt.Ltd. was awarded the stall design and fabrication for Distribuelec Exhibition, Which was held at Bombay Exhibition Centre, Goregaon, Mumbai from 16th to 18th of January 2024.",
    "name": "Michael V",
    "role": "Dy GM, Marketing",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "M/s Brandbase Capsule Pvt. Ltd. did the fabrication for our booth in Professional Beauty Expo at Bombay Exhibition Center, NESCO, Mumbai. They provided timely handover of the complete booth.",
    "name": "Bikram Sapra",
    "role": "Director",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "We thank Brandbase Capsule Pvt. Ltd. for giving us the entire ready stall well in advance and also for their co-operation all the time.",
    "name": "Haresh Gada",
    "role": "Director",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "This is to certify that M/s. Brandbase Capsule Pvt. Ltd. (mumbai), has performed their job of executing stall designing at the highest level of Standards in the IIJS Exhibition at Mumbai.",
    "name": "Ghanshyam Gems",
    "role": "Proprietor",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "We were pleased with the creative booth design, the timely handover of the complete booth and the professionalism of the Brandbase Capsule team.",
    "name": "Triveni Glass International",
    "role": "",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "We appreciate you for your effort by which you presented a wonderful stall for us during excon event. The timely completion of the same should be very much highlighted. Thanking you once again. all the wishes for the team Brandbase Capsule. if we participate in bauma expo we shall appoint you as our stall fabricator.",
    "name": "Anto Sebastian",
    "role": "CEO",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "Brandbase capsule pvt. Ltd., Mumbai, upon the successfully design & construct of the customized and complete stall A-31 at Excon - 2022 Bangalore between 17th May-22 to 21 May-22. Brandbase was responsible for Designing, Fabrication and dismantling of stall at Excon-2022. We would like to appreciate Brandbase on their services as well as assistance in the smooth running of operations during the said event and in contribution towards making show wonderful. We wish them the best luck for all future endeavors.",
    "name": "Ravi Angane",
    "role": "",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  },
  {
    "logo": "https://logodix.com/logo/2003989.png",
    "text": "M/s.Brandbase capsule Private Limited Mumbai, upon the successfully design and Construct of the customized and complete STALL A-111 AT INDIA MED EXPO AT HITEC City Hyderabad between 9th December to 11th 2022 M/s. Brandbase was responsible for designing, Fabrication And dismantling of Stall at India med expo 2022. We would like to appreciate brandbase on their service as well as assistance in the smooth running of operatios during the said event and in contribution toward masking show wonderful We wish them the best Luck for all future endeavors",
    "name": "Ritesh Ranjan",
    "role": "",
    "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
  }
  ]);
  
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const { logo, text, name, role, avatar } = testimonials[index];

  return (
    <div className="bg-white text-black min-h-screen px-15 py-20 font-sans">
      <div className="max-w-7xl space-y-5">
        <Tag>Testimonals</Tag>
        {/* Heading */}
        <h1 className="text-4xl lg:text-6xl font-medium leading-none">
          THEIR WORDS,<br />NOT <span className='text-[#FF6600]'>OURS</span>
        </h1>

        {/* Testimonial */}
        <div className="mt-16">
          <img src={logo} alt="Client Logo" className="h-17 w-auto mb-6" />

          <p className="text-xl md:text-xl leading-relaxed max-w-6xl">“{text}”</p>

          {/* Avatar and Info */}
          <div className="flex items-center gap-4 mt-8">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-bold uppercase text-sm text-[#FF6600]">{name}</p>
              <p className="text-xs text-gray-700">{role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;