import React, { useEffect, useRef } from 'react';

import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';

const HomeVideo = ({ videoUrl, thumbnailUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt to play the video as soon as the component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay was prevented, usually because of browser policy.
        // You might want to show a play button here.
        console.log("Autoplay was prevented:", error);
      });
    }
  }, [videoUrl]); // Re-run when videoUrl changes

  // Function to get video source - either from metafield or fallback
  const getVideoSource = () => {
    // If videoUrl is provided from metafield, use it
    if (videoUrl) {
      // Handle different types of video URLs from Shopify
      if (typeof videoUrl === 'string') {
        return videoUrl;
      }
      // Handle if it's a Shopify Video object
      if (videoUrl.sources && videoUrl.sources.length > 0) {
        return videoUrl.sources[0].url;
      }
    }
    // Fallback to default video
    return HomeVideoSrc;
  };

  // Function to get thumbnail source
  const getThumbnailSource = () => {
    if (thumbnailUrl) {
      return thumbnailUrl;
    }
    return HomeVideoThumbnail;
  };

  const videoSource = getVideoSource();
  const thumbnailSource = getThumbnailSource();

  // If no video source is available, don't render the component
  if (!videoSource) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <video
        ref={videoRef}
        key={videoSource} // Force re-render when video changes
        className="w-full object-cover"
        style={{
          height: '100vh', // Default height for desktop
        }}
        autoPlay
        loop
        muted
        playsInline
        poster={thumbnailSource}
        onError={(e) => {
          console.error('Video failed to load:', e);
          // Optionally handle error state here
        }}
      >
        <source src={videoSource} type="video/mp4" />
        {/* Add WebM source if available */}
        {videoUrl?.sources?.find(source => source.mimeType === 'video/webm') && (
          <source 
            src={videoUrl.sources.find(source => source.mimeType === 'video/webm').url} 
            type="video/webm" 
          />
        )}
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add an overlay for text or other content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black opacity-15"></div>
      
      {/* Optional: Add loading state */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 opacity-50">
        {/* You can add a loading spinner here if needed */}
      </div>
    </div>
  );
};

export default HomeVideo;

// import React, { useEffect, useRef } from 'react';

// import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
// import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';


// const HomeVideo = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Attempt to play the video as soon as the component mounts
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         // Autoplay was prevented, usually because of browser policy.
//         // You might want to show a play button here.
//         console.log("Autoplay was prevented:", error);
//       });
//     }
//   }, []);

//   return (
//     <div className="relative w-full overflow-hidden">
//       <video
//         ref={videoRef}
//         className="w-full object-cover"
//         style={{
//           height: '100vh', // Default height for desktop
//         }}
//         autoPlay
//         loop
//         muted
//         playsInline
//         poster={HomeVideoThumbnail} 
//       >
//         <source src={HomeVideoSrc} type="video/mp4" />
//         {/* <source src={HomeVideoSrc} type="video/webm" /> */}
//         Your browser does not support the video tag.
//       </video>

//       {/* Optional: Add an overlay for text or other content */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black opacity-15"> </div>
//     </div>
//   );
// };

// export default HomeVideo;