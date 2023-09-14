import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function enviar(email, subject) {
  const collectionRef = collection(db, "mail");

  // El cuerpo del correo electrónico incluye texto con formato HTML y una imagen alargada en la parte inferior
  const emailContent = {
    to: email,
    message: {
      subject: subject,
      html: `
      <div style="background: rgb(2, 0, 36);
      background: linear-gradient(0deg, rgb(14, 13, 20) 0%, rgb(38, 38, 38) 100%);
      color: #fff;
      font-family: sans-serif;
      height: max-content;">
  <div style="max-width: 600px;
      margin: auto;
      text-align: center;
      padding: 50px;">
    <div style="title">
      <h1 style="color: #b373fd;
          font-weight: 800;
          font-size: 60px;
          line-height: 50px;
          margin: 0;">ESPACIO FLIPANTE</h1>
      <h2>¡BIENVENIDO!</h2>
    </div>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/fir-autenticacion-95e3f.appspot.com/o/Imagenes%2FIMG-20221027-WA0019.jpg?alt=media&token=d4d4b385-0cd6-447b-9464-22f85fa3eeb6"
      alt="Pie de página"
      style="width: 100%;
          border: solid 5px #fff;
          border-radius: 20px;"
    />
    <p style="font-size: 24px;">
      ¡Esperamos que disfrutes de tus compras y que encuentres tu estilo!
    </p>
  </div>
</div>

      `,
    },
  };

  console.log("Listo para ser enviado");
  return await addDoc(collectionRef, emailContent);
}
