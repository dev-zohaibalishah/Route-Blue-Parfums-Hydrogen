import React from 'react';

/**
 * A reusable client component that displays a full-width image
 * with auto height to maintain its aspect ratio.
 *
 * @param {object} props
 * @param {string} props.imageSrc - The source URL for the image.
 * @param {string} props.imageAlt - The alt text for the image.
 * @param {string} [props.className] - Optional additional CSS classes for styling the image.
 */
export default function FullWidthImage({ imageSrc, imageAlt, className = '' }) {
  return (
    <div className="w-full overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`w-full object-cover ${className}`}
      />
    </div>
  );
}