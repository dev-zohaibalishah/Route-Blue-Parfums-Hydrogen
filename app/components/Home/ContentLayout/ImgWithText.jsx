import React from 'react';

export default function ImageWithText({ 
  section1Image, 
  section1Text, 
  section2Image, 
  section2Text 
}) {
  
  // Helper function to get image URL from metafield
  const getImageUrl = (imageData, fallbackPath) => {
    if (imageData?.reference?.image?.url) {
      return imageData.reference.image.url;
    }
    if (imageData?.image?.url) {
      return imageData.image.url;
    }
    if (typeof imageData === 'string' && imageData.startsWith('http')) {
      return imageData;
    }
    return fallbackPath;
  };

  // Helper function to render rich text content
  const renderContent = (textData, fallbackContent) => {
    if (textData?.value) {
      // If it's rich text, render as HTML
      return (
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: textData.value }}
        />
      );
    }
    
    if (typeof textData === 'string') {
      // If it's plain text, render directly
      return (
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: textData }} />
        </div>
      );
    }
    
    // Fallback content
    return fallbackContent;
  };

  // Default content for section 1
  const defaultSection1Content = (
    <div className="prose max-w-none">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Truly the Flavour of Nostalgia.</h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        Along Route Bleue, a familiar sight appears, as unchanged as it has
        always been. It is a place of comfort, a safe haven where past
        memories come alive.
      </p>
      <p className="text-sm text-gray-500 mt-4 leading-relaxed">
        Since the beginning of time, a patisserie filled with confectionery
        and desserts that promise a burst of flavour with every bite.
        The scent of freshly baked goods and spices evokes a sense of a time
        where life was simpler and sweeter, preserved for eternity.
        Route Bleue's new Eau de Parfum is a wonderfully timeless
        flavour and fragrance of nostalgia and memories.
      </p>
    </div>
  );

  // Default content for section 2
  const defaultSection2Content = (
    <div className="prose max-w-none">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Fragrance Notes</h2>
      <div className="text-sm text-gray-600 leading-relaxed">
        <p className="font-semibold text-gray-500 uppercase tracking-wide mb-1">Gourmand Family | Unisex</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-semibold">Top Note:</span> Bergamot, Orange, Mandarin, Pink Pepper, Marine Breeze, Cardamom
          </li>
          <li>
            <span className="font-semibold">Heart Note:</span> Tangerine, Praline, Osmanthus, Dark Chocolate, Vetiver, Cinnamon, Nutmeg, Benzoin, Tonka Bean
          </li>
          <li>
            <span className="font-semibold">Base Note:</span> Vanilla, Sandalwood, Cistus, Benzoin, Patchouli, Dry Woods
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Section 1: Dynamic Content (Image on Left) */}
      <div className="w-full flex flex-col md:flex-row py-8 md:py-16">
        <div className="w-full md:w-1/2 overflow-hidden p-4 md:p-8">
          <img
            src={getImageUrl(section1Image, '/images/ManWithPerfume.jpg')}
            alt={section1Image?.reference?.image?.altText || "Section 1 image"}
            className="w-full h-auto object-cover rounded-md shadow-lg"
            onError={(e) => {
              // Fallback to default image if metafield image fails to load
              e.target.src = '/images/ManWithPerfume.jpg';
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
          {renderContent(section1Text, defaultSection1Content)}
        </div>
      </div>

      {/* Section 2: Dynamic Content (Image on Right) */}
      <div className="w-full flex flex-col md:flex-row-reverse py-8 md:py-16">
        <div className="w-full md:w-1/2 overflow-hidden p-4 md:p-8">
          <img
            src={getImageUrl(section2Image, '/images/FragranceIngredients.png')}
            alt={section2Image?.reference?.image?.altText || "Section 2 image"}
            className="w-full h-auto object-cover rounded-md shadow-lg"
            onError={(e) => {
              // Fallback to default image if metafield image fails to load
              e.target.src = '/images/FragranceIngredients.png';
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
          {renderContent(section2Text, defaultSection2Content)}
        </div>
      </div>
    </>
  );
}