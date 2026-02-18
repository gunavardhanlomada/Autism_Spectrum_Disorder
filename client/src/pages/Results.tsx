import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Disclaimer } from '@/components/Disclaimer';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, History, RotateCcw, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const Results = () => {
  const { t } = useTranslation();
  const { testType, resetTest, prediction } = useTest();
  const [showConfetti, setShowConfetti] = useState(false);
  
  const isKids = testType === 'kids';
  const hasTraits = prediction === 1;

  useEffect(() => {
    if (isKids) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isKids]);

  const handleTakeAgain = () => {
    resetTest();
  };

  return (
    <div className={cn('min-h-screen bg-background relative overflow-hidden', isKids && 'kids-mode')}>
      <Header />
      
      {/* Confetti for kids */}
      {showConfetti && isKids && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20, 
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: 720,
                opacity: 0
              }}
              transition={{ 
                duration: 3,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
              className="absolute"
            >
              {i % 3 === 0 ? (
                <Star className="w-6 h-6 text-kids-secondary" fill="currentColor" />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-6 h-6 text-kids-primary" />
              ) : (
                <div className="w-4 h-4 bg-kids-accent rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={isKids ? 'card-kids text-center' : 'card-adult text-center'}
          >
            {/* Result Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={cn(
                'w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center',
                isKids 
                  ? 'bg-kids-primary/10' 
                  : hasTraits 
                    ? 'bg-amber-500/10' 
                    : 'bg-primary/10'
              )}
            >
              {isKids ? (
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-5xl"
                >
                  {hasTraits ? '🤗' : '🎉'}
                </motion.span>
              ) : hasTraits ? (
                <AlertCircle className="w-12 h-12 text-amber-500" />
              ) : (
                <CheckCircle className="w-12 h-12 text-primary" />
              )}
            </motion.div>

            {/* Title */}
            <h1 className={cn(
              'text-2xl md:text-3xl font-bold mb-3',
              isKids 
                ? 'text-kids-primary' 
                : hasTraits 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-foreground'
            )}>
              {isKids ? t('results.titleKids') : t('results.titleAdult')}
            </h1>

            {/* Result Message */}
            <div className={cn(
              'p-4 rounded-xl mb-4',
              hasTraits 
                ? 'bg-amber-500/10 border border-amber-500/20' 
                : 'bg-primary/10 border border-primary/20'
            )}>
              <p className={cn(
                'text-lg font-semibold',
                hasTraits ? 'text-amber-600 dark:text-amber-400' : 'text-primary'
              )}>
                {hasTraits ? t('results.traitsDetected') : t('results.noTraitsDetected')}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-muted-foreground mb-6">
              {isKids ? t('results.subtitleKids') : t('results.subtitleAdult')}
            </p>

            {/* Reminder */}
            <div className={cn(
              'p-4 rounded-xl mb-8',
              isKids ? 'bg-kids-secondary/20' : 'bg-secondary'
            )}>
              <p className="text-sm text-muted-foreground">
                {t('results.reminder')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                className={cn(
                  'flex-1 gap-2 h-12',
                  isKids && 'py-6 text-lg rounded-xl'
                )}
              >
                <Link to="/history">
                  <History className="w-5 h-5" />
                  {t('results.viewHistory')}
                </Link>
              </Button>
              <Link 
                to="/test" 
                onClick={handleTakeAgain}
                className={cn(
                  'flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-md font-medium transition-colors',
                  isKids 
                    ? 'bg-kids-primary text-white hover:bg-kids-primary/90 py-6 text-lg rounded-xl' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                <RotateCcw className="w-5 h-5" />
                {t('results.takeAgain')}
              </Link>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Disclaimer />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Results;
