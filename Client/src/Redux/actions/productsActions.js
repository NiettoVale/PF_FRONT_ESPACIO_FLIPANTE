// import axios from "axios";
// import {
//   GET_PRODUCTS,
//   POST_PRODUCT,
//   GET_SIZES,
//   FILTER,
//   GET_CATEGORY,
//   GET_GENDER,
//   ORDER,
//   // PRICE_ORDER,
//   // GET_PRICES,
//   GET_USER_NAME,
//   FAVORITES,
//   CART,
//   PRICE_CART,
//   GET_USER_MAIL,
//   ORDER_INFO,
// } from "./actionTypes";
// import Swal from "sweetalert2";

// const back = process.env.REACT_APP_BACK;

// export const getProducts = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${back}products`);
//       const products = response.data;

//       dispatch({ type: GET_PRODUCTS, payload: products });

//       return products;
//     } catch (error) {
//       console.log("Algo salió mal con getProducts!");
//       console.error("Error fetching products:", error);
//     }
//   };
// };

// export const postProduct = (productData) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${back}products`, productData);
//       const createdProduct = response.data;

//       dispatch({ type: POST_PRODUCT, payload: createdProduct });

//       return createdProduct;
//     } catch (error) {
//       console.log("Algo salió mal con postProduct!");
//       console.error("Error creating product:", error);
//     }
//   };
// };

// export const getSizes = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${back}sizes`);

//       dispatch({ type: GET_SIZES, payload: data });
//     } catch (error) {
//       console.log("Algo salió mal con getSizes!");
//       console.error(error);
//     }
//   };
// };

// export const getGenders = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${back}gender`);

//       dispatch({ type: GET_GENDER, payload: data });
//     } catch (error) {
//       console.log("Algo salió mal con getGenders!");
//       console.error(error);
//     }
//   };
// };

// export const getCategory = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${back}category`);

//       dispatch({ type: GET_CATEGORY, payload: data });
//     } catch (error) {
//       console.log("Algo salió mal con getCategory!");
//       console.error(error);
//     }
//   };
// };

// export const getFilters = (dataFilter) => {
//   return async (dispatch) => {
//     try {
//       const isDataFilterEmpty = Object.values(dataFilter).every(
//         (value) => value === ""
//       );

//       if (isDataFilterEmpty) {
//         dispatch({ type: FILTER, payload: [] });
//         return;
//       }

//       const response = await fetch(`${back}filter`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataFilter),
//       });

//       if (response.status === 404) {
//         const data = await response.json(); // Espera la respuesta antes de procesarla
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.message,
//         });
//       } else {
//         const data = await response.json(); // Espera la respuesta antes de procesarla
//         dispatch({ type: FILTER, payload: data });
//       }
//     } catch (error) {
//       console.log("Algo salió mal con getFilters!");
//       console.log(error);
//     }
//   };
// };

// export const getUserByName = (name) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${back}profile/${name}`);
//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       }
//       if (response.status === 200) {
//         dispatch({ type: GET_USER_NAME, payload: data });
//       }
//     } catch (error) {
//       console.log("Algo salió mal con getUserByName!");
//       console.log(error);
//     }
//   };
// };

// export const getUserByMail = (mail) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${back}user/${mail}`);

//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       }

//       dispatch({ type: GET_USER_MAIL, payload: data });
//     } catch (error) {
//       console.log("Algo salió mal con getUserByName!");
//       console.log(error);
//     }
//   };
// };

// export const addFavorite = (userId, productId) => {
//   return async () => {
//     try {
//       await fetch(`${back}users/${userId}/products/${productId}/favorite`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.log("Algo salió mal con addFavorite!");
//       console.log(error);
//     }
//   };
// };

// export const removeFromFavorites = (userId, productId) => {
//   return async () => {
//     try {
//       const response = await fetch(`${back}/favorites/${userId}/${productId}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         console.log(data.message);
//       }

//       if (response.status === 200) {
//         window.location.href = "/userProfile";
//       }
//     } catch (error) {
//       console.log("Algo salió mal con removeFromFavorites!");
//       console.log(error);
//     }
//   };
// };

// export const getFavorites = (userId) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${back}favorites/${userId}`);

//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       }

//       dispatch({ type: FAVORITES, payload: data });
//     } catch (error) {
//       console.log("Algo salió mal con getFavorites!");
//       console.log(error);
//     }
//   };
// };

// export const addproductCart = (userId, productId, sizeId, stockMax) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(`${back}${userId}/${productId}/${sizeId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         const { myCart } = getState();

//         // Encuentra el índice del producto en el carrito
//         const productIndex = myCart.findIndex(
//           (product) =>
//             product.productId === productId && product.sizeId === sizeId
//         );

//         if (productIndex !== -1) {
//           // Si el producto está en el carrito
//           const updatedCart = [...myCart];
//           const currentQuantity = updatedCart[productIndex].cantidad;

//           if (currentQuantity < stockMax) {
//             // Aumenta la cantidad solo si es menor que el stock máximo
//             updatedCart[productIndex].cantidad += 1;

//             // Actualiza el estado global del carrito con el carrito modificado
//             dispatch({
//               type: CART,
//               payload: updatedCart,
//             });
//           } else {
//             alert(
//               "Has alcanzado la cantidad máxima de este producto en el carrito."
//             );
//           }
//         }
//       } else {
//         alert("El producto no se encuentra en el carrito.");
//       }
//     } catch (error) {
//       alert("Algo salió mal con addQuantityToProduct!");
//       console.log(error);
//     }
//   };
// };

// export const getproductCart = (userId) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${back}cart/${userId}`);

//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       }

//       dispatch({ type: CART, payload: data });
//     } catch (error) {
//       alert("Algo salió mal con getProductCart!");
//       console.log(error);
//     }
//   };
// };

// export const removeproductCart = (userId, productId, sizeId) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(`${back}${userId}/${productId}/${sizeId}`, {
//         method: "DELETE",
//       });

//       if (response.status === 404) {
//       } else {
//         const { myCart } = getState();
//         // Encuentra el índice del producto en el carrito
//         const productIndex = myCart.findIndex(
//           (product) =>
//             product.productId === productId && product.sizeId === sizeId
//         );

//         if (productIndex !== -1) {
//           // Si el producto está en el carrito
//           const updatedCart = [...myCart];

//           // Verifica si la cantidad es mayor que 1, en ese caso, disminuye la cantidad en 1

//           if (updatedCart[productIndex].cantidad > 1) {
//             updatedCart[productIndex].cantidad -= 1;
//           } else {
//             // Si la cantidad es 1, elimina el producto del carrito
//             updatedCart.splice(productIndex, 1);
//           }

//           // Actualiza el estado global del carrito con el carrito modificado
//           dispatch({
//             type: CART,
//             payload: updatedCart,
//           });
//         }
//       }
//     } catch (error) {
//       console.log("Algo salió mal con removeproductCart!");
//       console.log(error);
//     }
//   };
// };

// export const updateTotalPrice = (newTotalPrice) => {
//   return {
//     type: PRICE_CART,
//     payload: newTotalPrice,
//   };
// };

// export const removeCart = (userId) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`${back}cart/${userId}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       } else {
//         // Despacha la acción para limpiar el carrito en el estado global
//         dispatch(resetCart());
//       }
//     } catch (error) {
//       console.log("Algo salió mal con removeCart!");
//       console.log(error);
//     }
//   };
// };

// export const removeallproductCart = (userId, productId, sizeId) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(
//         `${back}all/${userId}/${productId}/${sizeId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (response.status === 404) {
//         console.log(data.message);
//       } else {
//         // Después de eliminar el producto del servidor, actualiza el estado global
//         // Elimina el producto del carrito en el estado global
//         const { myCart } = getState();
//         const updatedCart = myCart.filter(
//           (product) =>
//             product.productId !== productId || product.sizeId !== sizeId
//         );

//         dispatch({
//           type: CART,
//           payload: updatedCart,
//         });
//       }
//     } catch (error) {
//       console.log("Algo salió mal con removeallproductCart!");
//       console.log(error);
//     }
//   };
// };

// export const addOrder = (userId, productId, sizeId, quantity, totalPrice) => {
//   return async (dispatch, getState) => {
//     try {
//       // Obtén la lista actual de pedidos del Local Storage
//       const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

//       // Verifica si el producto ya existe en la lista
//       const existingOrder = existingOrders.find((order) => {
//         return (
//           order.userId === userId &&
//           order.productId === productId &&
//           order.sizeId === sizeId
//         );
//       });

//       if (!existingOrder) {
//         // Si el producto no existe en la lista, entonces agrégalo
//         const newOrder = {
//           userId,
//           productId,
//           sizeId,
//           quantity,
//           totalPrice,
//         };

//         existingOrders.push(newOrder);

//         // Actualiza el contenido del Local Storage
//         localStorage.setItem("orders", JSON.stringify(existingOrders));

//         // Envía la solicitud al servidor solo si el producto no existe en la lista
//         const requestOptions = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newOrder),
//         };

//         // Realiza la solicitud HTTP al servidor para agregar la orden
//         const response = await fetch(`${back}order`, requestOptions);

//         // Verifica si la solicitud fue exitosa (código de respuesta 201)

//         if (response.status === 201) {
//           // Muestra un mensaje en la consola para confirmar que la orden se ha agregado correctamente
//           console.log(
//             "La orden se ha agregado correctamente al servidor y al Local Storage."
//           );
//         }
//       } else {
//         // El producto ya existe en la lista, puedes mostrar un mensaje de error o manejarlo de acuerdo a tus necesidades
//         console.log("El producto ya existe en la lista.");
//       }
//     } catch (error) {
//       // Maneja los errores de la solicitud HTTP o cualquier otro error que pueda ocurrir
//       alert("Algo salió mal con addOrder!");
//       console.error(error);
//     }
//   };
// };

// export const paymentOrder = (
//   userId,
//   productId,
//   sizeId,
//   quantity,
//   totalPrice
// ) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.put(`${back}payment`, {
//         userId,
//         productId,
//         sizeId,
//         quantity,
//         totalPrice,
//       });
//       if (response.status === 200) {
//         console.log(
//           "todo bien amigo sos un capo total ya confirmaste la compra como un master y te va a llegar tu ropita FLipante"
//         );
//         console.log(localStorage.order);
//         localStorage.removeItem("orders");
//         console.log(localStorage.order);
//       }
//     } catch (error) {
//       localStorage.removeItem("orders");
//       alert("Algo salió mal con addOrder!");
//       console.log(error);
//     }
//   };
// };

// export const setOrder = (order) => {
//   return { type: ORDER, payload: order };
// };

// export const resetCart = () => {
//   return {
//     type: CART,
//     payload: [],
//   };
// };

import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCT,
  GET_SIZES,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  ORDER,
  // PRICE_ORDER,
  // GET_PRICES,
  GET_USER_NAME,
  FAVORITES,
  CART,
  PRICE_CART,
  GET_USER_MAIL,
  ORDER_INFO,
} from "./actionTypes";
import Swal from "sweetalert2";

const back = process.env.REACT_APP_BACK;

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${back}products`);
      const products = response.data;

      dispatch({ type: GET_PRODUCTS, payload: products });

      return products;
    } catch (error) {
      console.log("Algo salió mal con getProducts!");
      console.error("Error fetching products:", error);
    }
  };
};

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${back}products`, productData);
      const createdProduct = response.data;

      dispatch({ type: POST_PRODUCT, payload: createdProduct });

      return createdProduct;
    } catch (error) {
      console.log("Algo salió mal con postProduct!");
      console.error("Error creating product:", error);
    }
  };
};

export const getSizes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${back}sizes`);

      dispatch({ type: GET_SIZES, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getSizes!");
      console.error(error);
    }
  };
};

export const getGenders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${back}gender`);

      dispatch({ type: GET_GENDER, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getGenders!");
      console.error(error);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${back}category`);

      dispatch({ type: GET_CATEGORY, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getCategory!");
      console.error(error);
    }
  };
};

export const getFilters = (dataFilter) => {
  return async (dispatch) => {
    try {
      const isDataFilterEmpty = Object.values(dataFilter).every(
        (value) => value === ""
      );

      if (isDataFilterEmpty) {
        dispatch({ type: FILTER, payload: [] });
        return;
      }

      const response = await fetch(`${back}filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFilter),
      });

      if (response.status === 404) {
        const data = await response.json(); // Espera la respuesta antes de procesarla
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      } else {
        const data = await response.json(); // Espera la respuesta antes de procesarla
        console.log(data);
        dispatch({ type: FILTER, payload: data });
      }
    } catch (error) {
      console.log("Algo salió mal con getFilters!");
      console.log(error);
    }
  };
};

export const getUserByName = (name) => {
  return async (dispatch) => {
    try {
      if (name === null || name === undefined || name === "") {
        return;
      } else {
        const response = await fetch(`${back}profile/${name}`);
        const data = await response.json();
        if (response.status === 404) {
          alert(data.message);
        }
        if (response.status === 200) {
          dispatch({ type: GET_USER_NAME, payload: data });
        }
      }
    } catch (error) {
      console.log("Algo salió mal con getUserByName!");
      console.log(error);
    }
  };
};

export const getUserByMail = (mail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${back}user/${mail}`);

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      }

      dispatch({ type: GET_USER_MAIL, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getUserByMail!");
      console.log(error);
    }
  };
};

export const addFavorite = (userId, productId) => {
  return async () => {
    try {
      await fetch(`${back}users/${userId}/products/${productId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Algo salió mal con addFavorite!");
      console.log(error);
    }
  };
};

export const removeFromFavorites = (userId, productId) => {
  return async () => {
    try {
      console.log("UserID: ", userId);
      console.log("ProductId: ", productId);
      const response = await fetch(`${back}favorites/${userId}/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
      }

      if (response.status === 200) {
        window.location.href = "/userProfile";
      }
    } catch (error) {
      console.log("Algo salió mal con removeFromFavorites!");
      console.log(error);
    }
  };
};

export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${back}favorites/${userId}`);

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      }

      dispatch({ type: FAVORITES, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getFavorites!");
      console.log(error);
    }
  };
};

// export const addproductCart = (userId, productId, sizeId, stockMax) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(`${back}${userId}/${productId}/${sizeId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         const { myCart } = getState();

//         // Encuentra el índice del producto en el carrito
//         const productIndex = myCart.findIndex(
//           (product) =>
//             product.productId === productId && product.sizeId === sizeId
//         );

//         if (productIndex !== -1) {
//           // Si el producto está en el carrito
//           const updatedCart = [...myCart];
//           const currentQuantity = updatedCart[productIndex].cantidad;

//           console.log("CANTIDAD ACTUAL: ", currentQuantity);
//           console.log("CANTIDAD MAXIMA: ", stockMax);
//           if (parseInt(currentQuantity, 10) < parseInt(stockMax, 10)) {
//             // Aumenta la cantidad solo si es menor que el stock máximo
//             updatedCart[productIndex].cantidad += 1;

//             // Actualiza el estado global del carrito con el carrito modificado
//             dispatch({
//               type: CART,
//               payload: updatedCart,
//             });
//           } else {
//             Swal.fire({
//               title: "Alerta",
//               text: "Has alcanzado la cantidad máxima de este producto en el carrito.",
//               icon: "warning",
//             });
//           }
//         }
//       } else {
//         alert("El producto no se encuentra en el carrito.");
//       }
//     } catch (error) {
//       alert("Algo salió mal con addQuantityToProduct!");
//       console.log(error);
//     }
//   };
// };

export const addproductCart = (userId, productId, sizeId, stockMax) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${back}${userId}/${productId}/${sizeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { myCart } = getState();

        // Encuentra el índice del producto en el carrito
        const productIndex = myCart.findIndex(
          (product) =>
            product.productId === productId && product.sizeId === sizeId
        );

        if (productIndex !== -1) {
          // Si el producto está en el carrito
          const updatedCart = [...myCart];
          const currentQuantity = updatedCart[productIndex].cantidad;

          if (parseInt(currentQuantity, 10) < parseInt(stockMax, 10)) {
            // Aumenta la cantidad solo si es menor que el stock máximo
            updatedCart[productIndex].cantidad += 1;

            // Actualiza el estado global del carrito con el carrito modificado
            dispatch({
              type: CART,
              payload: updatedCart,
            });

            // Indica que el producto se agregó al carrito con éxito
            return true;
          } else {
            Swal.fire({
              title: "Alerta",
              text: "Has alcanzado la cantidad máxima de este producto en el carrito.",
              icon: "warning",
            });

            // Indica que no se pudo agregar el producto debido al stock máximo alcanzado
            return false;
          }
        }
      } else {
        // Indica que no se pudo agregar el producto al carrito
        return false;
      }
    } catch (error) {
      // Indica que ocurrió un error al agregar el producto
      console.log(error);
      return false;
    }
  };
};

export const getproductCart = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${back}cart/${userId}`);

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      }

      dispatch({ type: CART, payload: data });
    } catch (error) {
      alert("Algo salió mal con getProductCart!");
      console.log(error);
    }
  };
};

export const removeproductCart = (userId, productId, sizeId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${back}${userId}/${productId}/${sizeId}`, {
        method: "DELETE",
      });

      if (response.status === 404) {
      } else {
        const { myCart } = getState();
        // Encuentra el índice del producto en el carrito
        const productIndex = myCart.findIndex(
          (product) =>
            product.productId === productId && product.sizeId === sizeId
        );

        if (productIndex !== -1) {
          // Si el producto está en el carrito
          const updatedCart = [...myCart];

          // Verifica si la cantidad es mayor que 1, en ese caso, disminuye la cantidad en 1

          if (updatedCart[productIndex].cantidad > 1) {
            updatedCart[productIndex].cantidad -= 1;
          } else {
            // Si la cantidad es 1, elimina el producto del carrito
            updatedCart.splice(productIndex, 1);
          }

          // Actualiza el estado global del carrito con el carrito modificado
          dispatch({
            type: CART,
            payload: updatedCart,
          });
        }
      }
    } catch (error) {
      console.log("Algo salió mal con removeproductCart!");
      console.log(error);
    }
  };
};

export const updateTotalPrice = (newTotalPrice) => {
  return {
    type: PRICE_CART,
    payload: newTotalPrice,
  };
};

export const removeCart = (userId) => {
  return async () => {
    try {
      const response = await fetch(`${back}cart/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          title: "Carrito Eliminado",
          text: data.message,
          icon: "success",
        }).then(() => {
          window.location.reload(); // Forzar la recarga de la página
        });
      }

      if (response.status === 404) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          allowOutsideClick: true, // Permite hacer clic fuera de la alerta
        });
        console.log(data.message);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Algo salió mal con removeproductCart!",
        icon: "error",
        allowOutsideClick: true, // Permite hacer clic fuera de la alerta
      });
      console.log("Algo salió mal con removeproductCart!");
      console.log(error);
    }
  };
};

export const removeallproductCart = (userId, productId, sizeId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${back}all/${userId}/${productId}/${sizeId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      } else {
        // Después de eliminar el producto del servidor, actualiza el estado global
        // Elimina el producto del carrito en el estado global
        const { myCart } = getState();
        const updatedCart = myCart.filter(
          (product) =>
            product.productId !== productId || product.sizeId !== sizeId
        );

        dispatch({
          type: CART,
          payload: updatedCart,
        });
      }
    } catch (error) {
      console.log("Algo salió mal con removeallproductCart!");
      console.log(error);
    }
  };
};

export const addOrder = (userId, productId, sizeId, quantity, totalPrice) => {
  return async (dispatch, getState) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          sizeId,
          quantity,
          totalPrice,
        }),
      };

      const response = await fetch(`${back}order`, requestOptions);

      // Verifica si la solicitud fue exitosa (código de respuesta 201)
      if (response.status === 201) {
        // Obtiene el contenido actual del Local Storage bajo la clave "orders" o crea una matriz vacía si no hay nada almacenado allí
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // Crea un objeto que representa la nueva orden con los datos proporcionados
        const newOrder = {
          userId,
          productId,
          sizeId,
          quantity,
          totalPrice,
        };

        // Agrega la nueva orden al final de la matriz de órdenes existente
        existingOrders.push(newOrder);

        // Actualiza el contenido del Local Storage con la matriz actualizada que contiene la nueva orden
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        // Muestra un mensaje en la consola para confirmar que la orden se ha agregado correctamente
        console.log(
          "La orden se ha agregado correctamente al servidor y al Local Storage."
        );
      }
    } catch (error) {
      // Maneja los errores de la solicitud HTTP o cualquier otro error que pueda ocurrir
      alert("Algo salió mal con addOrder!");
      console.error(error);
    }
  };
};
export const paymentOrder = (
  userId,
  productId,
  sizeId,
  quantity,
  totalPrice
) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`${back}payment`, {
        userId,
        productId,
        sizeId,
        quantity,
        totalPrice,
      });
      if (response.status === 200) {
        console.log(
          "todo bien amigo sos un capo total ya confirmaste la compra como un master y te va a llegar tu ropita FLipante"
        );
        console.log(localStorage.order);
        localStorage.removeItem("orders");
        console.log(localStorage.order);
      }
    } catch (error) {
      localStorage.removeItem("orders");
      alert("Algo salió mal con addOrder!");
      console.log(error);
    }
  };
};

export const setOrder = (order) => {
  return { type: ORDER, payload: order };
};
