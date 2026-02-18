import { useTranslation } from 'react-i18next';

export const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary/50 text-secondary-foreground text-sm p-4 rounded-xl text-center">
      {t('disclaimer')}
    </div>
  );
};
