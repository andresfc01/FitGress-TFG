import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const location = useLocation();
  const rutas = location.pathname.split("/");
  return (
    <div className="breadCrumbs">
      {rutas && rutas.length > 1 && (
        <>
          <Link to={"/"}>Inicio</Link>
        </>
      )}
      {rutas.map((ruta, cont) => {
        if (ruta !== "") {
          var enruta = "";
          var contador = cont;
          var rutaAnterior = rutas[contador - 1];
          var nombreRutaAnterior;
          while (rutaAnterior) {
            if (rutaAnterior !== "") {
              enruta += "/" + rutaAnterior;
              nombreRutaAnterior =
                rutaAnterior == "editPerfil" ? "Editar perfil" : rutaAnterior;
              contador--;
              rutaAnterior = rutas[contador - 1];
              return (
                <React.Fragment key={cont}>
                  <p>&gt;</p>
                  <Link to={enruta} key={cont}>
                    {capitalizeFirstLetter(nombreRutaAnterior)}
                  </Link>
                </React.Fragment>
              );
            }
          }
        }
      })}
      {/* {rutas && rutas.length > 1 && (
        <>
          <p>&gt;</p>
          <span>{capitalizeFirstLetter(rutas[rutas.length - 1])}</span>
        </>
      )} */}
    </div>
  );
};

export default Breadcrumbs;
