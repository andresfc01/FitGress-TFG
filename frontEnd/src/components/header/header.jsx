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
  faCalendar,
  faDumbbell,
  faMagnifyingGlass,
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  const { user } = useContext(AppContext);
  const esAdmin =
    user?.roles &&
    user?.roles.length > 0 &&
    user?.roles.includes("640ed10308e23cd6654b5ebe");

  const [menuPerfil, setMenuPerfil] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className={esAdmin ? styles.headerAdmin : ""}>
        <Link to={""} className={styles.logo}>
          <img src="/src/assets/images/logoHorizontal-bw.png" />{" "}
        </Link>
        <FontAwesomeIcon
          onClick={() => setShowMenu(!showMenu)}
          className={styles.iconoMenu}
          icon={faBars}
        />
        <ul className={showMenu ? styles.showMenu : ""}>
          {esAdmin && (
            <li onClick={() => setShowMenu(false)}>
              <Link to={"/admin"}>
                <FontAwesomeIcon icon={faUser} /> Admin
              </Link>
            </li>
          )}
          <li onClick={() => setShowMenu(false)}>
            <Link to={"explorar"}>
              <FontAwesomeIcon icon={faMagnifyingGlass} /> Explorar
            </Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to={"plantillas"}>
              <FontAwesomeIcon icon={faCalendar} /> Plantillas
            </Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to={"ejercicios"}>
              <FontAwesomeIcon icon={faDumbbell} /> Ejercicios
            </Link>
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
            className={styles.divUsuario}
            onClick={() => setMenuPerfil(!menuPerfil)}
          >
            {user?.image?.imagePath ? (
              <img src={`http://localhost:3000/${user.image.imagePath}`} />
            ) : (
              <img src={`/src/assets/images/perfilUser.jpg`} />
            )}

            <FontAwesomeIcon icon={faArrowDown} />
            {menuPerfil && (
              <div
                className={`${styles.menuPerfil} ${styles.menuPerfilVisible}`}
              >
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
