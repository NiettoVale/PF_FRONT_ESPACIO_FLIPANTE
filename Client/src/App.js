import React from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import Home from "./views/home/home.component";
import CartView from "./views/cart/cartView";
import CreateProduct from "./views/create/create.view";
import Checkout from "./views/Checkout/Checkout";

import Registro from "./Components/RegisterUser/registerUser.component";
import LoginForm from "./Components/Login/LoginForm.component";
import "./App.css";
import UserProfile from "./Components/userProfile/userProfile";
import Orders from "./Components/Orders/Orders";
import Favorites from "./Components/Favorites/Favorites";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Vista from "./Components/firebase/Autentication";
import Review from "./views/Review/Review";
import Reviews from "./Components/Reviews/Reviews";
import About from "./Components/About/About";
import DetailOrder from "./views/DetailOrder/DetailOrder";
import UserReviews from "./Components/Reviews/UserReviews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/view" element={<Vista />} />
      <Route path="/review/:userId/:productId" element={<Review />} />
      <Route path="/allReviews" element={<Reviews />} />
      <Route path="/about" element={<About />} />
      <Route path="/detail-order/:id" element={<DetailOrder />} />
      <Route path="/user-reviews/:userId" element={<UserReviews />} />
    </Routes>
  );
}

export default App;
