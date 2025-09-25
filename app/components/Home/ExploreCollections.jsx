import React, { useState, useMemo } from 'react';

const ExploreCollections = ({ collections = [], allCollections = [] }) => {
  // Collection categories matching Shopify collection handles/titles
  const collectionCategories = [
    { id: 'women', label: 'Women', handle: 'women' },
    { id: 'men', label: 'Men', handle: 'men' },
    { id: 'unisex', label: 'Unisex', handle: 'unisex' },
    { id: 'all', label: 'Show all', handle: 'all' }
  ];

  const [activeCollection, setActiveCollection] = useState('all');

  // Use allCollections if provided, otherwise use collections prop
  const availableCollections = allCollections.length > 0 ? allCollections : collections;

  // Get products based on active collection
  const displayProducts = useMemo(() => {
    if (!availableCollections || availableCollections.length === 0) {
      return [];
    }
    
    // If "Show all" is selected, get products from all collections
    if (activeCollection === 'all') {
      const allProducts = [];
      availableCollections.forEach(collection => {
        let products = [];
        if (collection.products) {
          if (collection.products.nodes) {
            products = collection.products.nodes;
          } else if (Array.isArray(collection.products)) {
            products = collection.products;
          } else if (collection.products.edges) {
            products = collection.products.edges.map(edge => edge.node);
          }
        }
        allProducts.push(...products);
      });

      // --- START: Duplicate Removal Logic ---
      const productIds = new Set();
      const uniqueProducts = [];

      // Iterate through all collected products and only add unique IDs
      allProducts.forEach(product => {
        // Assuming 'id' is a unique identifier (like Shopify GID)
        if (product.id && !productIds.has(product.id)) {
          productIds.add(product.id);
          uniqueProducts.push(product);
        }
      });
      
      // --- END: Duplicate Removal Logic ---

      // Return the unique products, limited to 12
      return uniqueProducts.slice(0, 12); 
    }
    
    // Find collection that matches the active tab
    const matchingCollection = availableCollections.find(collection => {
      const handle = collection.handle?.toLowerCase();
      const title = collection.title?.toLowerCase();
      const activeHandle = activeCollection.toLowerCase();
      
      return handle === activeHandle || 
             title === activeHandle || 
             handle?.includes(activeHandle) || 
             title?.includes(activeHandle) ||
             handle === `${activeHandle}s` ||
             title === `${activeHandle}s`;
    });

    if (!matchingCollection) {
      return [];
    }
    
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
    
    return products.slice(0, 12);
  }, [availableCollections, activeCollection]);

  // Helper function to truncate description
  const truncateDescription = (description, maxWords = 12) => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Format price helper (not used in current card design but kept for completeness)
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    if (typeof price === 'string') return price;
    if (price.amount && price.currencyCode) {
      const symbol = price.currencyCode === 'USD' ? '$' : price.currencyCode + ' ';
      return `${symbol}${parseFloat(price.amount).toFixed(1)}`;
    }
    return `$${price}`;
  };

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 lg:mb-16">
          {/* Header Text */}
          <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 leading-tight">
              Explore all seven worlds of fragrance,
              <br className="hidden sm:block" />
              <span className="text-gray-700"> discover your signature.</span>
            </h2>
          </div>

          {/* Collection Filter Menu - Top Right */}
          <div className="flex gap-6 lg:gap-8 lg:mt-1">
            {collectionCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCollection(category.id)}
                className={`text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeCollection === category.id
                    ? 'text-gray-900 underline underline-offset-4'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          // Main Grid Container
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* First row - show up to 4 products on desktop, 2 on tablet, 1 on mobile */}
            {displayProducts.slice(0, 4).map((product) => (
              <a
                key={product.id}
                href={`/products/${product.handle}`}
                className="group cursor-pointer block"
              >
                {/* Product Card - Row 1 Design */}
                <div className="bg-white hover:shadow-sm transition-shadow duration-200 overflow-hidden border border-gray-100 relative">
                  {/* Product Image Container */}
                  <div className="bg-gray-50">
                    <img
                      src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                      alt={product.title}
                      className="w-full h-[400px] sm:[340px] object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 text-center absolute top-0 w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {truncateDescription(product.description)}
                    </p>
                  </div>
                    
                  {/* Discover Button */}
                  <div className="pb-6 sm:pb-2 absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200 group-hover:bg-blue-700">
                      <span className="mr-1">Discover</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            
            {/* Second Row Products (Product 5, 6, 7, 8) */}
            {displayProducts.slice(4, 8).map((product) => (
              <a
                key={product.id}
                href={`/products/${product.handle}`}
                className="group cursor-pointer block hidden lg:block"
              >
                {/* Product Card - Row 2 (Using Row 1 Design) */}
                <div className="bg-white hover:shadow-sm transition-shadow duration-200 overflow-hidden border border-gray-100 relative">
                  {/* Product Image Container */}
                  <div className="bg-gray-50">
                    <img
                      src={product.featuredImage?.url || product.images?.[0]?.url || '/images/placeholder-perfume.jpg'}
                      alt={product.title}
                      className="w-full h-[400px] sm:[340px] object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info - MATCHING PLACEMENT AND CONTENT */}
                  <div className="p-6 text-center absolute top-0 w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {truncateDescription(product.description)}
                    </p>
                  </div>
                    
                  {/* Discover Button - MATCHING PLACEMENT AND DESIGN */}
                  <div className="pb-6 sm:pb-2 absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200 group-hover:bg-blue-700">
                      <span className="mr-1">Discover</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {activeCollection === 'all' 
                ? "No products found." 
                : `No products found in the ${activeCollection} collection.`}
            </p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default ExploreCollections;