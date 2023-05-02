import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../css/error.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useRegister } from "../../api/useRegister";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Debe de rellenar este campo")
      .label("Nombre de usuario"),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Debe confirmar la contraseña"),
    objetivoFisico: yup
      .string()
      .required("Debe de seleccionar un objetivo físico")
      .label("Objetivo físico"),
    image: yup.mixed(),
    /* .test(
        "fileType",
        "Debe de ser un archivo de imagen",
        (value) => value && value[0] && value[0].type.startsWith("image/")
      ) */ objetivoPeso: yup
      .number()
      .required("Debe de indicar su peso objetivo")
      .label("Peso objetivo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const { userRegister, registerUser } = useRegister();
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [objetivoFisico, setObjetivoFisico] = useState("Mantenimiento");
  const [objetivoPeso, setObjetivoPeso] = useState(70);
  const [image, setImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Puedes validar el tipo y tamaño del archivo aquí
    setSelectedFile(selectedFile);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (userRegister?.status != 200) {
      setError(userRegister?.message);
    }
    if (userRegister?.user) {
      setUser(userRegister.user);
      navigate("/");
    }
  }, [userRegister]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("objetivoFisico", objetivoFisico);
    formData.append("objetivoPeso", objetivoPeso);
    formData.append("image", selectedFile);
    registerUser(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="msgError" style={{ display: error ? "block" : "none" }}>
        {userRegister?.message}
      </p>
      <label htmlFor="username">Nombre de usuario:</label>
      <input
        type="text"
        id="username"
        {...register("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p
        className="msgError"
        style={{ display: errors.username ? "block" : "none" }}
      >
        {errors.username?.message}
      </p>

      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="text"
        id="email"
        {...register("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p
        className="msgError"
        style={{ display: errors.email ? "block" : "none" }}
      >
        {errors.email?.message}
      </p>

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        {...register("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p
        className="msgError"
        style={{ display: errors.password ? "block" : "none" }}
      >
        {errors.password?.message}
      </p>

      <label htmlFor="confirmPassword">Confirmar contraseña:</label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
      />
      <p
        className="msgError"
        style={{ display: errors.confirmPassword ? "block" : "none" }}
      >
        {errors.confirmPassword?.message}
      </p>

      <label htmlFor="objetivoFisico">Objetivo físico:</label>
      <select
        id="objetivoFisico"
        {...register("objetivoFisico")}
        value={objetivoFisico}
        onChange={(e) => setObjetivoFisico(e.target.value)}
      >
        <option value="Mantenimiento">Mantenimiento</option>
        <option value="Perdida grasa">Pérdida de peso</option>
        <option value="Ganancia de peso">Ganancia de masa muscular</option>
      </select>
      <p
        className="msgError"
        style={{ display: errors.objetivoFisico ? "block" : "none" }}
      >
        {errors.objetivoFisico?.message}
      </p>

      <label htmlFor="objetivoPeso">Meta de peso:</label>
      <input
        type="number"
        id="objetivoPeso"
        {...register("objetivoPeso")}
        value={objetivoPeso}
        onChange={(e) => setObjetivoPeso(e.target.value)}
      />
      <p
        className="msgError"
        style={{ display: errors.objetivoPeso ? "block" : "none" }}
      >
        {errors.objetivoPeso?.message}
      </p>

      {/* <input type="file" id="image"  {...register("image")}  /> */}
      <input type="file" onChange={handleFileChange} id="image" />
      <p
        className="msgError"
        style={{ display: errors.image ? "block" : "none" }}
      >
        {errors.image?.message}
      </p>
      {selectedFile && <img src={image} />}

      <button type="submit">Registrarme</button>
    </form>
  );
};

export default Form;
