import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function Modal() {
  const [open, setOpen] = useState(true); // La boîte de dialogue s'ouvre directement
  const [identifiant, setIdentifiant] = useState(''); // État pour stocker l'identifiant
  const [motDePasse, setMotDePasse] = useState(''); // État pour stocker le mot de passe
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur pour identifiant ou mot de passe incorrect
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès pour connexion réussie
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleClose = (event, reason) => {
    // Empêcher la fermeture en cliquant en dehors
    if (reason && reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    const identifiantCorrect = 'tcfxxx';
    const motDePasseCorrect = 'Gamesca12x@.3';

    if (identifiant !== identifiantCorrect || motDePasse !== motDePasseCorrect) {
      setErrorMessage('Identifiant ou mot de passe incorrect'); // Afficher un message d'erreur
      setSuccessMessage(''); // Réinitialiser le message de succès
    } else {
      setErrorMessage(''); // Réinitialiser le message d'erreur
      setSuccessMessage('Connexion réussie !'); // Afficher le message de succès

      // Attendre un moment avant de rediriger
      setTimeout(() => {
        setOpen(false); // Fermer la boîte de dialogue
        navigate('/tcf-canada/expression-ecrite'); // Rediriger vers ExpressionE
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
