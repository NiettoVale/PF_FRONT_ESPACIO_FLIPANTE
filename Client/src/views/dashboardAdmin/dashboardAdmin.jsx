import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./dashboardAdmin.module.css";
import Statistics from "../../Components/Statistics/Statistics";
function DashboardAdmin() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/admin";
  return (
    <div className={styles.dashboardAdmin}>
      {/* Barra lateral */}
      <div className={styles.sidebar}>
        <h2>ESPACIO FLIPANTE</h2>
        <ul>
          <li>
            <Link to="/admin/list">Lista de Productos</Link>
          </li>
          <li>
            <Link to="/admin/create">Crear Producto</Link>
          </li>
          <li>
            <Link to="/admin/users">Usuarios</Link>
          </li>
          <li>
            <Link to="/admin/banned">Usuarios Baneados</Link>
          </li>
          <li>
            <Link to="/admin">Estadisticas</Link>
          </li>
          <li>
            <Link to="/">Volver al Inicio</Link>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={styles.contentContainer}>
        {/* Título */}
        <div className={styles.title}>
          <h1>PANEL DE CONTROL</h1>
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
