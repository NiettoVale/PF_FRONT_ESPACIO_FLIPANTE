import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // para usar acciones asíncronas
import productsReducer from "../reducers/rootReducer";

const store = createStore(productsReducer, applyMiddleware(thunk));

export default store;
