import styles from "./styles.module.css";

export default function App() {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/andresfc01">
        <img src="src\assets\images\gitHub.png" alt="" />
      </a>
      <div>
        <p>Andrés Fernández Ceacero</p>
        <small>TFG - 2º DAW</small>
      </div>
      <a href="mailto:andresfernandezceacero@gmail.com">
        {/* <img src="src\assets\images\email.png" alt="" /> */}
      </a>
    </div>
  );
}
