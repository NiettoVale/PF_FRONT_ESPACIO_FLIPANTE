import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "./UploadImage.module.css";

function UploadImageProfile({ handleImageURLChange }) {
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = () => {
    if (image) {
      const storageRef = ref(storage, image.name);

      uploadBytes(storageRef, image)
        .then((snapshot) => {
          console.log("Imagen subida exitosamente");

          getDownloadURL(storageRef)
            .then((url) => {
              console.log("URL de la imagen:", url);
              handleImageURLChange(url); // Actualiza el estado en CreateForm con la URL
            })
            .catch((error) => {
              console.error("Error al obtener la URL de descarga:", error);
            });
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error);
        });
    } else {
      console.log("No se ha seleccionado una imagen");
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="file"
        onChange={handleImageChange}
        className={styles.imageInput}
      />
      <button type="button" onClick={handleImageUpload}>
        Subir Imagen
      </button>
    </div>
  );
}

export default UploadImageProfile;
