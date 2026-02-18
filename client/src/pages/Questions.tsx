import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { SpeakButton } from '@/components/SpeakButton';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSpeech } from '@/hooks/useSpeech';

const TOTAL_QUESTIONS = 10;

const Questions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { testType, answers, setAnswer, currentQuestion, setCurrentQuestion, basicInfo } = useTest();
  const { stop } = useSpeech();
  
  const isKids = testType === 'kids';
  const questionListKey = isKids ? 'questions.kidsList' : 'questions.adultList';
  const questions = t(questionListKey, { returnObjects: true }) as string[];
  const currentQuestionText = questions[currentQuestion - 1];
  const currentAnswer = answers[`a${currentQuestion}`];

  // Redirect if no test type or basic info
  useEffect(() => {
    if (!testType) {
      navigate('/test');
    } else if (!basicInfo) {
      navigate('/test/basic-info');
    }
  }, [testType, basicInfo, navigate]);

  const answerOptions = [
    { label: t('questions.answers.definitelyAgree'), value: 1, emoji: '😊' },
    { label: t('questions.answers.slightlyAgree'), value: 1, emoji: '🙂' },
    { label: t('questions.answers.slightlyDisagree'), value: 0, emoji: '😐' },
    { label: t('questions.answers.definitelyDisagree'), value: 0, emoji: '😕' },
  ];

  const handleAnswer = (value: number, index: number) => {
    setAnswer(`a${currentQuestion}`, value);
  };

  const handleNext = () => {
    stop(); // Stop speech when navigating
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/test/submit');
    }
  };

  const handleBack = () => {
    stop(); // Stop speech when navigating
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/test/basic-info');
    }
  };

  if (!testType || !basicInfo) return null;

  return (
    <div className={cn('min-h-screen bg-background', isKids && 'kids-mode')}>
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                'font-medium',
                isKids ? 'text-lg text-kids-primary' : 'text-sm text-muted-foreground'
              )}>
                {t('questions.progress', { current: currentQuestion, total: TOTAL_QUESTIONS })}
              </span>
              {isKids && (
                <span className="text-2xl">
                  {currentQuestion <= 3 ? '🌟' : currentQuestion <= 6 ? '⭐' : currentQuestion <= 9 ? '✨' : '🎉'}
                </span>
              )}
            </div>
            <ProgressBar current={currentQuestion} total={TOTAL_QUESTIONS} />
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={isKids ? 'card-kids' : 'card-adult'}
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <p className={cn(
                    'leading-relaxed',
                    isKids ? 'text-xl font-medium' : 'text-lg'
                  )}>
                    {currentQuestionText}
                  </p>
                </div>
                <SpeakButton text={currentQuestionText} />
              </div>

              {/* Kids encouragement */}
              {isKids && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground mb-6"
                >
                  {t('questions.noRightWrong')}
                </motion.p>
              )}

              {/* Answer Options */}
              <div className="space-y-3">
                {answerOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.value, index)}
                    className={cn(
                      isKids ? 'answer-btn-kids' : 'answer-btn-adult',
                      currentAnswer !== undefined && 
                      answers[`a${currentQuestion}_index`] === index && 'selected'
                    )}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {isKids && <span className="text-2xl">{option.emoji}</span>}
                      <span>{option.label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className={cn('flex-1 gap-2', isKids && 'py-6 text-lg rounded-xl')}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('back')}
                </Button>
                <button
                  onClick={handleNext}
                  disabled={currentAnswer === undefined}
                  className={cn(
                    'flex-1 gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    isKids ? 'btn-kids' : 'btn-adult'
                  )}
                >
                  {currentQuestion === TOTAL_QUESTIONS ? t('submit') : t('next')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Questions;
