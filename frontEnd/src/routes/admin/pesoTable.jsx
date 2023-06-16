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
import { deletePeso, savePeso } from "../../services/pesos";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { searchUsers } from "../../services/user";
import { DateField } from "@mui/x-date-pickers";
import { AppContext } from "../../App";

const PesoTable = ({ pesos: pesoAll, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [pesos, setPesos] = useState([...pesoAll]);
  const [searchPesoName, setSearchPesoName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedPeso, setEditedPeso] = useState(null);

  useEffect(() => {
    setPesos(pesoAll);
  }, []);

  useEffect(() => {
    if (searchPesoName !== "") {
      const filteredPesos = pesoAll.filter((peso) =>
        peso.user.username.toLowerCase().includes(searchPesoName.toLowerCase())
      );
      setPesos(filteredPesos);
      setPage(0);
    } else {
      if (pesos !== pesoAll) {
        setPesos(pesoAll);
      }
    }
  }, [searchPesoName]);

  var paginatedPesos = pesos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (pesoId) => {
    const peso = pesos.find((peso) => peso?._id === pesoId);
    setEditedPeso(peso);
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

  const handleDeleteConfirmationOpen = (pesoId) => {
    setDeleteConfirmation(pesoId);
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
      await deletePeso(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de pesoAll
      setPesos(pesos.filter((peso) => peso?._id !== deleteConfirmation));

      setDeleteConfirmation(null);

      setAlertText("Peso eliminado");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    }
  };

  const sortedPesos = orderBy
    ? [...pesos].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : pesos;

  paginatedPesos = sortedPesos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updatePeso = (updatedPeso) => {
    setPesos((prevPesos) => {
      const updatedPesos = prevPesos.map((peso) =>
        peso._id === updatedPeso._id ? updatedPeso : peso
      );
      return updatedPesos;
    });
    setEditing(false);
  };
  const createPeso = (newPeso) => {
    setPesos((prevPesos) => {
      const updatedPesos = prevPesos.map((peso) =>
        peso._id === newPeso._id ? newPeso : peso
      );
      return updatedPesos;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre usuario</label>
        <input
          type="text"
          value={searchPesoName}
          onChange={(e) => setSearchPesoName(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Peso de {editedPeso.user.username}</p>
              <EditPesoForm
                peso={editedPeso}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdatePeso={updatePeso} // Pasa la función updatePeso
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Peso</p>
              <CreatePesoForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdatePeso={createPeso} // Pasa la función updatePeso
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
                    active={orderBy === "peso"}
                    direction={order}
                    onClick={() => handleSortChange("peso")}
                  >
                    Peso
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedPesos.map((peso) => (
                <TableRow key={peso._id}>
                  <TableCell>{peso.user.username}</TableCell>
                  <TableCell>{peso.peso}</TableCell>
                  <TableCell>{peso.fecha}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(peso._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteConfirmationOpen(peso._id)}
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
        count={pesos.length}
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
          <p>¿Seguro que quieres borrar esta peso?</p>
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

const EditPesoForm = ({ peso, onSave, onCancel, onUpdatePeso, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [editedPeso, setEditedPeso] = useState({ ...peso });
  const [users, setUsers] = useState(undefined);

  const currentDate = new Date();
  const currentDateTime = currentDate.toISOString().slice(0, 16);

  useEffect(() => {
    if (peso) {
      setEditedPeso(peso);
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
    setEditedPeso((prevPeso) => ({ ...prevPeso, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedPeso((prevPeso) => ({ ...prevPeso, fecha: date }));
  };

  const handleSave = async () => {
    const savedPeso = await savePeso(editedPeso, token);
    if (savedPeso) {
      setEditedPeso(savedPeso);
      onUpdatePeso(editedPeso);

      setAlertText("Peso guardado");
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
          value={editedPeso?.user?._id}
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
        name="peso"
        label="Peso"
        value={editedPeso?.peso}
        onChange={handleInputChange}
      />
      <input
        type="datetime-local"
        name="fecha"
        value={editedPeso?.fecha.slice(0, 16) ?? currentDateTime}
        onChange={handleInputChange}
      />
      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

const CreatePesoForm = ({ peso, onSave, onCancel, onUpdatePeso, token }) => {
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  const [newPeso, setNewPeso] = useState({ ...peso });
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
        setNewPeso({
          user: { _id: "646b8ae253b2fa401a743f06" },
          peso: 50,
          fecha: new Date(),
        });
      }
    };

    fetchUsers(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "user") {
      // Buscar el objeto de usuario correspondiente al valor seleccionado
      const selectedUser = users.find((user) => user._id === value);
      // Establecer el objeto de usuario completo en lugar de solo el ID
      newValue = selectedUser || null;
    }
    const pesoUpdated = { ...newPeso, [name]: newValue };
    setNewPeso(pesoUpdated);
  };

  const handleDateChange = (date) => {
    setEditedPeso((prevPeso) => ({ ...prevPeso, fecha: date }));
  };

  const handleSave = async () => {
    const savedPeso = await savePeso(newPeso, token);
    if (savedPeso) {
      setNewPeso(savePeso); // Actualiza el usuario en la tabla
      onUpdatePeso(newPeso);

      setAlertText("Peso guardado");
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
          value={newPeso?.user?._id || ""}
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
        name="peso"
        label="Peso"
        value={newPeso?.peso ?? 50}
        onChange={handleInputChange}
      />
      <input
        type="datetime-local"
        name="fecha"
        value={newPeso?.fecha ?? currentDateTime}
        onChange={handleInputChange}
      />

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default PesoTable;
