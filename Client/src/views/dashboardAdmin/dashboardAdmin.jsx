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
        <h2>ESPACIO FLIPANTE</h2>
        <ul>
          <li>
            <Link to="/admin/list">Productos Activos</Link>
          </li>
          <li>
            <Link to="/admin/inactive">Productos Inactivos</Link>
          </li>
          <li>
            <Link to="/admin/create">Nuevo Producto</Link>
          </li>
          <li>
            <Link to="/admin/users">Lista de Usuarios</Link>
          </li>
          <li>
            <Link to="/admin/banned">Usuarios Baneados</Link>
          </li>
          <li>
            <Link to="/admin">Estadisticas</Link>
          </li>
          <li></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={styles.contentContainer}>
        {/* Título */}
        <div className={styles.title}>
          <h1>PANEL DE CONTROL</h1>
          <Link to="/" className={styles.visitPage}>
            Visitar mi Pagina
          </Link>
          <Link to={"/"}>
            <HiOutlineLogout className={styles.logOutIcon} onClick={logOut} />
          </Link>
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
