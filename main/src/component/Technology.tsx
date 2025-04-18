
// import { Cpu, BarChart, Camera, AlertCircle } from "lucide-react";

// const Technology = () => {
//   return (
//     <section id="technology" className="py-20 bg-neocruze-black relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-neocruze-blue opacity-5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Our Technology Works</h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             NeoCruze uses advanced computer vision and machine learning to keep you safe on the road.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-xl">
//               <div className="aspect-w-16 aspect-h-9">
//                 <div className="w-full h-full bg-neocruze-dark-gray flex items-center justify-center">
//                   <img 
//                     src="/lovable-uploads/0645cab3-96ab-491d-a432-d01154458838.png" 
//                     alt="NeoCruze AI Technology" 
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                   <div className="absolute bottom-4 left-4 bg-neocruze-blue text-white px-3 py-1 rounded-full text-sm">
//                     AI Processing
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="space-y-8">
//               <div className="flex gap-4">
//                 <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
//                   <Camera className="text-neocruze-blue" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-2">Image Capture</h3>
//                   <p className="text-gray-400">
//                     High-resolution cameras continuously scan the road ahead, capturing frames at 60fps for real-time analysis.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
//                   <Cpu className="text-neocruze-blue" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-2">AI Processing</h3>
//                   <p className="text-gray-400">
//                     Our neural networks process image data to identify lane markings, road edges, and surface anomalies with 98% accuracy.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
//                   <AlertCircle className="text-neocruze-blue" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
//                   <p className="text-gray-400">
//                     When hazards are detected, the system triggers immediate visual and audio alerts, giving you time to react safely.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
//                   <BarChart className="text-neocruze-blue" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
//                   <p className="text-gray-400">
//                     The AI model improves with each mile driven, learning from various road conditions and adapting to your driving environment.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Technology;


import { Cpu, BarChart, Camera, AlertCircle } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Technology = () => {
  // Remove the refs we don't need
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const bgBlobOneRef = useRef(null);
  const bgBlobTwoRef = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate background blobs
    gsap.to(bgBlobOneRef.current, {
      x: '20px',
      y: '30px',
      scale: 1.2,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(bgBlobTwoRef.current, {
      x: '-30px',
      y: '-20px',
      scale: 1.1,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Heading and description animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    headerTl
      .fromTo(headingRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(descriptionRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      );
      
    // Image container animation
    gsap.fromTo(imageContainerRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Subtle hover effect for the image
    const hoverImageTl = gsap.timeline({ paused: true });
    hoverImageTl.to(imageContainerRef.current, {
      boxShadow: "0 0 30px rgba(9, 79, 209, 0.3)",
      duration: 0.4,
      ease: "power2.out"
    });
    
    imageContainerRef.current.addEventListener("mouseenter", () => hoverImageTl.play());
    imageContainerRef.current.addEventListener("mouseleave", () => hoverImageTl.reverse());
    
    // Removed feature items animation as requested
    
    // Removed icon animations as requested
    
    // Clean up animations on unmount
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      gsap.killTweensOf([
        bgBlobOneRef.current, 
        bgBlobTwoRef.current,
        headingRef.current, 
        descriptionRef.current, 
        imageContainerRef.current
      ]);
    };
  }, []);
  
  // Removed feature refs helper as it's no longer needed
  
  // Removed icon refs helper as it's no longer needed

  return (
    <section ref={sectionRef} id="technology" className="py-20 bg-neocruze-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div ref={bgBlobOneRef} className="absolute top-20 left-10 w-64 h-64 bg-neocruze-blue opacity-5 rounded-full blur-3xl"></div>
        <div ref={bgBlobTwoRef} className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-white mb-4">How Our Technology Works</h2>
          <p ref={descriptionRef} className="text-xl text-gray-300 max-w-3xl mx-auto">
            NeoCruze uses advanced computer vision and machine learning to keep you safe on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div ref={imageContainerRef} className="relative rounded-xl overflow-hidden border border-gray-800 shadow-xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-full bg-neocruze-dark-gray flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/0645cab3-96ab-491d-a432-d01154458838.png" 
                    alt="NeoCruze AI Technology" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-neocruze-blue text-white px-3 py-1 rounded-full text-sm">
                    AI Processing
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
                  <Camera className="text-neocruze-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Image Capture</h3>
                  <p className="text-gray-400">
                    High-resolution cameras continuously scan the road ahead, capturing frames at 60fps for real-time analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
                  <Cpu className="text-neocruze-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Processing</h3>
                  <p className="text-gray-400">
                    Our neural networks process image data to identify lane markings, road edges, and surface anomalies with 98% accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
                  <AlertCircle className="text-neocruze-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
                  <p className="text-gray-400">
                    When hazards are detected, the system triggers immediate visual and audio alerts, giving you time to react safely.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-neocruze-dark-gray p-3 rounded-lg">
                  <BarChart className="text-neocruze-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
                  <p className="text-gray-400">
                    The AI model improves with each mile driven, learning from various road conditions and adapting to your driving environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;