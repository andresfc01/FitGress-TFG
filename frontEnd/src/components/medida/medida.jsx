import { useState } from "react";
import styles from "./styles.module.css";

export default function Medida({
  medida,
  parte,
  medidaAnt,
  objetivo,
  onEdit,
  onDelete,
} = props) {
  const [editing, setEditing] = useState(false);
  const [newMedida, setNewMedida] = useState(medida.medida);

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

  const diferencia = medidaAnt ? medida.medida - medidaAnt.medida : null;
  let claseMedida = "";

  if (objetivo === "Perdida grasa") {
    claseMedida = diferencia < 0 ? 1 : 0;
  } else if (objetivo === "Ganancia medida") {
    claseMedida = diferencia > 0 ? 1 : 0;
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(medida._id);
    setEditing(false);
  };

  const handleConfirmClick = () => {
    onEdit(medida._id, newMedida);
    setEditing(false);
  };

  return (
    medida && (
      <div className={styles.medida}>
        {editing ? (
          <>
            <label htmlFor="">Medida : </label>
            <input
              type="text"
              value={newMedida}
              onChange={(e) => setNewMedida(e.target.value)}
            />

            <p onClick={handleConfirmClick}>✅</p>
            <p onClick={handleDeleteClick}>❌</p>
          </>
        ) : (
          <>
            <p>{parte}</p>
            <p>
               <strong>{medida.medida}cm.</strong>
            </p>
            <small>
              <i>{convertirFecha(medida.fecha)}</i>
            </small>
            <p
              className={
                claseMedida === 1
                  ? styles.medidaCorrecto
                  : styles.medidaIncorrecto
              }
            >
              {diferencia > 0 ? `+${diferencia}cm.` : `${diferencia}cm.`}
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
