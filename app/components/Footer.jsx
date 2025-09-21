import React, { useState, Suspense } from 'react';
import { Await, NavLink } from 'react-router';

import TextLogo from '~/assets/RBLogo.png';
import Monogram from '~/assets/RBMonogram.png';
import Footerimg from '../assets/FooterImg.png';

/**
 * @param {FooterProps}
 */
export function Footer({ footer: footerPromise, header, publicStoreDomain }) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <FooterContent 
            footer={footer} 
            header={header} 
            publicStoreDomain={publicStoreDomain} 
          />
        )}
      </Await>
    </Suspense>
  );
}

/**
 * Footer Content Component
 */
function FooterContent({ footer, header, publicStoreDomain }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');

  // Mock data - replace with actual Shopify localization data
  const languages = ['English', 'Français', 'Español', 'Deutsch'];
  const countries = ['United Kingdom', 'United States', 'France', 'Germany', 'Canada'];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode logic here
  };

  // Get primary domain URL for link processing
  const primaryDomainUrl = header?.shop?.primaryDomain?.url;

  // Helper function to process URLs (same as original)
  const processUrl = (url) => {
    if (!url) return null;
    
    return url.includes('myshopify.com') ||
           url.includes(publicStoreDomain) ||
           (primaryDomainUrl && url.includes(primaryDomainUrl))
      ? new URL(url).pathname
      : url;
  };

  // Helper function to render menu links
  const renderMenuLink = (item) => {
    const url = processUrl(item.url);
    if (!url) return null;

    const isExternal = !url.startsWith('/');
    
    return isExternal ? (
      <a 
        href={url} 
        key={item.id} 
        rel="noopener noreferrer" 
        target="_blank"
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        {item.title}
      </a>
    ) : (
      <NavLink
        end
        key={item.id}
        prefetch="intent"
        to={url}
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        {item.title}
      </NavLink>
    );
  };

  // Get menu items or use fallback
  const menuItems = footer?.menu?.items || FALLBACK_FOOTER_MENU.items;

  // Organize menu items by category (you can customize this logic based on your menu structure)
  const contactHubItems = menuItems.filter(item => 
    item.title.toLowerCase().includes('contact') || 
    item.title.toLowerCase().includes('boutique') ||
    item.title.toLowerCase().includes('appointment')
  );

  const customerCareItems = menuItems.filter(item => 
    item.title.toLowerCase().includes('order') ||
    item.title.toLowerCase().includes('service') ||
    item.title.toLowerCase().includes('return') ||
    item.title.toLowerCase().includes('track') ||
    item.title.toLowerCase().includes('faq')
  );

  const aboutItems = menuItems.filter(item => 
    item.title.toLowerCase().includes('story') ||
    item.title.toLowerCase().includes('craft') ||
    item.title.toLowerCase().includes('career') ||
    item.title.toLowerCase().includes('sustain') ||
    item.title.toLowerCase().includes('foundation')
  );

  const legalItems = menuItems.filter(item => 
    item.type === 'SHOP_POLICY' ||
    item.title.toLowerCase().includes('privacy') ||
    item.title.toLowerCase().includes('terms') ||
    item.title.toLowerCase().includes('cookie') ||
    item.title.toLowerCase().includes('sitemap')
  );

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="pt-12 pb-8 text-center">
          <div className="inline-flex flex-col items-center">
            {/* <div className="text-4xl font-bold text-blue-600 mb-1">RB</div>
            <div className="text-sm tracking-wider text-gray-600">
              <span className="font-light">ROUTE BLEUE</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">PARFUMS</div> */}
            <img className="mb-6" src={Monogram} alt="Route Bleue" />
            <img src={TextLogo} alt="Route Bleue" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-12">
          
          {/* Left Section - Hero Image with CTA */}
          <div className="lg:col-span-1">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              {/* Background Image */}
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4)), url(${Footerimg})`
                }}
              >
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-6">
                  <h3 className="text-2xl font-light mb-4 text-center">
                    Proudly Launching
                  </h3>
                  <a
                    href="/collections"
                    className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
                  >
                    <span className="mr-2">Discover more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Contact Hub & Customer Care */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              
              {/* Contact Hub */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Hub</h4>
                <ul className="space-y-2">
                  {contactHubItems.length > 0 ? (
                    contactHubItems.map(item => (
                      <li key={item.id}>
                        {renderMenuLink(item)}
                      </li>
                    ))
                  ) : (
                    // Fallback static items
                    <>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Boutique Locator</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact & Appointments</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Personalised Consultation</a></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Customer Care */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Care</h4>
                <ul className="space-y-2">
                  {customerCareItems.length > 0 ? (
                    customerCareItems.map(item => (
                      <li key={item.id}>
                        {renderMenuLink(item)}
                      </li>
                    ))
                  ) : (
                    // Fallback static items
                    <>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Order Information</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Services</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Returns & Exchanges</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Track Your Order</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">FAQ</a></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Social Icons */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Join the community</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - About Route Bleue & Privacy */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              
              {/* About Route Bleue */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">About Route Bleue</h4>
                <ul className="space-y-2">
                  {aboutItems.length > 0 ? (
                    aboutItems.map(item => (
                      <li key={item.id}>
                        {renderMenuLink(item)}
                      </li>
                    ))
                  ) : (
                    // Fallback static items
                    <>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Our Story</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Craftsmanship & Ingredients</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">People & Careers</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Sustainability</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Foundation Route Bleue</a></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Privacy & Legal */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Privacy & Legal</h4>
                <ul className="space-y-2">
                  {legalItems.length > 0 ? (
                    legalItems.map(item => (
                      <li key={item.id}>
                        {renderMenuLink(item)}
                      </li>
                    ))
                  ) : (
                    // Fallback static items
                    <>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Cookie Settings</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy Policy</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms of Use</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms & Conditions</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Sitemap</a></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Copyright and Main Legal Links */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <p className="text-sm text-gray-500">
                2025 Route Bleue Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {/* Show main legal links from Shopify menu */}
                {legalItems.slice(0, 3).map(item => (
                  <div key={item.id}>
                    {processUrl(item.url) && !processUrl(item.url).startsWith('http') ? (
                      <NavLink 
                        to={processUrl(item.url)} 
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                      >
                        {item.title}
                      </NavLink>
                    ) : (
                      <a 
                        href={item.url} 
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        target={processUrl(item.url)?.startsWith('http') ? '_blank' : undefined}
                        rel={processUrl(item.url)?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.title}
                      </a>
                    )}
                  </div>
                ))}
                {/* Fallback links if no menu items */}
                {legalItems.length === 0 && (
                  <>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Community guidelines</a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Terms</a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Privacy policy</a>
                  </>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              
              {/* Dark/Light Mode Toggle */}
              <div className="flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-transparent text-sm text-gray-700 hover:text-gray-900 pr-6 focus:outline-none cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-0 top-0 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Country Selector */}
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="appearance-none bg-transparent text-sm text-gray-700 hover:text-gray-900 pr-6 focus:outline-none cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-0 top-0 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Keep the same fallback menu as the original
const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */