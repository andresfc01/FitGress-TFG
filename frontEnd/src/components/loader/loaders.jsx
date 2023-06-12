import { ThreeDots } from "react-loader-spinner";
import styles from "./styles.module.css";

export default function Loader() {
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#1c76c5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        className={styles.loader}
      />
    </>
  );
}
