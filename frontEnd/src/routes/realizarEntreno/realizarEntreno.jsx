import { useParams } from "react-router-dom";
import style from "./styles.module.css";
import React from "react";
import RealizarEntreno from "../../components/realizarEntreno/realizarEntreno";
import { isLogged } from "../../components/isLogged";

export default function realizarEntreno() {
  isLogged();
  const { id } = useParams();
  return (
    <>
      <RealizarEntreno idPlantilla={id} />
    </>
  );
}
