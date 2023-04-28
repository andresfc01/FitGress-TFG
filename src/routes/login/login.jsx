import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../css/error.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useLogin } from "../../api/useLogin";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="msgError" style={{ display: error ? "block" : "none" }}>
        {userLogin?.message}
      </p>
      <input type="text" {...register("email")} />
      <p
        className="msgError"
        style={{ display: errors.email ? "block" : "none" }}
      >
        {errors.email?.message}
      </p>
      <input type="password" {...register("password")} />
      <p
        className="msgError"
        style={{ display: errors.password ? "block" : "none" }}
      >
        {errors.password?.message}
      </p>

      <input type="submit" value="Iniciar sesion" />
    </form>
  );
};

export default Form;
