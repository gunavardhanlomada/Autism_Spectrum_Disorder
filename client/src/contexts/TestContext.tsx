import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type TestType = 'kids' | 'adult' | null;

interface BasicInfo {
  name: string;
  age: number;
  sex: number; // 1 = male, 0 = female
  jaundice: number; // 1 = yes, 0 = no
  familyASD: number; // 1 = yes, 0 = no
}

interface TestContextType {
  testType: TestType;
  setTestType: (type: TestType) => void;
  basicInfo: BasicInfo | null;
  setBasicInfo: (info: BasicInfo) => void;
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  resetTest: () => void;
  isComplete: boolean;
  prediction: number | null;
  setPrediction: (result: number | null) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const STORAGE_KEY = 'autisscreen_test_state';

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testType, setTestType] = useState<TestType>(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [prediction, setPrediction] = useState<number | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setTestType(state.testType);
        setBasicInfo(state.basicInfo);
        setAnswers(state.answers);
        setCurrentQuestion(state.currentQuestion);
      } catch (e) {
        console.error('Failed to restore test state:', e);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (testType || basicInfo || Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        testType,
        basicInfo,
        answers,
        currentQuestion,
      }));
    }
  }, [testType, basicInfo, answers, currentQuestion]);

  const setAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const resetTest = useCallback(() => {
    setTestType(null);
    setBasicInfo(null);
    setAnswers({});
    setCurrentQuestion(1);
    setPrediction(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isComplete = Object.keys(answers).length === 10;

  return (
    <TestContext.Provider value={{
      testType,
      setTestType,
      basicInfo,
      setBasicInfo,
      answers,
      setAnswer,
      currentQuestion,
      setCurrentQuestion,
      resetTest,
      isComplete,
      prediction,
      setPrediction,
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
