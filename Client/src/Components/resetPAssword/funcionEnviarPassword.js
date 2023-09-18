import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
const back = process.env.REACT_APP_BACK;

export default async function enviar(email, subject, body) {
  const collectionRef = collection(db, 'mail');

  // El cuerpo del correo electrónico incluye texto con formato HTML y una imagen alargada en la parte inferior
  const emailContent = {
    to: email,
    message: {
      subject: subject,
      html: `
        <div style="background-color: purple; color: white; padding: 10px; text-align: center;">
          <h1 style="font-size: 24px;">Flipante</h1>
        </div>
        <p style="font-size: 30px; color: #333; text-align: center; font-style: italic;">${body}</p>
        <p>Haz click aqui para ingresar una nueva contraseña <a href= "http://localhost:3000/modify-password" target="_blank" rel="noopener noreferrer">Reestablecer contraseña</a> </p>
        <img src="https://firebasestorage.googleapis.com/v0/b/fir-autenticacion-95e3f.appspot.com/o/Imagenes%2FIMG-20221027-WA0019.jpg?alt=media&token=d4d4b385-0cd6-447b-9464-22f85fa3eeb6" alt="Pie de página" style="width: 100%; height: auto;" />
      `,
    },
  };

  console.log("Listo para ser enviado");
  return await addDoc(collectionRef, emailContent);
}
