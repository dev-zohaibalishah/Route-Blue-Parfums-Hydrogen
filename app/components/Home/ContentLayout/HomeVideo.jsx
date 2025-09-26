import React, { useEffect, useRef, useState } from 'react';

import HomeVideoSrc from '~/assets/HomePage/HomeVideo.mp4';
import HomeVideoThumbnail from '~/assets/HomePage/HomeVideoThumbnail.png';

const HomeVideo = ({ videoData, thumbnailUrl }) => {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('VideoData received:', videoData);
    if (videoData?.sources) {
      console.log('Video sources:', videoData.sources);
    }
  }, [videoData]);

  useEffect(() => {
    // Attempt to play the video as soon as the component mounts
    if (videoRef.current) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          }).catch(error => {
            console.log("Autoplay was prevented:", error);
            setShowPlayButton(true);
            setIsPlaying(false);
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [videoData]);

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

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPlayButton(false);
      }).catch(error => {
        console.error('Manual play failed:', error);
      });
    }
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
        key={videoSources[0].url}
        className="w-full object-cover"
        style={{
          height: '100vh',
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={thumbnailSource}
        onLoadedData={() => {
          console.log('Video loaded');
          if (videoRef.current && !showPlayButton) {
            videoRef.current.play().catch(() => {
              setShowPlayButton(true);
            });
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          setShowPlayButton(false);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.error('Video source:', videoSources[0].url);
          setShowPlayButton(true);
        }}
        onCanPlay={() => {
          console.log('Video can play');
        }}
        onLoadStart={() => {
          console.log('Video load started');
        }}
      >
        {videoSources.map((source, index) => (
          <source key={index} src={source.url} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Play Button Overlay */}
      {showPlayButton && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={handlePlayClick}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-200"
          >
            <svg 
              className="w-16 h-16 text-white fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Optional: Add an overlay for text or other content */}
      {/* <div className="absolute inset-0 flex items-center justify-center bg-black opacity-15 pointer-events-none"></div> */}
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