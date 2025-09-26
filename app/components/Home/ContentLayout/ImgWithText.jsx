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

  // Helper function to render rich text content as plain text
  const renderContent = (textData, fallbackContent) => {
    console.log('Text data received:', textData);

    try {
      if (textData && textData.value) {
        const parsed = JSON.parse(textData.value);

        const extractText = (node) => {
          if (node.type === 'text') return node.value;
          if (node.children) return node.children.map(extractText).join(' ');
          return '';
        };

        const content = extractText(parsed);

        return (
          <div className="prose max-w-none">
            <p>{content}</p>
          </div>
        );
      }

      if (typeof textData === 'string' && textData.trim()) {
        return (
          <div className="prose max-w-none">
            <p>{textData}</p>
          </div>
        );
      }
    } catch (err) {
      console.error('Error parsing metafield rich text:', err);
    }

    return fallbackContent;
  };

  const hasSection1Content = (section1Text?.value && section1Text.value.trim()) || 
                             (typeof section1Text === 'string' && section1Text.trim());
  
  const hasSection2Content = (section2Text?.value && section2Text.value.trim()) || 
                             (typeof section2Text === 'string' && section2Text.trim());

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
              e.target.src = '/images/ManWithPerfume.jpg';
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
          {hasSection1Content 
            ? renderContent(section1Text, null)
            : defaultSection1Content
          }
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
              e.target.src = '/images/FragranceIngredients.png';
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
          {hasSection2Content 
            ? renderContent(section2Text, null)
            : defaultSection2Content
          }
        </div>
      </div>
    </>
  );
}
