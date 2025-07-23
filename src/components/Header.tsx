import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, isRTL } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: { en: 'Home', ar: 'الرئيسية' }, href: '/' },
    { name: { en: 'About', ar: 'عن الفنان' }, href: '/about' },
    { name: { en: 'Gallery', ar: 'المعرض' }, href: '/gallery' },
    { name: { en: 'Review', ar: 'المراجعة النقدية' }, href: '/review' },
    { name: { en: 'Exhibitions', ar: 'المعارض' }, href: '/exhibitions' },
    { name: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-primary-900/95 backdrop-blur-sm border-b border-primary-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">PB</span>
            </div>
            <div className="text-xl font-serif text-neutral-100">
              Philip Boles
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent-400 ${
                  location.pathname === item.href
                    ? 'text-accent-400'
                    : 'text-neutral-300'
                }`}
              >
                {item.name[language]}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm font-medium text-neutral-300 hover:text-accent-400 transition-colors"
            >
              <GlobeAltIcon className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-accent-400 transition-colors"
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 border-t border-primary-700 pt-4"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-accent-400 ${
                    location.pathname === item.href
                      ? 'text-accent-400'
                      : 'text-neutral-300'
                  }`}
                >
                  {item.name[language]}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 py-2 text-sm font-medium text-neutral-300 hover:text-accent-400 transition-colors"
              >
                <GlobeAltIcon className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;