import React from "react";
import styles from "./About.module.css";
import CardsAbout from "./cardsAbout";
import NavBar from "../NavBar/navBar";
import SearchBar from "../SearchBar/SearchBar";
import Benja from "../../assets/Benja.png";
import Ger from "../../assets/Ger.png";
import Fer from "../../assets/Fer.png";
import Vale from "../../assets/Vale.png";
import Anto from "../../assets/Anto.png";
import Juan from "../../assets/Juan.png";
import Karen from "../../assets/Karen.png";
import Rami from "../../assets/Rami.png";
const teamMembers = [
  {
    id: 1,
    name: "Benjamín Palazzo",
    github: "https://github.com/BenjaPalazzo12",
    linkedin: "https://www.linkedin.com/in/benjam%C3%ADn-palazzo-32167a275/",
    image: Benja,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },
  {
    id: 2,
    name: "German Bisutti",
    github: "https://github.com/German-Bisutti",
    linkedin: "https://www.linkedin.com/in/german-bisutti/",
    image: Ger,
    description:
      "Tengo 19 años y mi pasión es la programación en el lado back-end. Soy un capo programando y muy fachero.",
  },
  {
    id: 3,
    name: "Valentín Francisco Diaz Nieto",
    github: "https://github.com/NiettoVale",
    linkedin:
      "https://www.linkedin.com/in/valentin-francisco-diaz-nieto-6b3892263/",
    image: Vale,
    description:
      "Tengo 20 años y soy un entusiasta de la programación backend y la ciberseguridad. Comencé mi viaje en tecnología con Python, luego me sumergí en el desarrollo web full stack en Soy Henry. Mi pasión radica en fusionar estas habilidades y aprender constantemente. En mi tiempo libre, disfruto de la música y las series. Conóceme en:",
  },
  {
    id: 4,
    name: "Fernando Anibal Nasso",
    github: "https://github.com/FernandoNasso",
    linkedin: "https://www.linkedin.com/in/fernando-nasso/",
    image: Fer,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },
  {
    id: 5,
    name: "Juan Guillermo Eraso",
    github: "https://github.com/juaneraso",
    linkedin: "https://www.linkedin.com/in/juan-guillermo-ing-electronico/",
    image: Juan,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },
  {
    id: 6,
    name: "Ramiro Fiscella",
    github: "https://github.com/BenjaPalazzo12",
    linkedin: "https://www.linkedin.com/in/benjam%C3%ADn-palazzo-32167a275/",
    image: Rami,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },

  {
    id: 8,
    name: "Anthoaned Zavala ",
    github: "https://github.com/Karenjtp18",
    linkedin: "https://www.linkedin.com/in/karen-tiznado-736043219/",
    image: Anto,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },

  {
    id: 9,
    name: "Karen Tiznado",
    github: "https://github.com/Karenjtp18",
    linkedin: "https://www.linkedin.com/in/karen-tiznado-736043219/",
    image: Karen,
    description:
      "Tengo 20 años y mi pasión es la programación en el lado back-end y la ciberseguridad. Apasionado por la creación de sistemas seguros y eficientes.",
  },
];

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutNav}>
        <NavBar />
        <SearchBar />
      </div>
      <div className={styles.insideContainer}>
        <h2 className={styles.aboutTitle}>Espacio Flipante</h2>
        <div className={styles.textContainer}>
          <div className={styles.whiteBar}>
            <p className={styles.aboutDescription}>
              Bienvenidos a Espacio Flipante, tu tienda de ropa en línea donde
              encontrarás las últimas tendencias de moda para hombres, mujeres,
              niñas y niños. Nos enorgullece ofrecer una amplia selección de
              ropa y accesorios para toda la familia.
            </p>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.partContainer}>
              <h3>Nuestra Misión</h3>
              <p>
                Nuestra misión es proporcionar a nuestros clientes ropa de alta
                calidad a precios asequibles. Creemos que la moda no debería ser
                inaccesible y trabajamos arduamente para hacer que la moda
                elegante esté al alcance de todos.
              </p>
            </div>

            <div className={styles.partContainer}>
              <h3>Lo que Ofrecemos</h3>
              <p>
                En Espacio Flipante, ofrecemos una amplia variedad de productos,
                que incluyen:
              </p>
              <ul>
                <li>Ropa para hombres, mujeres, niñas y niños.</li>
                <li>Accesorios de moda, como bolsos, joyería y bufandas.</li>
              </ul>
            </div>

            <div className={styles.partContainer}>
              <h3>Calidad y Estilo</h3>
              <p>
                Nuestra ropa está diseñada pensando en la comodidad y el estilo.
                Trabajamos con diseñadores talentosos para brindarte prendas
                modernas y duraderas que te ayudarán a expresar tu personalidad
                y resaltar tu belleza.
              </p>
            </div>

            <div className={styles.partContainer}>
              <h3>Contáctanos</h3>
              <p>
                Si tienes alguna pregunta o necesitas asistencia, no dudes en
                ponerte en contacto con nuestro equipo de atención al cliente.
                Estamos aquí para ayudarte.
              </p>
            </div>
          </div>

          <div className={styles.whiteBar}>
            <p className={styles.aboutDescription}>
              Gracias por elegir Espacio Flipante como tu destino de moda en
              línea. Esperamos que disfrutes de tu experiencia de compra con
              nosotros.
            </p>
          </div>

          <h3 className={styles.aboutTeam}>El Equipo de Espacio Flipante</h3>
        </div>
        <div>
          <CardsAbout members={teamMembers} />
        </div>
      </div>
    </div>
  );
};

export default About;
