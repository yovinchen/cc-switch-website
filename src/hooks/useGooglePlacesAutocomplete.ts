import { useEffect, useRef, useState } from 'react';

// Type definitions for Google Maps Places API
type PlaceResult = {
  formatted_address?: string;
  name?: string;
  geometry?: unknown;
};

type AutocompleteInstance = {
  addListener: (event: string, handler: () => void) => void;
  getPlace: () => PlaceResult;
};

export const useGooglePlacesAutocomplete = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const autocompleteRef = useRef<AutocompleteInstance | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.warn('Google Maps API key not configured. Place autocomplete will not work.');
      return;
    }

    // Check if Google Maps script is already loaded
    if ((window as any).google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => { if (import.meta.env.DEV) console.error('Failed to load Google Maps script'); };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts before loading
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || !(window as any).google) return;

    // Initialize autocomplete
    const google = (window as any).google;
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment', 'geocode'],
      fields: ['formatted_address', 'name', 'geometry'],
    });

    // Cleanup
    return () => {
      if (autocompleteRef.current && (window as any).google) {
        const google = (window as any).google;
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, inputRef]);

  const onPlaceSelected = (callback: (place: PlaceResult) => void) => {
    if (!autocompleteRef.current) return;

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place) {
        callback(place);
      }
    });
  };

  return { isLoaded, onPlaceSelected };
};
