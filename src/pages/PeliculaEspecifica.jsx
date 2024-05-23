import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/molecules/CardPeliculas/Card';
import Nav from '../components/organismos/Nav/Nav';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import "../styles/PeliculaPageEspecifica.css"
function PeliculaEspecifica() {
    const { titulo } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = usuario.token
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    // Conectar al servidor de Socket.IO
    useEffect(() => {
        const newSocket = io('http://localhost:3001',{
            auth: {
                token: token
            }
        });

        newSocket.on('connect', () => {
            console.log('Conectado al servidor Socket.IO');
            newSocket.emit('join room', titulo);
        });

        newSocket.on('chat message', (msg) => {
            console.log('Mensaje recibido:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [titulo]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/movies/${titulo}`,axiosConfig)
            .then((response) => {
                setPelicula(response.data.data[0]);
                console.log(response.data.data[0])
            })
            .catch((error) => {
                console.error('Error al cargar la película:', error);
            });
    }, [titulo]);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            socket.emit('chat message', inputMessage,titulo,usuario.nombre);
            setInputMessage('');
        }
    };

    return (
        <>
            <Nav />
            <div>PeliculaEspecifica</div>

            {pelicula && (
                <div className="chat-container">
                    <div className='peliculaDiv'>
                    <span className="movie-calificacion">Calificacion : {pelicula.calificacion}</span>
                    <h2 className="movie-title">{pelicula.nombre}</h2>


                    </div>

                    <img src={pelicula.url_movie} alt={pelicula.nombre} />

                    <h2 className="movie-title">Descripcion: {pelicula.descripcion}</h2>

                    <div className="message-container">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">{msg.remitente}    :  {msg.msg}</div>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="message-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">Enviar mensaje</button>
                </div>
            )}
        </>
    );
}

export default PeliculaEspecifica;