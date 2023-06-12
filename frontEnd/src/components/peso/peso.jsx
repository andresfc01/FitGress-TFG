import { useState } from "react";
import styles from "./styles.module.css";

export default function Peso({
  peso,
  pesoAnt,
  objetivo,
  onEdit,
  onDelete,
} = props) {
  const [editing, setEditing] = useState(false);
  const [newPeso, setNewPeso] = useState(peso.peso);

  function convertirFecha(fechaString) {
    var fecha = new Date(fechaString); // Crea un objeto Date a partir de la cadena de fecha

    var dia = fecha.getDate(); // Obtiene el día del mes
    var mes = fecha.getMonth() + 1; // Obtiene el mes (recuerda que los meses van de 0 a 11)
    var anio = fecha.getFullYear().toString().slice(-2); // Obtiene el año y toma los últimos dos dígitos

    // Asegúrate de que el día y el mes tengan siempre dos dígitos
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }

    var fechaConvertida = dia + "/" + mes + "/" + anio; // Crea la cadena de fecha en el nuevo formato
    return fechaConvertida;
  }

  const diferencia = pesoAnt ? peso.peso - pesoAnt.peso : null;
  let clasePeso = "";

  if (objetivo === "Perdida grasa") {
    clasePeso = diferencia < 0 ? 1 : 0;
  } else if (objetivo === "Ganancia peso") {
    clasePeso = diferencia > 0 ? 1 : 0;
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(peso._id);
    setEditing(false);
  };

  const handleConfirmClick = () => {
    onEdit(peso._id, newPeso);
    setEditing(false);
  };

  return (
    peso && (
      <div className={styles.peso}>
        {editing ? (
          <>
          <label htmlFor="">Peso : </label>
            <input
              type="text"
              value={newPeso}
              onChange={(e) => setNewPeso(e.target.value)}
            />
            
            <p onClick={handleConfirmClick}>✅</p>
            <p onClick={handleDeleteClick}>❌</p>
          </>
        ) : (
          <>
            <p>
              Peso : <strong>{peso.peso}Kg.</strong>
            </p>
            <small>
              <i>{convertirFecha(peso.fecha)}</i>
            </small>
            <p
              className={
                clasePeso === 1 ? styles.pesoCorrecto : styles.pesoIncorrecto
              }
            >
              {diferencia > 0 ? `+${diferencia}kg.` : `${diferencia}kg.`}
            </p>
            <p className={styles.editar} onClick={handleEditClick}>
              ✏️
            </p>
          </>
        )}
      </div>
    )
  );
}
