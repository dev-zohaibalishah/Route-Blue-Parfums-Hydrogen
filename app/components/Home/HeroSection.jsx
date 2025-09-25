import React from 'react';
import HeroBanner from '~/assets/HomePage/HeroBanner.png';

// import '../../styles/header.css'

const HeroSection = () => {
  return (
    <section className="z-hero-height relative w-full flex flex-col" style={{ minHeight: "calc(100vh - 61px)" }}>
      {/* Background Image */}
      <div 
        className="z-hero-height absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HeroBanner}')`
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="z-hero-height absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="z-hero-height relative z-10 flex flex-col">
        
        {/* Top Title Section */}
        <div className="flex-none pt-16 md:pt-20 lg:pt-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight md:leading-relaxed">
              {/* <span className="italic font-serif"> */}
              <span className="italic font-dancing lg:text-5xl">
                An essence of a journey preserved for eternity
              </span>
            </h1>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Bottom CTA Button */}
        <div className="flex-none pb-16 md:pb-20 lg:pb-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <a 
              href="/blogs"
              className="group relative inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 font-medium text-sm sm:text-base md:text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102"
            >
              <span className="mr-2 sm:mr-3 text-white">Read Route Bleue Story</span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 transform text-white group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;