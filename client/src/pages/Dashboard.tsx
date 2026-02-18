import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Disclaimer } from '@/components/Disclaimer';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, ClipboardList, History, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const actions = [
    {
      to: '/test',
      icon: Brain,
      title: t('dashboard.takeTest'),
      description: t('dashboard.takeTestDesc'),
      gradient: 'from-primary to-primary/80',
    },
    {
      to: '/history',
      icon: History,
      title: t('dashboard.viewHistory'),
      description: t('dashboard.viewHistoryDesc'),
      gradient: 'from-accent to-accent/80',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              👋 {t('dashboard.greeting')}, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('dashboard.welcome')}
            </p>
          </motion.div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {actions.map((action, index) => (
              <motion.div
                key={action.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={action.to}
                  className="block bg-card hover:bg-card/80 rounded-2xl p-6 border border-border shadow-medium hover:shadow-large transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${action.gradient}`}>
                      <action.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {action.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Disclaimer />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
