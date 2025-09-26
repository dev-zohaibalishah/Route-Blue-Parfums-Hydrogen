// import {createContext, useContext, useEffect, useState} from 'react';

// /**
//  * A side bar component with Overlay
//  * @example
//  * ```jsx
//  * <Aside type="search" heading="SEARCH">
//  *  <input type="search" />
//  *  ...
//  * </Aside>
//  * ```
//  * @param {{
//  *   children?: React.ReactNode;
//  *   type: AsideType;
//  *   heading: React.ReactNode;
//  * }}
//  */
// export function Aside({children, heading, type}) {
//   const {type: activeType, close} = useAside();
//   const expanded = type === activeType;

//   useEffect(() => {
//     const abortController = new AbortController();

//     if (expanded) {
//       document.addEventListener(
//         'keydown',
//         function handler(event) {
//           if (event.key === 'Escape') {
//             close();
//           }
//         },
//         {signal: abortController.signal},
//       );
//     }
//     return () => abortController.abort();
//   }, [close, expanded]);

//   return (
//     <div
//       aria-modal
//       className={`overlay ${expanded ? 'expanded' : ''}`}
//       role="dialog"
//     >
//       <button className="close-outside" onClick={close} />
//       <aside>
//         <header>
//           <h3>{heading}</h3>
//           <button className="close reset" onClick={close} aria-label="Close">
//             &times;
//           </button>
//         </header>
//         <main>{children}</main>
//       </aside>
//     </div>
//   );
// }

// const AsideContext = createContext(null);

// Aside.Provider = function AsideProvider({children}) {
//   const [type, setType] = useState('closed');

//   return (
//     <AsideContext.Provider
//       value={{
//         type,
//         open: setType,
//         close: () => setType('closed'),
//       }}
//     >
//       {children}
//     </AsideContext.Provider>
//   );
// };

// export function useAside() {
//   const aside = useContext(AsideContext);
//   if (!aside) {
//     throw new Error('useAside must be used within an AsideProvider');
//   }
//   return aside;
// }

// /** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
// /**
//  * @typedef {{
//  *   type: AsideType;
//  *   open: (mode: AsideType) => void;
//  *   close: () => void;
//  * }} AsideContextValue
//  */

// /** @typedef {import('react').ReactNode} ReactNode */












import {createContext, useContext, useEffect, useState} from 'react';

import '../styles/header.css'

/**
 * A side bar component with Overlay that can slide from left or right with glassmorphic background
 * @example
 * <Aside type="search" heading="SEARCH">
 *   <input type="search" />
 *   ...
 * </Aside>
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  // Determine slide direction based on type
  const slideFromRight = type === 'cart' || type === 'search';
  const panelClasses = `aside-panel ${slideFromRight ? 'slide-from-right' : 'slide-from-left'} ${expanded ? 'slide-in' : ''}`;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <>
      {/* Glassmorphic overlay - appears behind the aside panel but above main content */}
      <div
        className={`glassmorphic-overlay ${expanded ? 'active' : ''}`}
      />
      
      {/* Main overlay for close functionality */}
      <div
        aria-modal
        className={`overlay ${expanded ? 'expanded' : ''}`}
        role="dialog"
      >
        <button className="close-outside" onClick={close} />
        <aside className={panelClasses}>
          <header className="aside-header">
            <h3>{heading}</h3>
            <button
              className="close reset"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
          </header>
          <main className="aside-content">
            {expanded && children}
          </main>
        </aside>
      </div>
    </>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */
/** @typedef {import('react').ReactNode} ReactNode */