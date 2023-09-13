import React, { useState, useEffect } from "react";
import Cards from "../../Components/cards/cards.component";
import styles from "../home/home.module.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Catalogo = ({ products, resetPage }) => {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice del primer y último producto en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Obtener los productos de la página actual
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Crear un array de números de página
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Función para cambiar la página a la siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar la página a la anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Cuando se monta el componente o cambia la sección,
    // llamamos a la función resetPage para reiniciar a la primera página.
    resetPage();
  }, [resetPage]);

  return (
    <>
      <div className={styles.paginationButtons}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={currentPage === 1 ? styles.disabled : ""}
        >
          <MdArrowBackIos />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={pageNumber === currentPage ? styles.active : ""}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? styles.disabled : ""}
        >
          <MdArrowForwardIos />
        </button>
      </div>
      <h1>Catalogo</h1>
      <Cards products={currentProducts} />
    </>
  );
};

export default Catalogo;
