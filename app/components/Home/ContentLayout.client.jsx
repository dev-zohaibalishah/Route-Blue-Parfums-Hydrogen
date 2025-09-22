import React from 'react'
import HomeVideo from './ContentLayout/HomeVideo'
import ImgWithText from './ContentLayout/ImgWithText.client'
import FullWidthImage from './ContentLayout/FullWidthImage.client';



const ContentLayout = () => {
  return (
    <div>

        <HomeVideo />

      {/* Section 1: Truly the Flavour of Nostalgia. (Image on Left) */}
        <ImgWithText
        layout="image-left"
        imageSrc="/images/ManWithPerfume.jpg"
        imageAlt="A man in a floral shirt holding a perfume bottle."
      >
        <div className="prose max-w-[75%]">
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
      </ImgWithText>

      {/* Section 2: Fragrance Notes (Image on Right) */}
      <ImgWithText
        layout="image-right"
        imageSrc="/images/FragranceIngredients.png"
        imageAlt="Various fragrance ingredients including lemons, cinnamon, and vanilla pods."
      >
        <div className="prose max-w-[75%] ml-18">
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
      </ImgWithText>

      {/* Floral Pattern Divider */}
      <FullWidthImage
        imageSrc="/images/FloralPattern.jpg" 
        imageAlt="Decorative floral pattern"
        className="my-8 h-[50vh]" 
      />

      <ImgWithText
        layout="image-left"
        imageSrc="/images/PerfumePackaging.png"
        imageAlt="L'Eau Pralinée perfume bottle and box."
      >
        <div className='prose max-w-[75%]'>
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
      </ImgWithText>

      <FullWidthImage
        imageSrc="/images/ModalImage.png" 
        imageAlt="Decorative floral pattern"
        className="my-8 h-[100vh]" 
      />

    </div>
  )
}

export default ContentLayout