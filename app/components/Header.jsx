// import {Suspense} from 'react';
// import {Await, NavLink, useAsyncValue} from 'react-router';
// import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
// import {useAside} from '~/components/Aside';

// /**
//  * @param {HeaderProps}
//  */
// export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
//   const {shop, menu} = header;
//   return (
//     <header className="header">
//       <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
//         <strong>{shop.name}</strong>
//       </NavLink>
//       <HeaderMenu
//         menu={menu}
//         viewport="desktop"
//         primaryDomainUrl={header.shop.primaryDomain.url}
//         publicStoreDomain={publicStoreDomain}
//       />
//       <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
//     </header>
//   );
// }

// /**
//  * @param {{
//  *   menu: HeaderProps['header']['menu'];
//  *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
//  *   viewport: Viewport;
//  *   publicStoreDomain: HeaderProps['publicStoreDomain'];
//  * }}
//  */
// export function HeaderMenu({
//   menu,
//   primaryDomainUrl,
//   viewport,
//   publicStoreDomain,
// }) {
//   const className = `header-menu-${viewport}`;
//   const {close} = useAside();

//   return (
//     <nav className={className} role="navigation">
//       {viewport === 'mobile' && (
//         <NavLink
//           end
//           onClick={close}
//           prefetch="intent"
//           style={activeLinkStyle}
//           to="/"
//         >
//           Home
//         </NavLink>
//       )}
//       {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
//         if (!item.url) return null;

//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         return (
//           <NavLink
//             className="header-menu-item"
//             end
//             key={item.id}
//             onClick={close}
//             prefetch="intent"
//             style={activeLinkStyle}
//             to={url}
//           >
//             {item.title}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

// /**
//  * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
//  */
// function HeaderCtas({isLoggedIn, cart}) {
//   return (
//     <nav className="header-ctas" role="navigation">
//       <HeaderMenuMobileToggle />
//       <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
//         <Suspense fallback="Sign in">
//           <Await resolve={isLoggedIn} errorElement="Sign in">
//             {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
//           </Await>
//         </Suspense>
//       </NavLink>
//       <SearchToggle />
//       <CartToggle cart={cart} />
//     </nav>
//   );
// }

// function HeaderMenuMobileToggle() {
//   const {open} = useAside();
//   return (
//     <button
//       className="header-menu-mobile-toggle reset"
//       onClick={() => open('mobile')}
//     >
//       <h3>☰</h3>
//     </button>
//   );
// }

// function SearchToggle() {
//   const {open} = useAside();
//   return (
//     <button className="reset" onClick={() => open('search')}>
//       Search
//     </button>
//   );
// }

// /**
//  * @param {{count: number | null}}
//  */
// function CartBadge({count}) {
//   const {open} = useAside();
//   const {publish, shop, cart, prevCart} = useAnalytics();

//   return (
//     <a
//       href="/cart"
//       onClick={(e) => {
//         e.preventDefault();
//         open('cart');
//         publish('cart_viewed', {
//           cart,
//           prevCart,
//           shop,
//           url: window.location.href || '',
//         });
//       }}
//     >
//       Cart {count === null ? <span>&nbsp;</span> : count}
//     </a>
//   );
// }

// /**
//  * @param {Pick<HeaderProps, 'cart'>}
//  */
// function CartToggle({cart}) {
//   return (
//     <Suspense fallback={<CartBadge count={null} />}>
//       <Await resolve={cart}>
//         <CartBanner />
//       </Await>
//     </Suspense>
//   );
// }

// function CartBanner() {
//   const originalCart = useAsyncValue();
//   const cart = useOptimisticCart(originalCart);
//   return <CartBadge count={cart?.totalQuantity ?? 0} />;
// }

// const FALLBACK_HEADER_MENU = {
//   id: 'gid://shopify/Menu/199655587896',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461609500728',
//       resourceId: null,
//       tags: [],
//       title: 'Collections',
//       type: 'HTTP',
//       url: '/collections',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609533496',
//       resourceId: null,
//       tags: [],
//       title: 'Blog',
//       type: 'HTTP',
//       url: '/blogs/journal',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609566264',
//       resourceId: null,
//       tags: [],
//       title: 'Policies',
//       type: 'HTTP',
//       url: '/policies',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609599032',
//       resourceId: 'gid://shopify/Page/92591030328',
//       tags: [],
//       title: 'About',
//       type: 'PAGE',
//       url: '/pages/about',
//       items: [],
//     },
//   ],
// };

// /**
//  * @param {{
//  *   isActive: boolean;
//  *   isPending: boolean;
//  * }}
//  */
// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'black',
//   };
// }

// /** @typedef {'desktop' | 'mobile'} Viewport */
// /**
//  * @typedef {Object} HeaderProps
//  * @property {HeaderQuery} header
//  * @property {Promise<CartApiQueryFragment|null>} cart
//  * @property {Promise<boolean>} isLoggedIn
//  * @property {string} publicStoreDomain
//  */

// /** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
// /** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
// /** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */









import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

import '../styles/header.css'

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="header">
      {/* Mobile hamburger menu - left side */}
      <div className="header-left">
        <HeaderMenuMobileToggle />
      </div>

      {/* Logo - center */}
      <div className="header-center">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <strong className="logo">{shop.name}</strong>
        </NavLink>
      </div>



      {/* Action buttons - right side */}
      <div className="header-right">
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  // Define the collections we want to show
  const targetCollections = ['men', 'women', 'unisex'];

  // Filter collections from menu items
  const getFilteredCollections = (menuItems) => {
    if (!menuItems) return [];
    
    return menuItems.filter(item => {
      if (item.url && item.url.includes('/collections/')) {
        const collectionHandle = item.url.split('/collections/')[1]?.toLowerCase();
        return targetCollections.includes(collectionHandle);
      }
      return false;
    });
  };

  const filteredCollections = getFilteredCollections(menu?.items || []);

  // Only render for mobile viewport - desktop returns null
  if (viewport !== 'mobile') {
    return null;
  }

  return (
    <div className="mobile-navigation-wrapper">
      <NavLink
        end
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to="/"
        className="mobile-nav-item"
      >
        Home
      </NavLink>
      
      <NavLink
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to="/collections"
        className="mobile-nav-item"
      >
        Shop
      </NavLink>

      {/* Collections section */}
      {filteredCollections.length > 0 ? (
        <div className="collections-section">
          <span className="collections-title">Collections</span>
          {filteredCollections.map((item) => {
            const url = item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
            
            return (
              <NavLink
                className="mobile-nav-item collection-item"
                end
                key={item.id}
                onClick={close}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      ) : (
        <div className="collections-section">
          <span className="collections-title">Collections</span>
          <NavLink
            className="mobile-nav-item collection-item"
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to="/collections/men"
          >
            Men
          </NavLink>
          <NavLink
            className="mobile-nav-item collection-item"
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to="/collections/women"
          >
            Women
          </NavLink>
          <NavLink
            className="mobile-nav-item collection-item"
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to="/collections/unisex"
          >
            Unisex
          </NavLink>
        </div>
      )}

      <NavLink
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to="/pages/contact"
        className="mobile-nav-item contact-item"
      >
        Contact Us
      </NavLink>
    </div>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className="header-cta-item">
        <Suspense fallback={<UserIcon />}>
          <Await resolve={isLoggedIn} errorElement={<UserIcon />}>
            {(isLoggedIn) => (
              <span className="cta-icon" title={isLoggedIn ? 'Account' : 'Sign in'}>
                <UserIcon />
              </span>
            )}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <HamburgerIcon />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button 
      className="header-cta-item reset" 
      onClick={() => open('search')}
      aria-label="Search"
      title="Search"
    >
      <SearchIcon />
    </button>
  );
}

// Icon Components
function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="header-cta-item reset cart-toggle"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      aria-label="Shopping cart"
      title="Shopping cart"
    >
      <div className="cart-icon-wrapper">
        <CartIcon />
        {count !== null && count > 0 && (
          <span className="cart-badge">{count}</span>
        )}
      </div>
    </button>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Men',
      type: 'HTTP',
      url: '/collections/men',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Women',
      type: 'HTTP',
      url: '/collections/women',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: null,
      tags: [],
      title: 'Unisex',
      type: 'HTTP',
      url: '/collections/unisex',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */
/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */