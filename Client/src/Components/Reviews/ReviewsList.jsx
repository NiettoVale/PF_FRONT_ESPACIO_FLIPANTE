import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ReviewsList.module.css";
import Swal from "sweetalert2";

const back = process.env.REACT_APP_BACK;

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const reviewsPerPage = 10;

  useEffect(() => {
    // Función para obtener las reseñas desde la API
    const fetchReviews = () => {
      axios
        .get(`${back}reviews`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las reseñas:", error);
        });
    };

    // Llamar a la función para obtener reseñas cuando cambie el estado de reviewToDelete
    if (reviewToDelete === null) {
      fetchReviews();
    }
  }, [reviewToDelete]);

  const handleDeleteReview = async (reviewId) => {
    // Mostrar una ventana emergente de confirmación usando SweetAlert2
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta reseña?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // Realizar una solicitud DELETE para eliminar la reseña
        await axios.delete(`${back}reviews/${reviewId}`);

        // Actualizar el estado de las reseñas después de eliminar
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
      } catch (error) {
        console.error("Error al eliminar la reseña:", error);
      }
    }
  };

  // Calcular el índice inicial y final de las reseñas a mostrar en la página actual
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.reviewsContainer}>
      <h3>Listado de Reseñas</h3>
      {/* Paginación */}
      <div className={styles.pagination}>
        {Array(Math.ceil(reviews.length / reviewsPerPage))
          .fill()
          .map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={
                i + 1 === currentPage ? styles.activePage : styles.pageButton
              }
            >
              {i + 1}
            </button>
          ))}
      </div>

      <table className={styles.reviewsTable}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Producto</th>
            <th>Rating</th>
            <th>Comentario</th>
            <th>Fecha de Compra</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.User}</td>
              <td>{review.Product}</td>
              <td>
                {Array.from({ length: review.rating }, (_, index) => (
                  <span key={index}>&#9733;</span>
                ))}
              </td>
              <td>{review.comment}</td>
              <td>{new Date(review.PurchaseDate).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviewToDelete && (
        <div className={styles.confirmDelete}>
          <p>¿Estás seguro de que deseas eliminar esta reseña?</p>
          <button
            onClick={() => setReviewToDelete(null)}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
