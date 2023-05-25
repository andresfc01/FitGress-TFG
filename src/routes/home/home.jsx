import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <img src="/logo/logoHorizotal-bk.png" alt="" />
      <h3>Disfruta y condigue tus objetivos</h3>
      <button>
        <Link to="/nuevaPlantilla">Nueva Plantilla</Link>
      </button>
    </>
  );
}
