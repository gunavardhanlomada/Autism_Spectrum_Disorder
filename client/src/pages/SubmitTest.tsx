import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { useTest } from '@/contexts/TestContext';
import { useApi } from '@/hooks/useApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SubmitTest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { testType, isComplete, setPrediction } = useTest();
  const { submitTest } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(true);

  const isKids = testType === 'kids';

  useEffect(() => {
    if (!isComplete) {
      navigate('/test/questions');
      return;
    }

    const submit = async () => {
      try {
        const response = await submitTest();
        setPrediction(response.prediction);
        setIsSubmitting(false);
        navigate('/test/results');
      } catch (error) {
        toast.error(t('errors.submitFailed'));
        navigate('/test/questions');
      }
    };

    submit();
  }, [isComplete, submitTest, navigate, t, setPrediction]);

  return (
    <div className={cn('min-h-screen bg-background', isKids && 'kids-mode')}>
      <Header />
      <main className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className={cn(
            'w-16 h-16 animate-spin mx-auto mb-4',
            isKids ? 'text-kids-primary' : 'text-primary'
          )} />
          <p className="text-lg text-muted-foreground">{t('loading')}</p>
        </motion.div>
      </main>
    </div>
  );
};

export default SubmitTest;
