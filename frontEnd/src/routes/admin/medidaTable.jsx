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
import { deleteMedida, saveMedida } from "../../services/medidas";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { searchUsers } from "../../services/user";
import { DateField } from "@mui/x-date-pickers";
import { AppContext } from "../../App";

const MedidaTable = ({ medidas: medidaAll, token }) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [medidas, setMedidas] = useState([...medidaAll]);
  const [searchMedidaName, setSearchMedidaName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedMedida, setEditedMedida] = useState(null);

  useEffect(() => {
    setMedidas(medidaAll);
  }, []);

  useEffect(() => {
    if (searchMedidaName !== "") {
      const filteredMedidas = medidaAll.filter((medida) =>
        medida.user.username
          .toLowerCase()
          .includes(searchMedidaName.toLowerCase())
      );
      setMedidas(filteredMedidas);
      setPage(0);
    } else {
      if (medidas !== medidaAll) {
        setMedidas(medidaAll);
      }
    }
  }, [searchMedidaName]);

  var paginatedMedidas = medidas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (medidaId) => {
    const medida = medidas.find((medida) => medida?._id === medidaId);
    setEditedMedida(medida);
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

  const handleDeleteConfirmationOpen = (medidaId) => {
    setDeleteConfirmation(medidaId);
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
      await deleteMedida(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de medidaAll
      setMedidas(
        medidas.filter((medida) => medida?._id !== deleteConfirmation)
      );

      setDeleteConfirmation(null);

      setAlertText("Medida borrada");
      setShowAlert(true);
    }
  };

  const sortedMedidas = orderBy
    ? [...medidas].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : medidas;

  paginatedMedidas = sortedMedidas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateMedida = (updatedMedida) => {
    setMedidas((prevMedidas) => {
      const updatedMedidas = prevMedidas.map((medida) =>
        medida._id === updatedMedida._id ? updatedMedida : medida
      );
      return updatedMedidas;
    });
    setEditing(false);
  };
  const createMedida = (newMedida) => {
    setMedidas((prevMedidas) => {
      const updatedMedidas = prevMedidas.map((medida) =>
        medida._id === newMedida._id ? newMedida : medida
      );
      return updatedMedidas;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre usuario</label>
        <input
          type="text"
          value={searchMedidaName}
          onChange={(e) => setSearchMedidaName(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Medida de {editedMedida.user.username}</p>
              <EditMedidaForm
                medida={editedMedida}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateMedida={updateMedida} // Pasa la función updateMedida
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Medida</p>
              <CreateMedidaForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateMedida={createMedida} // Pasa la función updateMedida
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
                    active={orderBy === "medida"}
                    direction={order}
                    onClick={() => handleSortChange("medida")}
                  >
                    Medida
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
              {paginatedMedidas.map((medida) => (
                <TableRow key={medida._id}>
                  <TableCell>{medida.user.username}</TableCell>
                  <TableCell>{medida.medida}</TableCell>
                  <TableCell>{medida.parte}</TableCell>
                  <TableCell>{medida.fecha}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(medida._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteConfirmationOpen(medida._id)}
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
        count={medidas.length}
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
          <p>¿Seguro que quieres borrar esta medida?</p>
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

const EditMedidaForm = ({
  medida,
  onSave,
  onCancel,
  onUpdateMedida,
  token,
}) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [editedMedida, setEditedMedida] = useState({ ...medida });
  const [users, setUsers] = useState(undefined);

  const currentDate = new Date();
  const currentDateTime = currentDate.toISOString().slice(0, 16);

  useEffect(() => {
    if (medida) {
      setEditedMedida(medida);
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
    setEditedMedida((prevMedida) => ({ ...prevMedida, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedMedida((prevMedida) => ({ ...prevMedida, fecha: date }));
  };

  const handleSave = async () => {
    const savedMedida = await saveMedida(editedMedida, token);
    if (savedMedida) {
      setEditedMedida(savedMedida);
      onUpdateMedida(editedMedida);

      setAlertText("Medida guardada");
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
          value={editedMedida?.user?._id}
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
        name="medida"
        label="Medida"
        value={editedMedida?.medida}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="parte-label">Parte</InputLabel>
        <Select
          labelId="parte-label"
          id="parte-select"
          name="parte"
          value={editedMedida?.parte}
          onChange={handleInputChange}
        >
          <MenuItem value="brazo">Brazo</MenuItem>
          <MenuItem value="muslo">Muslo</MenuItem>
          <MenuItem value="gemelo">Gemelo</MenuItem>
          <MenuItem value="pecho">Pecho</MenuItem>
          <MenuItem value="cintura">Cintura</MenuItem>
          <MenuItem value="cadera">Cadera</MenuItem>
        </Select>
      </FormControl>
      <input
        type="datetime-local"
        name="fecha"
        value={editedMedida?.fecha.slice(0, 16) ?? currentDateTime}
        onChange={handleInputChange}
      />
      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

const CreateMedidaForm = ({
  medida,
  onSave,
  onCancel,
  onUpdateMedida,
  token,
}) => {
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [newMedida, setNewMedida] = useState({ ...medida });
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        setUsers(usuarios);
        setNewMedida({
          user: { _id: "646b8ae253b2fa401a743f06" },
          parte: "cintura",
          medida: 50,
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
    const medidaUpdated = { ...newMedida, [name]: newValue };
    setNewMedida(medidaUpdated);
  };

  const handleDateChange = (date) => {
    setEditedMedida((prevMedida) => ({ ...prevMedida, fecha: date }));
  };

  const handleSave = async () => {
    const savedMedida = await saveMedida(newMedida, token);
    if (savedMedida) {
      setNewMedida(saveMedida); // Actualiza el usuario en la tabla
      onUpdateMedida(newMedida);

      setAlertText("Medida guardada");
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
          value={newMedida?.user?._id || ""}
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
        name="medida"
        label="Medida"
        value={newMedida?.medida ?? 50}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="parte-label">Parte</InputLabel>
        <Select
          labelId="parte-label"
          id="parte-select"
          name="parte"
          value={newMedida?.parte ?? "cintura"}
          onChange={handleInputChange}
        >
          <MenuItem value="brazo">Brazo</MenuItem>
          <MenuItem value="muslo">Muslo</MenuItem>
          <MenuItem value="gemelo">Gemelo</MenuItem>
          <MenuItem value="pecho">Pecho</MenuItem>
          <MenuItem value="cintura">Cintura</MenuItem>
          <MenuItem value="cadera">Cadera</MenuItem>
        </Select>
      </FormControl>
      <input
        type="datetime-local"
        name="fecha"
        value={newMedida?.fecha ?? currentDateTime}
        onChange={handleInputChange}
      />

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default MedidaTable;
