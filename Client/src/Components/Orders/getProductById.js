import axios from "axios";
const back = process.env.REACT_APP_BACK;
export default async function getProductById(productId, sizeId) {
  try {
    // Realiza una solicitud para obtener los detalles del producto por su ID
    const responseProduct = await axios.get(`${back}detail/${productId}`);
    const productData = responseProduct.data;
    // Función para obtener el nombre del tamaño según el ID
    const getSizeName = (sizeId) => {
      switch (sizeId) {
        case 1:
          return "XS";
        case 2:
          return "S";
        case 3:
          return "M";
        case 4:
          return "L";
        case 5:
          return "XL";
        case 6:
          return "XXL";
        default:
          return "Tamaño no válido";
      }
    };
    // Crea un objeto que contendrá los datos del producto y el tamaño
    const result = {
      name: productData.name,
      sizeName: getSizeName(sizeId),
      image:productData.images[0]
    };
    console.log(result);
    // Devuelve el resultado
    return result;
  } catch (error) {
    alert("Algo salió mal con getProductById!");
    console.log(error);
  }
}
