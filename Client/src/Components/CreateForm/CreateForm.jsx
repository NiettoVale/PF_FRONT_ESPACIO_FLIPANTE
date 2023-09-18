import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateForm.module.css";
import UploadImage from "../firebase/UploadImage";

import {
  getCategory,
  getGenders,
  getSizes,
} from "../../Redux/actions/productsActions";

import { AiOutlineClose } from "react-icons/ai";

function CreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Seleccionar",
    category: "Seleccionar",
    mainMaterial: "",
    description: "",
    images: [], // Aquí almacenaremos los URLs de las imágenes
    tempImages: [], // Almacenará temporalmente las miniaturas de las imágenes cargadas
    price: 0,
    sizes: {}, // Cambio: Usar un objeto para tallas y stock
  });

  const [errors, setErrors] = useState({
    name: "",
    gender: "",
    category: "",
    mainMaterial: "",
    description: "",
    price: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const back = process.env.REACT_APP_BACK;

  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.sizes);
  const genderOptions = useSelector((state) => state.genders);
  const categoryOptions = useSelector((state) => state.category);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Realizar validaciones en tiempo real
    let error = "";
    switch (name) {
      case "name":
        if (value.length < 4 || value.length > 30) {
          error = "El nombre debe tener entre 4 y 30 caracteres.";
        }
        break;
      case "gender":
      case "category":
        if (value === "Seleccionar") {
          error = "Por favor, elija una opción válida.";
        }
        break;
      case "price":
        if (parseFloat(value) < 0) {
          error = "El precio debe ser mayor o igual a 0.";
        }
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSizeChange = (event, sizeName) => {
    const { value } = event.target;
    const sizes = { ...formData.sizes };

    // Validar que el valor no sea menor a 0
    if (Number(value) < 0) {
      // Mostrar un error en caso de que sea menor a 0
      setErrors({
        ...errors,
        [sizeName]: "El valor debe ser mayor o igual a 0.",
      });
    } else {
      // Si es válido, eliminar el error
      setErrors({
        ...errors,
        [sizeName]: "",
      });

      sizes[sizeName] = Number(value);

      setFormData({
        ...formData,
        sizes,
      });
    }
  };

  useEffect(() => {
    dispatch(getSizes());
    dispatch(getGenders());
    dispatch(getCategory());
  }, [dispatch]);

  const handleImageURLChange = (index, url) => {
    const newImages = [...formData.images];
    newImages[index] = url;

    const newTempImages = [...formData.tempImages];
    newTempImages[index] = url; // Corrección aquí

    setFormData({
      ...formData,
      images: newImages,
      tempImages: newTempImages,
    });
  };

  const handleImageDelete = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);

    const newTempImages = [...formData.tempImages];
    newTempImages.splice(index, 1); // Eliminar miniatura temporal

    setFormData({
      ...formData,
      images: newImages,
      tempImages: newTempImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar una última vez antes de enviar el formulario
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        };

        const response = await fetch(`${back}products`, requestOptions);

        const responseData = await response.json();

        if (response.status === 200) {
          setSuccessMessage("Producto creado exitosamente.");
          // Limpiar el formulario después del éxito si es necesario
          // setFormData({ ...initialFormData });
        } else if (response.status === 400) {
          console.log(responseData.error);
        } else if (response.status === 500) {
          console.log(responseData.error);
        }
      } catch (error) {
        console.log("Algo salió mal!!");
        console.error(error);
      }
    } else {
      console.log("El formulario no es válido. Por favor, revise los campos.");
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validar el nombre
    if (formData.name.length < 4 || formData.name.length > 30) {
      newErrors.name = "El nombre debe tener entre 4 y 30 caracteres.";
      formIsValid = false;
    } else {
      newErrors.name = "";
    }

    // Validar género y categoría
    if (formData.gender === "Seleccionar") {
      newErrors.gender = "Por favor, elija una opción válida.";
      formIsValid = false;
    } else {
      newErrors.gender = "";
    }

    if (formData.category === "Seleccionar") {
      newErrors.category = "Por favor, elija una opción válida.";
      formIsValid = false;
    } else {
      newErrors.category = "";
    }

    // Validar precio
    if (parseFloat(formData.price) < 0) {
      newErrors.price = "El precio debe ser mayor o igual a 0.";
      formIsValid = false;
    } else {
      newErrors.price = "";
    }

    // Actualizar el estado de errores
    setErrors(newErrors);

    return formIsValid;
  };

  return (
    <div>
      <form className={styles.createForm} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="NOMBRE..."
            required
          />
          <span className={styles["error-message"]}>{errors.name}</span>
        </div>

        <div className={styles.inputs}>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="genero">genero</option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={styles["error-message"]}>{errors.gender}</span>
        </div>

        <div className={styles.inputs}>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="categoria">categoria</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={styles["error-message"]}>{errors.category}</span>
        </div>

        <div className={styles.sizesContainer}>
          <label>Talles y Stock</label>
          <div className={styles.sizesFlex}>
            {sizesOptions.map((size) => (
              <div key={size} className={styles.sizeInput}>
                <label htmlFor={`sizes_${size}`}>{size}</label>
                <input
                  className={styles.size}
                  type="number"
                  name={`sizes_${size}`}
                  value={formData.sizes[size]}
                  defaultValue={0}
                  onChange={(event) => handleSizeChange(event, size)}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.inputs}>
          <input
            type="text"
            name="mainMaterial"
            value={formData.mainMaterial}
            onChange={handleInputChange}
            placeholder="MATERIAL PRINCIPAL..."
            required
          />
        </div>

        <div className={styles.inputs}>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="DESCRIPCION DEL PRODUCTO"
            required
          />
        </div>

        <div className={styles.uploadimg}>
          <UploadImage
            handleImageURLChange={handleImageURLChange}
            imageURLs={formData.images}
          />
          {formData.tempImages.map((tempImage, index) => (
            <div key={index} className={styles["image-thumbnail"]}>
              <img src={tempImage} alt={`Imagen ${index}`} />
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className={styles.deleteImageButton}
              >
                <AiOutlineClose />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.priceFlex}>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Crear Producto
        </button>
      </form>
      {successMessage && (
        <div className={styles["success-message"]}>{successMessage}</div>
      )}
    </div>
  );
}

export default CreateForm;
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import styles from "./CreateForm.module.css";
// import UploadImage from "../firebase/UploadImage";

// import {
//   getCategory,
//   getGenders,
//   getSizes,
// } from "../../Redux/actions/productsActions";

// function CreateForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "Seleccionar",
//     category: "Seleccionar",
//     mainMaterial: "",
//     description: "",
//     images: [],
//     price: 0,
//     sizes: {}, // Cambio: Usar un objeto para tallas y stock
//   });

//   const [isValidUrls, setIsValidUrls] = useState([]);
//   const back = process.env.REACT_APP_BACK;

//   const dispatch = useDispatch();
//   const sizesOptions = useSelector((state) => state.sizes);
//   const genderOptions = useSelector((state) => state.genders);
//   const categoryOptions = useSelector((state) => state.category);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSizeChange = (event, sizeName) => {
//     const { value } = event.target;
//     const sizes = { ...formData.sizes };

//     sizes[sizeName] = Number(value);

//     setFormData({
//       ...formData,
//       sizes,
//     });
//   };

//   useEffect(() => {
//     dispatch(getSizes());
//     dispatch(getGenders());
//     dispatch(getCategory());
//   }, [dispatch]);

//   const handleImageURLChange = (index, imageURL) => {
//     const newImages = [...formData.images];
//     newImages[index] = imageURL;
//     setFormData({
//       ...formData,
//       images: newImages,
//     });

//     const newIsValidUrls = [...isValidUrls];
//     newIsValidUrls[index] = isValidUrl(imageURL);
//     setIsValidUrls(newIsValidUrls);
//   };

//   const isValidUrl = (url) => {
//     const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
//     return pattern.test(url);
//   };

//   const handleRemoveImageInput = (index) => {
//     const newImages = [...formData.images];
//     newImages.splice(index, 1);
//     setFormData({
//       ...formData,
//       images: newImages,
//     });

//     const newIsValidUrls = [...isValidUrls];
//     newIsValidUrls.splice(index, 1);
//     setIsValidUrls(newIsValidUrls);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       };

//       const response = await fetch(`${back}products`, requestOptions);

//       const responseData = await response.json();

//       if (response.status === 200) {
//         console.log(responseData.message);
//       } else if (response.status === 400) {
//         console.log(responseData.error);
//       } else if (response.status === 500) {
//         console.log(responseData.error);
//       }
//     } catch (error) {
//       console.log("Algo salió mal!!");
//       console.error(error);
//     }
//   };

//   return (
//     <form className={styles.createForm} onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Nombre</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           required
//           maxLength="30"
//         />
//       </div>

//       <div>
//         <label htmlFor="gender">Género</label>
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleInputChange}
//           required
//         >
//           <option value="Seleccionar">Seleccionar</option>
//           {genderOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="category">Categoría</label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//           required
//         >
//           <option value="Seleccionar">Seleccionar</option>
//           {categoryOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>Talles y Stock</label>
//         {sizesOptions.map((size) => (
//           <div key={size}>
//             <label htmlFor={`sizes_${size}`}>{size}</label>
//             <input
//               type="number"
//               name={`sizes_${size}`}
//               value={formData.sizes[size]}
//               onChange={(event) => handleSizeChange(event, size)}
//             />
//           </div>
//         ))}
//       </div>

//       <div>
//         <label htmlFor="mainMaterial">Material principal</label>
//         <input
//           type="text"
//           name="mainMaterial"
//           value={formData.mainMaterial}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="description">Descripción</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <div>
//         <UploadImage
//           handleImageURLChange={handleImageURLChange}
//           imageURLs={formData.images}
//         />
//         <label htmlFor="images">Imágenes (carga una imagen)</label>
//         {formData.images.map((image, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               name={`image_${index}`}
//               value={image}
//               onChange={(event) =>
//                 handleImageURLChange(index, event.target.value)
//               }
//             />
//             {isValidUrls[index] ? null : (
//               <span className={styles["error-message"]}>URL inválida</span>
//             )}

//             <button type="button" onClick={() => handleRemoveImageInput(index)}>
//               Eliminar
//             </button>
//           </div>
//         ))}
//       </div>

//       <div>
//         <label htmlFor="price">Precio</label>
//         <input
//           type="number"
//           step="0.01"
//           name="price"
//           value={formData.price}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <button type="submit" className={styles["submit-button"]}>
//         Crear Producto
//       </button>
//     </form>
//   );
// }

// export default CreateForm;
