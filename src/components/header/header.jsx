import styles from "./styles.module.css";
import { BrowserRouter, NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import BotonLogout from "../botonLogout/botonLogout";
import {
  faArrowDown,
  faBars,
  faBurger,
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  const { user } = useContext(AppContext);
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav>
        <Link to={""} className={styles.logo}>
          <img src="/src/assets/images/logoHorizontal-bw.png" />{" "}
        </Link>
        <FontAwesomeIcon
          onClick={() => setShowMenu(!showMenu)}
          className={styles.iconoMenu}
          icon={faBars}
        />
        <ul className={showMenu && styles.showMenu}>
          <li>
            <Link to={"/admin"}>Admin</Link>
          </li>
          <li>
            <Link to={"explorar"}>Explorar</Link>
          </li>
          <li>
            <Link to={"plantillas"}>Plantillas</Link>
          </li>
          <li>
            <Link to={"ejercicios"}>Ejercicios</Link>
          </li>
        </ul>

        {!user && (
          <div className={styles.divRegistro}>
            <Link to={"login"} className={styles.btnLogin}>
              Login
            </Link>
            <Link to={"register"} className={styles.btnRegistro}>
              Register
            </Link>
          </div>
        )}
        {user && (
          <div
            className={
              menuPerfil
                ? styles.divUsuario + " " + styles.divUsuarioActivo
                : styles.divUsuario
            }
            onClick={() => setMenuPerfil(!menuPerfil)}
          >
            <img src={`http://localhost:3000/${user.image.imagePath}`} />
            <FontAwesomeIcon icon={faArrowDown} />
            {menuPerfil && (
              <div className={styles.menuPerfil}>
                <Link to={"perfil"}>
                  <FontAwesomeIcon icon={faUser} /> Perfil
                </Link>
                <Link to={"editPerfil"}>
                  <FontAwesomeIcon icon={faPencil} /> Editar Perfil
                </Link>
                <hr />
                <BotonLogout></BotonLogout>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
