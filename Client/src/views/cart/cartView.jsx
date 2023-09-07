import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const CartView = () => {
  initMercadoPago("TEST-094640c0-b9d9-4c28-89d9-1b7ac766e62c");

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          description: "Indumentaria",
          price: 1000,
          quantity: 1,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
  };

  return (
    <div className="create-product">
      <h2>Carrito</h2>
      <p> Este es e lcarrito</p>
    </div>
  );
};

export default CartView;
