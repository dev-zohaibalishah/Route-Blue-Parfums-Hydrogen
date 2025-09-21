import React, { useState, useMemo } from 'react';

const ExploreCollections = ({ collections = [] }) => {
  // Collection categories matching Shopify collection handles/titles
  const collectionCategories = [
    { id: 'women', label: 'Women', handle: 'women' },
    { id: 'men', label: 'Men', handle: 'men' },
    { id: 'unisex', label: 'Unisex', handle: 'unisex' }
  ];

  const [activeCollection, setActiveCollection] = useState('women');

  // Find matching Shopify collection and get its products
  const displayProducts = useMemo(() => {
    // console.log('Collections received:', collections);
    // console.log('Active collection:', activeCollection);
    
    if (!collections || collections.length === 0) {
    //   console.log('No collections provided');
      return [];
    }
    
    // Find collection that matches the active tab
    const matchingCollection = collections.find(collection => {
      const handle = collection.handle?.toLowerCase();
      const title = collection.title?.toLowerCase();
      const activeHandle = activeCollection.toLowerCase();
      
    //   console.log(`Checking collection: ${collection.title} (${collection.handle})`);
      
      const matches = handle === activeHandle || 
                     title === activeHandle || 
                     handle?.includes(activeHandle) || 
                     title?.includes(activeHandle) ||
                     // Also check for plural forms
                     handle === `${activeHandle}s` ||
                     title === `${activeHandle}s` ||
                     // Check if collection handle contains the category
                     handle?.split('-').includes(activeHandle) ||
                     handle?.split('_').includes(activeHandle);
      
    //   console.log(`Match result for ${collection.title}:`, matches);
      return matches;
    });

    if (!matchingCollection) {
    //   console.log('No matching collection found for:', activeCollection);
    //   console.log('Available collections:', collections.map(c => ({ title: c.title, handle: c.handle })));
      return [];
    }
    
    // console.log('Found matching collection:', matchingCollection.title);
    
    // Handle different product data structures
    let products = [];
    if (matchingCollection.products) {
      if (matchingCollection.products.nodes) {
        products = matchingCollection.products.nodes;
      } else if (Array.isArray(matchingCollection.products)) {
        products = matchingCollection.products;
      } else if (matchingCollection.products.edges) {
        products = matchingCollection.products.edges.map(edge => edge.node);
      }
    }
    
    // console.log('Products found:', products.length);
    
    // Return up to 12 products from the matching collection
    return products.slice(0, 12);
  }, [collections, activeCollection]);

  // Helper function to truncate description to 10 words
  const truncateDescription = (description, maxWords = 10) => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    if (typeof price === 'string') return price;
    if (price.amount && price.currencyCode) {
      return `${price.currencyCode === 'USD' ? '$' : ''}${price.amount}`;
    }
    return `$${price}`;
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 mb-1">
            Explore all seven worlds of fragrance,
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-700">
            discover your signature.
          </p>
        </div>

        {/* Collection Filter Menu */}
        <div className="flex flex-wrap items-center justify-between mb-8 md:mb-12 relative z-0">
          {/* Collection Tabs */}
          <div className="flex gap-4 md:gap-8">
            {collectionCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCollection(category.id)}
                className={`text-sm md:text-base font-medium transition-colors duration-200 relative z-0 ${
                  activeCollection === category.id
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Show All Button */}
          <a
            href="/collections"
            className="text-sm md:text-base font-medium text-gray-900 underline hover:text-gray-600 transition-colors duration-200 relative z-0"
          >
            Show all
          </a>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <>
            {/* Desktop Layout - 4 columns for first row, 3 for second */}
            <div className="hidden lg:block">
              {/* First Row - 4 products */}
              <div className="grid grid-cols-4 gap-6 xl:gap-8 mb-8">
                {displayProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="group">
                    {/* Product Image Container */}
                    <div className="relative mb-4">
                      <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                          alt={product.title}
                          className="w-full h-full object-contain p-4"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {truncateDescription(product.description)}
                      </p>
                      <p className="text-base font-medium text-gray-900 mb-4">
                        {formatPrice(product.priceRange?.minVariantPrice || product.price)}
                      </p>
                      <a
                        href={`/products/${product.handle}`}
                        className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
                      >
                        <span className="mr-2">Discover</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - 3 products centered */}
              {displayProducts.length > 4 && (
                <div className="grid grid-cols-3 gap-6 xl:gap-8 max-w-5xl mx-auto">
                  {displayProducts.slice(4, 7).map((product) => (
                    <div key={product.id} className="group">
                      <div className="relative mb-4">
                        <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md">
                          <img
                            src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                            alt={product.title}
                            className="w-full h-full object-contain p-4"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {truncateDescription(product.description)}
                        </p>
                        <p className="text-base font-medium text-gray-900 mb-4">
                          {formatPrice(product.priceRange?.minVariantPrice || product.price)}
                        </p>
                        <a
                          href={`/products/${product.handle}`}
                          className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
                        >
                          <span className="mr-2">Discover</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tablet Layout - 2 columns */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {displayProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative mb-4">
                      <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                          alt={product.title}
                          className="w-full h-full object-contain p-4"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-medium text-gray-900 mb-3">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {truncateDescription(product.description)}
                      </p>
                      <p className="text-lg font-medium text-gray-900 mb-6">
                        {formatPrice(product.priceRange?.minVariantPrice || product.price)}
                      </p>
                      <a
                        href={`/products/${product.handle}`}
                        className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded transition-colors duration-200"
                      >
                        <span className="mr-2">Discover</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout - 1 column */}
            <div className="block md:hidden">
              <div className="space-y-8">
                {displayProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="group text-center">
                    <div className="relative mb-6">
                      <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md max-w-xs mx-auto">
                        <img
                          src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                          alt={product.title}
                          className="w-full h-full object-contain p-6"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">
                        {product.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-4 leading-relaxed max-w-sm mx-auto">
                        {truncateDescription(product.description)}
                      </p>
                      <p className="text-lg font-medium text-gray-900 mb-6">
                        {formatPrice(product.priceRange?.minVariantPrice || product.price)}
                      </p>
                      <a
                        href={`/products/${product.handle}`}
                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded transition-colors duration-200"
                      >
                        <span className="mr-2">Discover</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found in the {activeCollection} collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreCollections;