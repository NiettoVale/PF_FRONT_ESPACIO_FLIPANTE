import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function enviar(email, subject, name,quantity,totalPrice,sizeName,userId,productId,userName,imagen) {

  console.log("name =",name);
  console.log("Cantidad =",quantity);
  console.log("Precio =",totalPrice);
  console.log("sizeName=",sizeName);
  console.log("UserId=",userId);
  console.log("ProductId=",productId);
  console.log("UserName",userName);
  console.log("Imagen",imagen);

 

  const collectionRef = collection(db, "mail");

  // El cuerpo del correo electrónico incluye texto con formato HTML y una imagen alargada en la parte inferior
  const emailContent = {
    to: email,
    message: {
      subject: subject,
      html: `
         <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
           <h1 style="font-size: 28px; color: #333;">¡Gracias por tu compra, ${userName}!</h1>
         </div>
  
      <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; text-align: center; margin-top: 20px;">
       <h2 style="font-size: 24px; color: #333;">Resumen de tu compra</h2>
       <p style="font-size: 20px; color: #333;"><strong>Producto:</strong> ${name}</p>
       <p style="font-size: 20px; color: #333;"><strong>Cantidad:</strong> ${quantity}</p>
       <p style="font-size: 20px; color: #333;"><strong>Talle:</strong> ${sizeName}</p>
       <p style="font-size: 20px; color: #333;"><strong>Precio:</strong> $${totalPrice}</p>
      </div>
  
      <div style="text-align: center; margin-top: 20px;">
      <img src="${imagen}" alt="Imagen del producto" style="max-width: 200px; max-height: 200px; display: block; margin: 0 auto;">
      </div>
  

        `,
    },
  };

  console.log("Listo para ser enviado");
  return await addDoc(collectionRef, emailContent);
}
