
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neocruze-dark-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Neo<span className="text-neocruze-blue">Cruze</span></span>
            </span>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced AI-powered lane and pothole detection technology for safer roads and improved driving experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-neocruze-blue transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-neocruze-blue transition-colors">Features</a></li>
              <li><a href="#technology" className="text-gray-400 hover:text-neocruze-blue transition-colors">Technology</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-neocruze-blue transition-colors">Demo</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-neocruze-blue transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neocruze-blue transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NeoCruze. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-neocruze-blue text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-neocruze-blue text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-neocruze-blue text-sm transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
