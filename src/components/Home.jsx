import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../css/Home.css';
import { InputLabel, MenuItem, Select } from '@mui/material';
import img from '../assets/undraw_My_code_snippets_re_4adu.png'

function Home() {
  const [selectedValue, setSelectedValue] = useState(''); // Gérer la sélection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction appelée lorsqu'un élément est sélectionné
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Redirige vers la page de login après la sélection
    if (value === 1) {
      navigate('/tcf-canada/expression-ecrite');
    } else if (value === 2) {
      alert("cette partie est en maintenance")
      event.target.value = ''
    } else {
      navigate('/error');
    }
  };

  return (
    <div className="container text-center">
      <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
      <div className="row">
      <center>
        <img alt='img' src={img} style={{ width: '300px', borderRadius: 20 }} />
      </center>
        <InputLabel id="demo-simple-select-label">Choisissez votre Examen</InputLabel><br />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue} // Gérer la valeur sélectionnée
          onChange={handleChange} // Appeler la fonction de changement
          fullWidth // Pour que le Select prenne toute la largeur disponible
        >
          <MenuItem value={1}>Tcf Canada</MenuItem>
          <MenuItem value={2}>Tef Canada</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default Home;
