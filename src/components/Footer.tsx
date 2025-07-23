import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/philipboles', icon: '📷' },
    { name: 'Facebook', href: 'https://facebook.com/philipboles', icon: '📘' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/philipboles', icon: '💼' },
    { name: 'Artsy', href: 'https://artsy.net/artist/philip-boles', icon: '🎨' },
  ];

  return (
    <footer className="bg-primary-950 border-t border-primary-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif text-neutral-100 mb-4">
              {language === 'en' ? 'Philip Boles' : 'فيليب بولز'}
            </h3>
            <p className="text-neutral-400 text-sm">
              {language === 'en' 
                ? 'Established Egyptian painter exploring the phenomenology of light and shadow through expressive realism.'
                : 'رسام مصري راسخ يستكشف ظاهرة الضوء والظل من خلال الواقعية التعبيرية.'
              }
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-neutral-100 mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="/gallery" className="hover:text-accent-400 transition-colors">
                {language === 'en' ? 'Gallery' : 'المعرض'}
              </a></li>
              <li><a href="/exhibitions" className="hover:text-accent-400 transition-colors">
                {language === 'en' ? 'Exhibitions' : 'المعارض'}
              </a></li>
              <li><a href="/contact" className="hover:text-accent-400 transition-colors">
                {language === 'en' ? 'Contact' : 'اتصل بنا'}
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-neutral-100 mb-4">
              {language === 'en' ? 'Follow' : 'تابعنا'}
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl hover:scale-110 transition-transform"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-sm text-neutral-500">
          <p>
            {language === 'en' 
              ? '© 2024 Philip Boles. All rights reserved.'
              : '© 2024 فيليب بولز. جميع الحقوق محفوظة.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;