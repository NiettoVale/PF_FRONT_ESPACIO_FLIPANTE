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
  REMOVE_FROM_CART,
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
    case FAVORITES:
      return {
        ...state,
        myFavorites: action.payload,
      };
    case CART:
      return {
        ...state,
        myCart: action.payload,
      };
    case REMOVE_FROM_FAVORITES:
      const updatedFavorites = state.myFavorites.filter(
        (product) => parseInt(product.id) !== parseInt(action.payload)
      );

      return {
        ...state,
        myFavorites: updatedFavorites,
      };
    case REMOVE_FROM_CART:
      const updatedCart = state.myCart.filter(
        (product) => parseInt(product.id) !== parseInt(action.payload)
      );

      console.log(`Cart antiguo:`, state.myCart);
      console.log(`Cart:`, updatedCart);

      return {
        ...state,
        myCart: updatedCart,
      };
    default:
      return state;
  }
};

export default rootReducer;
