import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FilterBar.module.css";
import {
  getFilters,
  getSizes,
  setOrder,
  setOrderByName,
} from "../../Redux/actions/productsActions";

const initialState = {
  category: "",
  size: "",
  gender: "",
  minPrice: "",
  maxPrice: "",
};

const FilterBar = ({ resetPage, setBusqueda }) => {
  const dispatch = useDispatch();

  const [dataFilter, setDataFilter] = useState(initialState);
  const [priceFilter, setPriceFilter] = useState("");

  const handleClickScroll = () => {
    window.scrollTo({ top: 1650, behavior: "smooth" });
  };

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
    resetPage();
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
    resetPage();
  };

  const handleClearFilters = () => {
    setDataFilter(initialState);
    setPriceFilter("");
    setBusqueda(""); // Limpiar la barra de búsqueda
    resetPage();
  };

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;

    if (
      selectedOrder === "asc" ||
      selectedOrder === "desc" ||
      selectedOrder === "priceAsc" ||
      selectedOrder === "priceDesc"
    ) {
      console.log("Este es el slec: ", selectedOrder);
      dispatch(setOrder(selectedOrder));
    } else {
      dispatch(setOrder(null));
    }
    const selectedValue = event.target.value;
    setDataFilter({ ...dataFilter, order: selectedValue });
    resetPage();
  };

  const handlePriceChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "priceAsc" || selectedValue === "priceDesc") {
      console.log("object", selectedValue);
      dispatch(setOrder(selectedValue));
    } else {
      dispatch(setOrder(null));
    }

    setPriceFilter(selectedValue);
    resetPage();
  };

  useEffect(() => {
    dispatch(getFilters(dataFilter));
    dispatch(getSizes());
  }, [dataFilter, dispatch]);

  const [filtersBar, setFiltersBar] = useState(false);
  const handleClick = () => setFiltersBar(!filtersBar);

  return (
    <div className={!filtersBar ? styles.hidden : styles.shown}>
      <div className={styles.stickyButton}>
        <div onClick={handleClick}>
          {!filtersBar ? (
            <a className={styles.openButton} onClick={handleClickScroll}>
              FILTROS{" "}
            </a>
          ) : (
            <a className={styles.openButton}>CERRAR </a>
          )}
        </div>
      </div>

      <div className={styles.FilterBarContainer}>
        <div className={styles.selectContainer}>
          <div className={styles.genderFilter}>
            <select
              onChange={handleGenderChange}
              name="gender"
              id="genderSelect"
              value={dataFilter.gender}
            >
              <option value="" disabled>
                Seleccionar género
              </option>
              <option value="HOMBRE">HOMBRE</option>
              <option value="MUJER">MUJER</option>
              <option value="NENE">NENE</option>
              <option value="NENA">NENA</option>
            </select>
          </div>

          <div className={styles.categorySelect}>
            <select
              onChange={handleCategoryChange}
              name="category"
              id="categorySelect"
              value={dataFilter.category}
            >
              <option value="" disabled>
                Seleccionar categoria
              </option>
              <option value="Campera">Campera</option>
              <option value="Buzo">Buzo</option>
              <option value="Remera">Remera</option>
              <option value="Pantalón">Pantalón</option>
              <option value="Vestido">Vestido</option>
              <option value="Accesorio">Accesorio</option>
            </select>
          </div>

          <div className={styles.orderSelect}>
            <select
              id="PriceSelect"
              onChange={handlePriceChange}
              value={priceFilter}
            >
              <option value="" disabled>
                SELECCIONAR PRECIO
              </option>
              <option value="priceAsc">MENOR PRECIO</option>
              <option value="priceDesc">MAYOR PRECIO</option>
            </select>
          </div>

          <div className={styles.orderSelect}>
            <select
              id="SortSelect"
              onChange={handleSortChange}
              value={dataFilter.order || ""}
            >
              <option value="" disabled>
                SELECCIONAR ORDEN
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>

          <button className={styles.cleanButton} onClick={handleClearFilters}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
