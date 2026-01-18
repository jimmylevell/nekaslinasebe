import { useState, useEffect } from 'react';
import type { TipsData, Tip, Week } from '../types/tips';

export const useTips = () => {
  const [tipsData, setTipsData] = useState<TipsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTipsData = async () => {
      try {
        const response = await fetch('/data/tips.json');
        if (!response.ok) {
          throw new Error('Failed to load tips data');
        }
        const data: TipsData = await response.json();
        setTipsData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load tips data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadTipsData();
  }, []);

  const getWeeks = (): Week[] => {
    return tipsData?.weeks || [];
  };

  const getCurrentWeekTips = (): Tip[] => {
    if (!tipsData) return [];
    return tipsData.tips.filter(tip => tip.week === tipsData.currentWeek);
  };

  const getTipsForWeek = (weekId: string): Tip[] => {
    if (!tipsData) return [];
    return tipsData.tips.filter(tip => tip.week === weekId);
  };

  const getAllTips = (): Tip[] => {
    return tipsData?.tips || [];
  };

  const getTip = (weekId: string, tipNumber: number): Tip | null => {
    if (!tipsData) return null;
    return tipsData.tips.find(tip =>
      tip.week === weekId && tip.tipNumber === tipNumber
    ) || null;
  };

  return {
    tipsData,
    loading,
    error,
    getWeeks,
    getCurrentWeekTips,
    getTipsForWeek,
    getAllTips,
    getTip,
  };
};
