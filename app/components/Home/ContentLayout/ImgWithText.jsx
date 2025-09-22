import React from 'react';
// import ManWithPerfume from '~/assets/HomePage/ManWithPerfume.jpg';
// import FragranceIngredients from '~/assets/HomePage/FragranceIngredients.png';

export default function ImageWithText() {
  return (
    <>
      {/* Section 1: Truly the Flavour of Nostalgia. (Image on Left) */}
      <div className="w-full flex flex-col md:flex-row py-8 md:py-16">
        <div className="w-full md:w-1/2 overflow-hidden p-4 md:p-8">
          <img
            src='/images/ManWithPerfume.jpg'
            alt="A man in a floral shirt holding a perfume bottle."
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
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
        </div>
      </div>

      {/* Section 2: Fragrance Notes (Image on Right) */}
      <div className="w-full flex flex-col md:flex-row-reverse py-8 md:py-16">
        <div className="w-full md:w-1/2 overflow-hidden p-4 md:p-8">
          <img
            src='/images/FragranceIngredients.png'
            alt="Various fragrance ingredients including lemons, cinnamon, and vanilla pods."
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
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
        </div>
      </div>
    </>
  );
}