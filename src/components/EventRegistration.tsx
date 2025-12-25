import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface EventRegistrationProps {
  eventId: string;
  onRegister: () => void;
  isRegistered: boolean;
  className?: string;
  onAuthRequired?: () => void;
  targetDate?: Date;
}

export const EventRegistration: React.FC<EventRegistrationProps> = ({ 
  eventId,
  onRegister, 
  isRegistered: initialIsRegistered,
  className = "",
  onAuthRequired,
  targetDate
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRegistration(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRegistration(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [eventId]);

  const checkRegistration = async (userId: string) => {
    const { data } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .maybeSingle();
    
    setIsRegistered(!!data);
  };

  const getEventStatus = () => {
    if (!targetDate) return 'upcoming';
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const distance = target - now;
    const oneHour = 1000 * 60 * 60;
    
    if (distance < -oneHour) return 'ended';
    if (distance >= -oneHour && distance <= oneHour) return 'happening';
    return 'upcoming';
  };

  const eventStatus = getEventStatus();
  const isPastEvent = eventStatus === 'ended';

  const handleRegister = async () => {
    if (isPastEvent) {
      toast({
        title: 'Event has ended',
        description: 'You cannot register for past events',
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        toast({
          title: 'Sign in required',
          description: 'Please sign in to register for events',
          variant: 'destructive'
        });
      }
      return;
    }

    setLoading(true);
    
    try {
      if (isRegistered) {
        // Unregister
        const { error } = await supabase
          .from('event_registrations')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);

        if (error) throw error;

        setIsRegistered(false);
        toast({
          title: 'Unregistered',
          description: 'You have been unregistered from this event'
        });
      } else {
        // Register
        const { error } = await supabase
          .from('event_registrations')
          .insert({
            user_id: user.id,
            event_id: eventId
          });

        if (error) throw error;

        setIsRegistered(true);
        onRegister();
        toast({
          title: 'Registered!',
          description: 'You have successfully registered for this event'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`group flex items-center self-stretch relative overflow-hidden ${className}`}>
      <button 
        onClick={handleRegister}
        disabled={loading || isPastEvent}
        className={`flex h-[50px] justify-center items-center gap-2.5 border relative px-2.5 py-3.5 border-solid transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-[calc(100%-50px)] z-10 ${
          isPastEvent 
            ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
            : 'bg-[#1A1A1A] border-[#1A1A1A] group-hover:w-full group-hover:bg-[#FA76FF] group-hover:border-[#FA76FF]'
        }`}
        aria-label={isPastEvent ? "Event has ended" : isRegistered ? "Unregister from event" : "Register for event"}
      >
        <span className={`text-white text-[13px] font-normal uppercase relative transition-colors duration-300 ${!isPastEvent && 'group-hover:text-black'}`}>
          {loading ? "LOADING..." : isPastEvent ? "EVENT ENDED" : isRegistered ? "UNREGISTER" : "REGISTER"}
        </span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[18px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
          aria-hidden="true"
        >
          <path d="M0.857178 6H10.3929" stroke="#1A1A1A" strokeWidth="1.5" />
          <path d="M6.39282 10L10.3928 6L6.39282 2" stroke="#1A1A1A" strokeWidth="1.5" />
        </svg>
      </button>
      {!isPastEvent && (
        <div className="flex w-[50px] h-[50px] justify-center items-center border absolute right-0 bg-white rounded-[99px] border-solid border-[#1A1A1A] transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:scale-50 pointer-events-none z-0">
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="arrow-icon"
          aria-hidden="true"
        >
          <path d="M0.857178 6H10.3929" stroke="#1A1A1A" strokeWidth="1.5" />
          <path d="M6.39282 10L10.3928 6L6.39282 2" stroke="#1A1A1A" strokeWidth="1.5" />
        </svg>
        </div>
      )}
    </div>
  );
};
