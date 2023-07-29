import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import image from '../../../images/card.jpg';

function MoviesCard() {
    const location = useLocation().pathname;

    return (
        <div className="card">
            <img className="card__image" alt="обложка" src={image}></img>
            <div className={location === "/movies" ? "card__description" : "card__description-deletion"}>
                <div className="card__info">
                    <h2 className="card__name">33 слова о дизайне</h2>
                    <p className="card__time">1ч 47м</p>
                </div>
                <button type="button" className={location === "/movies" ? "card__like" : "card__deletion"}></button>
            </div>
        </div>
    );
}

export default MoviesCard;