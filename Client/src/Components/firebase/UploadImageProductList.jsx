import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UploadImageProductList({ handleImageURLChange }) {
  const [image, setImage] = useState(null);

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
              handleImageURLChange(url);
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
    <div>
      <input type="file" onChange={handleImageChange} />
      <button type="button" onClick={handleImageUpload}>
        Subir Imagen
      </button>
    </div>
  );
}

export default UploadImageProductList;
