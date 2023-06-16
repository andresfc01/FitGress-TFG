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
import { deleteComentario, saveComentario } from "../../services/comentarios";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { searchUsers } from "../../services/user";
import { DateField } from "@mui/x-date-pickers";
import { getPlantillas } from "../../services/plantillas";
import { AppContext } from "../../App";

const ComentarioTable = ({ comentarios: comentarioAll, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [comentarios, setComentarios] = useState([...comentarioAll]);
  const [searchComentarioName, setSearchComentarioName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedComentario, setEditedComentario] = useState(null);

  useEffect(() => {
    setComentarios(comentarioAll);
  }, []);

  useEffect(() => {
    if (searchComentarioName !== "") {
      const filteredComentarios = comentarioAll.filter((comentario) =>
        comentario.user.username
          .toLowerCase()
          .includes(searchComentarioName.toLowerCase())
      );
      setComentarios(filteredComentarios);
      setPage(0);
    } else {
      if (comentarios !== comentarioAll) {
        setComentarios(comentarioAll);
      }
    }
  }, [searchComentarioName]);

  var paginatedComentarios = comentarios.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (comentarioId) => {
    const comentario = comentarios.find(
      (comentario) => comentario?._id === comentarioId
    );
    setEditedComentario(comentario);
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

  const handleDeleteConfirmationOpen = (comentarioId) => {
    setDeleteConfirmation(comentarioId);
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
      await deleteComentario(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de comentarioAll
      setComentarios(
        comentarios.filter(
          (comentario) => comentario?._id !== deleteConfirmation
        )
      );

      setDeleteConfirmation(null);

      setAlertText("Comentario eliminado");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
  };

  const sortedComentarios = orderBy
    ? [...comentarios].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : comentarios;

  paginatedComentarios = sortedComentarios.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateComentario = (updatedComentario) => {
    setComentarios((prevComentarios) => {
      const updatedComentarios = prevComentarios.map((comentario) =>
        comentario._id === updatedComentario._id
          ? updatedComentario
          : comentario
      );
      return updatedComentarios;
    });
    setEditing(false);
  };
  const createComentario = (newComentario) => {
    setComentarios((prevComentarios) => {
      const updatedComentarios = prevComentarios.map((comentario) =>
        comentario._id === newComentario._id ? newComentario : comentario
      );
      return updatedComentarios;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre usuario</label>
        <input
          type="text"
          value={searchComentarioName}
          onChange={(e) => setSearchComentarioName(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Comentario de {editedComentario.user.username}</p>
              <EditComentarioForm
                comentario={editedComentario}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateComentario={updateComentario} // Pasa la función updateComentario
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Comentario</p>
              <CreateComentarioForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateComentario={createComentario} // Pasa la función updateComentario
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
                    active={orderBy === "user"}
                    direction={order}
                    onClick={() => handleSortChange("user")}
                  >
                    Usuario
                  </TableSortLabel>
                </TableCell>
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
                    active={orderBy === "texto"}
                    direction={order}
                    onClick={() => handleSortChange("texto")}
                  >
                    Comentario
                  </TableSortLabel>
                </TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedComentarios.map((comentario) => (
                <TableRow key={comentario._id}>
                  <TableCell>{comentario.user?.username}</TableCell>
                  <TableCell>{comentario.plantilla?.nombre}</TableCell>
                  <TableCell>{comentario.texto}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(comentario._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteConfirmationOpen(comentario._id)
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
        count={comentarios.length}
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
          <p>¿Seguro que quieres borrar esta comentario?</p>
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

const EditComentarioForm = ({
  comentario,
  onSave,
  onCancel,
  onUpdateComentario,
  token,
}) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [editedComentario, setEditedComentario] = useState({ ...comentario });
  const [users, setUsers] = useState(undefined);
  const [plantillas, setPlantillas] = useState(undefined);

  const currentDate = new Date();
  const currentDateTime = currentDate.toISOString().slice(0, 16);

  useEffect(() => {
    if (comentario) {
      setEditedComentario(comentario);
    }

    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };
    const fetchPlantillas = async (token) => {
      const plantillas = await getPlantillas(token);
      if (plantillas) {
        setPlantillas(plantillas);
      }
    };

    fetchPlantillas(token);
    fetchUsers(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, innerHTML } = e.target;
    if (name === "user") {
      setEditedComentario((prevComentario) => ({
        ...prevComentario,
        [name]: users.filter((user) => user._id === value)[0],
      }));
    } else if (name === "plantilla") {
      setEditedComentario((prevComentario) => ({
        ...prevComentario,
        [name]: plantillas.filter((plantilla) => plantilla._id === value)[0],
      }));
    } else {
      setEditedComentario((prevComentario) => ({
        ...prevComentario,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const savedComentario = await saveComentario(editedComentario, token);
    if (savedComentario) {
      setEditedComentario(savedComentario);
      onUpdateComentario(editedComentario);

      setAlertText("Comentario guardado");
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
          value={editedComentario?.user?._id}
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
      <FormControl>
        <InputLabel id="plantilla-label">Plantilla</InputLabel>
        <Select
          labelId="plantilla-label"
          id="plantilla-select"
          name="plantilla"
          value={editedComentario?.plantilla?._id}
          onChange={handleInputChange}
        >
          {plantillas &&
            plantillas.map((plantilla) => (
              <MenuItem value={plantilla._id} key={plantilla._id}>
                {plantilla.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        name="texto"
        label="Texto"
        value={editedComentario?.texto}
        onChange={handleInputChange}
      />
      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

const CreateComentarioForm = ({
  comentario,
  onSave,
  onCancel,
  onUpdateComentario,
  token,
}) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [newComentario, setNewComentario] = useState({ ...comentario });
  const [users, setUsers] = useState(undefined);
  const [plantillas, setPlantillas] = useState(undefined);

  useEffect(() => {
    setNewComentario({
      user: { _id: "646b8ae253b2fa401a743f06" },
      plantilla: { _id: "645752673ebee50be239302c" },
      texto: "",
    });

    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
      }
    };
    const fetchPlantillas = async (token) => {
      const plantillas = await getPlantillas(token);
      if (plantillas) {
        setPlantillas(plantillas);
      }
    };

    fetchPlantillas(token);
    fetchUsers(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, innerHTML } = e.target;
    if (name === "user") {
      setNewComentario((prevComentario) => ({
        ...prevComentario,
        [name]: users.filter((user) => user._id === value)[0],
      }));
    } else if (name === "plantilla") {
      setNewComentario((prevComentario) => ({
        ...prevComentario,
        [name]: plantillas.filter((plantilla) => plantilla._id === value)[0],
      }));
    } else {
      setNewComentario((prevComentario) => ({
        ...prevComentario,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const savedComentario = await saveComentario(newComentario, token);
    if (savedComentario) {
      setNewComentario(saveComentario); // Actualiza el usuario en la tabla
      onUpdateComentario(newComentario);

      setAlertText("Comentario guardado");
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
          value={newComentario?.user?._id || ""}
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
        <InputLabel id="plantilla-label">Plantilla</InputLabel>
        <Select
          labelId="plantilla-label"
          id="plantilla-select"
          name="plantilla"
          value={newComentario?.plantilla?._id}
          onChange={handleInputChange}
        >
          {plantillas &&
            plantillas.map((plantilla) => (
              <MenuItem value={plantilla._id} key={plantilla._id}>
                {plantilla.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        name="texto"
        label="Textp"
        value={newComentario?.texto ?? ""}
        onChange={handleInputChange}
      />

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default ComentarioTable;
