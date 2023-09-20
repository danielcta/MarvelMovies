import React, { useState, useEffect } from 'react';
import './style.css'

function Card() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/danielcta/AvengersMoviesAPI/main/avengersAPI/avengers_movies.json');
               
                if (!response.ok) {
                    throw new Error('A solicitação da API falhou');
                }

                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Erro ao buscar os filmes:', error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="card">
            {movies.map((movie, index) => (
                <div key={index} className="movie-card">
                    <img src={movie.poster} alt={`Poster do filme ${movie.name}`} />
                    <h2>{movie.name}</h2>
                    <p>Ano de lançamento: {movie.releaseYear}</p>
                    <p>Sinopse: {movie.sinopse}</p>
                    <p>
                        Atores principais: {movie.mainActors ? movie.mainActors.join(', ') : 'Nenhum ator listado'}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Card;
