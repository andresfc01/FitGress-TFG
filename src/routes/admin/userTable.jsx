import React, { useEffect, useState } from "react";
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
import { deleteUser, saveUser } from "../../services/user";

const UserTable = ({ users: usuarios, token }) => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    setUsers(usuarios);
  }, []);

  useEffect(() => {
    if (searchUsername !== "") {
      const filteredUsers = usuarios.filter((user) =>
        user.username.toLowerCase().includes(searchUsername.toLowerCase())
      );
      setUsers(filteredUsers);
      setPage(0);
    } else {
      if (users !== usuarios) {
        setUsers(usuarios);
      }
    }
  }, [searchUsername]);

  var paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (userId) => {
    const user = users.find((user) => user?._id === userId);
    setEditedUser(user);
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

  const handleDeleteConfirmationOpen = (userId) => {
    setDeleteConfirmation(userId);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation(null);
  };

  const handleSaveClick = async () => {
    setEditing(false);
  };

  const handleDeleteConfirmationConfirm = async () => {
    if (deleteConfirmation) {
      await deleteUser(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de usuarios
      setUsers(users.filter((user) => user?._id !== deleteConfirmation));

      setDeleteConfirmation(null);
    }
  };

  const sortedUsers = orderBy
    ? [...users].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : users;

  paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      return updatedUsers;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por username</label>
        <input
          type="text"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          placeholder="Filtrar por username"
        />
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición User {editedUser.username}</p>
              <EditUserForm
                user={editedUser}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateUser={updateUser} // Pasa la función updateUser
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
                    active={orderBy === "username"}
                    direction={order}
                    onClick={() => handleSortChange("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={order}
                    onClick={() => handleSortChange("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "objetivoFisico"}
                    direction={order}
                    onClick={() => handleSortChange("objetivoFisico")}
                  >
                    Objetivo Fisico
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "nivelExperiencia"}
                    direction={order}
                    onClick={() => handleSortChange("nivelExperiencia")}
                  >
                    Experiencia
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "altura"}
                    direction={order}
                    onClick={() => handleSortChange("altura")}
                  >
                    Altura
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "sexo"}
                    direction={order}
                    onClick={() => handleSortChange("sexo")}
                  >
                    Sexo
                  </TableSortLabel>
                </TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.objetivoFisico}</TableCell>
                  <TableCell>
                    {user.nivelExperiencia === 0
                      ? "Principiante"
                      : user.nivelExperiencia === 1
                      ? "Intermedio"
                      : user.nivelExperiencia === 2
                      ? "Experto"
                      : ""}
                  </TableCell>
                  <TableCell>{user.altura} cm</TableCell>
                  <TableCell>{user.sexo}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(user._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteConfirmationOpen(user._id)}
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
        count={users.length}
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
          <p>¿Seguro que quieres borrar este usuario?</p>
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

const EditUserForm = ({ user, onSave, onCancel, onUpdateUser, token }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  useEffect(() => {
    if (user) {
      console.log(user);
      setEditedUser(user);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    const savedUser = await saveUser(editedUser, token);
    if (savedUser) {
      onUpdateUser(editedUser); // Actualiza el usuario en la tabla
    }
    onSave();
  };

  return (
    <div className="editItem">
      <TextField
        name="username"
        label="Username"
        value={editedUser.username}
        onChange={handleInputChange}
      />
      <TextField
        name="email"
        label="Email"
        value={editedUser.email}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="objetivo-fisico-label">Objetivo Físico</InputLabel>
        <Select
          labelId="objetivo-fisico-label"
          id="objetivo-fisico-select"
          name="objetivoFisico"
          value={editedUser.objetivoFisico}
          onChange={handleInputChange}
        >
          <MenuItem value="Perdida grasa">Perdida grasa</MenuItem>
          <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
          <MenuItem value="Ganancia de peso">Ganancia de peso</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="nivel-experiencia-label">
          Nivel de Experiencia
        </InputLabel>
        <Select
          labelId="nivel-experiencia-label"
          id="nivel-experiencia-select"
          name="nivelExperiencia"
          value={editedUser.nivelExperiencia}
          onChange={handleInputChange}
        >
          <MenuItem value={0}>Principiante</MenuItem>
          <MenuItem value={1}>Intermedio</MenuItem>
          <MenuItem value={2}>Experto</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="altura"
        label="Altura"
        value={editedUser.altura}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="sexo-label">Sexo</InputLabel>
        <Select
          labelId="sexo-label"
          id="sexo-select"
          name="sexo"
          value={editedUser.sexo}
          onChange={handleInputChange}
        >
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="F">F</MenuItem>
        </Select>
      </FormControl>

      <div className="botonesEdit">
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default UserTable;
