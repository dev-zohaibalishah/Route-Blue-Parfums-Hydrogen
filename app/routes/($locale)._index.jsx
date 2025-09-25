// import {Await, useLoaderData, Link} from 'react-router';
// import {Suspense} from 'react';
// import {Image} from '@shopify/hydrogen';
// import {ProductItem} from '~/components/ProductItem';

// import HeroSection from '~/components/Home/HeroSection';
// // import ContentLayout from '~/components/Home/ContentLayout';

// import ExploreCollections from '~/components/Home/ExploreCollections';

// /**
//  * @type {MetaFunction}
//  */
// export const meta = () => {
//   return [{title: 'Route Bleue Parfums | Home'}];
// };

// /**
//  * @param {LoaderFunctionArgs} args
//  */
// export async function loader(args) {
//   // Start fetching non-critical data without blocking time to first byte
//   const deferredData = loadDeferredData(args);

//   // Await the critical data required to render initial state of the page
//   const criticalData = await loadCriticalData(args);

//   return {...deferredData, ...criticalData};
// }

// /**
//  * Load data necessary for rendering content above the fold. This is the critical data
//  * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
//  * @param {LoaderFunctionArgs}
//  */
// async function loadCriticalData({context}) {
//   const [{collections}, allCollections] = await Promise.all([
//     context.storefront.query(FEATURED_COLLECTION_QUERY),
//     context.storefront.query(ALL_COLLECTIONS_QUERY),
//     // Add other queries here, so that they are loaded in parallel
//   ]);

//   return {
//     featuredCollection: collections.nodes[0],
//     allCollections: allCollections.collections.nodes,
//   };
// }

// /**
//  * Load data for rendering content below the fold. This data is deferred and will be
//  * fetched after the initial page load. If it's unavailable, the page should still 200.
//  * Make sure to not throw any errors here, as it will cause the page to 500.
//  * @param {LoaderFunctionArgs}
//  */
// function loadDeferredData({context}) {
//   const recommendedProducts = context.storefront
//     .query(RECOMMENDED_PRODUCTS_QUERY)
//     .catch((error) => {
//       // Log query errors, but don't throw them so the page can still render
//       console.error(error);
//       return null;
//     });

//   return {
//     recommendedProducts,
//   };
// }

// export default function Homepage() {
//   /** @type {LoaderReturnData} */
//   const data = useLoaderData();
//   return (
//     <div className="home">
//       <HeroSection />
//       {/* <ContentLayout /> */}


//       <ExploreCollections allCollections={data.allCollections} />
      
//       {/* <FeaturedCollection collection={data.featuredCollection} /> */}
//       {/* <RecommendedProducts products={data.recommendedProducts} /> */}
//     </div>
//   );
// }

// /**
//  * @param {{
//  *   collection: FeaturedCollectionFragment;
//  * }}
//  */
// function FeaturedCollection({collection}) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// /**
//  * @param {{
//  *   products: Promise<RecommendedProductsQuery | null>;
//  * }}
//  */
// function RecommendedProducts({products}) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

// // get all collections for the explore collections component
// const ALL_COLLECTIONS_QUERY = `#graphql
//   fragment ExploreCollection on Collection {
//     id
//     title
//     handle
//     products(first: 12) {
//       nodes {
//         id
//         title
//         handle
//         description
//         featuredImage {
//           id
//           url
//           altText
//           width
//           height
//         }
//         priceRange {
//           minVariantPrice {
//             amount
//             currencyCode
//           }
//         }
//       }
//     }
//   }
//   query AllCollections($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 20) {
//       nodes {
//         ...ExploreCollection
//       }
//     }
//   }
// `;


// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// `;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     featuredImage {
//       id
//       url
//       altText
//       width
//       height
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// `;

// /** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
// /** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
// /** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
// /** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
// /** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */










import {Await, useLoaderData, Link} from 'react-router';
import {Suspense, useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';

import HeroSection from '~/components/Home/HeroSection';
import ExploreCollections from '~/components/Home/ExploreCollections';

/**
 * Video Welcome Overlay Component - Matching Figma Design
 */
function VideoWelcomeOverlay({ onSkip }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Handle video load
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    let timeoutId;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setShowControls(false), 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Initial timeout to hide controls
    timeoutId = setTimeout(() => setShowControls(false), 4000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = document.querySelector('video');
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(video.muted);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={() => setIsVideoLoaded(true)} // Show fallback if video fails
      >
        <source src="/public/images/Welcome.mp4" type="video/mp4" />
      </video>

      {/* Fallback background if video doesn't load */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-blue-800" />
        // <div className="absolute inset-0" />
      )}

      {/* Top Center Logo */}
      <div className="absolute top-[10%] left-[50%] translate-x-[-50%] z-20 flex flex-col items-center">
        {/* <div className="text-2xl font-bold tracking-wider">RB</div>
        <div className="text-xs tracking-[0.2em] opacity-90 font-light">ROUTE BLEUE</div>
        <div className="text-xs tracking-[0.1em] opacity-70 font-light">PARFUMS</div> */}
        <img className='w-12 pb-4' src='/public/images/RBMonogram.png' alt='Raute Bleue Parfums' />
        <img src='/public/images/RBLogo.png' alt='Raute Bleue Parfums' />
      </div>

      {/* Top Right Skip Button */}
      <div className="absolute bottom-[12%] left-[50%] translate-x-[-50%] z-20">
        <button
          onClick={onSkip}
          className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-sm border border-white/20"
        >
          Skip Video →
        </button>
      </div>

      {/* Center Content */}
      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] mb-6 text-white">
            ROUTE BLEUE
          </h1>
          
          <div className="w-32 h-px bg-white/60 mx-auto mb-6"></div>
          
          <p className="text-lg md:text-xl font-light tracking-[0.05em] opacity-90 mb-12">
            PARFUMS
          </p>
          
          <p className="text-base md:text-lg opacity-80 max-w-lg mx-auto leading-relaxed font-light">
            An essence of a journey preserved for eternity
          </p>
        </div>
      </div> */}

      {/* Bottom Left Sound Button */}
      <div className="absolute bottom-[20%] left-[50%] translate-x-[-50%] z-20">
        <button
          onClick={toggleMute}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center"
        >
          {isVideoMuted ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l4.18 4.18a.996.996 0 001.41 0 .996.996 0 000-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Bottom Center - Experience Text with Dots */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-white/80 text-sm mb-3 font-light">Experience the journey</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div> */}

      {/* Bottom Right Enter Button */}
      {/* <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={onSkip}
          className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg"
        >
          Enter Store
        </button>
      </div> */}

      {/* Full screen click handler */}
      {/* <div 
        className="absolute inset-0 cursor-pointer z-5" 
        onClick={onSkip}
        aria-label="Click to enter store"
      /> */}
    </div>
  );
}

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Route Bleue Parfums | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}, allCollections] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(ALL_COLLECTIONS_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
    allCollections: allCollections.collections.nodes,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const [showVideoOverlay, setShowVideoOverlay] = useState(true); // Set to true for testing

  // Uncomment this when you want to show only on first visit
  // useEffect(() => {
  //   const hasVisited = localStorage.getItem('hasVisitedRouteBleue');
  //   if (!hasVisited) {
  //     setShowVideoOverlay(true);
  //   }
  // }, []);

  const handleSkipOverlay = () => {
    setShowVideoOverlay(false);
    // Uncomment when ready to use localStorage
    // localStorage.setItem('hasVisitedRouteBleue', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
  };

  // Prevent body scroll when overlay is visible
  useEffect(() => {
    if (showVideoOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [showVideoOverlay]);

  return (
    <>
      {/* Video Overlay */}
      {showVideoOverlay && <VideoWelcomeOverlay onSkip={handleSkipOverlay} />}

      {/* Normal homepage content */}
      <div className={`home ${showVideoOverlay ? 'hidden' : 'block'}`}>
        <HeroSection />
        <ExploreCollections allCollections={data.allCollections} />
        {/* <FeaturedCollection collection={data.featuredCollection} /> */}
        {/* <RecommendedProducts products={data.recommendedProducts} /> */}
      </div>
    </>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

// get all collections for the explore collections component
const ALL_COLLECTIONS_QUERY = `#graphql
  fragment ExploreCollection on Collection {
    id
    title
    handle
    products(first: 12) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
  query AllCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 20) {
      nodes {
        ...ExploreCollection
      }
    }
  }
`;

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */