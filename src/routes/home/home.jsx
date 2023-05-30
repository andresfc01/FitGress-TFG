import { Link, useNavigate } from "react-router-dom";
import { getPlantillasMasUsadas } from "../../services/plantillas";
import Plantilla from "../../components/plantilla/plantilla";
import { useEffect, useState } from "react";
import logoWk from "../../assets/images/logoHorizontal-bw.png";

export default function App() {
  const navigate = useNavigate();
  const [plantillas, setPlantillas] = useState(undefined);
  useEffect(() => {
    const fetchPlantillas = async () => {
      const plant = await getPlantillasMasUsadas();
      setPlantillas(plant);
    };
    fetchPlantillas();
  }, []);
  return (
    <>
      <img src={logoWk} alt="" />
      <h3>Disfruta y condigue tus objetivos</h3>
      <button>
        <Link to="/nuevaPlantilla">Nueva Plantilla</Link>
      </button>
      <h2>Plantillas de entrenamiento mas usadas</h2>
      {plantillas &&
        plantillas.map((plantilla) => (
          <Plantilla key={plantilla._id} plantilla={plantilla} />
        ))}
      {plantillas && plantillas.length > 5 && (
        <button onClick={() => navigate("/explorar")}>Explorar más</button>
      )}
    </>
  );
}
