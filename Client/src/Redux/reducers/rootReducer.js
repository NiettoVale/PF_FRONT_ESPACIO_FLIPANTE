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
    case REMOVE_FROM_FAVORITES:
      const updatedFavorites = state.myFavorites.filter(
        (product) => parseInt(product.id) !== parseInt(action.payload)
      );

      console.log(`favas antiguos:`, state.myFavorites);
      console.log(`favs:`, updatedFavorites);

      return {
        ...state,
        myFavorites: updatedFavorites,
      };
    default:
      return state;
  }
};

export default rootReducer;
