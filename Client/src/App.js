import React from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import Home from "./views/home/home.component";
import CartView from "./views/cart/cartView";
import Registro from "./Components/RegisterUser/registerUser.component";
import LoginForm from "./Components/Login/LoginForm.component";
import UserProfile from "./Components/userProfile/userProfile";
import Orders from "./Components/Orders/Orders";
import Favorites from "./Components/Favorites/Favorites";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ProductList from "./Components/ProductList/ProductList.component";
import DashboardAdmin from "./views/dashboardAdmin/dashboardAdmin";
import CreateForm from "./Components/CreateForm/CreateForm";
import Banned from "./Components/BannedList/Banned";
import UserList from "./Components/UserList/UserList";
import DetailOrder from "./views/DetailOrder/DetailOrder";
import UserReviews from "./Components/Reviews/UserReviews";
import Review from "./views/Review/Review.jsx";
import About from "./Components/About/About";
import CreateProduct from "./views/create/create.view";
import Checkout from "./views/Checkout/Checkout";
import Vista from "./Components/firebase/Autentication";
import PasswordReset from "./Components/resetPAssword/ResetPAssword";
import ModifyPassword from "./Components/resetPAssword/ModifyPassword";
import DeletedProductList from "./Components/DeletedProductList/DeletedProductList";

import "./App.css";

import BadURL from "./views/badURL/BadURL";

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
      <Route path="/about" element={<About />} />
      <Route path="/detail-order/:id" element={<DetailOrder />} />
      <Route path="/user-reviews/:userId" element={<UserReviews />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="/modify-password" element={<ModifyPassword />} />
      <Route path="/admin/*" element={<DashboardAdmin />}>
        <Route path="list" element={<ProductList />} />
        <Route path="inactive" element={<DeletedProductList />} />
        <Route path="create" element={<CreateForm />} />
        <Route path="users" element={<UserList />} />
        <Route path="banned" element={<Banned />} />
      </Route>

      <Route path="*" element={<BadURL />} />
    </Routes>
  );
}

export default App;
