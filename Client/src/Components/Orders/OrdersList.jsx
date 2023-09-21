import React, { useEffect, useState } from "react";
import styles from "./OrdersList.module.css";
import { TbH1 } from "react-icons/tb";

const back = process.env.REACT_APP_BACK;

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    // Realizar la solicitud GET para obtener los pedidos desde tu API
    fetch(`${back}order`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error al obtener pedidos:", error));
  }, []);

  const toggleOrderStatus = (index) => {
    // Copia el arreglo de pedidos para no modificar el estado directamente
    const updatedOrders = [...orders];

    // Cambia el estado del pedido (Pendiente <-> Concretado)
    updatedOrders[index].isConcreted = !updatedOrders[index].isConcreted;

    // Actualiza el estado con la nueva lista de pedidos
    setOrders(updatedOrders);

    // Almacena el estado actualizado en el almacenamiento local
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    console.log("Estado de pedidos actualizado:", updatedOrders);
  };

  const formatDate = (dateString) => {
    // Formatea la fecha en el formato "DD-MM-AAAA"
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  // Paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {orders.length > 0 ? (
        <div>
          <h2>Lista de Pedidos</h2>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Categoría</th>
                <th>Total</th>
                <th>Fecha de Compra</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userName}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.category}</td>
                  <td>{order.totalPrice}</td>
                  <td>{formatDate(order.purchaseDate)}</td>
                  <td>
                    <button
                      className={`${styles.statusButton} ${
                        order.isConcreted ? styles.concreted : styles.pending
                      }`}
                      onClick={() => toggleOrderStatus(index)}
                    >
                      {order.isConcreted ? "Concretado" : "Pendiente de envío"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array(totalPages)
              .fill()
              .map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? styles.active : ""}
                >
                  {i + 1}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <h1>No hay ordenes</h1>
      )}
    </div>
  );
};

export default AdminOrderList;
