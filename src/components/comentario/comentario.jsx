import styles from "./styles.module.css";

export default function Comentario({ comentario } = props) {
  return (
    <div className={styles.comentario}>
      <div>
        <img
          src={"http://localhost:3000/" + comentario?.user?.image?.imagePath}
          alt=""
        />
        <p>{comentario?.user?.username}</p>
      </div>
      <p>{comentario?.texto}</p>
    </div>
  );
}
