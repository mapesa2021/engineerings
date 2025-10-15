import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-oleum-navy backdrop-blur-md border-b border-oleum-yellow/20 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-oleum-yellow/30 overflow-hidden bg-white">
              <img 
                src="https://i.postimg.cc/J7N8DVRW/IMG-20250821-WA0013-1.jpg" 
                alt="Oleum Company Limited Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="text-2xl font-black text-white font-display">Oleum Company Limited</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-oleum-yellow transition-colors duration-200 font-semibold relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oleum-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button - Far Right */}
          <div className="hidden md:block">
            <Link href="/contact" className="cta-button flex items-center space-x-2">
              <span className="text-oleum-black">📞</span>
              <span className="text-oleum-black font-semibold">GET QUOTE</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-white hover:text-oleum-yellow hover:bg-oleum-navy-light transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-yellow-500/20 py-4 bg-dark-card/50 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/projects"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-white hover:text-green-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-semibold px-4 py-2 hover:bg-dark-surface rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/contact" className="cta-button flex items-center justify-center space-x-2 mt-4" onClick={() => setIsMenuOpen(false)}>
                <span className="text-oleum-black">📞</span>
                <span className="text-oleum-black font-semibold">GET QUOTE</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 