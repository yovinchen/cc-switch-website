/// <reference types="google.maps" />

declare global {
  interface Window {
    google: typeof google;
    googleMapsApiKey?: string;
  }
}

export {};
