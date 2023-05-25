import { Link, useNavigate } from "react-router-dom";
import { getPlantillasMasUsadas } from "../../services/plantillas";
import Plantilla from "../../components/plantilla/plantilla";
import { useEffect, useState } from "react";

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
      <img src="/logo/logoHorizotal-bk.png" alt="" />
      <h3>Disfruta y condigue tus objetivos</h3>
      <button>
        <Link to="/nuevaPlantilla">Nueva Plantilla</Link>
      </button>
      {plantillas &&
        plantillas.map((plantilla) => (
          <div key={plantilla.id}>
            <Plantilla plantilla={plantilla} />
          </div>
        ))}
      {plantillas && plantillas.length > 5 && (
        <button onClick={() => navigate("/explorar")}>Explorar más</button>
      )}
    </>
  );
}
