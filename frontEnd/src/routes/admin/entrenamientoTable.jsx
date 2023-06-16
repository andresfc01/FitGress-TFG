import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Switch,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { deleteEntrenamiento, saveEntreno } from "../../services/entrenos";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { searchUsers } from "../../services/user";
import { DateField } from "@mui/x-date-pickers";
import { getPlantillasUserPopulated } from "../../services/plantillas";
import { AppContext } from "../../App";

const EntrenamientoTable = ({ entrenamientos: entrenamientoAll, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [entrenamientos, setEntrenamientos] = useState([...entrenamientoAll]);
  const [searchEntrenamientoName, setSearchEntrenamientoName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedEntrenamiento, setEditedEntrenamiento] = useState(null);

  useEffect(() => {
    setEntrenamientos(entrenamientoAll);
  }, []);

  useEffect(() => {
    if (searchEntrenamientoName !== "") {
      const filteredEntrenamientos = entrenamientoAll.filter((entrenamiento) =>
        entrenamiento.user.username
          .toLowerCase()
          .includes(searchEntrenamientoName.toLowerCase())
      );
      setEntrenamientos(filteredEntrenamientos);
      setPage(0);
    } else {
      if (entrenamientos !== entrenamientoAll) {
        setEntrenamientos(entrenamientoAll);
      }
    }
  }, [searchEntrenamientoName]);

  var paginatedEntrenamientos = entrenamientos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (entrenamientoId) => {
    const entrenamiento = entrenamientos.find(
      (entrenamiento) => entrenamiento?._id === entrenamientoId
    );
    setEditedEntrenamiento(entrenamiento);
    setEditing(true);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleDeleteConfirmationOpen = (entrenamientoId) => {
    setDeleteConfirmation(entrenamientoId);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation(null);
  };

  const handleSaveClick = async () => {
    setEditing(false);
    setCreating(false);
  };

  const handleDeleteConfirmationConfirm = async () => {
    if (deleteConfirmation) {
      await deleteEntrenamiento(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de entrenamientoAll
      setEntrenamientos(
        entrenamientos.filter(
          (entrenamiento) => entrenamiento?._id !== deleteConfirmation
        )
      );

      setDeleteConfirmation(null);

      setAlertText("Entrenamiento borrado");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
  };

  const sortedEntrenamientos = orderBy
    ? [...entrenamientos].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : entrenamientos;

  paginatedEntrenamientos = sortedEntrenamientos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateEntrenamiento = (updatedEntrenamiento) => {
    setEntrenamientos((prevEntrenamientos) => {
      const updatedEntrenamientos = prevEntrenamientos.map((entrenamiento) =>
        entrenamiento._id === updatedEntrenamiento._id
          ? updatedEntrenamiento
          : entrenamiento
      );
      return updatedEntrenamientos;
    });
    setEditing(false);
  };
  const createEntrenamiento = (newEntrenamiento) => {
    setEntrenamientos((prevEntrenamientos) => {
      const updatedEntrenamientos = prevEntrenamientos.map((entrenamiento) =>
        entrenamiento._id === newEntrenamiento._id
          ? newEntrenamiento
          : entrenamiento
      );
      return updatedEntrenamientos;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por usuario</label>
        <input
          type="text"
          value={searchEntrenamientoName}
          onChange={(e) => setSearchEntrenamientoName(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Entrenamiento {editedEntrenamiento.nombre}</p>
              <EditEntrenamientoForm
                entrenamiento={editedEntrenamiento}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateEntrenamiento={updateEntrenamiento} // Pasa la función updateEntrenamiento
              />
            </div>
          </div>
        </Modal>
      )}

      {/* {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Entrenamiento</p>
              <CreateEntrenamientoForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateEntrenamiento={createEntrenamiento} // Pasa la función updateEntrenamiento
              />
            </div>
          </div>
        </Modal>
      )} */}
      <div className="tablaAdmin">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "plantilla"}
                    direction={order}
                    onClick={() => handleSortChange("plantilla")}
                  >
                    Plantilla
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "user"}
                    direction={order}
                    onClick={() => handleSortChange("user")}
                  >
                    Usuario
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "fecha"}
                    direction={order}
                    onClick={() => handleSortChange("fecha")}
                  >
                    Fecha
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "sensaciones"}
                    direction={order}
                    onClick={() => handleSortChange("sensaciones")}
                  >
                    Sensaciones
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "duracion"}
                    direction={order}
                    onClick={() => handleSortChange("duracion")}
                  >
                    Duracion
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "comentario"}
                    direction={order}
                    onClick={() => handleSortChange("comentario")}
                  >
                    Comentario
                  </TableSortLabel>
                </TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedEntrenamientos.map((entrenamiento) => (
                <TableRow key={entrenamiento._id}>
                  <TableCell>{entrenamiento.plantilla?.nombre}</TableCell>
                  <TableCell>{entrenamiento.user?.username}</TableCell>
                  <TableCell>{entrenamiento.fecha}</TableCell>

                  <TableCell>
                    {entrenamiento.sensaciones == 0
                      ? "Mal"
                      : entrenamiento.sensaciones == 1
                      ? "Normal"
                      : entrenamiento.sensaciones == 2
                      ? "Bien"
                      : ""}
                  </TableCell>
                  <TableCell>{entrenamiento.duracion}s.</TableCell>
                  <TableCell>{entrenamiento.comentario}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(entrenamiento._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteConfirmationOpen(entrenamiento._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TablePagination
        className="paginacion"
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={entrenamientos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count}`
        }
        labelRowsPerPage="Filas por página"
      />

      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirmar Eliminacion</DialogTitle>
        <DialogContent>
          <p>¿Seguro que quieres borrar esta entrenamiento?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmationConfirm} color="error">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const EditEntrenamientoForm = ({
  entrenamiento,
  onSave,
  onCancel,
  onUpdateEntrenamiento,
  token,
}) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [editedEntrenamiento, setEditedEntrenamiento] = useState({
    ...entrenamiento,
  });
  const [users, setUsers] = useState(undefined);
  const [plantillas, setPlantillas] = useState(undefined);

  useEffect(() => {
    if (entrenamiento) {
      setEditedEntrenamiento(entrenamiento);
    }

    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };
    const fetchPlantillas = async (token) => {
      const usuarios = await getPlantillasUserPopulated(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };

    fetchPlantillas(token);
    fetchUsers(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEntrenamiento((prevEntrenamiento) => ({
      ...prevEntrenamiento,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedEntrenamiento((prevEntrenamiento) => ({
      ...prevEntrenamiento,
      image: file,
    }));
  };

  const handleSave = async () => {
    const savedEntrenamiento = await saveEntreno(editedEntrenamiento, token);
    if (savedEntrenamiento) {
      setEditedEntrenamiento(savedEntrenamiento);
      onUpdateEntrenamiento(editedEntrenamiento);

      setAlertText("Entrenamiento guardado");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
    onSave();
  };

  const currentDate = new Date();
  const currentDateTime = currentDate.toISOString().slice(0, 16);

  return (
    <div className="editItem">
      <FormControl>
        <InputLabel id="user-label">Usuario</InputLabel>
        <Select
          labelId="user-label"
          id="user-select"
          name="user"
          value={editedEntrenamiento?.user?._id || ""}
          onChange={handleInputChange}
        >
          {users &&
            users.map((user) => {
              return (
                <MenuItem value={user._id} key={user._id}>
                  {user.username}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="plantilla-label">Plantillas</InputLabel>
        <Select
          labelId="plantilla-label"
          id="plantilla-select"
          name="plantilla"
          value={editedEntrenamiento?.plantilla?._id || ""}
          onChange={handleInputChange}
        >
          {plantillas &&
            plantillas.map((plantilla) => {
              return (
                <MenuItem value={plantilla._id} key={plantilla._id}>
                  {plantilla.nombre}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <input
        type="datetime-local"
        name="fecha"
        value={editedEntrenamiento?.fecha.slice(0, 16) ?? currentDateTime}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="sensaciones-label">Sensaciones</InputLabel>
        <Select
          labelId="sensaciones-label"
          id="sensaciones-select"
          name="sensaciones"
          value={editedEntrenamiento.sensaciones}
          onChange={handleInputChange}
        >
          <MenuItem value="0">Mal</MenuItem>
          <MenuItem value="1">Normal</MenuItem>
          <MenuItem value="2">Bien</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="duracion"
        label="duracion"
        value={editedEntrenamiento?.duracion}
        onChange={handleInputChange}
      />
      <TextField
        name="comentario"
        label="comentario"
        value={editedEntrenamiento?.comentario}
        onChange={handleInputChange}
      />

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

/* const CreateEntrenamientoForm = ({
  entrenamiento,
  onSave,
  onCancel,
  onUpdateEntrenamiento,
  token,
}) => {
  const [newEntrenamiento, setNewEntrenamiento] = useState({
    user: { _id: "646b8ae253b2fa401a743f06" },
    nombre: "",
    privado: false,
    dificultad: "0",
    diasSemana: [],
    series: [],
  });
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };

    fetchUsers(token);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedEjercicio((prevEjercicio) => ({ ...prevEjercicio, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "user") {
      // Buscar el objeto de usuario correspondiente al valor seleccionado
      const selectedUser = users.find((user) => user._id === value);
      // Establecer el objeto de usuario completo en lugar de solo el ID
      newValue = selectedUser || null;
    }
    const entrenamientoUpdated = { ...newEntrenamiento, [name]: newValue };
    setNewEntrenamiento(entrenamientoUpdated);
  };

  const handleSave = async () => {
    const savedEntrenamiento = await saveEntreno(newEntrenamiento, token);
    if (savedEntrenamiento) {
      setNewEntrenamiento(saveEntreno); // Actualiza el usuario en la tabla
      onUpdateEntrenamiento(newEntrenamiento);
    }
    onSave();
  };

  const handleSwitchChange = (event) => {
    setNewEntrenamiento({
      ...newEntrenamiento,
      privado: !newEntrenamiento.privado,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (newEntrenamiento.diasSemana.includes(value)) {
      setNewEntrenamiento((prevEntrenamiento) => ({
        ...prevEntrenamiento,
        diasSemana: prevEntrenamiento.diasSemana.filter(
          (selected) => selected !== value
        ),
      }));
    } else {
      setNewEntrenamiento((prevEntrenamiento) => ({
        ...prevEntrenamiento,
        diasSemana: [...prevEntrenamiento.diasSemana, value],
      }));
    }
  };

  return (
    <>
      <div className="editItem">
        <FormControl>
          <InputLabel id="user-label">Usuario</InputLabel>
          <Select
            labelId="user-label"
            id="user-select"
            name="user"
            value={newEntrenamiento?.user?._id}
            onChange={handleInputChange}
          >
            {users &&
              users.map((user) => (
                <MenuItem value={user._id} key={user._id}>
                  {user.username}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          name="nombre"
          label="Nombre"
          value={newEntrenamiento?.nombre}
          onChange={handleInputChange}
        />
        <div className="diasSemanaEdit">
          <FormControl component="fieldset">
            <FormGroup>
              {diasSemanaOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={
                        newEntrenamiento.diasSemana.length > 0
                          ? newEntrenamiento.diasSemana.includes(option.value)
                          : false
                      }
                      onChange={handleCheckboxChange}
                      value={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={newEntrenamiento?.privado}
                  onChange={handleSwitchChange}
                />
              }
              label="Campo privado"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <InputLabel id="dificultad-label">Dificultad</InputLabel>
          <Select
            labelId="dificultad-label"
            id="dificultad-select"
            name="dificultad"
            value={newEntrenamiento.dificultad}
            onChange={handleInputChange}
          >
            <MenuItem value="0">Facil</MenuItem>
            <MenuItem value="1">Medio</MenuItem>
            <MenuItem value="2">Dificil</MenuItem>
          </Select>
        </FormControl>
        <div>
          <img
            src={`http://localhost:3000/${newEntrenamiento?.image?.imagePath}`}
            alt=""
          />
          <label htmlFor="">Imagen</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="botonesEdit">
          <Button onClick={handleSave}>Guardar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </>
  );
}; */

export default EntrenamientoTable;
