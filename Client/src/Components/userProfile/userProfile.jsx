import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./userProfile.module.css";
import SideBar from "../SideBar/SideBar";
import {
  getUserByMail,
  getUserByName,
} from "../../Redux/actions/productsActions";
import UploadImageProfile from "../firebase/UploadImageProfile";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAuth, signOut } from "firebase/auth"; // Importa las funciones de Firebase Authentication

const MySwal = withReactContent(Swal);

const back = process.env.REACT_APP_BACK;

// Expresión regular para verificar dirección con calle y número
const addressRegex = /^(?=.*\d)(?=.*[A-Za-z]).+$/;

const UserProfile = () => {
  const dispatch = useDispatch();
  const root = localStorage.getItem("root");
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [imageURL, setImageURL] = useState("https://acortar.link/9rBdMA");
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de validación
  const [nameValid, setNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        address: userInfo.address,
        phone: userInfo.phone,
      });
      setImageURL(
        typeof userInfo.imageProfile === "string"
          ? userInfo.imageProfile
          : root
          ? "https://acortar.link/wrpVGk"
          : "https://acortar.link/9rBdMA"
      );
      setIsLoading(false);
    }
  }, [userInfo, root]);

  // Agrega la lógica para verificar si el usuario está baneado y forzar la desconexión
  useEffect(() => {
    const handleBanUser = async () => {
      if (userInfo && userInfo.banned) {
        const auth = getAuth();
        try {
          console.log(signOut(auth));
          localStorage.removeItem("googleName");
          localStorage.removeItem("username");
          localStorage.removeItem("googleImage");
          // Redirige al usuario a una página de inicio de sesión o muestra un mensaje apropiado
          window.location.href = "/login"; // Cambia "/login" a la URL correcta de inicio de sesión
        } catch (error) {
          console.error("Error al cerrar la sesión:", error);
        }
      }
    };
    handleBanUser();
  }, [userInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validaciones en tiempo real
    if (name === "name") {
      // Validar el nombre (por ejemplo, longitud mínima de 3 caracteres)
      setNameValid(value.length >= 3);
    } else if (name === "address") {
      // Validar la dirección (debe tener calle y número)
      const isValidAddress = addressRegex.test(value);
      setAddressValid(isValidAddress);
    } else if (name === "phone") {
      // Validar el teléfono (puedes agregar tus propias validaciones aquí)
      setPhoneValid(/^\d{10}$/.test(value));
    }
  };

  const handleImageURLChange = (url) => {
    setImageURL(url);
    setImageChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInfo || !userInfo.id) {
      return;
    }

    try {
      // Validar que todos los campos sean válidos
      if (nameValid && addressValid && phoneValid) {
        const updatedUserData = {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          dni: formData.DNI,
          imageProfile: imageChanged ? imageURL : null,
        };

        const response = await fetch(`${back}update-user/${userInfo.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });

        const data = await response.json();

        if (response.status === 200) {
          console.log("Datos de usuario actualizados con éxito.");
          MySwal.fire({
            icon: "success",
            title: "Éxito",
            text: "Datos de usuario actualizados con éxito.",
          });
        } else {
          console.error("Error al actualizar los datos del usuario.");
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: `${data}`,
          });
        }
      } else {
        // Mostrar un mensaje de error si los datos no son válidos
        MySwal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Por favor, complete todos los campos correctamente.",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Error al enviar la solicitud: " + error,
      });
    }
  };

  useEffect(() => {
    const regexEmail = /[^@]+@[^@]+.[a-zA-Z]{2,}$/;
    if (regexEmail.test(name)) {
      dispatch(getUserByMail(name));
    } else if (regexEmail.test(name) && googleName) {
      dispatch(getUserByMail(googleName));
    } else {
      if (!googleName) {
        dispatch(getUserByName(name));
      } else {
        dispatch(getUserByName(googleName));
      }
    }
  }, [dispatch, name, googleName]);

  return (
    <div className={styles.userView}>
      <SideBar />

      {isLoading ? (
        <div className={styles.loading}>
          <img
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Cargando..."
          />
        </div>
      ) : userInfo && userInfo.name ? (
        userInfo.id ? (
          <div className={styles.userContainer}>
            <div className={styles.userImage}>
              <img src={imageURL} alt="Foto de perfil" />
            </div>
            <form onSubmit={handleSubmit} className={styles.userForm}>
              <label htmlFor="name">Nombre:</label> <br />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={!nameValid ? styles.invalidInput : ""}
              />
              {!nameValid && (
                <p className={styles.errorText}>
                  El nombre debe tener al menos 3 caracteres.
                </p>
              )}
              <br />
              <label htmlFor="address">Dirección:</label> <br />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={!addressValid ? styles.invalidInput : ""}
              />
              {!addressValid && (
                <p className={styles.errorText}>
                  La dirección debe tener al menos una calle y un número.
                </p>
              )}
              <br />
              <label htmlFor="phone">Teléfono:</label> <br />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={!phoneValid ? styles.invalidInput : ""}
              />
              {!phoneValid && (
                <p className={styles.errorText}>
                  El teléfono debe tener 10 dígitos numéricos.
                </p>
              )}
              <br />
              {googleName ? (
                ""
              ) : (
                <div>
                  <br />
                  <UploadImageProfile
                    handleImageURLChange={handleImageURLChange}
                    imageURLs={[imageURL]}
                  />
                </div>
              )}
              <br />
              <button type="submit" className={styles.updateButton}>
                Actualizar Perfil
              </button>
            </form>
          </div>
        ) : (
          <div>
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
            />
            <h2>Cargando la información del usuario</h2>
          </div>
        )
      ) : null}
    </div>
  );
};

export default UserProfile;
