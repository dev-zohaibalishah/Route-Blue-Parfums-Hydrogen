import React, { useEffect, useRef } from 'react';

import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';

const HomeVideo = ({ videoData, thumbnailUrl }) => {
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
  }, [videoData]); // Re-run when videoData changes

  // Function to get video source - either from metafield or fallback
  const getVideoSource = () => {
    // If videoData is provided from metafield
    if (videoData) {
      // Handle Shopify Video object with sources array
      if (videoData.sources && videoData.sources.length > 0) {
        // Return the first available source (usually MP4)
        return videoData.sources[0].url;
      }
      
      // Handle if it's a direct string URL
      if (typeof videoData === 'string') {
        return videoData;
      }
    }
    
    // Fallback to default video
    return HomeVideoSrc;
  };

  // Function to get thumbnail source
  const getThumbnailSource = () => {
    // Check if videoData has a preview image
    if (videoData?.previewImage?.url) {
      return videoData.previewImage.url;
    }
    
    // Check for passed thumbnailUrl prop
    if (thumbnailUrl) {
      return thumbnailUrl;
    }
    
    // Fallback to default thumbnail
    return HomeVideoThumbnail;
  };

  // Function to get all video sources for multiple formats
  const getVideoSources = () => {
    const sources = [];
    
    if (videoData?.sources) {
      videoData.sources.forEach(source => {
        sources.push({
          url: source.url,
          type: source.mimeType || 'video/mp4'
        });
      });
    } else {
      // Add default source
      sources.push({
        url: getVideoSource(),
        type: 'video/mp4'
      });
    }
    
    return sources;
  };

  const videoSources = getVideoSources();
  const thumbnailSource = getThumbnailSource();

  // If no video sources are available, don't render the component
  if (videoSources.length === 0 || !videoSources[0].url) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <video
        ref={videoRef}
        key={videoSources[0].url} // Force re-render when video changes
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
        {/* Render all available video sources */}
        
          <source key={index} src={source.url} type="video/mp4" />
        
        {/* {videoSources.map((source, index) => (
          <source key={index} src={source.url} type={source.type} />
        ))} */}
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