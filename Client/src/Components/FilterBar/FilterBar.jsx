import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FilterBar.module.css";
import {
  getFilters,
  getSizes,
  // getPrices,
  // setOrderByPrice,
  setOrderByName,
} from "../../Redux/actions/productsActions";

const initialState = {
  category: "",
  size: "",
  gender: "",
  minPrice: "",
  maxPrice: "",
};

const FilterBar = ({ resetPage }) => {
  const dispatch = useDispatch();

  const [dataFilter, setDataFilter] = useState(initialState);
  const sizes = useSelector((state) => state.sizes);

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

  const handleSizes = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
    resetPage();
  };

  const handleClearFilters = () => {
    setDataFilter(initialState);
  };

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;

    if (selectedOrder === "asc" || selectedOrder === "desc") {
      // Actualizar el estado en Redux utilizando la acción setOrderByName
      dispatch(setOrderByName(selectedOrder));
    } else {
      // Restablecer el estado en Redux a null o el valor que corresponda
      dispatch(setOrderByName(null));
    }
    const selectedValue = event.target.value;
    setDataFilter({ ...dataFilter, order: selectedValue });
    resetPage();
  };

  useEffect(() => {
    dispatch(getFilters(dataFilter));
    dispatch(getSizes());
    // dispatch(getPrices(dataFilter.minPrice, dataFilter.maxPrice));
  }, [dataFilter, dispatch]);

  const [filtersBar, setFiltersBar] = useState(false);
  const handleClick = () => setFiltersBar(!filtersBar);
  // const handleClose = () => setFiltersBar(!filtersBar);

  return (
    <div className={!filtersBar ? styles.hidden : styles.shown}>
      <div className={styles.stickyButton}>
        <div onClick={handleClick}>
          {!filtersBar ? (
            <a className={styles.openButton}>FILTROS </a>
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

          <div className={styles.priceSelect}>
            <input
              type="number"
              placeholder="Precio mínimo"
              value={dataFilter.minPrice}
              onChange={(e) =>
                setDataFilter((prevData) => ({
                  ...prevData,
                  minPrice: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Precio máximo"
              value={dataFilter.maxPrice}
              onChange={(e) =>
                setDataFilter((prevData) => ({
                  ...prevData,
                  maxPrice: e.target.value,
                }))
              }
            />

            <button>Buscar</button>
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

          <div className={styles.sizesSelect}>
            <select name="sizes" value={dataFilter.size} onChange={handleSizes}>
              <option value="">Seleccionar talless</option>
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.orderSelect}>
            <select
              id="SortSelect"
              onChange={handleSortChange}
              value={dataFilter.order || ""} // Establecer "ORDENAR" por defecto
            >
              <option value="" disabled>
                ORDENAR
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="priceAsc">MENOR PRECIO</option>
              <option value="priceDesc">MAYOR PRECIO</option>
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

export default FilterBar;
