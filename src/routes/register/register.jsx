import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../css/error.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useRegister } from "../../api/useRegister";
import { Link, useNavigate } from "react-router-dom";
import Plantilla from "../../components/plantilla/plantilla";
import { getPlantillasMasUsadas } from "../../services/plantillas";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Debe de rellenar este campo")
      .label("Nombre de usuario"),
    email: yup
      .string()
      .required("Debe de rellenar este campo")
      .email("Debe ser un correo electrónico")
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
    objetivoPeso: yup
      .number()
      .required("Debe de indicar su peso objetivo")
      .label("Peso objetivo"),
    sexo: yup
      .string()
      .required("Debe seleccionar un sexo")
      .oneOf(["M", "F"], "El sexo debe ser 'M' o 'F'"),
    altura: yup
      .number()
      .required("Debe indicar su altura")
      .min(120, "La altura mínima debe ser de 120 cm")
      .max(250, "La altura máxima debe ser de 250 cm"),
    nivelExperiencia: yup
      .string()
      .required("Debe seleccionar un nivel de experiencia")
      .oneOf(
        ["0", "1", "2"],
        "El nivel de experiencia debe ser 'Principiante', 'Intermedio' o 'Experto'"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const { userRegister, registerUser } = useRegister();
  const [fase, setFase] = useState(1);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [objetivoFisico, setObjetivoFisico] = useState("Mantenimiento");
  const [objetivoPeso, setObjetivoPeso] = useState(70);
  const [sexo, setSexo] = useState("M");
  const [altura, setAltura] = useState(170);
  const [nivelExperiencia, setNivelExperiencia] = useState(0);
  const [plantillasRecomendadas, setPlantillasRecomendadas] =
    useState(undefined);

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
    //cuando se ha registrado el usuario
    if (userRegister?.user) {
      setUser(userRegister.user);
      setFase(2);
      /* navigate("/"); */
    }
  }, [userRegister]);

  useEffect(() => {
    if (fase === 2) {
      const fetchPlantillas = async () => {
        const plantillas = await getPlantillasMasUsadas();
        const plantillasFiltradas = plantillas.filter(
          (plantilla) =>
            plantilla.dificultad == userRegister.user?.nivelExperiencia
        );
        setPlantillasRecomendadas(plantillasFiltradas);
      };
      fetchPlantillas();
    }
  }, [fase]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("objetivoFisico", objetivoFisico);
    formData.append("objetivoPeso", objetivoPeso);
    formData.append("sexo", sexo);
    formData.append("altura", altura);
    formData.append("nivelExperiencia", nivelExperiencia);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    registerUser(formData);
  };

  return (
    <>
      {fase < 2 && (
        <>
          <h1>Registro</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="formulario">
            <p
              className="msgError"
              style={{ display: error ? "block" : "none" }}
            >
              {userRegister?.message}
            </p>
            {fase === 0 && (
              <>
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
                </div>

                <div>
                  <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <p
                    className="msgError"
                    style={{
                      display: errors.confirmPassword ? "block" : "none",
                    }}
                  >
                    {errors.confirmPassword?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="">Foto de perfil</label>
                  {/* <input type="file" id="image"  {...register("image")}  /> */}
                  <input type="file" onChange={handleFileChange} id="image" />
                  <p
                    className="msgError"
                    style={{ display: errors.image ? "block" : "none" }}
                  >
                    {errors.image?.message}
                  </p>
                  {selectedFile && <img src={image} />}
                </div>

                <button
                  onClick={() => {
                    if (
                      username !== "" &&
                      email !== "" &&
                      password !== "" &&
                      confirmPassword !== ""
                    ) {
                      setFase(1);
                    }
                  }}
                >
                  Siguiente <FontAwesomeIcon icon={faArrowRight} />
                </button>

                <Link to={"/login"}>Ya tengo cuenta</Link>
              </>
            )}

            {fase === 1 && (
              <>
                <div>
                  <label htmlFor="objetivoFisico">Objetivo físico:</label>
                  <select
                    id="objetivoFisico"
                    {...register("objetivoFisico")}
                    value={objetivoFisico}
                    onChange={(e) => setObjetivoFisico(e.target.value)}
                  >
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Perdida grasa">Pérdida de peso</option>
                    <option value="Ganancia de peso">
                      Ganancia de masa muscular
                    </option>
                  </select>
                  <p
                    className="msgError"
                    style={{
                      display: errors.objetivoFisico ? "block" : "none",
                    }}
                  >
                    {errors.objetivoFisico?.message}
                  </p>
                </div>
                <div>
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
                  <label htmlFor="nivelExperiencia">
                    Nivel de experiencia:
                  </label>
                  <select
                    id="nivelExperiencia"
                    {...register("nivelExperiencia")}
                    value={nivelExperiencia}
                    onChange={(e) => setNivelExperiencia(e.target.value)}
                  >
                    <option value="0">Principiante</option>
                    <option value="1">Intermedio</option>
                    <option value="2">Experiencia</option>
                  </select>
                  <p
                    className="msgError"
                    style={{
                      display: errors.nivelExperiencia ? "block" : "none",
                    }}
                  >
                    {errors.nivelExperiencia?.message}
                  </p>
                </div>
                <div className={styles.botonesRegistros}>
                  <span onClick={() => setFase(0)}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                  </span>
                  <button type="submit">Registrarme</button>
                </div>
              </>
            )}
          </form>
        </>
      )}

      {fase === 2 && (
        <>
          <div className={styles.entrenamientosRecomenadados}>
            <h2>¡Entrenamientos recomendados para ti!</h2>
            <Link to={"/nuevaPlantilla"}>
              <button className="btnPrincipal">Crear Plantilla</button>
            </Link>
            <div className={styles.plantillas}>
              {plantillasRecomendadas &&
                plantillasRecomendadas.map((plantilla, cont) => {
                  if (cont < 6) {
                    return (
                      <Plantilla key={plantilla.id} plantilla={plantilla} />
                    );
                  }
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
