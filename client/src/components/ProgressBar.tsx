import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTest } from '@/contexts/TestContext';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar = ({ current, total, className }: ProgressBarProps) => {
  const { testType } = useTest();
  const percentage = (current / total) * 100;

  return (
    <div 
      className={cn(
        testType === 'kids' ? 'progress-kids' : 'progress-adult',
        className
      )}
    >
      <motion.div
        className={testType === 'kids' ? 'progress-kids-fill' : 'progress-adult-fill'}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};
