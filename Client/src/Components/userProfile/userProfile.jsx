import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./userProfile.module.css";
import SideBar from "../SideBar/SideBar";
import { getUserByName } from "../../Redux/actions/productsActions";
import UploadImageProfile from "../firebase/UploadImageProfile";
const back = process.env.REACT_APP_BACK;

const UserProfile = () => {
  const dispatch = useDispatch();
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const userInfo = user.length > 0 ? user[0] : null;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    DNI: "",
  });

  const [imageURL, setImageURL] = useState("https://acortar.link/9rBdMA"); // URL de imagen de perfil inicial
  const [imageChanged, setImageChanged] = useState(false); // Estado para rastrear si la imagen se ha cambiado

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        address: userInfo.address,
        phone: userInfo.phone,
        DNI: userInfo.dni, // Cambiado a minúsculas
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
      } else {
        console.error("Error al actualizar los datos del usuario.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  useEffect(() => {
    dispatch(getUserByName(name));
  }, [dispatch, name]);

  console.log(user);

  return (
    <div className={styles.userView}>
      <SideBar />

      {userInfo && userInfo.name ? (
        <div>
          <div className={styles.userImage}>
            <img src={imageURL} alt="Foto de perfil" />
          </div>
          <form onSubmit={handleSubmit}>
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
            <label htmlFor="DNI">DNI:</label> <br />
            <input
              type="text"
              name="DNI"
              value={formData.DNI}
              onChange={handleChange}
            />
            <br />
            <UploadImageProfile
              handleImageURLChange={handleImageURLChange}
              imageURLs={[imageURL]}
            />
            <br />
            <button type="submit">Actualizar Perfil</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
