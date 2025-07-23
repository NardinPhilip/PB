import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [showMailchimp, setShowMailchimp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/philipboles', icon: '📷' },
    { name: 'Facebook', href: 'https://facebook.com/philipboles', icon: '📘' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/philipboles', icon: '💼' },
    { name: 'Artsy', href: 'https://artsy.net/artist/philip-boles', icon: '🎨' },
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
              {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Connect with Philip Boles for inquiries about artwork, exhibitions, and collaborations'
                : 'تواصل مع فيليب بولز للاستفسارات حول الأعمال الفنية والمعارض والتعاون'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif text-neutral-100 mb-8">
                {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-accent-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-neutral-100">
                      {language === 'en' ? 'Studio Address' : 'عنوان الاستوديو'}
                    </h3>
                    <p className="text-neutral-400">
                      {language === 'en' 
                        ? '15 Kasr El Nil Street, Downtown Cairo, Egypt'
                        : '15 شارع قصر النيل، وسط القاهرة، مصر'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-accent-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-neutral-100">
                      {language === 'en' ? 'Phone' : 'الهاتف'}
                    </h3>
                    <p className="text-neutral-400">+20 2 2574 8912</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-accent-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-neutral-100">
                      {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </h3>
                    <p className="text-neutral-400">philip@philipboles.com</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-neutral-100 mb-4">
                  {language === 'en' ? 'Follow' : 'تابعنا'}
                </h3>
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
              
              {/* Newsletter Signup Button */}
              <button
                onClick={() => setShowMailchimp(true)}
                className="mt-8 bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {language === 'en' ? 'Subscribe to Newsletter' : 'اشترك في النشرة الإخبارية'}
              </button>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif text-neutral-100 mb-8">
                {language === 'en' ? 'Send a Message' : 'أرسل رسالة'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'en' ? 'Name' : 'الاسم'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'en' ? 'Subject' : 'الموضوع'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'en' ? 'Message' : 'الرسالة'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {language === 'en' ? 'Send Message' : 'أرسل الرسالة'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Studio Location' : 'موقع الاستوديو'}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-800 rounded-lg overflow-hidden border border-primary-600">
              <div className="h-64 bg-gradient-to-br from-accent-600 to-accent-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPinIcon className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">
                    {language === 'en' 
                      ? 'Interactive Map Placeholder'
                      : 'نائب الخريطة التفاعلية'
                    }
                  </p>
                  <p className="text-sm opacity-75">
                    {language === 'en' 
                      ? 'Downtown Cairo, Egypt'
                      : 'وسط القاهرة، مصر'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mailchimp Modal */}
      {showMailchimp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary-900 rounded-lg p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-neutral-100">
                {language === 'en' ? 'Newsletter Signup' : 'اشترك في النشرة'}
              </h3>
              <button
                onClick={() => setShowMailchimp(false)}
                className="text-neutral-400 hover:text-neutral-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-neutral-400 mb-6">
              {language === 'en' 
                ? 'Stay updated with Philip Boles\' latest exhibitions, new artworks, and artistic insights.'
                : 'ابق على اطلاع بآخر معارض فيليب بولز والأعمال الفنية الجديدة والرؤى الفنية.'
              }
            </p>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
              />
              <button className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 rounded-lg font-medium transition-colors">
                {language === 'en' ? 'Subscribe' : 'اشترك'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Contact;