import React, { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  lang: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ lang }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import('leaflet');
      
      // Load CSS for Leaflet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      
      // Initialize map once Leaflet is loaded
      if (mapRef.current && !map) {
        // Default location (Nador, Morocco)
        const defaultLocation: [number, number] = [34.6819, -1.9116];
        
        // Create map instance
        const mapInstance = L.map(mapRef.current).setView(defaultLocation, 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        // Add marker for Easy-ride location
        const storeIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        L.marker(defaultLocation, { icon: storeIcon })
          .addTo(mapInstance)
          .bindPopup('T-glide Store').openPopup();
        
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userCoords: [number, number] = [
                position.coords.latitude,
                position.coords.longitude
              ];
              
              setUserLocation(userCoords);
              
              // Add marker for user's location
              const userIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });
              
              L.marker(userCoords, { icon: userIcon })
                .addTo(mapInstance)
                .bindPopup('Votre position');
              
              // Calculate distance
              const calculatedDistance = mapInstance.distance(userCoords, defaultLocation) / 1000;
              setDistance(Math.round(calculatedDistance * 10) / 10);
              
              // Draw line between user and store
              const polyline = L.polyline([userCoords, defaultLocation], { color: 'green', weight: 3 })
                .addTo(mapInstance);
              
              // Fit bounds to show both markers
              mapInstance.fitBounds(polyline.getBounds(), { padding: [50, 50] });
            },
            () => {
              // Error getting location, just use default view
              console.log('Impossible de récupérer votre position');
            }
          );
        }
        
        setMap(mapInstance);
        setIsLoading(false);
      }
    };
    
    loadLeaflet();
    
    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  return (
    <div className="w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden relative" dir="ltr">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <p className="mt-2 text-gray-700">
              Chargement de la carte...
            </p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full" />
      
      {userLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md max-w-sm" dir="ltr">
          <div className="flex items-center">
            <h3 className="font-semibold text-gray-900">
              Distance à Easy-ride
            </h3>
          </div>
          <p className="text-gray-700 mt-1">
            Vous êtes à environ {distance} km de notre magasin.
          </p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;