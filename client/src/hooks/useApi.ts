import { useAuth } from '@/contexts/AuthContext';
import { useTest } from '@/contexts/TestContext';

const API_BASE_URL = 'http://localhost:8000';

interface PredictPayload {
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  a5: number;
  a6: number;
  a7: number;
  a8: number;
  a9: number;
  a10: number;
  sex: number;
  Jaundice: number;
  Family_ASD: number;
  age: number;
}

interface PredictResponse {
  prediction: number;
  email: string;
}

interface HistoryItem {
  id: string;
  date: string;
  age: number;
  prediction: number;
  answers?: Record<string, number>;
}

export const useApi = () => {
  const { user } = useAuth();
  const { answers, basicInfo } = useTest();

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`,
  });

  const submitTest = async (): Promise<PredictResponse> => {
    if (!basicInfo) {
      throw new Error('Basic info is required');
    }

    const payload: PredictPayload = {
      a1: answers['a1'] ?? 0,
      a2: answers['a2'] ?? 0,
      a3: answers['a3'] ?? 0,
      a4: answers['a4'] ?? 0,
      a5: answers['a5'] ?? 0,
      a6: answers['a6'] ?? 0,
      a7: answers['a7'] ?? 0,
      a8: answers['a8'] ?? 0,
      a9: answers['a9'] ?? 0,
      a10: answers['a10'] ?? 0,
      sex: basicInfo.sex,
      Jaundice: basicInfo.jaundice,
      Family_ASD: basicInfo.familyASD,
      age: basicInfo.age,
    };

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to submit test');
    }

    return response.json();
  };

  const fetchHistory = async (): Promise<HistoryItem[]> => {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return response.json();
  };

  return { submitTest, fetchHistory };
};
