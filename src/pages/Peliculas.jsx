import React, { useState, useEffect } from 'react';
import Nav from '../components/organismos/Nav/Nav';
import { Link } from 'react-router-dom';
import "../styles/PeliculaPage.css";
import Card from '../components/molecules/CardPeliculas/Card';
import CardRanking from '../components/molecules/CardPeliculasRanking/CardRanking';
import axios from 'axios';

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculasNuevas, setPeliculasNuevas] = useState([]);
  const [peliculasPopulars, setPeliculasPopulars] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = usuario.token
 const axiosConfig ={
   headers:{
    'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization': `Bearer ${token}`
   }
 }
  function LongPolling() {
    axios.get('http://localhost:3001/api/movies/notificacionNuevasPeliculas', axiosConfig)
      .then((response) => {
        setPeliculasNuevas((prevPeliculasNuevas) => prevPeliculasNuevas.concat(response.data.movie));
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      })
      .finally(() => {
        LongPolling();
      })
  }
  
  function shortPolling() {
    axios.get('http://localhost:3001/api/movies/populars', axiosConfig)
      .then((response) => {
        setPeliculasPopulars(response.data.data);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });

  }
  useEffect(() => {
    shortPolling();
    const intervalId = setInterval(shortPolling, 5000);
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    LongPolling()


    axios.get('http://localhost:3001/api/movies', axiosConfig)
      .then((response) => {
        setPeliculas(response.data.data);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });




  }, []);

  return (
    <>
      <Nav />
      <div>Peliculas</div>

      <div className='divContenido'>
        <div className='divPeliculasPage'>
          <h2>Últimas películas publicadas</h2>
          <div className="divCardsPeliculas">
            {peliculasNuevas.length > 0 && peliculasNuevas.map((pelicula, index) => (
              <Link to={`/PaginaDePeliculas/${pelicula.id_pelicula}`} className='linkCard'> {/* Ruta dinámica */}
                <Card key={index} title={pelicula.nombre} img={pelicula.url_movie} />
              </Link>

            ))}
            {peliculas.length > 0 && peliculas.map((pelicula, index) => (
              <Link to={`/PaginaDePeliculas/${pelicula.id_pelicula}`} className='linkCard'> {/* Ruta dinámica */}
                <Card key={index} title={pelicula.nombre} img={pelicula.url_movie} />
              </Link>

            ))}
          </div>
        </div>
        <div className='divPeliculaDestacadasPage'>
          <h2>Peliculas con mejor Ranking:</h2>
          {peliculasPopulars.length > 0 && peliculasPopulars.map((pelicula, index) => (
            <Link to={`/PaginaDePeliculas/${pelicula.id_pelicula}`} className='linkCard'> {/* Ruta dinámica */}
              <CardRanking key={index} title={pelicula.nombre} img={pelicula.url_movie} calificacion={pelicula.calificacion} />
            </Link>

          ))}

        </div>
      </div>
    </>
  );
}

export default Peliculas;