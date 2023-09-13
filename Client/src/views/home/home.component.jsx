import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";
import NavBar from "../../Components/NavBar/navBar"; // Asegúrate de tener la ruta correcta
import FilterBar from "../../Components/FilterBar/FilterBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import styles from "./home.module.css";
import Footer from "../../Components/Footer/Footer";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [busqueda, setBusqueda] = useState("");
  const [productsByName, setProductsByName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (busqueda === "" || busqueda === null) {
      dispatch(getProducts());
    } else {
      filterSearch(busqueda);
    }
    // Reiniciar la página actual cuando se aplica una búsqueda
    setCurrentPage(1);
  }, [busqueda, dispatch]);

  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalFilteredProducts = productsFiltered.length;

  const totalAllProducts =
    busqueda === "" ? products.length : productsByName.length;

  const totalPages = Math.ceil(
    totalFilteredProducts > 0
      ? totalFilteredProducts / productsPerPage
      : totalAllProducts / productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filterSearch = useCallback(
    (searchTerm) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setProductsByName(filteredProducts);
    },
    [products]
  );

  let currentProducts = [];

  if (totalFilteredProducts > 0) {
    currentProducts = productsFiltered.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  } else {
    currentProducts =
      busqueda === ""
        ? products.slice(indexOfFirstProduct, indexOfLastProduct)
        : productsByName.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const resetPage = () => {
    console.log("Resetting page to 1");
    setCurrentPage(1); // Reiniciar la página a 1
  };

  return (
    <div>
      <Hero />
      <ProductSlider products={products} />

      <h1>ESPACIO FLIPANTE</h1>
      <div className={styles.navBarWithSearch}>
        <NavBar />
        <div className={styles.spaceBetween}></div>

        <SearchBar
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filterSearch={filterSearch}
        />
      </div>

      <FilterBar resetPage={resetPage} />

      <div className={styles.paginationButtons}>
        <button
          className={styles.unButton}
          onClick={prev}
          disabled={currentPage === 1}
        >
          <MdArrowBackIos />
        </button>

        {pageNumbers.map((number) => (
          <button
            className={`${
              number === currentPage ? styles.currentPageButton : ""
            }`}
            key={number}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className={styles.unButton}
          onClick={next}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos />
        </button>
      </div>

      <div className="">
        {busqueda === "" ? (
          <>
            <h1>Catalogo</h1>
            <Cards products={currentProducts} />
          </>
        ) : currentProducts.length > 0 ? (
          <>
            {totalFilteredProducts > 0 ? (
              <h2>Productos seleccionados</h2>
            ) : (
              <h1>Resultado de búsqueda</h1>
            )}
            <Cards products={currentProducts} />
          </>
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
