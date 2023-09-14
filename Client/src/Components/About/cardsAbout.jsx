import CardAbout from "./cardAbout";
import styles from "./cardsAbout.module.css";

const CardsAbout = ({ members }) => {
  return (
    <div className={styles.contenedorCards}>
      {members.map((member) => (
        <CardAbout
          key={member.id}
          name={member.name}
          description={member.description}
          gihub={member.gihub}
          linkedin={member.linkedin}
          image={member.image}
        />
      ))}
    </div>
  );
};

export default CardsAbout;
