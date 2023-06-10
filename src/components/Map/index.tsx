import { useEffect, useRef } from 'react';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -3.7319, lng: -38.5267 },
          zoom: 10,
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: map,
        });

        const start = { lat: -23.5505, lng: -46.6333 };
        const end = { lat: -27.2423, lng: -50.2189 };
        const waypoints = [
          { location: { lat: -22.9068, lng: -43.1729 } },
        ];

        const request = {
          origin: start,
          destination: end,
          waypoints: waypoints,
          travelMode: 'DRIVING'
        };

        directionsService.route(request as any, (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.error('Erro ao traçar a rota:', status);
          }
        });
      }
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOiwdX3bp-LcRn7vexF2nr4erxFG7WYTM"
      // script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDqdW6bK270KIlO7mBee544JijS5CUXWg8&sensor=true&libraries=places';
      script.onload = loadMap;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', background: 'white', position: 'fixed', top: 0, left: 0, overflow: '' }}>
      <div ref={mapRef} style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, overflow: '' }}></div>
    </div>
  );
}
