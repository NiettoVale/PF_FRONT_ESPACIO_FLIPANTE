import React from "react";
import Cards from "../../Components/cards/cards.component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import {
  addproductCart,
  getproductCart,
  getUserByName,
  removeproductCart,
} from "../../Redux/actions/productsActions";

const CartView = () => {
  const dispatch = useDispatch();
  //Informacion del Usuario
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);

  let userId = 0;
  if (user.length > 0) {
    userId = user[0].id;
  }

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId]);

  console.log(name);
  console.log(user);
  console.log(cart);

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
      <h2>Carrito de Compra</h2>
      <p> Este es el carrito</p>
      <Cards products={cart} />
      <button>Comprar</button>
    </div>
  );
};

export default CartView;
