import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "../CreateForm/CreateForm.module.css";

function UploadImage({ handleImageURLChange, imageURLs }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = (index) => {
    if (image) {
      const storageRef = ref(storage, image.name);

      uploadBytes(storageRef, image)
        .then((snapshot) => {
          console.log("Imagen subida exitosamente");

          getDownloadURL(storageRef)
            .then((url) => {
              console.log("URL de la imagen:", url);
              handleImageURLChange(index, url);
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
    <div className={styles.uploading}>
      <input
        className={styles.uploadInput}
        type="file"
        onChange={handleImageChange}
      />
      <button
        className={styles.uploadButton}
        type="button"
        onClick={() => handleImageUpload(imageURLs.length)}
      >
        Subir Imagen
      </button>
    </div>
  );
}

export default UploadImage;
