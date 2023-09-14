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

const MySwal = withReactContent(Swal);

const back = process.env.REACT_APP_BACK;

const UserProfile = () => {
  const dispatch = useDispatch();
  const name = localStorage.getItem("username");
  const googleName = localStorage.getItem("googleName");
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [imageURL, setImageURL] = useState("https://acortar.link/9rBdMA"); // URL de imagen de perfil inicial
  const [imageChanged, setImageChanged] = useState(false); // Estado para rastrear si la imagen se ha cambiado

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
          : "https://acortar.link/9rBdMA"
      );
    }
  }, [userInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const updatedUserData = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        dni: formData.DNI, // Cambiado a minúsculas
        imageProfile: imageChanged ? imageURL : null, // Solo envía la URL si la imagen ha cambiado
      };

      const response = await fetch(`${back}update-user/${userInfo.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

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
          icon: "success",
          title: "Éxito",
          text: "Error al actualizar los datos del usuario.",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      MySwal.fire({
        icon: "success",
        title: "Éxito",
        text: "Error al enviar la solicitud: ",
        error,
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const regexEmail = /[^@]+@[^@]+.[a-zA-Z]{2,}$/;
    if (regexEmail.test(name) && !googleName) {
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

      {userInfo && userInfo.name ? (
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
            />
            <br />
            <label htmlFor="address">Dirección:</label> <br />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="phone">Teléfono:</label> <br />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
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
      ) : null}
    </div>
  );
};

export default UserProfile;
