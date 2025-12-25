import React from 'react';

interface EventHeaderProps {
  title: string;
  creator: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ title, creator }) => {
  return (
    <div className="flex flex-col items-start gap-4 self-stretch relative">
      <header>
        <h1 className="self-stretch text-[#1A1A1A] text-[56px] font-medium leading-[54.88px] tracking-[-2.24px] relative max-md:text-[42px] max-md:leading-[38px] max-md:tracking-[-1.68px] max-sm:text-[32px] max-sm:leading-[30px] max-sm:tracking-[-1.28px]">
          {title}
        </h1>
      </header>
      <div className="self-stretch text-[#1A1A1A] text-[11px] font-normal uppercase relative">
        BY {creator}
      </div>
    </div>
  );
};
