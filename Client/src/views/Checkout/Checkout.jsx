import NavBar from "../../Components/NavBar/navBar";
import CountrySelect from "./CountrySelect";

import styles from "./Checkout.module.css";

const Checkout = () => {
  return (
    <div>
      <div className={styles.checkNav}>
        <NavBar />
      </div>
      <h2 className={styles.checkTitle}>DATOS DE ENVIO</h2>

      <div className={styles.checkContainer}>
        <div className={styles.checkImage}></div>
        <div className={styles.checkForm}>
          <form>
            <div>
              <CountrySelect />
              <div className={styles.horizontal}>
                <input type="text" name="nombre" placeholder="Nombre" />
                <input type="text" name="apellido" placeholder="Apellido" />
              </div>

              <div className={styles.vertical}>
                <input
                  type="text"
                  name="DNI"
                  placeholder="  DNI / CUIT / CUIL"
                />
                <input type="text" name="direccion" placeholder="  Dirección" />
                <input
                  type="text"
                  name="apartamento"
                  placeholder="  Apartamento, local, piso"
                />
              </div>

              <div className={styles.horizontal}>
                <input type="text" name="cp" placeholder="Código Postal" />
                <input type="text" name="ciudad" placeholder="Ciudad" />
                <input type="text" name="Provincia" placeholder="Provincia" />
              </div>

              <div className={styles.vertical}>
                <input type="number" name="telefono" placeholder="  Teléfono" />
              </div>
            </div>

            <div className={styles.checkButtons}>
              <a href="/cart">◀ Volver al carrito</a>
              <button type="submit">CONFIRMAR COMPRA</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
