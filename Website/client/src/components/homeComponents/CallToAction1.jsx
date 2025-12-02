import React from 'react';

const CallToAction1 = () => {
  const handleContactClick = () => {
    // In a real application, this would navigate to contact form or open modal
    console.log('Contact button clicked');
    // Example: router.push('/contact')
    // Example: setShowContactModal(true)
  };

  return (
    <section 
      aria-labelledby="cta-heading"
      className="bg-white min-h-screen flex items-center justify-center text-black font-anton"
    >
      <div className="text-center">
        {/* Headline */}
        <h1 
          id="cta-heading"
          className="text-[48px] md:text-[100px] font-bold leading-tight"
        >
          GOT A PROJECT?
        </h1>

        {/* LET'S TALK Section */}
        <div className="flex items-center justify-center gap-4">
          {/* Arrow */}
          <span 
            className="text-yellow-500 text-[50px] md:text-[60px] font-bold"
            aria-hidden="true"
          >
            →
          </span>

          {/* Clickable LET'S TALK */}
          <button
            onClick={handleContactClick}
            className="text-yellow-500 text-[50px] md:text-[100px] font-semibold underline hover:opacity-80 transition tracking-wider"
            aria-label="Let's talk about your project - Contact us now"
          >
            LET'S TALK
          </button>

          {/* (WE'RE READY!) */}
          <span 
            className="text-gray-900 text-xs md:text-lg mt-12 md:mt-24"
            aria-label="We're ready to help with your project"
          >
            (WE'RE READY!)
          </span>
        </div>

        {/* Hidden descriptive text for screen readers */}
        <div className="sr-only">
          <p>Contact us to discuss your project. We're ready to help bring your ideas to life.</p>
          <p>Click the "LET'S TALK" button to get in touch with our team.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction1;