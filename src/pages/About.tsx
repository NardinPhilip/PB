import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { language } = useLanguage();

  const timeline = [
    { year: '1996', event: { en: 'Fine Arts Graduation, Cairo University', ar: 'تخرج من الفنون الجميلة، جامعة القاهرة' } },
    { year: '1998', event: { en: 'First Group Exhibition, Gezira Art Center', ar: 'أول معرض جماعي، مركز الجزيرة للفنون' } },
    { year: '2001', event: { en: 'European Study Tour - Paris, Florence, Madrid', ar: 'جولة دراسية أوروبية - باريس، فلورنسا، مدريد' } },
    { year: '2005', event: { en: 'Solo Exhibition "Shadows of Memory"', ar: 'معرض فردي "ظلال الذاكرة"' } },
    { year: '2008', event: { en: 'Residency at Delfina Foundation, London', ar: 'إقامة فنية في مؤسسة دلفينا، لندن' } },
    { year: '2012', event: { en: 'Al-Faw\'aliya Series Launch', ar: 'إطلاق سلسلة الفواليا' } },
    { year: '2015', event: { en: 'Venice Biennale Participation', ar: 'مشاركة في بينالي البندقية' } },
    { year: '2018', event: { en: 'Retrospective at Cairo Opera House', ar: 'معرض استعادي في دار أوبرا القاهرة' } },
    { year: '2020', event: { en: 'International Recognition Award', ar: 'جائزة الاعتراف الدولي' } },
    { year: '2023', event: { en: 'Major Solo Exhibition "Phenomenology of Light"', ar: 'معرض فردي كبير "ظاهرة الضوء"' } },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-serif text-neutral-100 mb-6">
                {language === 'en' ? 'About the Artist' : 'عن الفنان'}
              </h1>
              <p className="text-xl text-neutral-300 mb-8">
                {language === 'en' 
                  ? 'Philip Boles, born in 1972, is an established Egyptian painter whose work explores the intersection of traditional realism with contemporary conceptual frameworks.'
                  : 'فيليب بولز، مواليد 1972، رسام مصري راسخ يستكشف عمله تقاطع الواقعية التقليدية مع الأطر المفاهيمية المعاصرة.'
                }
              </p>
              <div className="text-accent-400 font-medium">
                {language === 'en' ? 'Age 52 • Fine Arts \'96' : 'العمر 52 • الفنون الجميلة \'96'}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Philip Boles Portrait"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-24 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Artist Statement' : 'بيان الفنان'}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-primary-700 p-8 rounded-lg border border-primary-600"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                {language === 'en' ? (
                  <div>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                    Philip Boulos is a visual artist from Egypt, born in 1973 and a graduate of the Faculty of Fine Arts, class of 1996. With over two decades of experience, his artistic journey spans across painting, sculpture, installation, and 
                    stage design, including theatrical sets and costume creation—each 
                    infused with a unique and personal artistic vision.
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                    Philip’s work is known for its rich symbolism, experimental nature, and deep philosophical undertones.
                     His pieces often explore themes of identity, human struggle, and societal transformation, using a variety of materials and forms 
                     to evoke reflection and emotional depth. His approach fuses classical art principles with contemporary expressions, creating a
                      dynamic visual language that stands out in both local and international exhibitions.                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      The <strong className="text-accent-400">"Phenomenology of Light and Shadow"</strong> in my work 
                      transcends mere technical execution. Light becomes a metaphor for consciousness itself – 
                      the illuminating force that reveals hidden truths within the mundane. Shadow, conversely, 
                      represents the unconscious, the suppressed, the culturally invisible.
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      My <strong className="text-accent-400">"Expressive Realism"</strong> refuses the false binary 
                      between representation and abstraction. Instead, I seek to capture the emotional truth that 
                      lies beneath surface appearances, using traditional techniques to explore thoroughly modern 
                      anxieties about identity, belonging, and cultural authenticity in a globalized world.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      تدور ممارستي الفنية حول ما أسميه <strong className="text-accent-400">"الفواليا"</strong> – 
                      المبدأ الفعال الذي يحكم العلاقة بين الوعي والإدراك البصري. 
                      هذا المفهوم، المتجذر في الظاهرة العربية، يشكل الأساس النظري لعملي.
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      من خلال <strong className="text-accent-400">"الطبقات الفيلولوجية"</strong>، أنقب في الأعماق 
                      الدلالية للغة البصرية، معاملاً كل ضربة فرشاة كعنصر نصي يحمل التأثير الحسي المباشر 
                      والرنين الثقافي الأعمق. لوحاتي مواقع أثرية للمعنى، حيث تتقارب التقاليد الفنية المصرية 
                      القديمة مع الخطاب العالمي المعاصر.
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      <strong className="text-accent-400">"ظاهرة الضوء والظل"</strong> في عملي تتجاوز مجرد 
                      التنفيذ التقني. يصبح الضوء استعارة للوعي نفسه – القوة المنيرة التي تكشف الحقائق 
                      المخفية داخل المألوف. الظل، على العكس، يمثل اللاوعي، المقموع، غير المرئي ثقافياً.
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      <strong className="text-accent-400">"الواقعية التعبيرية"</strong> ترفض الثنائية الزائفة 
                      بين التمثيل والتجريد. بدلاً من ذلك، أسعى لالتقاط الحقيقة العاطفية التي تكمن تحت 
                      المظاهر السطحية، مستخدماً التقنيات التقليدية لاستكشاف القلق الحديث حول الهوية 
                      والانتماء والأصالة الثقافية في عالم معولم.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Career Milestones' : 'معالم المسيرة المهنية'}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-sm">{item.year}</span>
                </div>
                <div className="flex-1 bg-primary-800 p-4 rounded-lg border border-primary-700">
                  <p className="text-neutral-300">{item.event[language]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;