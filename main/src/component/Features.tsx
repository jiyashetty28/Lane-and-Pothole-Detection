
// import { Car, ShieldAlert, Eye, Map, AlertTriangle, Clock } from "lucide-react";

// const features = [
//   {
//     title: "Real-time Lane Detection",
//     description: "Identify lane markings instantly, even in challenging weather and lighting conditions.",
//     icon: Car,
//   },
//   {
//     title: "Pothole Recognition",
//     description: "Advanced AI detects potholes and road hazards before they cause damage.",
//     icon: AlertTriangle,
//   },
//   {
//     title: "Smart Alerts",
//     description: "Receive timely audio and visual warnings about upcoming road conditions.",
//     icon: ShieldAlert,
//   },
//   {
//     title: "Enhanced Visibility",
//     description: "See clearly in fog, rain, and darkness with our advanced image processing.",
//     icon: Eye,
//   },
//   {
//     title: "Road Mapping",
//     description: "Contribute to community road condition maps and benefit from others' data.",
//     icon: Map,
//   },
//   {
//     title: "Predictive Analysis",
//     description: "AI that learns your routes and predicts potential hazards before you encounter them.",
//     icon: Clock,
//   },
// ];

// const Features = () => {
//   return (
//     <section id="features" className="py-20 bg-gradient-to-b from-neocruze-black to-neocruze-dark-gray">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Advanced Safety Features</h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             NeoCruze combines cutting-edge AI with practical safety solutions to make every journey safer.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="feature-card group">
//               <div className="mb-4 text-neocruze-blue group-hover:text-neocruze-light-blue transition-colors">
//                 <feature.icon size={48} />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
//               <p className="text-gray-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;



import { Car, ShieldAlert, Eye, Map, AlertTriangle, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    title: "Real-time Lane Detection",
    description: "Identify lane markings instantly, even in challenging weather and lighting conditions.",
    icon: Car,
  },
  {
    title: "Pothole Recognition",
    description: "Advanced AI detects potholes and road hazards before they cause damage.",
    icon: AlertTriangle,
  },
  {
    title: "Smart Alerts",
    description: "Receive timely audio and visual warnings about upcoming road conditions.",
    icon: ShieldAlert,
  },
  {
    title: "Enhanced Visibility",
    description: "See clearly in fog, rain, and darkness with our advanced image processing.",
    icon: Eye,
  },
  {
    title: "Road Mapping",
    description: "Contribute to community road condition maps and benefit from others' data.",
    icon: Map,
  },
  {
    title: "Predictive Analysis",
    description: "AI that learns your routes and predicts potential hazards before you encounter them.",
    icon: Clock,
  },
];

const Features = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states
    gsap.set(headingRef.current, { 
      opacity: 0,
      y: 30 
    });
    
    gsap.set(descriptionRef.current, { 
      opacity: 0,
      y: 20 
    });
    
    // Create timeline for header animations
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    headerTl
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    
    // Animate only the icons
    iconRefs.current.forEach((iconEl, index) => {
      if (!iconEl) return;
      
      // Create a horizontal back and forth animation for icons
      gsap.to(iconEl, {
        x: 10,
        duration: 2 + (index * 0.3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Add a subtle scale animation as well
      gsap.to(iconEl, {
        scale: 1.1,
        duration: 1.5 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });
      
      // Create a scroll-triggered entrance animation
      gsap.fromTo(iconEl, 
        { 
          opacity: 0,
          y: 20,
          rotation: -5
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: iconEl,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    // Clean up animations on unmount
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      gsap.killTweensOf([headingRef.current, descriptionRef.current, ...iconRefs.current]);
    };
  }, []);

  // Function to assign refs to icons
  const setIconRef = (el, index) => {
    iconRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-gradient-to-b from-neocruze-black to-neocruze-dark-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-white mb-4">Advanced Safety Features</h2>
          <p ref={descriptionRef} className="text-xl text-gray-300 max-w-3xl mx-auto">
            NeoCruze combines cutting-edge AI with practical safety solutions to make every journey safer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group"
            >
              <div 
                ref={(el) => setIconRef(el, index)} 
                className="mb-4 text-neocruze-blue group-hover:text-neocruze-light-blue transition-colors"
              >
                <feature.icon size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;