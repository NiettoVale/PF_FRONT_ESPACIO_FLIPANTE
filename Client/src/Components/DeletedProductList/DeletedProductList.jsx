import React, { useState, useEffect } from "react";
import styles from "./DeletedProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategory, getGenders } from "../../Redux/actions/productsActions";
import UploadImageProductList from "../firebase/UploadImageProductList";
import axios from "axios";

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const DeletedProductList = () => {
  // Declaración de estados
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [editedImages, setEditedImages] = useState([]);
  const [showImages, setShowImages] = useState(true); // Controlar la vista de imágenes
  const [editedStock, setEditedStock] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Número de productos por página

  // Obtener el despachador (dispatch) de Redux
  const dispatch = useDispatch();

  // Obtener opciones de género y categoría desde el estado de Redux
  const genderOptions = useSelector((state) => state.genders);
  const categoryOptions = useSelector((state) => state.category);

  // URL de la API
  const back = process.env.REACT_APP_BACK;

  // Función para cargar productos desde la API
  const fetchProducts = () => {
    fetch(`${back}products-deleted`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  };

  // Efecto para cargar productos y opciones de categoría y género al montar el componente
  useEffect(() => {
    fetchProducts();
    dispatch(getCategory());
    dispatch(getGenders());
  }, [dispatch]);

  // Función para manejar el clic en el botón de editar producto
  const handleEditClick = (product) => {
    // Configurar el estado para editar el producto seleccionado
    setEditedProduct({ ...product });
    setEditingProduct(product);
    setSelectedCategory(product.category);
    setSelectedGender(product.gender);
    setEditedImages([...product.images]); // Copiar las URL de las imágenes del producto

    // Mostrar las imágenes en miniatura
    setShowImages(true);

    // Crear una lista predefinida de talles en el orden deseado
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // Crear un objeto para el stock del producto
    const stockObject = {};
    sizeOrder.forEach((size) => {
        stockObject[size] = product.Sizes.find((s) => s.name === size)?.Stock.quantity || 0;
      });
    
      setEditedStock({ ...stockObject }); // Establecer los talles en el orden deseado
    };

  // Función para cancelar la edición de un producto
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setSelectedCategory("");
    setSelectedGender("");
    setEditedImages([]);
    setEditedStock({});
  };

  // Función para manejar cambios en la cantidad de stock de un tamaño
  const handleSizeChange = (sizeName, quantity) => {
    setEditedStock((prevEditedStock) => ({
      ...prevEditedStock,
      [sizeName]: Number(quantity),
    }));
  };

  // Función para manejar cambios en las URLs de las imágenes
  const handleImageURLChange = (url) => {
    // Agregar la nueva URL de la imagen al objeto editedProduct
    setEditedProduct({
      ...editedProduct,
      images: [...editedImages, url], // Agregar la nueva URL a la lista de imágenes
    });
    // Agregar la nueva URL de la imagen al estado local editedImages
    setEditedImages([...editedImages, url]);
  };

  // Función para eliminar una imagen del producto en edición
  const handleRemoveImageInput = (index) => {
    const newImages = [...editedImages];
    newImages.splice(index, 1);
    setEditedImages(newImages);
  };

  // Función para guardar los cambios en la edición de un producto

  const handleSaveEdit = (editedProduct) => {
    // Crear una copia de editedProduct para realizar modificaciones
    const updatedProduct = { ...editedProduct };
    updatedProduct.deleted = editedProduct.deleted;
    // Actualizar las cantidades de stock en la propiedad Sizes
    updatedProduct.Sizes = updatedProduct.Sizes.map((size) => ({
      ...size,
      Stock: {
        ...size.Stock,
        quantity: editedStock[size.name],
      },
    }));

    updatedProduct.category = selectedCategory;
    updatedProduct.gender = selectedGender;
    updatedProduct.images = [...editedImages];

    // Realizar la solicitud HTTP PUT para actualizar el producto en el backend
    axios
      .put(`${back}products/${updatedProduct.id}`, updatedProduct)
      .then((response) => {
       

        // Actualizar la lista de productos manteniendo el producto en su posición original
        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) =>
            prevProduct.id === editedProduct.id ? updatedProduct : prevProduct
          )
        );

        setEditingProduct(null);
        setEditedProduct({});
        setSelectedCategory("");
        setSelectedGender("");
        setEditedImages([]);
        setEditedStock({});
        fetchProducts();
        
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
        
      })
  };

  // Función para manejar el clic en el botón de eliminar producto
  const handleDeleteClick = (productId) => {
    fetch(`${back}products/${productId}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          
          const updatedProducts = products.filter((p) => p.id !== productId);
          setProducts(updatedProducts);
        }
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  // Función para manejar cambios en el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Regresar a la primera página después de una búsqueda
  };

  // Filtrar productos en función del término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica para el paginado
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>Productos Inactivos</h3>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles["input-text"]}
      />
      {/* Paginación */}
      <div className={styles.pagination}>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
      </div>
      <table className={styles["product-table"]}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Género</th>
            <th>Categoría</th>
            <th>Material</th>
            <th>Precio</th>
            <th>Talles y Stock</th>
            <th>Descripción</th>
            <th>Imágenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>
                {editingProduct === product ? (
                  <input
                    type="text"
                    value={editedProduct.name || product.name || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                    className={styles["input-text"]}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className={product.deleted ? styles.inactive : styles.active}>
                {editingProduct === product ? (
                  <select
                    value={editedProduct.deleted}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        deleted: e.target.value === "true",
                      })
                    }
                    className={styles["input-select"]}
                  >
                    <option value="false">Activo</option>
                    <option value="true">Inactivo</option>
                  </select>
                ) : (
                  product.deleted ? "Inactivo" : "Activo"
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className={styles["input-select"]}
                  >
                    {genderOptions.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.gender
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles["input-select"]}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <input
                    type="text"
                    value={editedProduct.mainMaterial || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        mainMaterial: e.target.value,
                      })
                    }
                    className={styles["input-text"]}
                  />
                ) : (
                  product.mainMaterial
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <input
                    type="number"
                    value={editedProduct.price || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                    className={styles["input-number"]}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProduct === product ? (
                    <div>
                    {sizeOrder.map((size) => ( // Mapear los talles en el orden deseado
                        <div key={size}>
                        <label htmlFor={`size_${size}`}>{size}</label>
                        <input
                            type="number"
                            value={editedStock[size] || 0}
                            onChange={(e) => handleSizeChange(size, e.target.value)}
                            className={styles["input-number"]}
                        />
                        </div>
                    ))}
                    </div>
                ) : (
                    <div>
                    {sizeOrder.map((size) => ( // Mapear los talles en el orden deseado
                    <div key={size}>
                    <span>
                        {size}: {product.Sizes.find((s) => s.name === size)?.Stock.quantity}
                    </span>
                    </div>
                    ))}
                    </div>
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <input
                    type="text"
                    value={editedProduct.description || ""}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, description: e.target.value })
                    }
                    className={styles["input-text"]}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProduct === product ? (
                  <div>
                    {editedImages.map((image, index) => (
                      <div key={index} className={styles.imagecolumn}>
                        <img src={image} alt={`Imagen ${index}`} />
                        <button
                          type="button"
                          onClick={() => handleRemoveImageInput(index)}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}

                    {/* Componente UploadImageProductList para cargar imágenes */}
                    <UploadImageProductList
                      handleImageURLChange={handleImageURLChange}
                    />
                  </div>
                ) : showImages ? (
                  <div className={styles.imagecolumn}>
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`Imagen ${index}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  "Imágenes ocultas"
                )}
              </td>

              <td>
                {editingProduct === product ? (
                  <div>
                    <button onClick={() => handleSaveEdit(editedProduct)}>
                      Guardar
                    </button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEditClick(product)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteClick(product.id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedProductList;
