import styles from "./Checkout.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";
import axios from "axios";
import NavBar from "../../Components/NavBar/navBar";
//import CountrySelect from "./CountrySelect";
import BuyButton from "../../Components/BuyButton/BuyButton";
import { validate } from "./validation";
import {
  getproductCart,
  getUserByName,
  addOrder,
  removeCart,
} from "../../Redux/actions/productsActions";

const Checkout = () => {
  //Info Extra
  const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY;
  const back = process.env.REACT_APP_BACK;
  const dispatch = useDispatch();
  //Estados Globales
  const user = useSelector((state) => state.infoUser);
  const cart = useSelector((state) => state.myCart);
  //Estados Locales
  const [hasPurchased, setHasPurchased] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dniCuitCuil: "",
    direccion: "",
    apartamento: "",
    cp: "",
    ciudad: "",
    provincia: "",
    telefono: "",
  });
  //LocalStorage
  const name = localStorage.getItem("username");
  const googleEmail = localStorage.getItem("googleName");
  const googleName = localStorage.getItem("googleName");
  //Funciones
  let userId = 0;
  let userEmail = null;
  if (user.length > 0) {
    userId = user[0].id;
    userEmail = user[0].email;
  } else {
    userEmail = googleEmail;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validate({ ...formData, [name]: value })[name],
    });
    const isAllCompleted = Object.values(formData).every((field) => !!field);
    setAllFieldsCompleted(isAllCompleted);
  };

  const createPreference = async (totalPrice) => {
    try {
      const response = await axios.post(`${back}create_preference`, {
        description: "Indumentaria",
        price: totalPrice,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error al crear preferencia:", error);
    }
  };

  const handleBuy = async (event) => {
    event.preventDefault();
    const formValidationErrors = validate(formData);

    if (Object.values(formValidationErrors).some((error) => error)) {
      // Mostrar un mensaje de error general o manejar los errores como desees
      console.error("Hay errores en el formulario:", formValidationErrors);
      return;
    }
    Swal.fire({
      title: "¿Estás seguro de realizar la compra?",
      text: "Una vez realizada la compra, no podrás deshacerla.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = await createPreference(totalPrice);
          if (id) {
            setPreferenceId(id);
            setShowBuyButton(true);
            setHasPurchased(true);
            // Guardar los datos del formulario en el Local Storage
            const checkoutData = {
              telefono: formData.telefono,
              provincia: formData.provincia,
              ciudad: formData.ciudad,
              cp: formData.cp,
              apartamento: formData.apartamento,
              direccion: formData.direccion,
              dniCuitCuil: formData.dniCuitCuil,
              nombre: formData.nombre,
              apellido: formData.apellido,
            };
            localStorage.setItem("checkout", JSON.stringify(checkoutData));
            // Procesa las órdenes primero

            console.log(cart[0].category);
            for (const product of cart) {
              const {
                productId,
                cantidad: quantity,
                price,
                sizeId,
                category,
              } = product;
              const totalPrice = quantity * price;
              dispatch(
                addOrder(
                  userId,
                  productId,
                  sizeId,
                  category,
                  quantity,
                  totalPrice,
                  userEmail
                )
              );
            }
          }
        } catch (error) {
          console.error("Error al procesar la compra:", error);
        }
      }
    });
  };

  //UseEffects
  useEffect(() => {
    const isAllCompleted = Object.values(formData).every((field) => !!field);
    setAllFieldsCompleted(isAllCompleted);
  }, [formData]);

  useEffect(() => {
    const isAllErrorsEmpty = Object.values(errors).every((error) => !error);
    if (!isAllErrorsEmpty) {
      setAllFieldsCompleted(false);
    }
  }, [errors]);

  useEffect(() => {
    if (!googleName) {
      dispatch(getUserByName(name));
    } else {
      dispatch(getUserByName(googleName));
    }

    if (userId) {
      dispatch(getproductCart(userId));
    }
  }, [dispatch, name, userId, googleName]);

  useEffect(() => {
    initMercadoPago(mercadoPagoKey);
  }, [mercadoPagoKey]);

  useEffect(() => {
    const calculatePrice = cart.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
    setTotalPrice(calculatePrice);
  }, [cart]);

  useEffect(() => {
    if (hasPurchased && showBuyButton) {
      dispatch(removeCart(userId));
    }
  }, [hasPurchased, showBuyButton, dispatch, userId]);

  return (
    <div>
      <div className={styles.checkNav}>
        <NavBar />
      </div>
      <h2 className={styles.checkTitle}>DATOS DE ENVIO</h2>

      <div className={styles.checkContainer}>
        <div className={styles.checkImage}></div>
        <div className={styles.checkForm}>
          <form>
            <div>
              <div className={styles.horizontal}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={handleInputChange}
                />
                {errors.nombre && (
                  <span className={styles.error}>{errors.nombre}</span>
                )}
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  onChange={handleInputChange}
                />
                {errors.apellido && (
                  <span className={styles.error}>{errors.apellido}</span>
                )}
              </div>

              <div className={styles.vertical}>
                <input
                  type="number"
                  name="dniCuitCuil"
                  placeholder="  DNI / CUIT / CUIL"
                  onChange={handleInputChange}
                />
                {errors.dniCuitCuil && (
                  <span className={styles.error}>{errors.dniCuitCuil}</span>
                )}
                <input
                  type="text"
                  name="direccion"
                  placeholder="  Dirección"
                  onChange={handleInputChange}
                />
                {errors.direccion && (
                  <span className={styles.error}>{errors.direccion}</span>
                )}
                <input
                  type="text"
                  name="apartamento"
                  placeholder="  Apartamento, local, piso"
                  onChange={handleInputChange}
                />
                {errors.apartamento && (
                  <span className={styles.error}>{errors.apartamento}</span>
                )}
              </div>

              <div className={styles.horizontal}>
                <input
                  type="text"
                  name="cp"
                  placeholder="Código Postal"
                  onChange={handleInputChange}
                />
                {errors.cp && <span className={styles.error}>{errors.cp}</span>}
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  onChange={handleInputChange}
                />
                {errors.ciudad && (
                  <span className={styles.error}>{errors.ciudad}</span>
                )}
                <input
                  type="text"
                  name="provincia"
                  placeholder="Provincia"
                  onChange={handleInputChange}
                />
                {errors.provincia && (
                  <span className={styles.error}>{errors.provincia}</span>
                )}
              </div>

              <div className={styles.vertical}>
                <input
                  type="number"
                  name="telefono"
                  placeholder="  Teléfono"
                  onChange={handleInputChange}
                />
                {errors.telefono && (
                  <span className={styles.error}>{errors.telefono}</span>
                )}
              </div>
            </div>
          </form>
          <div className={styles.checkButtons}>
            <div className={styles.checkBottom}>
              <a href="/cart">◀ Volver al carrito</a>
              <div className={styles.total}>
                <p>Total a pagar: </p>
                <h3>{totalPrice}</h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBuy}
              disabled={hasPurchased || !allFieldsCompleted}
            >
              CONFIRMAR COMPRA
            </button>
            {!allFieldsCompleted && (
              <span className={styles.error}>
                Completa todos los campos antes de comprar.
              </span>
            )}
          </div>
          {showBuyButton && (
            <div className={styles.overlay}>
              <BuyButton
                preferenceId={preferenceId}
                className={styles.BuyButton}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
