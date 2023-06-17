import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../css/error.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useLogin } from "../../api/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Debe de rellenar este campo")
      .email("Debe ser un correo electronico")
      .label("Email"),
    password: yup
      .string()
      .min(4, "Debe tener mínimo 4 caracteres")
      .max(40, "Debe tener máximo 40 caracteres")
      .required("Debe de rellenar este campo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const { userLogin, loginUser } = useLogin();
  const [error, setError] = useState(null);
  const [typePassword, setTypePassword] = useState(true);

  useEffect(() => {
    if (userLogin?.status != 200) {
      setError(userLogin?.message);
    }
    if (userLogin?.user) {
      setUser(userLogin.user);
      navigate("/");
    }
  }, [userLogin]);

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <>
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <p className="msgError" style={{ display: error ? "block" : "none" }}>
          {userLogin?.message}
        </p>
        <div>
          <label htmlFor="">Correo Electronico</label>
          <input type="text" {...register("email")} />
          <p
            className="msgError"
            style={{ display: errors.email ? "block" : "none" }}
          >
            {errors.email?.message}
          </p>
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input
            type={typePassword ? "password" : "text"}
            {...register("password")}
          />
          <FontAwesomeIcon
            className="ojoContrasena"
            icon={faEye}
            onClick={() => setTypePassword(!typePassword)}
          />
          <p
            className="msgError"
            style={{ display: errors.password ? "block" : "none" }}
          >
            {errors.password?.message}
          </p>
        </div>

        <input type="submit" value="Iniciar sesion" className="btnPrincipal" />
        <Link to={"/perfil/restauraContrasena"}>
          ¿Has olvidado tu contraseña?
        </Link>
        <Link to={"/register"}>Crear cuenta</Link>
      </form>
    </>
  );
};

export default Form;
