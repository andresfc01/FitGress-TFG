import { useParams } from "react-router-dom";
import style from "./styles.module.css";
import React from "react";
import RealizarEntreno from "../../components/realizarEntreno/realizarEntreno";

export default function realizarEntreno() {
  const { id } = useParams();
  return (
    <>
      <RealizarEntreno idPlantilla={id} />
    </>
  );
}
