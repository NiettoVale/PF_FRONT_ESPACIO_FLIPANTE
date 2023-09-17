import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";
import NavBar from "../../Components/NavBar/navBar";
import FilterBar from "../../Components/FilterBar/FilterBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import styles from "./home.module.css";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const [visits, setVisits] = useState(0);
  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [busqueda, setBusqueda] = useState("");
  const [productsByName, setProductsByName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const initialState = {
    category: "",
    size: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
    order: "",
  };

  const [dataFilter, setDataFilter] = useState(initialState);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (busqueda === "" || busqueda === null) {
      dispatch(getProducts());
      // Limpiar filtros y barra de búsqueda cuando no hay búsqueda
      setDataFilter(initialState);
      setPriceFilter("");
    } else {
      filterSearch(busqueda);
    }
    setCurrentPage(1);
  }, [busqueda, dispatch]);

  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalAllProducts =
    busqueda === "" ? products.length : productsByName.length;

  const totalPages = Math.ceil(totalAllProducts / productsPerPage);

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

  if (totalAllProducts > 0) {
    currentProducts =
      busqueda === ""
        ? products.slice(indexOfFirstProduct, indexOfLastProduct)
        : productsByName.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  // Mostrar las flechas solo cuando haya más productos en páginas subsiguientes
  const showPagination = totalAllProducts > productsPerPage;

  const resetPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/visit")
      .then((response) => {
        setVisits(response.data.count);
      })
      .catch((error) => {
        console.error("Error al incrementar el contador de visitas", error);
      });
  }, []);

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

      <FilterBar resetPage={resetPage} setBusqueda={setBusqueda} />

      {showPagination && (
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
      )}
      <div className="">
        {busqueda === "" && productsFiltered.length === 0 ? (
          // Caso 1: No hay búsqueda y no hay productos filtrados, mostramos el catálogo completo
          <div>
            <h1>Catalogo</h1>
            <Cards products={currentProducts} />
          </div>
        ) : busqueda !== "" && productsFiltered.length === 0 ? (
          // Caso 2: Hay búsqueda pero no hay productos filtrados, mostramos los productos buscados en el catálogo
          <>
            <h2>Productos seleccionados</h2>
            {currentProducts.filter((product) =>
              product.name.toLowerCase().includes(busqueda.toLowerCase())
            ).length > 0 ? (
              <Cards
                products={currentProducts.filter((product) =>
                  product.name.toLowerCase().includes(busqueda.toLowerCase())
                )}
              />
            ) : (
              <p>No se encontraron productos con la búsqueda.</p>
            )}
          </>
        ) : busqueda !== "" && productsFiltered.length > 0 ? (
          // Caso 3: Hay búsqueda y productos filtrados, mostramos los productos buscados en base a los productos filtrados
          <>
            <h2>Productos seleccionados</h2>
            {productsFiltered.filter((product) =>
              product.name.toLowerCase().includes(busqueda.toLowerCase())
            ).length > 0 ? (
              <Cards
                products={productsFiltered.filter((product) =>
                  product.name.toLowerCase().includes(busqueda.toLowerCase())
                )}
              />
            ) : (
              <p>
                No se encontraron productos con la búsqueda y los filtros
                aplicados.
              </p>
            )}
          </>
        ) : (
          // Caso 4: No hay búsqueda pero hay productos filtrados, mostramos los productos filtrados
          <>
            <h2>Productos filtrados</h2>
            {Array.isArray(productsFiltered) && productsFiltered.length > 0 ? (
              <Cards products={productsFiltered} />
            ) : (
              // Caso 4: No hay búsqueda pero hay productos filtrados, mostramos los productos filtrados
              <>
                <p>No se encontraron productos con los filtros aplicados.</p>
                <div>
                  <h1>Catalogo</h1>
                  <Cards products={currentProducts} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
