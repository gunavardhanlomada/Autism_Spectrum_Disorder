import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTest } from '@/contexts/TestContext';

interface HeaderProps {
  showAuth?: boolean;
}

export const Header = ({ showAuth = true }: HeaderProps) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { testType } = useTest();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to={user ? '/dashboard' : '/'} 
          className={cn(
            "text-xl font-bold transition-colors",
            testType === 'kids' ? 'font-kids text-kids-primary' : 'text-primary'
          )}
        >
          {t('appName')}
        </Link>
        
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />
          
          {showAuth && user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
