import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usersData from './users.json'; // Assurez-vous d'ajuster le chemin

function Modal() {
  const [open, setOpen] = useState(true);
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    const user = usersData.users.find(
      (user) => user.identifiant === identifiant && user.password === motDePasse
    );

    if (!user) {
      setErrorMessage('Identifiant ou mot de passe incorrect');
      setSuccessMessage('');
      setTimeout(() => {
        setErrorMessage(false)
      }, 1000);
    } else {
      setErrorMessage('');
      setSuccessMessage('Connexion réussie !');

      setTimeout(() => {
        setOpen(false);
        navigate('/accueil/examen');
      }, 2000);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' }}
        open={open}
      />
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            id="identifiant"
            name="identifiant"
            label="Identifiant"
            type="text"
            fullWidth
            variant="standard"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="motDePasse"
            name="motDePasse"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} type="submit">Connexion</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal;
