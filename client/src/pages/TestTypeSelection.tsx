import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { useTest } from '@/contexts/TestContext';
import { Palette, Briefcase, ChevronRight, Sparkles, Users } from 'lucide-react';

const TestTypeSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setTestType, resetTest } = useTest();

  const handleSelect = (type: 'kids' | 'adult') => {
    resetTest();
    setTestType(type);
    navigate('/test/basic-info');
  };

  const testTypes = [
    {
      type: 'kids' as const,
      icon: Sparkles,
      emoji: '🎨',
      title: t('testType.kids.title'),
      ageRange: t('testType.kids.ageRange'),
      description: t('testType.kids.description'),
      className: 'card-kids border-kids-secondary/30 hover:border-kids-primary',
      iconClass: 'bg-kids-primary text-kids-primary-foreground',
      isKids: true,
    },
    {
      type: 'adult' as const,
      icon: Briefcase,
      emoji: '🧩',
      title: t('testType.adult.title'),
      ageRange: t('testType.adult.ageRange'),
      description: t('testType.adult.description'),
      className: 'card-adult border-adult-secondary hover:border-adult-primary',
      iconClass: 'bg-adult-primary text-adult-primary-foreground',
      isKids: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('testType.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('testType.subtitle')}
            </p>
          </motion.div>

          {/* Test Type Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {testTypes.map((item, index) => (
              <motion.button
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleSelect(item.type)}
                className={`w-full text-left ${item.className} group`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Emoji */}
                  <motion.div
                    className="text-6xl mb-4"
                    animate={item.isKids ? { 
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={item.isKids ? { 
                      repeat: Infinity, 
                      duration: 2,
                      repeatDelay: 1
                    } : {}}
                  >
                    {item.emoji}
                  </motion.div>

                  {/* Icon Badge */}
                  <div className={`p-3 rounded-xl ${item.iconClass} mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {item.ageRange}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
                    <span className="font-medium">{t('next')}</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestTypeSelection;
