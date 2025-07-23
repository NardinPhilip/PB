import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon, ChevronUpIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Exhibitions: React.FC = () => {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  // Countdown timer for next exhibition
  useEffect(() => {
    const targetDate = new Date('2024-06-15T19:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const upcomingExhibition = {
    title: { en: 'Phenomenology of Light', ar: 'ظاهرة الضوء' },
    venue: { en: 'Townhouse Gallery, Cairo', ar: 'جاليري تاون هاوس، القاهرة' },
    date: { en: 'June 15, 2024', ar: '15 يونيو 2024' },
    description: { en: 'A major solo exhibition featuring new works from the Al-Faw\'aliya series', ar: 'معرض فردي كبير يضم أعمالاً جديدة من سلسلة الفواليا' }
  };

  const exhibitions = {
    '2024': [
      {
        title: 'Phenomenology of Light',
        venue: 'Townhouse Gallery, Cairo',
        date: 'June 15 - August 30',
        type: 'Solo Exhibition'
      },
      {
        title: 'Contemporary Egyptian Art',
        venue: 'Sharjah Art Museum',
        date: 'March 10 - May 20',
        type: 'Group Exhibition'
      }
    ],
    '2023': [
      {
        title: 'Al-Faw\'aliya: New Perspectives',
        venue: 'Cairo Opera House',
        date: 'October 5 - December 15',
        type: 'Solo Exhibition'
      },
      {
        title: 'Middle Eastern Contemporary',
        venue: 'Leighton House Museum, London',
        date: 'July 12 - September 24',
        type: 'Group Exhibition'
      }
    ],
    '2022': [
      {
        title: 'Light Studies',
        venue: 'Gypsum Gallery, Cairo',
        date: 'April 18 - June 30',
        type: 'Solo Exhibition'
      },
      {
        title: 'Egyptian Contemporary Masters',
        venue: 'Institut du Monde Arabe, Paris',
        date: 'January 15 - March 28',
        type: 'Group Exhibition'
      }
    ],
    '2021': [
      {
        title: 'Philological Layers',
        venue: 'Mashrabia Gallery, Cairo',
        date: 'November 8 - January 10',
        type: 'Solo Exhibition'
      }
    ]
  };

  const galleries = [
    { name: 'Townhouse Gallery', logo: '🏛️' },
    { name: 'Gypsum Gallery', logo: '🎨' },
    { name: 'Mashrabia Gallery', logo: '🖼️' },
    { name: 'Cairo Opera House', logo: '🎭' },
    { name: 'Leighton House', logo: '🏛️' },
    { name: 'Institut du Monde Arabe', logo: '🏛️' }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-serif text-neutral-100 mb-4">
              {language === 'en' ? 'Exhibitions & News' : 'المعارض والأخبار'}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Stay updated with Philip Boles\' latest exhibitions and artistic developments'
                : 'ابق على اطلاع بآخر معارض فيليب بولز والتطورات الفنية'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Exhibition Countdown */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-serif mb-4">
              {language === 'en' ? 'Next Exhibition' : 'المعرض القادم'}
            </h2>
            <h3 className="text-4xl font-serif mb-2">{upcomingExhibition.title[language]}</h3>
            <p className="text-lg mb-8">
              {upcomingExhibition.venue[language]} • {upcomingExhibition.date[language]}
            </p>
            <p className="text-neutral-200 mb-8 max-w-2xl mx-auto">
              {upcomingExhibition.description[language]}
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">{language === 'en' ? 'Days' : 'أيام'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">{language === 'en' ? 'Hours' : 'ساعات'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">{language === 'en' ? 'Minutes' : 'دقائق'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">{language === 'en' ? 'Seconds' : 'ثواني'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exhibition Archive */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Exhibition Archive' : 'أرشيف المعارض'}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {Object.entries(exhibitions).map(([year, yearExhibitions]) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <button
                  onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                  className="w-full bg-primary-700 hover:bg-primary-600 p-6 rounded-lg border border-primary-600 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="w-6 h-6 text-accent-400 mr-3" />
                    <span className="text-2xl font-serif text-neutral-100">{year}</span>
                    <span className="text-sm text-neutral-400 ml-4">
                      {yearExhibitions.length} {language === 'en' ? 'exhibitions' : 'معارض'}
                    </span>
                  </div>
                  {expandedYear === year ? (
                    <ChevronUpIcon className="w-6 h-6 text-accent-400" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-accent-400" />
                  )}
                </button>
                
                {expandedYear === year && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4"
                  >
                    {yearExhibitions.map((exhibition, index) => (
                      <div key={index} className="bg-primary-900 p-4 rounded-lg border border-primary-600 ml-8">
                        <h4 className="text-lg font-serif text-neutral-100 mb-2">{exhibition.title}</h4>
                        <div className="text-sm text-neutral-400 space-y-1">
                          <p><strong>Venue:</strong> {exhibition.venue}</p>
                          <p><strong>Date:</strong> {exhibition.date}</p>
                          <p><strong>Type:</strong> {exhibition.type}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Galleries */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Partner Galleries' : 'الشركاء من المعارض'}
          </motion.h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {galleries.map((gallery, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-primary-800 px-6 py-4 rounded-lg border border-primary-600 hover:border-accent-600 transition-colors"
              >
                <span className="text-2xl">{gallery.logo}</span>
                <span className="text-neutral-300 font-medium">{gallery.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exhibitions;