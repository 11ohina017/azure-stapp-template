import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Clock, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-red-800 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">麵屋◯◯</div>
            <div className="hidden sm:block text-sm text-red-100">伝統の中華そば</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-red-200 transition-colors duration-200 font-medium"
            >
              ホーム
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-white hover:text-red-200 transition-colors duration-200 font-medium"
            >
              メニュー
            </button>
            <button 
              onClick={() => scrollToSection('access')}
              className="text-white hover:text-red-200 transition-colors duration-200 font-medium"
            >
              アクセス
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-red-800 pb-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-white hover:text-red-200 transition-colors duration-200 px-4 py-2"
              >
                ホーム
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-left text-white hover:text-red-200 transition-colors duration-200 px-4 py-2"
              >
                メニュー
              </button>
              <button 
                onClick={() => scrollToSection('access')}
                className="text-left text-white hover:text-red-200 transition-colors duration-200 px-4 py-2"
              >
                アクセス
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;