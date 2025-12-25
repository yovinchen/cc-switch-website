import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { SEOHead } from '@/components/SEOHead';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  background_image_url: string;
}

const EventCard = ({ 
  event, 
  isCreated, 
  onDelete 
}: { 
  event: Event; 
  isCreated?: boolean; 
  onDelete?: (id: string) => void;
}) => {
  const navigate = useNavigate();
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete?.(event.id);
    }
  };
  
  return (
    <div 
      className="relative cursor-pointer group"
      onClick={() => navigate(isCreated ? `/event/${event.id}/edit` : `/event/${event.id}`)}
    >
      <div className="overflow-hidden mb-3">
        <div 
          className="aspect-[4/3] bg-gray-300 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${event.background_image_url})` }}
        ></div>
      </div>
      <div className="absolute top-4 left-4 flex flex-col gap-0">
        <div className="bg-white border border-black px-3 h-[23px] flex items-center">
          <div className="text-[11px] font-medium uppercase leading-none">{event.date}</div>
        </div>
        <div className="bg-white border border-t-0 border-black px-3 h-[23px] flex items-center">
          <div className="text-[11px] font-medium leading-none">{event.time}</div>
        </div>
      </div>
      {isCreated && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 bg-white border border-black p-2 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete event"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <h3 className="text-base font-medium">{event.title}</h3>
    </div>
  );
};

const MyEvents = () => {
  const [user, setUser] = useState<User | null>(null);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'registered'>('created');
  const [slideStyle, setSlideStyle] = useState({ width: 0, transform: 'translateX(0)' });
  const createdRef = useRef<HTMLButtonElement>(null);
  const registeredRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/');
        return;
      }
      setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/');
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchMyEvents();
    }
  }, [user]);

  useEffect(() => {
    const updateSlidePosition = () => {
      if (activeTab === 'created' && createdRef.current) {
        setSlideStyle({
          width: createdRef.current.offsetWidth,
          transform: 'translateX(0)'
        });
      } else if (activeTab === 'registered' && registeredRef.current && createdRef.current) {
        setSlideStyle({
          width: registeredRef.current.offsetWidth,
          transform: `translateX(${createdRef.current.offsetWidth}px)`
        });
      }
    };

    updateSlidePosition();
    window.addEventListener('resize', updateSlidePosition);
    return () => window.removeEventListener('resize', updateSlidePosition);
  }, [activeTab, createdEvents.length, registeredEvents.length]);

  const fetchMyEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch created events
      const { data: created, error: createdError } = await supabase
        .from('events')
        .select('id, title, date, time, background_image_url')
        .eq('created_by', user.id)
        .order('target_date', { ascending: true });

      if (createdError) throw createdError;
      setCreatedEvents(created || []);

      // Fetch registered events
      const { data: registrations, error: regError } = await supabase
        .from('event_registrations')
        .select(`
          event_id,
          events (
            id,
            title,
            date,
            time,
            background_image_url
          )
        `)
        .eq('user_id', user.id);

      if (regError) throw regError;
      
      const registeredEventsData = registrations
        ?.map(r => r.events)
        .filter(Boolean) as Event[] || [];
      
      setRegisteredEvents(registeredEventsData);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast.success('Event deleted successfully');
      fetchMyEvents();
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const displayedEvents = activeTab === 'created' ? createdEvents : registeredEvents;

  return (
    <>
      <SEOHead 
        title="My Events"
        description="Manage your created events and view events you've registered for"
      />
      <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8">
              My Events
            </h1>

            {/* Tabs */}
            <div className="relative flex gap-0 mb-12">
              {/* Sliding background */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#ff6bff] border border-black transition-all duration-300 ease-out pointer-events-none"
                style={{
                  width: `${slideStyle.width}px`,
                  transform: slideStyle.transform
                }}
              />
              
              <button
                ref={createdRef}
                onClick={() => setActiveTab('created')}
                className="relative z-10 px-6 py-3 text-[11px] font-medium uppercase text-black border border-black transition-colors max-sm:flex-1 bg-transparent"
              >
                Created by me ({createdEvents.length})
              </button>
              <button
                ref={registeredRef}
                onClick={() => setActiveTab('registered')}
                className="relative z-10 px-6 py-3 text-[11px] font-medium uppercase text-black border border-l-0 border-black transition-colors max-sm:flex-1 bg-transparent"
              >
                Registered ({registeredEvents.length})
              </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-12">Loading events...</div>
              ) : displayedEvents.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  {activeTab === 'created' 
                    ? 'You haven\'t created any events yet' 
                    : 'You haven\'t registered for any events yet'}
                </div>
              ) : (
                displayedEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isCreated={activeTab === 'created'}
                    onDelete={activeTab === 'created' ? handleDeleteEvent : undefined}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;
