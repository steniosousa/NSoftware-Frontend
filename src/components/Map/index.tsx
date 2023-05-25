import  { useEffect, useRef } from 'react';

export default function Map(){
  const mapRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    // Carrega o mapa após o componente ser montado
    const loadMap = () => {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: -23.5505, lng: -46.6333 },
          zoom: 10,
        });
      }
    };

    // Verifica se a API do Google Maps já está carregada
    if (window.google && window.google.maps) {
      loadMap();
    } else {
      // Carrega a API do Google Maps assincronamente
      const script = document.createElement('script');
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOiwdX3bp-LcRn7vexF2nr4erxFG7WYTM`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=chave`;
      script.onload = loadMap;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ height: '100vh',width:'100%',background:'white',position:'fixed',top:0,left:0,overflow: ''}}>
      <div ref={mapRef} style={{ height: '100vh',width:'100%',position:'absolute',top:0,left:0,overflow: ''}}></div>
    </div>
  )
}

