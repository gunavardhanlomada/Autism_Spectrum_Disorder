import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Loader2, 
  History as HistoryIcon, 
  Calendar, 
  User, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Brain
} from 'lucide-react';
import { format } from 'date-fns';

interface HistoryItem {
  id: string;
  date: string;
  age: number;
  prediction: number;
  answers?: Record<string, number>;
}

const History = () => {
  const { t } = useTranslation();
  const { fetchHistory } = useApi();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError(t('errors.fetchHistoryFailed'));
        toast.error(t('errors.fetchHistoryFailed'));
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [fetchHistory, t]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <HistoryIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('history.title')}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {t('history.subtitle')}
            </p>
          </motion.div>

          {/* Content */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 text-destructive p-6 rounded-2xl flex items-center gap-4"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          ) : history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                <Brain className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t('history.noHistory')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('history.noHistoryDesc')}
              </p>
              <Button asChild className="btn-adult">
                <Link to="/test">{t('dashboard.takeTest')}</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-medium transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Result Icon */}
                      <div className={`p-3 rounded-xl ${
                        item.prediction === 1 
                          ? 'bg-accent/10' 
                          : 'bg-primary/10'
                      }`}>
                        {item.prediction === 1 ? (
                          <AlertCircle className="w-6 h-6 text-accent" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        )}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(item.date), 'PPp')}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {t('history.age')}: {item.age}
                          </span>
                        </div>
                        <p className={`font-medium ${
                          item.prediction === 1 
                            ? 'text-accent' 
                            : 'text-primary'
                        }`}>
                          {item.prediction === 1 
                            ? t('history.positive') 
                            : t('history.negative')
                          }
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Back to Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Button asChild variant="outline">
              <Link to="/dashboard">{t('back')} to Dashboard</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default History;
