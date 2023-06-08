import React, { createContext, useEffect, useRef } from "react";
import { Router, Route, BrowserRouter, Link, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import PlantillasUser from "./routes/plantillasUser/plantillasUser";
import EditPerfil from "./routes/editPerfil/editPerfil";
import Plantillas from "./routes/plantillas/plantillas";
import Ejercicios from "./routes/ejercicios/ejercicios";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import NuevaPlantilla from "./routes/nuevaPlantilla/nuevaPlantilla";
import Plantilla from "./routes/plantilla/plantilla";
import Entrenamiento from "./routes/entrenamiento/entrenamiento";
import RealizarEntreno from "./routes/realizarEntreno/realizarEntreno";
import EntrenamientosUser from "./routes/entrenamientosUser/entrenamientosUser";
import Perfil from "./routes/perfil/perfil";
import Home from "./routes/home/home";
import Admin from "./routes/admin/admin";
import CrudUser from "./routes/admin/crudUser";
import CrudLogro from "./routes/admin/crudLogro";
import CrudMedida from "./routes/admin/crudMedida";
import CrudGrupoMuscular from "./routes/admin/crudGrupoMuscular";
import CrudEjercicio from "./routes/admin/crudEjercicio";
import CrudPlantilla from "./routes/admin/crudPlantilla";
import CrudEntrenamiento from "./routes/admin/crudEntrenamiento";
import CrudPeso from "./routes/admin/crudPeso";
import CrudComentario from "./routes/admin/crudComentario";

export const AppContext = createContext();

function App() {
  const client = new QueryClient();
  const [user, setUser] = useState(null);
  const ref = useRef();

  useEffect(() => {
    // Obtener el usuario del localStorage
    const userFromStorage = localStorage.getItem("user");

    // Si el usuario existe en el localStorage, establecerlo en el contexto
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []); // Solo se ejecuta una vez al inicio

  //cada vez que cambia algo se guarda en local storage
  useEffect(() => {
    //si user no es null lo guardo
    user ? localStorage.setItem("user", JSON.stringify(user)) : "";
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Header />
          <div id="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/user" element={<CrudUser />} />
              <Route path="/admin/logro" element={<CrudLogro />} />
              <Route path="/admin/medida" element={<CrudMedida />} />
              <Route path="/admin/peso" element={<CrudPeso />} />
              <Route path="/admin/comentario" element={<CrudComentario />} />
              <Route
                path="/admin/grupoMuscular"
                element={<CrudGrupoMuscular />}
              />
              <Route path="/admin/ejercicio" element={<CrudEjercicio />} />
              <Route path="/admin/plantilla" element={<CrudPlantilla />} />
              <Route
                path="/admin/entrenamiento"
                element={<CrudEntrenamiento />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/explorar" element={<Plantillas />} />
              <Route path="/plantillas" element={<PlantillasUser />} />
              <Route path="/editPerfil" element={<EditPerfil />} />
              <Route path="/plantilla/:id" element={<Plantilla />} />
              <Route
                path="/realizarEntreno/:id"
                element={<RealizarEntreno />}
              />
              <Route path="/entreno/:id" element={<Entrenamiento />} />
              <Route path="/ejercicios" element={<Ejercicios />} />
              <Route path="/nuevaPlantilla" element={<NuevaPlantilla />} />
              <Route
                path="/perfil/entrenamientos"
                element={<EntrenamientosUser />}
              />
              <Route path="/perfil/" element={<Perfil />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<h1>PAG NO</h1>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
