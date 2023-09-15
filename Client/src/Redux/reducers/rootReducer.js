import {
  GET_PRODUCTS,
  GET_SIZES,
  POST_PRODUCT,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  // GET_PRICES,
  ORDER,
  GET_USER_NAME,
  FAVORITES,
  REMOVE_FROM_FAVORITES,
  CART,
  PRICE_CART,
  GET_USER_MAIL,
  ORDER_INFO,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsFiltered: [],
  sizes: [],
  genders: [],
  category: [],
  infoUser: [],
  order: "asc",
  myFavorites: [],
  myCart: [],
  totalPrice: 0,
  orderInfo: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case GET_GENDER:
      return {
        ...state,
        genders: action.payload,
      };

    case FILTER:
      return {
        ...state,
        productsFiltered: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload,
      };
    // case GET_PRICES:
    //   return {
    //     ...state,
    //     prices: action.payload,
    //   };

    case ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case GET_USER_NAME:
      return {
        ...state,
        infoUser: [action.payload],
      };

    case GET_USER_MAIL:
      return {
        ...state,
        infoUser: [action.payload],
      };

    case FAVORITES:
      return {
        ...state,
        myFavorites: action.payload,
      };
    case CART:
      return {
        ...state,
        myCart: action.payload, // Actualiza el estado del carrito con el nuevo array
      };
    case REMOVE_FROM_FAVORITES:
      const updatedFavorites = state.myFavorites.filter(
        (product) => parseInt(product.id) !== parseInt(action.payload)
      );

      return {
        ...state,
        myFavorites: updatedFavorites,
      };
    case PRICE_CART:
      return {
        ...state,
        totalPrice: action.payload, // Actualiza el precio total con el nuevo valor
      };
    case ORDER_INFO:
      return {
        ...state,
        orderInfo: action.payload, // Actualiza el precio total con el nuevo valor
      };
    default:
      return state;
  }
};

export default rootReducer;
