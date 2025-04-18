
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Mail, Phone, MapPin } from "lucide-react";

// const Contact = () => {
//   return (
//     <section id="contact" className="py-20 bg-neocruze-black">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Have questions about NeoCruze? We're here to help you get started.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="bg-neocruze-dark-gray rounded-xl p-8 border border-gray-800">
//             <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
            
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                   <Input 
//                     id="name" 
//                     type="text" 
//                     placeholder="Your name" 
//                     className="bg-gray-800 border-gray-700 text-white"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                   <Input 
//                     id="email" 
//                     type="email" 
//                     placeholder="Your email" 
//                     className="bg-gray-800 border-gray-700 text-white"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
//                 <Input 
//                   id="subject" 
//                   type="text" 
//                   placeholder="How can we help?" 
//                   className="bg-gray-800 border-gray-700 text-white"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
//                 <Textarea 
//                   id="message" 
//                   placeholder="Type your message here..." 
//                   className="bg-gray-800 border-gray-700 text-white"
//                   rows={5}
//                 />
//               </div>
              
//               <Button type="submit" className="btn-primary w-full">Send Message</Button>
//             </form>
//           </div>
          
//           <div className="flex flex-col justify-between">
//             <div className="mb-8">
//               <h3 className="text-2xl font-semibold text-white mb-6">Get in touch</h3>
              
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className="bg-neocruze-dark-gray p-3 rounded-lg">
//                     <Mail className="text-neocruze-blue" size={24} />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-white">Email Us</h4>
//                     <p className="text-gray-400">info@neocruze.com</p>
//                     <p className="text-gray-400">support@neocruze.com</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="bg-neocruze-dark-gray p-3 rounded-lg">
//                     <Phone className="text-neocruze-blue" size={24} />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-white">Call Us</h4>
//                     <p className="text-gray-400">+1 (888) 123-4567</p>
//                     <p className="text-gray-400">Mon-Fri, 9AM-5PM EST</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="bg-neocruze-dark-gray p-3 rounded-lg">
//                     <MapPin className="text-neocruze-blue" size={24} />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-white">Visit Us</h4>
//                     <p className="text-gray-400">123 Innovation Drive</p>
//                     <p className="text-gray-400">Tech City, TC 12345</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-blue-gradient p-8 rounded-xl text-white">
//               <h3 className="text-xl font-semibold mb-4">Join our newsletter</h3>
//               <p className="mb-4 text-white/90">Stay updated with the latest features and updates from NeoCruze.</p>
//               <div className="flex gap-2">
//                 <Input 
//                   type="email" 
//                   placeholder="Your email" 
//                   className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
//                 />
//                 <Button className="bg-white text-neocruze-dark-blue hover:bg-white/90">
//                   Subscribe
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Contact = () => {
  // Refs for the form container and form elements
  const formContainerRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  
  useEffect(() => {
    // Setup form container hover effect
    const formContainer = formContainerRef.current;
    
    // Create a subtle glow effect when hovering over the form container
    const formHoverTl = gsap.timeline({ paused: true });
    formHoverTl.to(formContainer, {
      boxShadow: "0 0 25px rgba(9, 79, 209, 0.15)",
      backgroundColor: "rgba(33, 39, 55, 1)", // Slightly lighter than default
      borderColor: "rgba(75, 85, 99, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });
    
    formContainer.addEventListener("mouseenter", () => formHoverTl.play());
    formContainer.addEventListener("mouseleave", () => formHoverTl.reverse());
    
    // Setup individual input field effects
    inputRefs.current.forEach(inputEl => {
      if (!inputEl) return;
      
      const labelEl = inputEl.previousElementSibling;
      
      const inputHoverTl = gsap.timeline({ paused: true });
      inputHoverTl
        .to(inputEl, {
          borderColor: "#094FD1", // neocruze-blue
          boxShadow: "0 0 0 1px rgba(9, 79, 209, 0.5)",
          backgroundColor: "rgba(30, 36, 50, 1)",
          duration: 0.2,
          ease: "power1.out"
        })
        .to(labelEl, {
          color: "#094FD1", // neocruze-blue
          duration: 0.2,
          ease: "power1.out"
        }, 0);
      
      inputEl.addEventListener("mouseenter", () => inputHoverTl.play());
      inputEl.addEventListener("mouseleave", () => inputHoverTl.reverse());
      inputEl.addEventListener("focus", () => inputHoverTl.play());
      inputEl.addEventListener("blur", () => {
        if (document.activeElement !== inputEl) {
          inputHoverTl.reverse();
        }
      });
    });
    
    // Animated form submission button
    const submitButton = formRef.current.querySelector('button[type="submit"]');
    
    const buttonHoverTl = gsap.timeline({ paused: true });
    buttonHoverTl
      .to(submitButton, {
        scale: 1.02,
        duration: 0.2,
        ease: "power1.out"
      });
    
    submitButton.addEventListener("mouseenter", () => buttonHoverTl.play());
    submitButton.addEventListener("mouseleave", () => buttonHoverTl.reverse());
    
    // Clean up
    return () => {
      gsap.killTweensOf([formContainer, ...inputRefs.current, submitButton]);
    };
  }, []);
  
  // Helper to add elements to input refs array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <section id="contact" className="py-20 bg-neocruze-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about NeoCruze? We're here to help you get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formContainerRef} className="bg-neocruze-dark-gray rounded-xl p-8 border border-gray-800 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
            
            <form ref={formRef} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200">Name</label>
                  <Input 
                    ref={addToInputRefs}
                    id="name" 
                    type="text" 
                    placeholder="Your name" 
                    className="bg-gray-800 border-gray-700 text-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200">Email</label>
                  <Input 
                    ref={addToInputRefs}
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 border-gray-700 text-white transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200">Subject</label>
                <Input 
                  ref={addToInputRefs}
                  id="subject" 
                  type="text" 
                  placeholder="How can we help?" 
                  className="bg-gray-800 border-gray-700 text-white transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200">Message</label>
                <Textarea 
                  ref={addToInputRefs}
                  id="message" 
                  placeholder="Type your message here..." 
                  className="bg-gray-800 border-gray-700 text-white transition-all duration-200"
                  rows={5}
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full transition-all duration-200"
              >
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Get in touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-neocruze-dark-gray p-3 rounded-lg">
                    <Mail className="text-neocruze-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Email Us</h4>
                    <p className="text-gray-400">info@neocruze.com</p>
                    <p className="text-gray-400">support@neocruze.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-neocruze-dark-gray p-3 rounded-lg">
                    <Phone className="text-neocruze-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Call Us</h4>
                    <p className="text-gray-400">+1 (888) 123-4567</p>
                    <p className="text-gray-400">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-neocruze-dark-gray p-3 rounded-lg">
                    <MapPin className="text-neocruze-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Visit Us</h4>
                    <p className="text-gray-400">123 Innovation Drive</p>
                    <p className="text-gray-400">Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-gradient p-8 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-4">Join our newsletter</h3>
              <p className="mb-4 text-white/90">Stay updated with the latest features and updates from NeoCruze.</p>
              <div className="flex gap-2">
                <Input 
                  ref={addToInputRefs}
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200"
                />
                <Button className="bg-white text-neocruze-dark-blue hover:bg-white/90 transition-all duration-200">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
