import React from "react";
import { Link } from "react-router-dom";
import './HeaderNav.css';

function HeaderNav() {
    return (
            <nav className="header__nav">
                <ul className="header__list">
                    <li><Link to="/movies" className="header__element">Фильмы</Link></li>
                    <li><Link to="/saved-movies" className="header__element">Сохраненные фильмы</Link></li>
                </ul>
            </nav>
    );
}

export default HeaderNav;