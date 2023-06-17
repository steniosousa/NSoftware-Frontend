import { useEffect, useRef, useState } from 'react';

type CoordsStore = {
  lat: number;
  lng: number;
};

type MapProps = {
  cordsSore: CoordsStore;
  coordsOrders: CoordsStore[];
};

const Map = ({ cordsSore, coordsOrders }: MapProps) => {
  const [coordsMotoboy, setCoordsMotoboy] = useState<CoordsStore>({ lat: 0, lng: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const getPositionMotoboy = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordsMotoboy({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    } else {
      console.log('Geolocalização não suportada pelo navegador');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPositionMotoboy();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

        const start = coordsMotoboy;
        const end = cordsSore;
        const waypoints = coordsOrders;

        const request = {
          origin: start,
          destination: end,
          waypoints: waypoints,
          travelMode: 'DRIVING',
        };

        directionsService.route(request, (response, status) => {
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
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDqdW6bK270KIlO7mBee544JijS5CUXWg8&sensor=true&libraries=places';
      script.onload = loadMap;
      document.body.appendChild(script);
    }
  }, [coordsMotoboy, cordsSore, coordsOrders]);

  return (
    <div style={{ height: '100vh', width: '100%', background: 'white', position: 'fixed', top: 0, left: 0, overflow: '' }}>
      <div ref={mapRef} style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, overflow: '' }}></div>
    </div>
  );
};

export default Map;
