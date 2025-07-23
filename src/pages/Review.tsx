import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

const Review: React.FC = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

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
              {language === 'en' ? 'Critical Review' : 'المراجعة النقدية'}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'An in-depth analysis of Philip Boles\' artistic practice and conceptual framework'
                : 'تحليل متعمق للممارسة الفنية والإطار المفاهيمي لفيليب بولز'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Article */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Audio Player */}
            <div className="bg-primary-700 rounded-lg p-6 mb-12 border border-primary-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-neutral-100 mb-2">
                    {language === 'en' ? 'Artist Interview' : 'مقابلة مع الفنان'}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {language === 'en' 
                      ? 'Philip Boles discusses his Al-Faw\'aliya concept (1:23)'
                      : 'فيليب بولز يناقش مفهومه للفواليا (1:23)'
                    }
                  </p>
                </div>
                <button
                  onClick={handleAudioToggle}
                  className="bg-accent-600 hover:bg-accent-700 text-white p-3 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Stylistic Blend' : 'الخليط الأسلوبي'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'Philip Boles occupies a unique position in contemporary Egyptian art, masterfully synthesizing traditional realist techniques with conceptually rigorous contemporary frameworks. His painterly approach demonstrates technical virtuosity while maintaining intellectual depth—a combination that has become increasingly rare in today\'s art world. The surface beauty of his work never overshadows its conceptual sophistication, creating a dialogue between immediate visual pleasure and sustained intellectual engagement.'
                    : 'يحتل فيليب بولز موقعاً فريداً في الفن المصري المعاصر، حيث يمزج بمهارة التقنيات الواقعية التقليدية مع الأطر المعاصرة المفاهيمية الصارمة. يُظهر نهجه الرسامي براعة تقنية مع الحفاظ على العمق الفكري - مزيج أصبح نادراً بشكل متزايد في عالم الفن اليوم.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Conceptual Unity: Al-Faw\'aliya' : 'الوحدة المفاهيمية: الفواليا'}
                </h2>
                <blockquote className="border-l-4 border-accent-600 pl-6 my-6 italic text-neutral-400">
                  {language === 'en' 
                    ? '"Al-Faw\'aliya represents not merely a theoretical construct, but a lived experience of consciousness engaging with the world."'
                    : '"الفواليا لا تمثل مجرد بنية نظرية، بل تجربة معيشة للوعي وهو يتفاعل مع العالم."'
                  }
                </blockquote>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'The concept of Al-Faw\'aliya—roughly translated as "the active principle"—serves as the theoretical backbone of Boles\' mature work. This Arabic phenomenological framework allows him to explore consciousness not as a passive receptor of experience, but as an active force that shapes reality through perception. Each painting becomes a meditation on how consciousness constructs meaning from the raw material of sensory experience.'
                    : 'مفهوم الفواليا - المترجم تقريباً كـ "المبدأ الفعال" - يخدم كالعمود الفقري النظري لأعمال بولز الناضجة. يسمح له هذا الإطار الظاهري العربي باستكشاف الوعي ليس كمستقبل سلبي للتجربة، بل كقوة فعالة تشكل الواقع من خلال الإدراك.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Emotional Depth vs. Drama' : 'العمق العاطفي مقابل الدراما'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'What distinguishes Boles from his contemporaries is his ability to achieve profound emotional resonance without resorting to melodrama. His restraint is masterful—each work pulses with contained intensity, like a held breath or a suppressed scream. This emotional sophistication reflects his understanding that true psychological depth emerges not from expressive excess, but from the tension between revelation and concealment.'
                    : 'ما يميز بولز عن معاصريه هو قدرته على تحقيق رنين عاطفي عميق دون اللجوء إلى الميلودراما. ضبط النفس لديه بارع - كل عمل ينبض بكثافة محتواة، مثل نفس محبوس أو صرخة مكبوتة. هذا التطور العاطفي يعكس فهمه أن العمق النفسي الحقيقي لا ينبع من الإفراط التعبيري، بل من التوتر بين الكشف والإخفاء.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Void & Time' : 'الفراغ والزمن'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'Boles demonstrates an exceptional understanding of negative space and temporal rhythm. His compositions breathe with carefully calibrated intervals of emptiness that serve not as absence, but as pregnant pause—moments where meaning accumulates and consciousness has space to unfold. Time in his paintings moves not chronologically, but psychologically, following the internal logic of memory and association rather than external narrative sequence.'
                    : 'يُظهر بولز فهماً استثنائياً للفراغ السلبي والإيقاع الزمني. تتنفس تكويناته بفترات مُعايرة بعناية من الفراغ التي لا تخدم كغياب، بل كوقفة حامل - لحظات حيث يتراكم المعنى ويحصل الوعي على مساحة للانكشاف.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Universality vs. Local Symbols' : 'العالمية مقابل الرموز المحلية'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'Perhaps most remarkably, Boles achieves genuine universality while remaining deeply rooted in Egyptian cultural specificity. His work speaks a global visual language while maintaining its distinctive Arabic accent. This balance—between the particular and the universal—positions him as a significant voice in contemporary art\'s ongoing dialogue about cultural identity in an increasingly connected world.'
                    : 'والأمر الأكثر إثارة للإعجاب، يحقق بولز عالمية حقيقية مع بقائه متجذراً بعمق في الخصوصية الثقافية المصرية. يتحدث عمله لغة بصرية عالمية مع الحفاظ على لهجته العربية المميزة. هذا التوازن - بين الخاص والعام - يضعه كصوت مهم في الحوار المستمر للفن المعاصر حول الهوية الثقافية في عالم متصل بشكل متزايد.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Biennale Suitability' : 'مناسبة البينالي'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'Boles\' work possesses the rare quality of being simultaneously accessible to diverse audiences and intellectually rigorous enough to sustain scholarly attention. His paintings function effectively in the compressed viewing conditions of major international exhibitions while rewarding extended contemplation. This dual capacity—for immediate impact and sustained engagement—makes him an ideal candidate for prestigious biennales and major museum presentations.'
                    : 'يمتلك عمل بولز الصفة النادرة للكونه مفهوماً في الوقت نفسه لجماهير متنوعة وصارماً فكرياً بما يكفي لاستمرار الاهتمام الأكاديمي. تعمل لوحاته بفعالية في ظروف المشاهدة المضغوطة للمعارض الدولية الكبرى مع مكافأة التأمل المطول.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-accent-400 mb-4">
                  {language === 'en' ? 'Future Directions' : 'الاتجاهات المستقبلية'}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {language === 'en' 
                    ? 'As Boles continues to develop his Al-Faw\'aliya framework, we can anticipate even more sophisticated explorations of consciousness and cultural identity. His trajectory suggests an artist still in the process of discovering his full potential—a thrilling prospect for both the artist and the art world. The depth of his theoretical foundation combined with his technical mastery positions him to make increasingly significant contributions to contemporary art discourse.'
                    : 'بينما يواصل بولز تطوير إطار الفواليا الخاص به، يمكننا توقع استكشافات أكثر تطوراً للوعي والهوية الثقافية. مسيرته تشير إلى فنان ما زال في عملية اكتشاف إمكاناته الكاملة - احتمال مثير للفنان وعالم الفن على حد سواء.'
                  }
                </p>
              </section>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default Review;