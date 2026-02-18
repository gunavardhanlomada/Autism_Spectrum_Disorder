import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { cn } from '@/lib/utils';
import { useTest } from '@/contexts/TestContext';

interface SpeakButtonProps {
  text: string;
  className?: string;
}

export const SpeakButton = ({ text, className }: SpeakButtonProps) => {
  const { speak, stop, isSpeaking } = useSpeech();
  const { testType } = useTest();

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'speak-btn',
        isSpeaking && 'speaking',
        testType === 'kids' && 'bg-kids-primary/10 text-kids-primary hover:bg-kids-primary/20',
        testType === 'adult' && 'bg-adult-primary/10 text-adult-primary hover:bg-adult-primary/20',
        className
      )}
      aria-label={isSpeaking ? 'Stop speaking' : 'Listen to question'}
    >
      {isSpeaking ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  );
};
