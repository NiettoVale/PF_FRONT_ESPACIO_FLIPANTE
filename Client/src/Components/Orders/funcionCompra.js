import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import getProductId from "./getProductById";

export default async function enviar(email, subject, checkout, storedOrders) {
  const {
    telefono,
    provincia,
    ciudad,
    cp,
    apartamento,
    direccion,
    dniCuitCuil,
    nombre,
    apellido,
  } = checkout;

  const collectionRef = collection(db, "mail");
  // Construye el cuerpo del correo electrónico
  let emailContent = `
    <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
      <h1 style="font-size: 28px; color: #333;">¡Gracias por tu compra, ${nombre}, ${apellido}!</h1>
    </div>
    <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; text-align: center; margin-top: 20px;">
      <h2 style="font-size: 24px; color: #333;">Resumen de tu compra</h2>
      <h3 style="font-size: 24px; color: #333;">Datos Personales:</h3>
      <p style="font-size: 20px; color: #333;"><strong>Provincia: </strong> ${provincia}</p>
      <p style="font-size: 20px; color: #333;"><strong>Ciudad: </strong> ${ciudad}</p>
      <p style="font-size: 20px; color: #333;"><strong>Codigo postal: </strong> ${cp}</p>
      <p style="font-size: 20px; color: #333;"><strong>Direccion: </strong> ${direccion}</p>
      <p style="font-size: 20px; color: #333;"><strong>Apartamento: </strong> ${apartamento}</p>
      <p style="font-size: 20px; color: #333;"><strong>Telefono: </strong> ${telefono}</p>
      <p style="font-size: 20px; color: #333;"><strong>DNI/CUIL/CUIT: </strong> ${dniCuitCuil}</p>
      <h3 style="font-size: 24px; color: #333;">Productos Comprados</h3>
  `;
  // Utiliza Promise.all para esperar a que todas las llamadas asíncronas se completen
  // Utiliza Promise.all para esperar a que todas las llamadas asíncronas se completen
  const productDetailsPromises = storedOrders.map(async (order) => {
    const { productId, quantity, sizeId, totalPrice } = order;
    const { name, sizeName, image } = await getProductId(productId, sizeId);
    return `
    <div style="margin-top: 20px; margin-bottom: 30px;"> <!-- Aumenta el margen inferior aquí -->
      <p style="font-size: 20px; color: #333;"><strong>Producto:</strong> ${name}</p>
      <p style="font-size: 20px; color: #333;"><strong>Cantidad:</strong> ${quantity}</p>
      <p style="font-size: 20px; color: #333;"><strong>Talle:</strong> ${sizeName}</p>
      <p style="font-size: 20px; color: #333;"><strong>Precio:</strong> $${totalPrice}</p>
      <div>
        <img src="${image}" alt="Imagen del producto" style="max-width: 120px; max-height: 120px; margin-top: 10px;">
      </div>
    </div>
  `;
  });

  const productDetails = await Promise.all(productDetailsPromises);

  // Agrega los detalles de los productos al correo electrónico en el lado izquierdo
  emailContent += `
    <div style="display: flex; justify-content: flex-start; margin-top: 20px;">
      ${productDetails.join("")}
    </div>
  `;

  // Resto del contenido del correo electrónico
  emailContent += `
    <div style="text-align: center; margin-top: 20px;">
      <p style="font-size: 20px; color: #333;"><strong>Gracias Por Su Compra</strong></p>
    </div>
  `;

  const emailData = {
    to: email,
    message: {
      subject: subject,
      html: emailContent,
    },
  };

  console.log("Listo para ser enviado");
  return await addDoc(collectionRef, emailData);
}
