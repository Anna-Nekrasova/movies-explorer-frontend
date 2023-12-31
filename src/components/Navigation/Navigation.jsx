import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation({ isOpen, onClose }) {
    return (
        <div className={`navigation ${isOpen ? "navigation_on" : ""}`}>
            <nav className="navigation__popup">
                <button type="button" className="navigation__close" onClick={onClose}></button>
                <ul className="navigation__list">
                    <li className="navigation__element"><Link to="/" className="navigation__link" onClick={onClose}>Главная</Link></li>
                    <li className="navigation__element"><Link to="/movies" className="navigation__link" onClick={onClose}>Фильмы</Link></li>
                    <li className="navigation__element"><Link to="/saved-movies" className="navigation__link" onClick={onClose}>Сохраненные фильмы</Link></li>
                </ul>
                <div className="navigation__profile">
                    <p className="navigation__text">Аккаунт</p>
                    <Link to="/profile"><div className="navigation__icon" onClick={onClose}></div></Link>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;