import React, { useState, useEffect } from "react";
import axios from "axios";

function VisitsCounter() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Realiza una solicitud POST al backend para incrementar el contador
    axios
      .post("https://backend-espacio-flipante.onrender.com/visit")
      .then((response) => {
        setVisits(response.data.count); // Actualiza el contador en la interfaz
      })
      .catch((error) => {
        console.error("Error al incrementar el contador de visitas", error);
      });
  }, []);

  return (
    <div>
      <p>Visitas: {visits}</p>
    </div>
  );
}

export default VisitsCounter;
