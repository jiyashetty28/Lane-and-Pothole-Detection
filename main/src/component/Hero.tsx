

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  // Refs for elements we want to animate
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const illustrationRef = useRef(null);
  const aiBadgeRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a timeline for entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial state - everything is invisible
    gsap.set([titleRef.current, subtitleRef.current, taglineRef.current, descriptionRef.current, buttonsRef.current], { 
      opacity: 0,
      y: 30 
    });
    
    gsap.set(illustrationRef.current, { 
      opacity: 0,
      scale: 0.9,
      x: 30 
    });
    
    gsap.set(aiBadgeRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: -20
    });
    
    // Hero section background gradient animation
    gsap.to(sectionRef.current, {
      backgroundPosition: "100% 50%",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Timeline for content reveal
    tl.to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      delay: 0.2 
    })
    .to(subtitleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4")
    .to(taglineRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4")
    .to(descriptionRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4")
    .to(buttonsRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4")
    .to(illustrationRef.current, { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      duration: 0.8 
    }, "-=0.5")
    .to(aiBadgeRef.current, { 
      opacity: 1, 
      scale: 1, 
      rotation: 0, 
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3");
    
    // Create a subtle floating effect for the illustration
    gsap.to(illustrationRef.current, {
      y: "-10px",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Subtle pulse for the AI badge
    gsap.to(aiBadgeRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Parallax effect on scroll
    gsap.to(illustrationRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Cleanup function
    return () => {
      // Kill all animations to prevent memory leaks
      gsap.killTweensOf([
        sectionRef.current,
        titleRef.current, 
        subtitleRef.current, 
        taglineRef.current,
        descriptionRef.current, 
        buttonsRef.current, 
        illustrationRef.current,
        aiBadgeRef.current
      ]);
      
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen bg-hero-pattern bg-cover bg-center flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 mt-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-10 md:mb-0">
            <div ref={taglineRef} className="text-neocruze-blue font-semibold text-lg mb-2">AI-POWERED</div>
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              LANE & POTHOLE <br /> DETECTION
            </h1>
            <h2 ref={subtitleRef} className="text-2xl md:text-3xl text-white mb-8 tracking-wider">FOR SAFER ROADS</h2>
            <p ref={descriptionRef} className="text-gray-300 text-lg max-w-lg mb-8">
              NeoCruze's advanced AI technology detects lanes and potholes in real-time, 
              enhancing road safety and improving driving experience.
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <Link to="/try-now">
                <Button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
                  Try Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3" ref={illustrationRef}>
            <div className="bg-blue-500/20 p-3 rounded-full backdrop-blur-sm">
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                {/* This is where the car illustration would go */}
                <div 
                  ref={aiBadgeRef}
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-button-gradient rounded-full flex items-center justify-center text-white font-bold"
                >
                  AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;