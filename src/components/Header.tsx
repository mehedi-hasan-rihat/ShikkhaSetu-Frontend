'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-xl max-w-6xl mx-auto transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <svg className="w-12 h-12 text-[#0AB5F8] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V15h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tutors" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-all duration-200 hover:scale-105">
              Find Tutors
            </Link>
            <Link href="/request-tutor" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-all duration-200 hover:scale-105">
              Request a Tutor
            </Link>
            <Link href="/subscription" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-all duration-200 hover:scale-105">
              Subscription Plan
            </Link>
            <Link href="/tuitions" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-all duration-200 hover:scale-105">
              Available Tuitions
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-[#0AB5F8] border-2 border-gray-300 hover:border-[#0AB5F8] px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="bg-[#0AB5F8] hover:bg-[#0891b2] text-white px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-700 hover:text-[#0AB5F8] hover:bg-gray-100 transition-all duration-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link href="/tutors" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-colors">
                Find Tutors
              </Link>
              <Link href="/request-tutor" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-colors">
                Request a Tutor
              </Link>
              <Link href="/subscription" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-colors">
                Subscription Plan
              </Link>
              <Link href="/tuitions" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-colors">
                Available Tuitions
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link href="/login" className="text-gray-700 hover:text-[#0AB5F8] font-medium transition-colors">
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#0AB5F8] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0891b2] transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}