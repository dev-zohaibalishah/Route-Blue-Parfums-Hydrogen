import React, { useEffect, useRef } from 'react';

import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';


const HomeVideo = () => {
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
  }, []);

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
        poster={HomeVideoThumbnail} 
      >
        <source src={HomeVideoSrc} type="video/mp4" />
        {/* <source src={HomeVideoSrc} type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add an overlay for text or other content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black opacity-15"> </div>
    </div>
  );
};

export default HomeVideo;