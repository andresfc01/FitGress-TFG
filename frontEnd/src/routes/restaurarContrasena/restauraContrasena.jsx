import { useContext, useEffect, useState } from "react";
import { sendEmailRestaurarContrasena } from "../../services/email";
import { changePassword } from "../../services/user";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function generateRandomCode() {
  let code = "";

  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 10); // Genera un número aleatorio del 0 al 9
    code += randomNumber;
  }

  return code;
}

export default function App() {
  const navigate = useNavigate();

  const { user, setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState(generateRandomCode());
  const [inputCode, setInputCode] = useState("");
  const [fase, setFase] = useState(0);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [error, setError] = useState(undefined);
  const [contrasena, setContrasena] = useState("");
  const [contrasena2, setContrasena2] = useState("");

  const [typePassword, setTypePassword] = useState(true);
  const [typePassword2, setTypePassword2] = useState(true);

  useEffect(() => {
    if (fase == 1 && !emailEnviado) {
      sendEmailRestaurarContrasena(email, code);
      setEmailEnviado(true);
    }
  }, [fase]);
  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setFase(2);
    }
  }, [user]);

  return (
    <>
      {fase == 0 && (
        <div className="formulario">
          {error && <p className="msgError">{error}</p>}
          <p>Introduce tu correo electronico</p>
          <div>
            <label htmlFor="">Correo electronico</label>
            <input
              type="text"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (email != "") {
                setFase(1);
                setError(undefined);
              } else {
                setError("Debes rellenar el email");
              }
            }}
          >
            Siguiente
          </button>
        </div>
      )}
      {fase == 1 && (
        <div className="formulario">
          {error && <p className="msgError">{error}</p>}
          <p>Accede a tu correo electronico para obtener el codigo</p>
          <div>
            <label htmlFor="">Codigo</label>
            <input
              type="text"
              value={inputCode}
              onChange={(ev) => setInputCode(ev.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (code == inputCode) {
                setError(undefined);
                setFase(2);
              } else {
                setError("El codigo no coincide");
              }
            }}
          >
            Siguiente
          </button>
        </div>
      )}
      {fase == 2 && (
        <div className="formulario">
          {error && <p className="msgError">{error}</p>}
          <p>Escribe tu nueva contraseña</p>
          <div className="divPassword">
            <label htmlFor="">Contraseña</label>
            <input
              type={typePassword ? "password" : "text"}
              value={contrasena}
              onChange={(ev) => setContrasena(ev.target.value)}
            />
            <FontAwesomeIcon
              className="ojoContrasena"
              icon={faEye}
              onClick={() => setTypePassword(!typePassword)}
            />
          </div>
          <div className="divPassword">
            <label htmlFor="">Repite la contraseña</label>
            <input
              type={typePassword2 ? "password" : "text"}
              value={contrasena2}
              onChange={(ev) => setContrasena2(ev.target.value)}
            />
            <FontAwesomeIcon
              className="ojoContrasena"
              icon={faEye}
              onClick={() => setTypePassword2(!typePassword2)}
            />
          </div>
          <button
            onClick={async () => {
              if (contrasena === contrasena2) {
                setError(undefined);
                const status = await changePassword(email, contrasena);
                if (status == 200) {
                  setAlertText("Contraseña actualizada");
                  setAlertTypeSuccess(true);
                  setShowAlert(true);

                  navigate("/login");
                } else {
                  setError("Ha habido un error");
                }
              } else {
                setError("Las contraseñas deben coincidir");
              }
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
