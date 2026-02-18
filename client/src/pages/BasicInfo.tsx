import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BasicInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { testType, setBasicInfo } = useTest();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<string>('');
  const [jaundice, setJaundice] = useState<string>('');
  const [familyASD, setFamilyASD] = useState<string>('');

  const isKids = testType === 'kids';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ageNum = parseInt(age);
    if (!name || !age || !sex || jaundice === '' || familyASD === '') {
      toast.error(t('errors.required'));
      return;
    }

    if (ageNum < 1 || ageNum > 120) {
      toast.error(t('errors.ageRange'));
      return;
    }

    setBasicInfo({
      name,
      age: ageNum,
      sex: sex === 'male' ? 1 : 0,
      jaundice: jaundice === 'yes' ? 1 : 0,
      familyASD: familyASD === 'yes' ? 1 : 0,
    });

    navigate('/test/questions');
  };

  const cardClass = isKids ? 'card-kids' : 'card-adult';
  const buttonClass = isKids ? 'btn-kids' : 'btn-adult';

  return (
    <div className={cn('min-h-screen bg-background', isKids && 'kids-mode')}>
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={cn(
                'text-2xl md:text-3xl font-bold text-foreground mb-2',
                isKids && 'text-kids-primary'
              )}>
                {isKids ? t('basicInfo.titleKids') : t('basicInfo.title')}
              </h1>
            </div>

            {/* Form */}
            <div className={cardClass}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    {t('basicInfo.name')} {isKids && '📝'}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('basicInfo.namePlaceholder')}
                    className={cn(isKids && 'text-lg py-6 rounded-xl')}
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base font-medium">
                    {t('basicInfo.age')} {isKids && '🎂'}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={t('basicInfo.agePlaceholder')}
                    className={cn(isKids && 'text-lg py-6 rounded-xl')}
                    required
                  />
                </div>

                {/* Sex */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    {t('basicInfo.sex')} {isKids && '👤'}
                  </Label>
                  <RadioGroup value={sex} onValueChange={setSex} className="flex gap-4">
                    <div className="flex-1">
                      <RadioGroupItem value="male" id="male" className="peer sr-only" />
                      <Label
                        htmlFor="male"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {isKids && '👦 '}{t('basicInfo.male')}
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem value="female" id="female" className="peer sr-only" />
                      <Label
                        htmlFor="female"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {isKids && '👧 '}{t('basicInfo.female')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Jaundice */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    {t('basicInfo.jaundice')}
                  </Label>
                  <RadioGroup value={jaundice} onValueChange={setJaundice} className="flex gap-4">
                    <div className="flex-1">
                      <RadioGroupItem value="yes" id="jaundice-yes" className="peer sr-only" />
                      <Label
                        htmlFor="jaundice-yes"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {t('basicInfo.yes')}
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem value="no" id="jaundice-no" className="peer sr-only" />
                      <Label
                        htmlFor="jaundice-no"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {t('basicInfo.no')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Family ASD */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    {t('basicInfo.familyASD')}
                  </Label>
                  <RadioGroup value={familyASD} onValueChange={setFamilyASD} className="flex gap-4">
                    <div className="flex-1">
                      <RadioGroupItem value="yes" id="family-yes" className="peer sr-only" />
                      <Label
                        htmlFor="family-yes"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {t('basicInfo.yes')}
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem value="no" id="family-no" className="peer sr-only" />
                      <Label
                        htmlFor="family-no"
                        className={cn(
                          'flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all',
                          'hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                          isKids && 'text-lg py-5'
                        )}
                      >
                        {t('basicInfo.no')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/test')}
                    className="flex-1 gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('back')}
                  </Button>
                  <button type="submit" className={cn('flex-1 gap-2', buttonClass)}>
                    {t('next')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BasicInfo;
