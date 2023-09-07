import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || {};
  }, []);

  return (
    <header>
      <Link to={"/cart"}>Carrito</Link>
    </header>
  );

};

export default Header;
