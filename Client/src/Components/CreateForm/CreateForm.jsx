import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateForm.module.css";
import {
  getCategory,
  getGenders,
  getSizes,
} from "../../Redux/actions/productsActions";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Seleccionar",
    category: "Seleccionar",
    sizes: {},
    mainMaterial: "",
    description: "",
    images: [""],
    price: 0,
    stock: 0,
  });

  const [isValidUrls, setIsValidUrls] = useState([true]);

  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.sizes);
  const genderOptions = useSelector((state) => state.genders);
  const categoryOptions = useSelector((state) => state.category);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSizeChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [name]: Number(value),
      },
    });
  };

  const calculatestock = () => {
    const total = Object.values(formData.sizes).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setFormData({
      ...formData,
      stock: total,
    });
  };

  useEffect(() => {
    dispatch(getSizes());
    dispatch(getGenders());
    dispatch(getCategory());
  }, [dispatch]);

  const handleImageInputChange = (index, event) => {
    const newImages = [...formData.images];
    newImages[index] = event.target.value;
    setFormData({
      ...formData,
      images: newImages,
    });

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls[index] = isValidUrl(event.target.value);
    setIsValidUrls(newIsValidUrls);
  };

  const isValidUrl = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const handleAddImageInput = () => {
    const newImages = [...formData.images, ""];
    setFormData({
      ...formData,
      images: newImages,
    });
    setIsValidUrls([...isValidUrls, true]);
  };

  const handleRemoveImageInput = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls.splice(index, 1);
    setIsValidUrls(newIsValidUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Crear un objeto de opciones para la solicitud POST
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Convertir el objeto formData a JSON
      };

      // Realizar la solicitud POST al servidor
      const response = await fetch(
        "https://espacioflipante.onrender.com/products",
        requestOptions
      );

      const responseData = await response.json();

      if (response.status === 200) {
        alert(responseData.message);
      } else if (response.status === 400) {
        alert(responseData.error);
      } else if (response.status === 500) {
        alert(responseData.error);
      }
    } catch (error) {
      alert("Algo salió mal!!");
      console.log(error);
    }
  };

  return (
    <form className={styles["create-form"]} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          maxLength="30"
        />
      </div>

      <div>
        <label htmlFor="gender">Género</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="Seleccionar">Seleccionar</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="Seleccionar">Seleccionar</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Talles y Stock</label>
        {sizesOptions.map((size) => (
          <div key={size}>
            <label htmlFor={`sizes_${size}`}>{size}</label>
            <input
              type="number"
              name={`sizes_${size}`}
              value={formData.sizes[`sizes_${size}`] || 0} // Cambia formData.sizes[size] a formData.sizes[`sizes_${size}`]
              onChange={handleSizeChange}
              onBlur={calculatestock}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="mainMaterial">Material principal</label>
        <input
          type="text"
          name="mainMaterial"
          value={formData.mainMaterial}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="images">Imágenes (Ingrese una URL por línea)</label>
        {formData.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              name={`image_${index}`}
              value={image}
              onChange={(event) => handleImageInputChange(index, event)}
            />
            {isValidUrls[index] ? null : (
              <span className={styles["error-message"]}>URL inválida</span>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveImageInput(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddImageInput}>
          Agregar Otra Imagen
        </button>
      </div>

      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Crear Producto
      </button>
    </form>
  );
};

export default CreateForm;
