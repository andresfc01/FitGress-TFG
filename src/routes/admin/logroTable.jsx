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
import { deleteLogro, saveLogro } from "../../services/logros";
import { NumberField } from "react-admin";

const LogroTable = ({ logros: logroAll, token }) => {
  const [logros, setLogros] = useState([...logroAll]);
  const [searchLogroname, setSearchLogroname] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedLogro, setEditedLogro] = useState(null);

  useEffect(() => {
    setLogros(logroAll);
  }, []);

  useEffect(() => {
    if (searchLogroname !== "") {
      const filteredLogros = logroAll.filter((logro) =>
        logro.nombre.toLowerCase().includes(searchLogroname.toLowerCase())
      );
      setLogros(filteredLogros);
      setPage(0);
    } else {
      if (logros !== logroAll) {
        setLogros(logroAll);
      }
    }
  }, [searchLogroname]);

  var paginatedLogros = logros.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (logroId) => {
    const logro = logros.find((logro) => logro?._id === logroId);
    setEditedLogro(logro);
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

  const handleDeleteConfirmationOpen = (logroId) => {
    setDeleteConfirmation(logroId);
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
      await deleteLogro(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de logroAll
      setLogros(logros.filter((logro) => logro?._id !== deleteConfirmation));

      setDeleteConfirmation(null);
    }
  };

  const sortedLogros = orderBy
    ? [...logros].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : logros;

  paginatedLogros = sortedLogros.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateLogro = (updatedLogro) => {
    setLogros((prevLogros) => {
      const updatedLogros = prevLogros.map((logro) =>
        logro._id === updatedLogro._id ? updatedLogro : logro
      );
      return updatedLogros;
    });
    setEditing(false);
  };
  const createLogro = (newLogro) => {
    setLogros((prevLogros) => {
      const updatedLogros = prevLogros.map((logro) =>
        logro._id === newLogro._id ? newLogro : logro
      );
      return updatedLogros;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre</label>
        <input
          type="text"
          value={searchLogroname}
          onChange={(e) => setSearchLogroname(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición Logro {editedLogro.name}</p>
              <EditLogroForm
                logro={editedLogro}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateLogro={updateLogro} // Pasa la función updateLogro
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Logro</p>
              <CreateLogroForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateLogro={createLogro} // Pasa la función updateLogro
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
                    active={orderBy === "categoria"}
                    direction={order}
                    onClick={() => handleSortChange("categoria")}
                  >
                    Categoria
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "subCategoria"}
                    direction={order}
                    onClick={() => handleSortChange("subCategoria")}
                  >
                    Subcategoria
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "requisito"}
                    direction={order}
                    onClick={() => handleSortChange("requisito")}
                  >
                    requisito
                  </TableSortLabel>
                </TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedLogros.map((logro) => (
                <TableRow key={logro._id}>
                  <TableCell>{logro.nombre}</TableCell>
                  <TableCell>{logro.categoria}</TableCell>
                  <TableCell>{logro.subCategoria}</TableCell>
                  <TableCell>{logro.requisito}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3000/${logro?.image?.imagePath}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(logro._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteConfirmationOpen(logro._id)}
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
        count={logros.length}
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
          <p>¿Seguro que quieres borrar este logro?</p>
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

const EditLogroForm = ({ logro, onSave, onCancel, onUpdateLogro, token }) => {
  const [editedLogro, setEditedLogro] = useState({ ...logro });
  useEffect(() => {
    if (logro) {
      console.log(logro);
      setEditedLogro(logro);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedLogro((prevLogro) => ({ ...prevLogro, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLogro((prevLogro) => ({ ...prevLogro, [name]: value }));
  };

  const handleSave = async () => {
    const savedLogro = await saveLogro(editedLogro, token);
    if (savedLogro) {
      setEditedLogro(saveLogro); // Actualiza el usuario en la tabla
      onUpdateLogro(editedLogro);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <TextField
        name="nombre"
        label="nombre"
        value={editedLogro.nombre}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="categoria-label">Categoria</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria-select"
          name="categoria"
          value={editedLogro.categoria}
          onChange={handleInputChange}
        >
          <MenuItem value="peso">Peso</MenuItem>
          <MenuItem value="entrenamiento">Entrenamiento</MenuItem>
          <MenuItem value="medida">Medida</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="subCategoria-label">subCategoria</InputLabel>
        <Select
          labelId="subCategoria-label"
          id="subCategoria-select"
          name="subCategoria"
          value={editedLogro.subCategoria}
          onChange={handleInputChange}
        >
          <MenuItem value="cant">Cant</MenuItem>
          <MenuItem value="porcent">Porcent</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="requisito"
        label="requisito"
        value={editedLogro.requisito}
        onChange={handleInputChange}
      />
      <div>
        <img
          src={`http://localhost:3000/${editedLogro?.image?.imagePath}`}
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

const CreateLogroForm = ({ logro, onSave, onCancel, onUpdateLogro, token }) => {
  const [newLogro, setNewLogro] = useState({ ...logro });
  useEffect(() => {
    if (logro) {
      setNewLogro(logro);
    }
    setNewLogro({
      nombre: "",
      categoria: "peso",
      subCategoria: "cant",
      requisito: 1,
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewLogro((prevLogro) => ({ ...prevLogro, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLogro((prevLogro) => ({ ...prevLogro, [name]: value }));
  };

  const handleSave = async () => {
    const savedLogro = await saveLogro(newLogro, token);
    if (savedLogro) {
      setNewLogro(saveLogro); // Actualiza el usuario en la tabla
      onUpdateLogro(newLogro);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <TextField
        name="nombre"
        label="nombre"
        value={newLogro?.nombre ?? ""}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel id="categoria-label">Categoria</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria-select"
          name="categoria"
          value={newLogro?.categoria ?? "peso"}
          onChange={handleInputChange}
        >
          <MenuItem value="peso">Peso</MenuItem>
          <MenuItem value="entrenamiento">Entrenamiento</MenuItem>
          <MenuItem value="medida">Medida</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="subCategoria-label">subCategoria</InputLabel>
        <Select
          labelId="subCategoria-label"
          id="subCategoria-select"
          name="subCategoria"
          value={newLogro?.subCategoria ?? "cant"}
          onChange={handleInputChange}
        >
          <MenuItem value="cant">Cant</MenuItem>
          <MenuItem value="porcent">Porcent</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="requisito"
        label="requisito"
        value={newLogro?.requisito ?? 1}
        onChange={handleInputChange}
      />
      <div>
        <img
          src={`http://localhost:3000/${newLogro?.image?.imagePath}`}
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

export default LogroTable;
