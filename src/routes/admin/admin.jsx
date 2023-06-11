import {
  faBook,
  faComment,
  faDumbbell,
  faHandshake,
  faTrophy,
  faUser,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  esAdmin();
  return (
    <>
      <h2>Administración</h2>
      <small className="descAdmin">
        Selecciona que apartado quieres administrar
      </small>
      <div className="enlacesAdmin">
        <Link to={"/admin/user"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faUser} /> Users
        </Link>
        <Link to={"/admin/logro"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faTrophy} /> Logros
        </Link>
        <Link to={"/admin/medida"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faTrophy} /> Medidas
        </Link>
        <Link to={"/admin/peso"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faWeight} /> Pesos
        </Link>
        <Link to={"/admin/grupoMuscular"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faHandshake} /> Grupos Musculares
        </Link>
        <Link to={"/admin/ejercicio"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faDumbbell} /> Ejercicios
        </Link>
        <Link to={"/admin/plantilla"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faBook} /> Plantillas
        </Link>
        <Link to={"/admin/entrenamiento"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faDumbbell} /> Entrenamientos
        </Link>
        <Link to={"/admin/comentario"} className="enlaceAdmin">
          <FontAwesomeIcon icon={faComment} /> Comentarios
        </Link>
      </div>
    </>
  );
}
