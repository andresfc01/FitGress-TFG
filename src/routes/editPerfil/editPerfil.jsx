import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../css/error.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useUpdateUser } from "../../api/useUpdateRegister";
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
    objetivoFisico: yup
      .string()
      .required("Debe de seleccionar un objetivo físico")
      .label("Objetivo físico"),
    sexo: yup.string().required("Debe de seleccionar un sexo").label("Sexo"),
    altura: yup.number().required("Debe introducir una altura").label("Altura"),
    nivelExperiencia: yup
      .number()
      .required("Debe seleccionar su experiencia")
      .label("Experiencia"),
    image: yup.mixed(),
    /* .test(
        "fileType",
        "Debe de ser un archivo de imagen",
        (value) => value && value[0] && value[0].type.startsWith("image/")
      ) */ pesoObjetivo: yup
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
  const { user, setUser } = useContext(AppContext);
  const { userUpdate, updateUser } = useUpdateUser();
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [objetivoFisico, setObjetivoFisico] = useState(user?.objetivoFisico);
  const [nivelExperiencia, setNivelExperiencia] = useState(
    user?.nivelExperiencia ?? 0
  );
  const [sexo, setSexo] = useState(user?.sexo ?? "M");
  const [pesoObjetivo, setPesoObjetivo] = useState(
    user?.pesoObjetivo !== undefined ? parseInt(user?.pesoObjetivo) : ""
  );
  const [altura, setAltura] = useState(
    user?.altura !== undefined ? parseInt(user?.altura) : ""
  );
  const [image, setImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Puedes validar el tipo y tamaño del archivo aquí
    setSelectedFile(selectedFile);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (userUpdate?.status != 200) {
      setError(userUpdate?.message);
    }
    if (userUpdate?.user) {
      setUser(userUpdate.user);
    }
  }, [userUpdate]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", user?._id);
    formData.append("username", username);
    formData.append("email", email);
    /* if (password !== "") {
      formData.append("password", password);
    } else { */
    formData.append("password", user?.password);

    formData.append("objetivoFisico", objetivoFisico);
    formData.append("pesoObjetivo", pesoObjetivo);
    formData.append("altura", altura);
    formData.append("nivelExperiencia", nivelExperiencia);
    formData.append("sexo", sexo);
    if (selectedFile !== null) {
      formData.append("image", selectedFile);
    }
    updateUser(formData);
  };

  return (
    <>
      <h1>Edita tu perfil</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <p className="msgError" style={{ display: error ? "block" : "none" }}>
          {userUpdate?.message}
        </p>
        <div>
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
        </div>
        <div>
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
        </div>

        <div>
          <label htmlFor="objetivoFisico">Objetivo físico:</label>

          <select
            id="objetivoFisico"
            {...register("objetivoFisico")}
            value={objetivoFisico}
            onChange={(e) => setObjetivoFisico(e.target.value)}
          >
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Perdida grasa">Pérdida de grasa</option>
            <option value="Ganancia de peso">Ganancia de masa muscular</option>
          </select>
          <p
            className="msgError"
            style={{ display: errors.objetivoFisico ? "block" : "none" }}
          >
            {errors.objetivoFisico?.message}
          </p>
        </div>

        <div>
          <label htmlFor="nivelExperiencia">Experiencia:</label>

          <select
            id="nivelExperiencia"
            {...register("nivelExperiencia")}
            value={nivelExperiencia}
            onChange={(e) => setNivelExperiencia(e.target.value)}
          >
            <option value="0">Principiante</option>
            <option value="1">Intermedio</option>
            <option value="2">Experto</option>
          </select>
          <p
            className="msgError"
            style={{ display: errors.nivelExperiencia ? "block" : "none" }}
          >
            {errors.nivelExperiencia?.message}
          </p>
        </div>

        <div>
          <label htmlFor="pesoObjetivo">Meta de peso:</label>
          <input
            type="number"
            id="pesoObjetivo"
            {...register("pesoObjetivo")}
            value={pesoObjetivo}
            onChange={(e) => setPesoObjetivo(e.target.value)}
          />
          <p
            className="msgError"
            style={{ display: errors.pesoObjetivo ? "block" : "none" }}
          >
            {errors.pesoObjetivo?.message}
          </p>
        </div>

        <div>
          <label htmlFor="altura">Altura:</label>
          <input
            type="number"
            id="altura"
            {...register("altura")}
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
          <p
            className="msgError"
            style={{ display: errors.altura ? "block" : "none" }}
          >
            {errors.altura?.message}
          </p>
        </div>

        <div>
          <label htmlFor="sexo">Sexo:</label>

          <select
            id="sexo"
            {...register("sexo")}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <p
            className="msgError"
            style={{ display: errors.sexo ? "block" : "none" }}
          >
            {errors.sexo?.message}
          </p>
        </div>

        <div>
          <label htmlFor="">Imagen</label>
          <img src={"http://localhost:3000/" + user?.image?.imagePath} alt="" />
          <input type="file" onChange={handleFileChange} id="image" />
          <p
            className="msgError"
            style={{ display: errors.image ? "block" : "none" }}
          >
            {errors.image?.message}
          </p>
        </div>
        {selectedFile && <img src={image} />}

        <button type="submit">Guardar</button>
      </form>
    </>
  );
};

export default Form;
