import React from 'react';
interface EventDescriptionProps {
  description: string;
}
export const EventDescription: React.FC<EventDescriptionProps> = ({
  description
}) => {
  return <section className="flex flex-col items-start gap-4 self-stretch relative">
      <div className="flex flex-col items-start gap-5 self-stretch relative my-0">
        <hr className="h-px self-stretch relative bg-[#1A1A1A] border-0" />
        <h2 className="self-stretch text-[#1A1A1A] text-[11px] font-normal uppercase relative">
          ABOUT THIS EVENT
        </h2>
      </div>
      <p className="self-stretch text-[#1A1A1A] text-[17px] font-normal leading-[20.74px] tracking-[-0.34px] relative">
        {description}
      </p>
    </section>;
};