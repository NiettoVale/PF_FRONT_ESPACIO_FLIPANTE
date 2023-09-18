import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      const { data } = await axios(
        "https://backend-espacio-flipante.onrender.com/offer"
      );
      setOffers(data);
    };
    getOffers();
  });
  return (
    <div>
      {offers.map((offer) => (
        <div key={offer.id}>
          {" "}
          {/* Agrega una clave única para cada elemento */}
          <p>Nombre: {offer.name}</p>
          <p>Descripcion: {offer.descripcion}</p>
          <p>Codigo: {offer.code}</p>
          <p>Porcentaje: {offer.percentage}</p>
          <p>Activo: {offer.actived ? "Activo" : "Inactivo"}</p>{" "}
          {/* Corrige "active" a "actived" */}
        </div>
      ))}
    </div>
  );
};
export default Offers;
