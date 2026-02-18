import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Disclaimer } from '@/components/Disclaimer';
import { Button } from '@/components/ui/button';
import { Globe, Volume2, Shield, Brain, Heart, Sparkles } from 'lucide-react';

const Landing = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Globe, text: t('landing.features.multilingual') },
    { icon: Volume2, text: t('landing.features.accessible') },
    { icon: Shield, text: t('landing.features.secure') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showAuth={false} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animated icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center gap-4 mb-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="p-4 bg-primary/10 rounded-2xl"
                >
                  <Brain className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: 'easeInOut' }}
                  className="p-4 bg-accent/10 rounded-2xl"
                >
                  <Heart className="w-8 h-8 text-accent" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1, ease: 'easeInOut' }}
                  className="p-4 bg-primary/10 rounded-2xl"
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              >
                {t('landing.hero')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
              >
                {t('landing.description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="btn-adult text-lg px-8"
                >
                  <Link to="/login">{t('landing.login')}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 border-2"
                >
                  <Link to="/register">{t('landing.register')}</Link>
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-6 mb-12"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Disclaimer />
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
