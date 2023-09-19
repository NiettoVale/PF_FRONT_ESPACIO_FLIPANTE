import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleClickScroll = () => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
  };
  const superUser = localStorage.getItem("root");

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <h2>
              <span>ESPACIO</span>
            </h2>
            <h2> FLIPANTE</h2>
          </Link>
        </div>

        {superUser ? (
          <>
            <Link to={"/admin"} className={styles.link}>
              PANEL DE CONTROL
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"} className={styles.link} onClick={handleClickScroll}>
              CATALOGO
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
