// import React, { useState } from 'react';

// const TryNow = () => {
//   const [detectionType, setDetectionType] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [outputVideoURL, setOutputVideoURL] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleDetectionChange = (event) => {
//     setDetectionType(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setVideoFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!detectionType || !videoFile) {
//       alert("Please select a detection type and upload a video.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     formData.append('detection', detectionType);

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8000/process', {
//         method: 'POST',
//         body: formData
//       });
//       const data = await response.json();
//       const videoPath = `http://localhost:8000/static/processed_video.mp4`;

//       setOutputVideoURL(videoPath);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Video processing failed");
      
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-neocruze-black text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8">Try NeoCruze</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
//           {/* Lane Detection */}
//           <div className="bg-neocruze-dark-gray p-6 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Lane Detection</h2>
//             <label>
//               <input
//                 type="radio"
//                 value="lane"
//                 checked={detectionType === 'lane'}
//                 onChange={handleDetectionChange}
//                 className="mr-2"
//               />
//               Select Lane Detection
//             </label>
//           </div>

//           {/* Pothole Detection */}
//           <div className="bg-neocruze-dark-gray p-6 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Pothole Detection</h2>
//             <label>
//               <input
//                 type="radio"
//                 value="pothole"
//                 checked={detectionType === 'pothole'}
//                 onChange={handleDetectionChange}
//                 className="mr-2"
//               />
//               Select Pothole Detection
//             </label>
//           </div>
//         </div>

//         {/* File Upload and Submit */}
//         <div className="mt-8 bg-neocruze-dark-gray p-6 rounded-lg">
//           <input
//             type="file"
//             accept="video/mp4"
//             onChange={handleFileChange}
//             className="mb-4"
//           />
//           <br />
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
//           >
//             Submit
//           </button>
//         </div>

//         {/* Loading or Result */}
//         <div className="mt-8 text-center">
//           {loading && <p className="text-xl">Processing video...</p>}

//           {outputVideoURL && !loading && (
//             <div>
//               <h3 className="text-2xl font-semibold mb-4">Processed Video:</h3>
//               <video controls className="w-full md:w-3/4 mx-auto rounded-lg shadow-lg">
//                 <source src={outputVideoURL} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TryNow;







// import React, { useState } from 'react';

// const TryNow = () => {
//   const [detectionType, setDetectionType] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [outputVideoURL, setOutputVideoURL] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleDetectionChange = (event) => {
//     setDetectionType(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setVideoFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!detectionType || !videoFile) {
//       alert("Please select a detection type and upload a video.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     formData.append('detection', detectionType);

//     setLoading(true);
//     setError('');
//     setOutputVideoURL('');

//     try {
//       const response = await fetch('http://localhost:8000/process', {
//         method: 'POST',
//         body: formData
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Server error');
//       }
      
//       const data = await response.json();
//       console.log("Processing successful:", data);
      
//       // Add a timestamp to force browser to reload video instead of caching
//       const timestamp = new Date().getTime();
//       const videoPath = `http://localhost:8000/static/processed_video.mp4?t=${timestamp}`;
      
//       setOutputVideoURL(videoPath);
//     } catch (error) {
//       console.error("Error:", error);
//       setError(error.message || "Video processing failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neocruze-black text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8">Try NeoCruze</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Lane Detection */}
//           <div className="bg-neocruze-dark-gray p-6 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Lane Detection</h2>
//             <label>
//               <input
//                 type="radio"
//                 value="lane"
//                 checked={detectionType === 'lane'}
//                 onChange={handleDetectionChange}
//                 className="mr-2"
//               />
//               Select Lane Detection
//             </label>
//           </div>

//           {/* Pothole Detection */}
//           <div className="bg-neocruze-dark-gray p-6 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Pothole Detection</h2>
//             <label>
//               <input
//                 type="radio"
//                 value="pothole"
//                 checked={detectionType === 'pothole'}
//                 onChange={handleDetectionChange}
//                 className="mr-2"
//               />
//               Select Pothole Detection
//             </label>
//           </div>
//         </div>

//         {/* File Upload and Submit */}
//         <div className="mt-8 bg-neocruze-dark-gray p-6 rounded-lg">
//           <input
//             type="file"
//             accept="video/mp4"
//             onChange={handleFileChange}
//             className="mb-4"
//           />
//           <br />
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`px-6 py-2 rounded transition ${loading 
//               ? 'bg-gray-500 cursor-not-allowed' 
//               : 'bg-blue-500 hover:bg-blue-600'}`}
//           >
//             {loading ? 'Processing...' : 'Submit'}
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 p-4 bg-red-600 text-white rounded-lg">
//             Error: {error}
//           </div>
//         )}

//         {/* Loading or Result */}
//         <div className="mt-8 text-center">
//           {loading && (
//             <div className="flex flex-col items-center justify-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
//               <p className="text-xl mt-4">Processing video...</p>
//             </div>
//           )}

//           {outputVideoURL && !loading && (
//             <div>
//               <h3 className="text-2xl font-semibold mb-4">Processed Video:</h3>
//               <video 
//                 controls 
//                 className="w-full md:w-3/4 mx-auto rounded-lg shadow-lg"
//                 key={outputVideoURL} // Force rerender when URL changes
//               >
//                 <source src={outputVideoURL} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TryNow;







import React, { useState, useEffect } from 'react';

const TryNow = () => {
  const [detectionType, setDetectionType] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [outputVideoURL, setOutputVideoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('Checking...');

  // Check if the server is running when component mounts
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/', { 
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setServerStatus('Connected');
      } else {
        setServerStatus('Error connecting to server');
      }
    } catch (error) {
      console.error("Server check failed:", error);
      setServerStatus('Server unavailable');
    }
  };

  const handleDetectionChange = (event) => {
    setDetectionType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2), "MB");
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!detectionType) {
      setError("Please select a detection type");
      return;
    }
    
    if (!videoFile) {
      setError("Please upload a video file");
      return;
    }

    // Reset states
    setLoading(true);
    setError('');
    setOutputVideoURL('');

    // Prepare form data
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('detection', detectionType);

    console.log(`Sending request to process video (${detectionType}):`, videoFile.name);

    try {
      // Send request to process video
      const response = await fetch('http://localhost:8000/process', {
        method: 'POST',
        body: formData,
      });
      
      // Parse response
      const data = await response.json();
      console.log("Server response:", data);
      
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      
      if (!data.video_url) {
        throw new Error("Server did not return a video URL");
      }
      
      // Construct full URL with hostname and port
      const fullVideoUrl = `http://localhost:8000${data.video_url}`;
      console.log("Full video URL:", fullVideoUrl);
      
      // Add a cache-busting parameter
      const timestamp = new Date().getTime();
      const finalVideoUrl = `${fullVideoUrl}?t=${timestamp}`;
      
      // Test if video is accessible
      try {
        const videoCheckResponse = await fetch(finalVideoUrl, { method: 'HEAD' });
        if (!videoCheckResponse.ok) {
          console.error("Video file check failed:", videoCheckResponse.status);
          throw new Error(`Video file not accessible (status: ${videoCheckResponse.status})`);
        }
        console.log("Video file is accessible");
      } catch (checkError) {
        console.error("Error checking video file:", checkError);
        // Continue anyway, as the issue might be with the HEAD request
      }
      
      // Set the video URL for display
      setOutputVideoURL(finalVideoUrl);
      
    } catch (error) {
      console.error("Error processing video:", error);
      setError(error.message || "Failed to process video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neocruze-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Try NeoCruze</h1>
          <div className={`px-3 py-1 rounded-full text-sm ${
            serverStatus === 'Connected' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {serverStatus}
          </div>
        </div>
        
        {/* Server status warning */}
        {serverStatus !== 'Connected' && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
            <p className="font-bold">Server Connection Issue</p>
            <p>The backend server appears to be unavailable. Please make sure it's running on port 8000.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lane Detection */}
          <div className={`p-6 rounded-lg transition-all duration-200 ${
            detectionType === 'lane' 
              ? 'bg-blue-800 border-2 border-blue-500' 
              : 'bg-neocruze-dark-gray hover:bg-gray-700'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Lane Detection</h2>
            <p className="mb-4 text-gray-300">
              Identifies and highlights lane markings on roads to assist with navigation.
            </p>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="lane"
                checked={detectionType === 'lane'}
                onChange={handleDetectionChange}
                className="mr-2 h-5 w-5"
              />
              <span>Select Lane Detection</span>
            </label>
          </div>

          {/* Pothole Detection */}
          <div className={`p-6 rounded-lg transition-all duration-200 ${
            detectionType === 'pothole' 
              ? 'bg-blue-800 border-2 border-blue-500' 
              : 'bg-neocruze-dark-gray hover:bg-gray-700'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Pothole Detection</h2>
            <p className="mb-4 text-gray-300">
              Detects and marks potholes in the roadway to help avoid damage to the vehicle.
            </p>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="pothole"
                checked={detectionType === 'pothole'}
                onChange={handleDetectionChange}
                className="mr-2 h-5 w-5"
              />
              <span>Select Pothole Detection</span>
            </label>
          </div>
        </div>

        {/* File Upload and Submit */}
        <div className="mt-8 bg-neocruze-dark-gray p-6 rounded-lg">
          <label className="block mb-2 font-medium">Upload Video (MP4 format)</label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/x-msvideo"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {videoFile && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !videoFile || !detectionType || serverStatus !== 'Connected'}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                loading || !videoFile || !detectionType || serverStatus !== 'Connected'
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : 'Process Video'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-600 text-white rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-neocruze-dark-gray rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="text-xl mt-4">Processing video...</p>
            <p className="text-sm text-gray-400 mt-2">This may take several seconds depending on the video size</p>
          </div>
        )}

        {/* Result Video */}
        {outputVideoURL && !loading && (
          <div className="mt-8 bg-neocruze-dark-gray p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Processed Video</h3>
            <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg bg-black">
              <video 
                controls 
                className="absolute top-0 left-0 w-full h-full"
                key={outputVideoURL} // Force rerender when URL changes
                autoPlay
                onError={(e) => {
                  console.error("Video error:", e);
                  setError("Error loading the processed video. Please try again.");
                }}
              >
                <source src={outputVideoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 flex justify-between">
              <a 
                href={outputVideoURL} 
                download 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Download Video
              </a>
              <button
                onClick={() => setOutputVideoURL('')}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryNow;