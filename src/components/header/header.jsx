import styles from "./styles.module.css";
import { BrowserRouter, NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import BotonLogout from "../botonLogout/botonLogout";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <>
      {user?.ima}
      <nav>
        <ul>
          <li>
            <Link to={""}>Home</Link>
          </li>
          <li>
            <Link to={"plantillas"}>Plantillas</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to={"login"}>Login</Link>
              </li>
              <li>
                <Link to={"register"}>Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <BotonLogout></BotonLogout>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
