import React, { useEffect, useRef, useMemo } from 'react';

// Keep these as fallbacks in case the metafield is empty
import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';


const HomeVideo = ({ productVideo }) => {
  const videoRef = useRef(null);

  // Helper to extract the video URL and poster from the metafield
  const { videoUrl, posterUrl } = useMemo(() => {
    const reference = productVideo?.reference;
    let url = HomeVideoSrc; // Default to local asset
    let poster = HomeVideoThumbnail; // Default to local asset

    if (reference) {
      if (reference.__typename === 'Video' && reference.sources.length > 0) {
        // Find the MP4 source or use the first source available
        url = reference.sources.find(source => source.mimeType === 'video/mp4')?.url || reference.sources[0].url;
        poster = reference.previewImage?.url || poster;
      } else if (reference.__typename === 'MediaImage') {
        // If an image is set instead of a video, use it as a poster, but set url to null
        poster = reference.image?.url || poster;
        url = null; 
      }
    }

    return { videoUrl: url, posterUrl: poster };
  }, [productVideo]);

  useEffect(() => {
    // Attempt to play the video as soon as the component mounts
    if (videoRef.current && videoUrl) { // Only try to play if we have a video URL
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, [videoUrl]);

  // If we have no video URL (not even the local fallback), don't render.
  if (!videoUrl) {
    // If you'd rather show the fallback image instead of nothing, 
    // you could render an <img> tag here using the posterUrl.
    return null;
  }
  
  return (
    <div className="relative w-full overflow-hidden">
      <video
        ref={videoRef}
        className="w-full object-cover"
        style={{
          height: '100vh', // Default height for desktop
        }}
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl} // Use dynamic poster
      >
        {/* Use dynamic video source */}
        <source src={videoUrl} type="video/mp4" />
        
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add an overlay for text or other content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black opacity-15"> </div>
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