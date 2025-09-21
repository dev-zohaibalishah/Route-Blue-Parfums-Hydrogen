import React from 'react';
import HeroBanner from '~/assets/HomePage/HeroBanner.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HeroBanner}')`
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Top Title Section */}
        <div className="flex-none pt-16 md:pt-20 lg:pt-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight md:leading-relaxed">
              <span className="italic font-serif">
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
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base md:text-lg rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="mr-2 sm:mr-3">Read Route Bleue Story</span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
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