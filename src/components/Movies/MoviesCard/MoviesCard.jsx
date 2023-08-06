import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const baseUrl = 'https://api.nomoreparties.co';

function MoviesCard({ saveMovie, isSaved, deleteMovie, ...props }) {
    const location = useLocation().pathname;
    const movie = props.movie;
    const isLiked = isSaved(movie);

    function handleSaveOrDeleteMovie() {
        saveMovie(movie);
    }

    function handleDeleteMovie() {
        deleteMovie(movie);
    }

    function convertTime(time) {
        return `${parseInt(time / 60)} ч ${time % 60} м`;
    }

    return (
        <div key={movie.id || movie._id || movie.movieId} className="card">
            <a className="card__trailer" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="card__image" alt="обложка" src={movie.image.url ? baseUrl + movie.image.url : movie.image}></img>
            </a>
            <div className={location === "/movies" ? "card__description" : "card__description-deletion"}>
                <div className="card__info">
                    <h2 className="card__name">{movie.nameRU}</h2>
                    <p className="card__time">{convertTime(movie.duration)}</p>
                </div>
                {location === "/movies"
                    ? <button type="button" onClick={handleSaveOrDeleteMovie} className={`card__like ${isLiked ? "card__like_on" : ""}`}></button>
                    : <button type="button" onClick={handleDeleteMovie} className="card__deletion"></button>
                }
            </div>
        </div>
    );
}

export default MoviesCard;