import React from 'react';

/**
 * A reusable client component that displays an image and text side-by-side.
 * The layout can be controlled via a 'layout' prop.
 *
 * @param {object} props
 * @param {'image-left' | 'image-right'} props.layout - Determines the image position relative to the text.
 * @param {string} props.imageSrc - The source URL for the image.
 * @param {string} props.imageAlt - The alt text for the image.
 * @param {React.ReactNode} props.children - The content to be displayed next to the image.
 */
export default function ImgWithText({ layout = 'image-left', imageSrc, imageAlt, children }) {
  const isImageLeft = layout === 'image-left';

  // Apply flex-row-reverse for image-right layout on desktop, otherwise use flex-row
  const flexClasses = `flex flex-col md:flex-row ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`;

  return (
    <div className={`w-full py-2 md:py-4 ${flexClasses}`}>
      {/* Image Block */}
      <div className="w-full md:w-1/2 overflow-hidden px-4 md:px-8">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover rounded-md shadow-lg"
        />
      </div>

      {/* Text Content Block */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center">
        {children}
      </div>
    </div>
  );
}
