import { useState } from 'react';
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-neocruze-black to-neocruze-dark-gray bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="flex items-center">
                <span className="text-2xl font-bold text-white">Neo<span className="text-neocruze-blue">Cruze</span></span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="nav-link px-3 py-2">Home</a>
                <a href="#features" className="nav-link px-3 py-2">Features</a>
                <a href="#technology" className="nav-link px-3 py-2">Technology</a>
                <a href="#demo" className="nav-link px-3 py-2">Demo</a>
                <a href="#contact" className="nav-link px-3 py-2">Contact</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Link to="/try-now">
              <Button className="btn-primary">Try Now</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neocruze-dark-gray">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">Home</a>
            <a href="#features" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">Features</a>
            <a href="#technology" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">Technology</a>
            <a href="#demo" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">Demo</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">Contact</a>
            <div className="pt-2">
              <Link to="/try-now" className="w-full block">
                <Button className="btn-primary w-full">Try Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
