import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { paintingService, Painting } from '../lib/supabase';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [featuredWorks, setFeaturedWorks] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const careerTimeline = [
    { year: '1996', event: { en: 'Fine Arts Graduation', ar: 'تخرج من الفنون الجميلة' } },
    { year: '2005', event: { en: 'First Solo Exhibition', ar: 'أول معرض فردي' } },
    { year: '2012', event: { en: 'Al-Faw\'aliya Series', ar: 'سلسلة الفواليا' } },
    { year: '2020', event: { en: 'International Recognition', ar: 'اعتراف دولي' } },
  ];

  useEffect(() => {
    loadFeaturedWorks();
  }, []);

  useEffect(() => {
    if (featuredWorks.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % featuredWorks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredWorks.length]);

  const loadFeaturedWorks = async () => {
    try {
      const featured = await paintingService.getFeatured();
      setFeaturedWorks(featured);
    } catch (error) {
      console.error('Error loading featured works:', error);
      setFeaturedWorks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto px-4"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-serif text-neutral-100 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              {language === 'en' ? 'Philip Boles' : 'فيليب بولز'}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {language === 'en' 
                ? 'Exploring the phenomenology of light and shadow through expressive realism'
                : 'استكشاف ظاهرة الضوء والظل من خلال الواقعية التعبيرية'
              }
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Link
                to="/gallery"
                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>{language === 'en' ? 'Explore Full Gallery' : 'استكشف المعرض الكامل'}</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="border border-accent-600 text-accent-400 hover:bg-accent-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {language === 'en' ? 'Virtual Studio Tour' : 'جولة افتراضية في الاستوديو'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-24 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Artistic Journey' : 'الرحلة الفنية'}
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent-600"></div>
            
            {careerTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-primary-700 p-6 rounded-lg border border-primary-600">
                    <div className="text-2xl font-serif text-accent-400 mb-2">{item.year}</div>
                    <p className="text-neutral-300">{item.event[language]}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-600 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Gallery */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Signature Works' : 'الأعمال المميزة'}
          </motion.h2>
          
          {featuredWorks.length > 0 && (
            <div className="relative h-96 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src={featuredWorks[currentImage].image_url}
                    alt={featuredWorks[currentImage].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-8">
                    <div className="text-white">
                      <h3 className="text-2xl font-serif mb-2">
                        {language === 'ar' && featuredWorks[currentImage].title_ar 
                          ? featuredWorks[currentImage].title_ar 
                          : featuredWorks[currentImage].title}
                      </h3>
                      <p className="text-neutral-300">{featuredWorks[currentImage].year}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredWorks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImage ? 'bg-accent-600' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/review"
              className="inline-flex items-center space-x-2 text-accent-400 hover:text-accent-300 transition-colors"
            >
              <span>{language === 'en' ? 'Read Critical Review' : 'اقرأ المراجعة النقدية'}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;