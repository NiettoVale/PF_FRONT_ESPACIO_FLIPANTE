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
} from "./actionTypes";

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
        console.log(data.message);
      } else {
        const data = await response.json(); // Espera la respuesta antes de procesarla
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
      const response = await fetch(`${back}profile/${name}`);

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      }

      dispatch({ type: GET_USER_NAME, payload: data });
    } catch (error) {
      console.log("Algo salió mal con getUserByName!");
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

      console.log("Este es el response: ", response);

      const data = await response.json();

      console.log("Este es el response: ", data);

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

export const addproductCart = (userId, productId) => {
  return async () => {
    try {
      await fetch(`${back}users/${userId}/products/${productId}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert("Algo salió mal con addproductCart!");
      console.log(error);
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

export const removeproductCart = (userId, productId) => {
  return async () => {
    try {
      const response = await fetch(`${back}cart/${userId}/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Algo salió mal con removeproductCart!");
      console.log(error);
    }
  };
};

export const setOrderByName = (order) => {
  return { type: ORDER, payload: order };
};

// export const setOrderByPrice = (order) => {
//   return { type: PRICE_ORDER, payload: order };
// };
