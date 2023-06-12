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
import {
  deleteGrupoMuscular,
  saveGrupoMuscular,
} from "../../services/gruposMusculares";
import { NumberField } from "react-admin";

const GrupoMuscularTable = ({ gruposMusculares: grupoMuscularAll, token }) => {
  const [gruposMusculares, setGruposMusculares] = useState([
    ...grupoMuscularAll,
  ]);
  const [searchGrupoMuscularname, setSearchGrupoMuscularname] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editedGrupoMuscular, setEditedGrupoMuscular] = useState(null);

  useEffect(() => {
    setGruposMusculares(grupoMuscularAll);
  }, []);

  useEffect(() => {
    if (searchGrupoMuscularname !== "") {
      const filteredGruposMusculares = grupoMuscularAll.filter(
        (grupoMuscular) =>
          grupoMuscular.nombre
            .toLowerCase()
            .includes(searchGrupoMuscularname.toLowerCase())
      );
      setGruposMusculares(filteredGruposMusculares);
      setPage(0);
    } else {
      if (gruposMusculares !== grupoMuscularAll) {
        setGruposMusculares(grupoMuscularAll);
      }
    }
  }, [searchGrupoMuscularname]);

  var paginatedGruposMusculares = gruposMusculares.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (grupoMuscularId) => {
    const grupoMuscular = gruposMusculares.find(
      (grupoMuscular) => grupoMuscular?._id === grupoMuscularId
    );
    setEditedGrupoMuscular(grupoMuscular);
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

  const handleDeleteConfirmationOpen = (grupoMuscularId) => {
    setDeleteConfirmation(grupoMuscularId);
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
      await deleteGrupoMuscular(deleteConfirmation, token);
      // Eliminar el usuario del arreglo de grupoMuscularAll
      setGruposMusculares(
        gruposMusculares.filter(
          (grupoMuscular) => grupoMuscular?._id !== deleteConfirmation
        )
      );

      setDeleteConfirmation(null);
    }
  };

  const sortedGruposMusculares = orderBy
    ? [...gruposMusculares].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
    : gruposMusculares;

  paginatedGruposMusculares = sortedGruposMusculares.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateGrupoMuscular = (updatedGrupoMuscular) => {
    setGruposMusculares((prevGruposMusculares) => {
      const updatedGruposMusculares = prevGruposMusculares.map(
        (grupoMuscular) =>
          grupoMuscular._id === updatedGrupoMuscular._id
            ? updatedGrupoMuscular
            : grupoMuscular
      );
      return updatedGruposMusculares;
    });
    setEditing(false);
  };
  const createGrupoMuscular = (newGrupoMuscular) => {
    setGruposMusculares((prevGruposMusculares) => {
      const updatedGruposMusculares = prevGruposMusculares.map(
        (grupoMuscular) =>
          grupoMuscular._id === newGrupoMuscular._id
            ? newGrupoMuscular
            : grupoMuscular
      );
      return updatedGruposMusculares;
    });
    setEditing(false);
  };

  return (
    <div className="crudAdmin">
      <div className="filtroCRUD">
        <label htmlFor="">Filtar por nombre</label>
        <input
          type="text"
          value={searchGrupoMuscularname}
          onChange={(e) => setSearchGrupoMuscularname(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <button onClick={() => setCreating(!creating)}>+ Crear</button>
      </div>

      {editing && (
        <Modal open={editing}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Edición GrupoMuscular {editedGrupoMuscular.name}</p>
              <EditGrupoMuscularForm
                grupoMuscular={editedGrupoMuscular}
                onSave={handleSaveClick}
                onCancel={() => setEditing(false)}
                token={token}
                onUpdateGrupoMuscular={updateGrupoMuscular} // Pasa la función updateGrupoMuscular
              />
            </div>
          </div>
        </Modal>
      )}

      {creating && (
        <Modal open={creating}>
          <div className="modal-overlay">
            <div className="modal-container">
              <p>Creacion Grupo Muscular</p>
              <CreateGrupoMuscularForm
                onSave={handleSaveClick}
                onCancel={() => setCreating(false)}
                token={token}
                onUpdateGrupoMuscular={createGrupoMuscular} // Pasa la función updateGrupoMuscular
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
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedGruposMusculares.map((grupoMuscular) => (
                <TableRow key={grupoMuscular._id}>
                  <TableCell>{grupoMuscular.nombre}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3000/${grupoMuscular?.image?.imagePath}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(grupoMuscular._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteConfirmationOpen(grupoMuscular._id)
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
        count={gruposMusculares.length}
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
          <p>¿Seguro que quieres borrar este grupo Muscular?</p>
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

const EditGrupoMuscularForm = ({
  grupoMuscular,
  onSave,
  onCancel,
  onUpdateGrupoMuscular,
  token,
}) => {
  const [editedGrupoMuscular, setEditedGrupoMuscular] = useState({
    ...grupoMuscular,
  });
  useEffect(() => {
    if (grupoMuscular) {
      console.log(grupoMuscular);
      setEditedGrupoMuscular(grupoMuscular);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedGrupoMuscular((prevGrupoMuscular) => ({
      ...prevGrupoMuscular,
      image: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGrupoMuscular((prevGrupoMuscular) => ({
      ...prevGrupoMuscular,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const savedGrupoMuscular = await saveGrupoMuscular(
      editedGrupoMuscular,
      token
    );
    if (savedGrupoMuscular) {
      setEditedGrupoMuscular(saveGrupoMuscular); // Actualiza el usuario en la tabla
      onUpdateGrupoMuscular(editedGrupoMuscular);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <TextField
        name="nombre"
        label="nombre"
        value={editedGrupoMuscular.nombre}
        onChange={handleInputChange}
      />
      <div>
        <img
          src={`http://localhost:3000/${editedGrupoMuscular?.image?.imagePath}`}
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

const CreateGrupoMuscularForm = ({
  grupoMuscular,
  onSave,
  onCancel,
  onUpdateGrupoMuscular,
  token,
}) => {
  const [newGrupoMuscular, setNewGrupoMuscular] = useState({
    ...grupoMuscular,
  });
  useEffect(() => {
    if (grupoMuscular) {
      setNewGrupoMuscular(grupoMuscular);
    }
    setNewGrupoMuscular({
      nombre: "",
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewGrupoMuscular((prevGrupoMuscular) => ({
      ...prevGrupoMuscular,
      image: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrupoMuscular((prevGrupoMuscular) => ({
      ...prevGrupoMuscular,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const savedGrupoMuscular = await saveGrupoMuscular(newGrupoMuscular, token);
    if (savedGrupoMuscular) {
      setNewGrupoMuscular(saveGrupoMuscular); // Actualiza el usuario en la tabla
      onUpdateGrupoMuscular(newGrupoMuscular);
    }
    onSave();
  };

  return (
    <div className="editItem">
      <TextField
        name="nombre"
        label="nombre"
        value={newGrupoMuscular?.nombre ?? ""}
        onChange={handleInputChange}
      />
      <div>
        <img
          src={`http://localhost:3000/${newGrupoMuscular?.image?.imagePath}`}
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

export default GrupoMuscularTable;
