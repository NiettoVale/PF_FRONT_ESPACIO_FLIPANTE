import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleClickScroll = () => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
  };
  const superUser = localStorage.getItem("root");
  const user = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <h2>
            <span>ESPACIO</span>
          </h2>
          <h2> FLIPANTE</h2>
        </div>

        {superUser ? (
          <>
            <Link to={"/admin"} className={styles.link}>
              PANEL DE CONTROL
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"} className={styles.link}>
              INICIO
            </Link>
            <Link to={"/"} className={styles.link} onClick={handleClickScroll}>
              CATALOGO
            </Link>
            {user || googleName ? (
              <Link to={"/favorites"}>FAVORITOS❤️</Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
