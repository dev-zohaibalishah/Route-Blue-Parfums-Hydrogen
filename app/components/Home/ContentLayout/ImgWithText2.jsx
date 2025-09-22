import React from 'react';
// import PerfumePackaging from '~/assets/HomePage/PerfumePackaging.png';

export default function ImgWithText2() {
  return (
    <div className="w-full flex flex-col md:flex-row py-8 md:py-16">
      {/* Image Block */}
      <div className="w-full md:w-1/2 overflow-hidden p-4 md:p-8">
        <img
          src='/images/PerfumePackaging.png'
          alt="L'Eau Pralinée perfume bottle and box."
          className="w-full h-auto object-cover rounded-md shadow-lg"
        />
      </div>

      {/* Text Content Block */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
        <div className="prose max-w-none">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Product Detailing</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A celebration of nostalgia, L'Eau Pralinée is a unisex
            gourmand fragrance composed by master perfumers to
            paint a picture of the past. Brought to life by the top notes of
            cardamom and pink pepper, the composition feels cozy and
            warm, infused with the heart notes of orangette and praline
            and the base notes of sandalwood and vanilla, evoking an
            intense sense of nostalgia.
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold mt-8 mb-4">Package Detailing</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Drawing inspiration from the renowned patisseries of the
            French Riviera, the box showcases illustrations of the nuts
            used as ingredients in the fine art of crafting confectionery
            and desserts. The fragrance bottle is housed within the box,
            set against the abstract and dream-like backdrop of a flower
            pictured with incredible attention to detail. Honouring
            history, the logo features a classical pattern, elegantly
            presented on the gold self-pump cap and collar of the
            bottle.
          </p>
        </div>
      </div>
    </div>
  );
}