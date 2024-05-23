import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import "../styles/App.css";
  import Login from '../pages/SingIn.jsx';
import Peliculas from "../pages/Peliculas.jsx"
import PeliculaEspecifica from '../pages/PeliculaEspecifica.jsx';
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/PaginaDePeliculas" element={<Peliculas />} />
            <Route path="/PaginaDePeliculas/:titulo" element={<PeliculaEspecifica />} /> 
          </Routes>
        </BrowserRouter>
        </>
  )
}

export default App;
