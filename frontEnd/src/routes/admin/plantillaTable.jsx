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
import { deletePlantilla, savePlantilla } from "../../services/plantillas";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { searchUsers } from "../../services/user";
import { DateField } from "@mui/x-date-pickers";
import { AppContext } from "../../App";

const PlantillaTable = ({ plantillas: plantillaAll, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [plantillas, setPlantillas] = useState([...plantillaAll]);
  const [searchPlantillaName, setSearchPlantillaName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedPlantilla, setEditedPlantilla] = useState(null);

  useEffect(() => {
    setPlantillas(plantillaAll);
  }, []);

  useEffect(() => {
    if (searchPlantillaName !== "") {
      const filteredPlantillas = plantillaAll.filter((plantilla) =>
        plantilla.user.username
          .toLowerCase()
          .includes(searchPlantillaName.toLowerCase())
      );
      setPlantillas(filteredPlantillas);
      setPage(0);
    } else {
      if (plantillas !== plantillaAll) {
        setPlantillas(plantillaAll);
      }
    }
  }, [searchPlantillaName]);

  var paginatedPlantillas = plantillas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (plantillaId) => {
    const plantilla = plantillas.find(
      (plantilla) => plantilla?._id === plantillaId
    );
    setEditedPlantilla(plantilla);
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

  const handleDeleteConfirmationOpen = (plantillaId) => {
    setDeleteConfirmation(plantillaId);
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
      await deletePlantilla(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de plantillaAll
      setPlantillas(
        plantillas.filter((plantilla) => plantilla?._id !== deleteConfirmation)
      );

      setDeleteConfirmation(null);

      setAlertText("Plantilla eliminada");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
  };

  const sortedPlantillas = orderBy
    ? [...plantillas].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : plantillas;

  paginatedPlantillas = sortedPlantillas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updatePlantilla = (updatedPlantilla) => {
    setPlantillas((prevPlantillas) => {
      const updatedPlantillas = prevPlantillas.map((plantilla) =>
        plantilla._id === updatedPlantilla._id ? updatedPlantilla : plantilla
      );
      return updatedPlantillas;
    });
    setEditing(false);
  };
  const createPlantilla = (newPlantilla) => {
    setPlantillas((prevPlantillas) => {
      const updatedPlantillas = prevPlantillas.map((plantilla) =>
        plantilla._id === newPlantilla._id ? newPlantilla : plantilla
      );
      return updatedPlantillas;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre</label>
        <input
          type="text"
          value={searchPlantillaName}
          onChange={(e) => setSearchPlantillaName(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Plantilla {editedPlantilla.nombre}</p>
              <EditPlantillaForm
                plantilla={editedPlantilla}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdatePlantilla={updatePlantilla} // Pasa la función updatePlantilla
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Plantilla</p>
              <CreatePlantillaForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdatePlantilla={createPlantilla} // Pasa la función updatePlantilla
              />
            </div>
          </div>
        </Modal>
      )}
      <div className="tablaAdmin">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "nombre"}
                    direction={order}
                    onClick={() => handleSortChange("nombre")}
                  >
                    Nombre
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
                    active={orderBy === "diasSemana"}
                    direction={order}
                    onClick={() => handleSortChange("diasSemana")}
                  >
                    Dias Semana
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "privado"}
                    direction={order}
                    onClick={() => handleSortChange("privado")}
                  >
                    Privado
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "dificultad"}
                    direction={order}
                    onClick={() => handleSortChange("dificultad")}
                  >
                    Dificultad
                  </TableSortLabel>
                </TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedPlantillas.map((plantilla) => (
                <TableRow key={plantilla._id}>
                  <TableCell>{plantilla.nombre}</TableCell>
                  <TableCell>{plantilla.user?.username}</TableCell>
                  <TableCell>
                    {plantilla.diasSemana.map((dia) => dia + " ")}
                  </TableCell>
                  <TableCell>{plantilla.privado ? "Si" : "No"}</TableCell>
                  <TableCell>
                    {plantilla.dificultad == 0
                      ? "Facil"
                      : plantilla.dificultad == 1
                      ? "Medio"
                      : plantilla.dificultad == 2
                      ? "Dificil"
                      : ""}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3000/${plantilla?.image?.imagePath}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(plantilla._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteConfirmationOpen(plantilla._id)
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
        count={plantillas.length}
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
          <p>¿Seguro que quieres borrar esta plantilla?</p>
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

const diasSemanaOptions = [
  { value: "L", label: "Lunes" },
  { value: "M", label: "Martes" },
  { value: "X", label: "Miércoles" },
  { value: "J", label: "Jueves" },
  { value: "V", label: "Viernes" },
  { value: "S", label: "Sábado" },
  { value: "D", label: "Domingo" },
];

const EditPlantillaForm = ({
  plantilla,
  onSave,
  onCancel,
  onUpdatePlantilla,
  token,
}) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [editedPlantilla, setEditedPlantilla] = useState({ ...plantilla });
  const [users, setUsers] = useState(undefined);

  const handleSwitchChange = (event) => {
    setEditedPlantilla({
      ...editedPlantilla,
      privado: !editedPlantilla.privado,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (editedPlantilla.diasSemana.includes(value)) {
      setEditedPlantilla((prevPlantilla) => ({
        ...prevPlantilla,
        diasSemana: prevPlantilla.diasSemana.filter(
          (selected) => selected !== value
        ),
      }));
    } else {
      setEditedPlantilla((prevPlantilla) => ({
        ...prevPlantilla,
        diasSemana: [...prevPlantilla.diasSemana, value],
      }));
    }
  };

  useEffect(() => {
    if (plantilla) {
      setEditedPlantilla(plantilla);
    }

    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };

    fetchUsers(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlantilla((prevPlantilla) => ({
      ...prevPlantilla,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedPlantilla((prevPlantilla) => ({ ...prevPlantilla, image: file }));
  };

  const handleSave = async () => {
    const savedPlantilla = await savePlantilla(editedPlantilla, token);
    if (savedPlantilla) {
      setEditedPlantilla(savedPlantilla);
      onUpdatePlantilla(editedPlantilla);

      setAlertText("Plantilla guardada");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <FormControl>
        <InputLabel id="user-label">Usuario</InputLabel>
        <Select
          labelId="user-label"
          id="user-select"
          name="user"
          value={editedPlantilla?.user?._id || ""}
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

      <TextField
        name="nombre"
        label="Nombre"
        value={editedPlantilla?.nombre}
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
                    checked={editedPlantilla.diasSemana.includes(option.value)}
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
                checked={editedPlantilla?.privado}
                onChange={handleSwitchChange}
              />
            }
            label="Privado"
          />
        </FormGroup>
      </FormControl>
      <FormControl>
        <InputLabel id="dificultad-label">Dificultad</InputLabel>
        <Select
          labelId="dificultad-label"
          id="dificultad-select"
          name="dificultad"
          value={editedPlantilla.dificultad}
          onChange={handleInputChange}
        >
          <MenuItem value="0">Facil</MenuItem>
          <MenuItem value="1">Medio</MenuItem>
          <MenuItem value="2">Dificil</MenuItem>
        </Select>
      </FormControl>
      <div>
        <img
          src={`http://localhost:3000/${editedPlantilla?.image?.imagePath}`}
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
  );
};

const CreatePlantillaForm = ({
  plantilla,
  onSave,
  onCancel,
  onUpdatePlantilla,
  token,
}) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [newPlantilla, setNewPlantilla] = useState({
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
    const plantillaUpdated = { ...newPlantilla, [name]: newValue };
    setNewPlantilla(plantillaUpdated);
  };

  const handleSave = async () => {
    const savedPlantilla = await savePlantilla(newPlantilla, token);
    if (savedPlantilla) {
      setNewPlantilla(savePlantilla); // Actualiza el usuario en la tabla
      onUpdatePlantilla(newPlantilla);

      setAlertText("Plantilla guardada");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
    onSave();
  };

  const handleSwitchChange = (event) => {
    setNewPlantilla({
      ...newPlantilla,
      privado: !newPlantilla.privado,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (newPlantilla.diasSemana.includes(value)) {
      setNewPlantilla((prevPlantilla) => ({
        ...prevPlantilla,
        diasSemana: prevPlantilla.diasSemana.filter(
          (selected) => selected !== value
        ),
      }));
    } else {
      setNewPlantilla((prevPlantilla) => ({
        ...prevPlantilla,
        diasSemana: [...prevPlantilla.diasSemana, value],
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
            value={newPlantilla?.user?._id}
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
          value={newPlantilla?.nombre}
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
                        newPlantilla.diasSemana.length > 0
                          ? newPlantilla.diasSemana.includes(option.value)
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
                  checked={newPlantilla?.privado}
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
            value={newPlantilla.dificultad}
            onChange={handleInputChange}
          >
            <MenuItem value="0">Facil</MenuItem>
            <MenuItem value="1">Medio</MenuItem>
            <MenuItem value="2">Dificil</MenuItem>
          </Select>
        </FormControl>
        <div>
          <img
            src={`http://localhost:3000/${newPlantilla?.image?.imagePath}`}
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
};

export default PlantillaTable;
