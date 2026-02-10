import { useState, useEffect } from 'react';
import { TimeLeft } from '@/types';

/**
 * Hook personnalisé pour le compte à rebours Saint-Valentin
 * @param targetDate - Date cible (14 février 23h59)
 * @returns Temps restant en jours, heures, minutes, secondes
 */
export const useCountdown = (targetDate: Date): TimeLeft => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};