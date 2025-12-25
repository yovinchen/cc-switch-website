import React, { useState, useEffect } from 'react';
import { RotatingBadge } from './RotatingBadge';
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface EventCountdownProps {
  targetDate?: Date;
}
export const EventCountdown: React.FC<EventCountdownProps> = ({
  targetDate = new Date(Date.now() + 132 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 51 * 60 * 1000 + 2 * 1000)
}) => {
  const calculateTimeLeft = (target: Date): TimeLeft => {
    const now = new Date().getTime();
    const distance = target.getTime() - now;
    
    if (distance > 0) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(distance % (1000 * 60) / 1000)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const getEventStatus = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const distance = target - now;
    const oneHour = 1000 * 60 * 60;
    
    if (distance < -oneHour) return 'ended';
    if (distance >= -oneHour && distance <= oneHour) return 'happening';
    return 'upcoming';
  };

  const status = getEventStatus();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  const formatTime = (value: number, unit: string) => {
    return `${value.toString().padStart(unit === 'D' ? 1 : 2, '0')}${unit}`;
  };
  if (status === 'ended') {
    return null;
  }

  if (status === 'happening') {
    return (
      <RotatingBadge 
        text="LIVE" 
        showIcon={false}
        className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
      />
    );
  }

  return <div className="flex items-center gap-[2px] w-[409px] h-[49px] max-md:static max-md:w-auto max-md:justify-center max-sm:flex-wrap">
      <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
          {formatTime(timeLeft.days, 'D')}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
          {formatTime(timeLeft.hours, 'H')}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 mx-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
          {formatTime(timeLeft.minutes, 'M')}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
        <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
          {formatTime(timeLeft.seconds, 'S')}
        </div>
      </div>
    </div>;
};