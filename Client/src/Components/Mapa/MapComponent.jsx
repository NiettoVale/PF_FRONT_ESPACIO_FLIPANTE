import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa la imagen del icono personalizado

const MapComponent = () => {
  useEffect(() => {
    // Crea el mapa y lo asigna al div con el id "map"
    const map = L.map("map").setView([-34.633769, -58.481154], 20);

    // Agrega una capa de mapa base de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define las coordenadas de la ubicación del marcador
    const markerLocation = [-34.633769, -58.481154];

    // Crea un icono personalizado
    const customIcon = L.icon({
      iconUrl:
        "https://firebasestorage.googleapis.com/v0/b/fir-autenticacion-95e3f.appspot.com/o/Imagenes%2FGeolocalizaci%C3%B3n%2Fmarcador-de-posicion_1.png?alt=media&token=aca78703-28df-4e2a-924c-459b44fbf3f5 ", // Ruta a tu icono personalizado
      iconSize: [32, 32], // Tamaño del icono en píxeles
      iconAnchor: [16, 32], // Punto de anclaje del icono
    });

    // Crea un marcador con el icono personalizado y agrégalo al mapa
    const marker = L.marker(markerLocation, { icon: customIcon }).addTo(map);

    // Agrega un evento de clic al marcador para abrir la URL de Google Maps
    marker.on("click", () => {
      const googleMapsUrl = "https://goo.gl/maps/Nnrax2XYBqcpJ1fG6";
      window.open(googleMapsUrl, "_blank");
    });

    return () => {
      // Este código se ejecutará cuando el componente se desmonte
      // Borra el mapa y libera los recursos asociados
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "280px",
        height: "250px",
        borderRadius: "15px",
        marginRight: "0",
      }}
    ></div>
  ); // Ajusta el tamaño del contenedor del mapa aquí
};

export default MapComponent;
