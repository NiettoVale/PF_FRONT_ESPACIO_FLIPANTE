import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./dashboardAdmin.module.css";
import Statistics from "../../Components/Statistics/Statistics";
import { HiOutlineLogout } from "react-icons/hi";
function DashboardAdmin() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/admin";

  const logOut = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleImage");
    localStorage.removeItem("username");
    localStorage.removeItem("root");
    // window.location.reload();
  };

  return (
    <div className={styles.dashboardAdmin}>
      {/* Barra lateral */}
      <div className={styles.sidebar}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <h2>
              <span>ESPACIO</span>
            </h2>
            <h2> FLIPANTE</h2>
          </div>
        </Link>
        <ul>
          <Link to="/admin/orderslist">
            <li>Pedidos</li>
          </Link>
          <Link to="/admin/list">
            <li>Productos Activos</li>
          </Link>
          <Link to="/admin/inactive">
            <li>Productos Inactivos</li>
          </Link>
          <Link to="/admin/create">
            <li>Nuevo Producto</li>
          </Link>
          <Link to="/admin/users">
            <li>Lista de Usuarios</li>
          </Link>
          <Link to="/admin/banned">
            <li>Usuarios Baneados</li>
          </Link>
          <Link to="/admin/reviews">
            <li>Reseñas Recibidas</li>
          </Link>
          <Link to="/admin">
            <li>Estadisticas</li>
          </Link>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={styles.contentContainer}>
        {/* Título */}
        <div className={styles.title}>
          <h1>PANEL DE CONTROL</h1>
          <div>
            <Link to={"/"}>
              <HiOutlineLogout className={styles.logOutIcon} onClick={logOut} />
            </Link>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className={styles.content}>
          <Outlet /> {/* Esto renderizará el contenido de las rutas anidadas */}
          {isDashboardRoute && <Statistics />}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
