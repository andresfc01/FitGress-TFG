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
import { deleteEjercicio, saveEjercicio } from "../../services/ejercicios";
import { NumberField } from "react-admin";
import { searchGruposMusculares } from "../../services/gruposMusculares";
import { AppContext } from "../../App";

const EjercicioTable = ({ ejercicios: ejercicioAll, token }) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [ejercicios, setEjercicios] = useState([...ejercicioAll]);
  const [searchEjercicioname, setSearchEjercicioname] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedEjercicio, setEditedEjercicio] = useState(null);

  useEffect(() => {
    setEjercicios(ejercicioAll);
  }, []);

  useEffect(() => {
    if (searchEjercicioname !== "") {
      const filteredEjercicios = ejercicioAll.filter((ejercicio) =>
        ejercicio.nombre
          .toLowerCase()
          .includes(searchEjercicioname.toLowerCase())
      );
      setEjercicios(filteredEjercicios);
      setPage(0);
    } else {
      if (ejercicios !== ejercicioAll) {
        setEjercicios(ejercicioAll);
      }
    }
  }, [searchEjercicioname]);

  var paginatedEjercicios = ejercicios.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (ejercicioId) => {
    const ejercicio = ejercicios.find(
      (ejercicio) => ejercicio?._id === ejercicioId
    );
    setEditedEjercicio(ejercicio);
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

  const handleDeleteConfirmationOpen = (ejercicioId) => {
    setDeleteConfirmation(ejercicioId);
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
      await deleteEjercicio(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de ejercicioAll
      setEjercicios(
        ejercicios.filter((ejercicio) => ejercicio?._id !== deleteConfirmation)
      );

      setDeleteConfirmation(null);

      setAlertText("Comentario borrado");
      setShowAlert(true);
    }
  };

  const sortedEjercicios = orderBy
    ? [...ejercicios].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : ejercicios;

  paginatedEjercicios = sortedEjercicios.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateEjercicio = (updatedEjercicio) => {
    setEjercicios((prevEjercicios) => {
      const updatedEjercicios = prevEjercicios.map((ejercicio) =>
        ejercicio._id === updatedEjercicio._id ? updatedEjercicio : ejercicio
      );
      return updatedEjercicios;
    });
    setEditing(false);
  };
  const createEjercicio = (newEjercicio) => {
    setEjercicios((prevEjercicios) => {
      const updatedEjercicios = prevEjercicios.map((ejercicio) =>
        ejercicio._id === newEjercicio._id ? newEjercicio : ejercicio
      );
      return updatedEjercicios;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre</label>
        <input
          type="text"
          value={searchEjercicioname}
          onChange={(e) => setSearchEjercicioname(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Ejercicio {editedEjercicio.name}</p>
              <EditEjercicioForm
                ejercicio={editedEjercicio}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateEjercicio={updateEjercicio} // Pasa la función updateEjercicio
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Ejercicio</p>
              <CreateEjercicioForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateEjercicio={createEjercicio} // Pasa la función updateEjercicio
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
                    active={orderBy === "descrip"}
                    direction={order}
                    onClick={() => handleSortChange("descrip")}
                  >
                    Descrip
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "parte"}
                    direction={order}
                    onClick={() => handleSortChange("parte")}
                  >
                    Parte
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
                <TableCell>Video</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedEjercicios.map((ejercicio) => (
                <TableRow key={ejercicio._id}>
                  <TableCell>{ejercicio.nombre}</TableCell>
                  <TableCell>{ejercicio.descrip}</TableCell>
                  <TableCell>{ejercicio.grupoMuscular?.nombre}</TableCell>
                  <TableCell>
                    {ejercicio.dificultad == 0
                      ? "Facil"
                      : ejercicio.dificultad == 1
                      ? "Medio"
                      : ejercicio.dificultad == 2
                      ? "Dificil"
                      : ""}
                  </TableCell>
                  <TableCell>
                    <video
                      src={`http://localhost:3000/${ejercicio?.image?.imagePath}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(ejercicio._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteConfirmationOpen(ejercicio._id)
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
        count={ejercicios.length}
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
          <p>¿Seguro que quieres borrar este ejercicio?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmationConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const EditEjercicioForm = ({
  ejercicio,
  onSave,
  onCancel,
  onUpdateEjercicio,
  token,
}) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [editedEjercicio, setEditedEjercicio] = useState({ ...ejercicio });
  const [gruposMusculares, setGruposMusculares] = useState(undefined);

  useEffect(() => {
    if (ejercicio) {
      setEditedEjercicio(ejercicio);
    }

    const fetchGrupos = async (token) => {
      const grupos = await searchGruposMusculares(token);
      if (grupos) {
        setGruposMusculares(grupos);
      }
    };

    fetchGrupos(token);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedEjercicio((prevEjercicio) => ({ ...prevEjercicio, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "grupoMuscular") {
      setEditedEjercicio((prevEjercicio) => ({
        ...prevEjercicio,
        [name]: { _id: value },
      }));
    } else {
      setEditedEjercicio((prevEjercicio) => ({
        ...prevEjercicio,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const savedEjercicio = await saveEjercicio(editedEjercicio, token);
    if (savedEjercicio) {
      setEditedEjercicio(saveEjercicio); // Actualiza el usuario en la tabla
      onUpdateEjercicio(editedEjercicio);

      setAlertText("Ejercicio guardado");
      setShowAlert(true);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <FormControl>
        <InputLabel id="grupoMuscular-label">Grupo Muscular</InputLabel>
        <Select
          labelId="grupoMuscular-label"
          id="grupoMuscular-select"
          name="grupoMuscular"
          value={editedEjercicio?.grupoMuscular?._id}
          onChange={handleInputChange}
        >
          {gruposMusculares &&
            gruposMusculares.map((grupo) => (
              <MenuItem value={grupo._id} key={grupo._id}>
                {grupo.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        name="nombre"
        label="nombre"
        value={editedEjercicio.nombre}
        onChange={handleInputChange}
      />
      <TextField
        name="descrip"
        label="descrip"
        value={editedEjercicio.descrip}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="dificultad-label">Categoria</InputLabel>
        <Select
          labelId="dificultad-label"
          id="dificultad-select"
          name="dificultad"
          value={editedEjercicio.dificultad}
          onChange={handleInputChange}
        >
          <MenuItem value="0">Facil</MenuItem>
          <MenuItem value="1">Medio</MenuItem>
          <MenuItem value="2">Dificil</MenuItem>
        </Select>
      </FormControl>
      <div>
        <img
          src={`http://localhost:3000/${editedEjercicio?.image?.imagePath}`}
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

const CreateEjercicioForm = ({
  ejercicio,
  onSave,
  onCancel,
  onUpdateEjercicio,
  token,
}) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [newEjercicio, setNewEjercicio] = useState({ ...ejercicio });
  const [gruposMusculares, setGruposMusculares] = useState(undefined);

  useEffect(() => {
    const fetchgruposMusculares = async (token) => {
      const gruposMusculares = await searchGruposMusculares(token);
      if (gruposMusculares) {
        setGruposMusculares(gruposMusculares);
        setNewEjercicio({
          grupoMuscular: { _id: "644e990340a41eb8467eac90" },
          nombre: "",
          descrip: "",
          dificultad: 0,
        });
      }
    };

    fetchgruposMusculares(token);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewEjercicio((prevEjercicio) => ({ ...prevEjercicio, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEjercicio((prevEjercicio) => ({ ...prevEjercicio, [name]: value }));
  };

  const handleSave = async () => {
    const savedEjercicio = await saveEjercicio(newEjercicio, token);
    if (savedEjercicio) {
      setNewEjercicio(saveEjercicio); // Actualiza el usuario en la tabla
      onUpdateEjercicio(newEjercicio);

      setAlertText("Ejercicio guardado");
      setShowAlert(true);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <FormControl>
        <InputLabel id="grupoMuscular-label">Grupo Muscular</InputLabel>
        <Select
          labelId="grupoMuscular-label"
          id="grupoMuscular-select"
          name="grupoMuscular"
          value={newEjercicio?.grupoMuscular?._id}
          onChange={handleInputChange}
        >
          {gruposMusculares &&
            gruposMusculares.map((grupo) => (
              <MenuItem value={grupo._id} key={grupo._id}>
                {grupo.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        name="nombre"
        label="nombre"
        value={newEjercicio?.nombre ?? ""}
        onChange={handleInputChange}
      />
      <TextField
        name="descrip"
        label="descrip"
        value={newEjercicio?.descrip ?? ""}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="dificultad-label">Categoria</InputLabel>
        <Select
          labelId="dificultad-label"
          id="dificultad-select"
          name="dificultad"
          value={newEjercicio?.dificultad ?? 0}
          onChange={handleInputChange}
        >
          <MenuItem value="0">Facil</MenuItem>
          <MenuItem value="1">Medio</MenuItem>
          <MenuItem value="2">Dificil</MenuItem>
        </Select>
      </FormControl>
      <div>
        <img
          src={`http://localhost:3000/${newEjercicio?.image?.imagePath}`}
          alt=""
        />
        <label htmlFor="">Imagen</label>
        <input type="file" accept="video/*" onChange={handleImageChange} />
      </div>

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default EjercicioTable;
