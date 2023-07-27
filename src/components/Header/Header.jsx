import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo__header.svg';

function Header({ children }) {
    return (
        <header className="header">
            <Link to="/"><img className="header__logo" alt="Логотип" src={logo} /></Link>
            {children}
            {/*Здесь будет стэйт LoggedIn*/}
            <div className="header__profile">
                <p className="header__text">Аккаунт</p>
                <Link to="/profile"><div className="header__icon"></div></Link>
                <button className="header__menu"></button>
            </div>
            {/*
            <div className="header__auth">
                <Link to="/signup" className="header__register">Регистрация</Link>
                <Link to="/signin" className="header__login">Войти</Link>
            </div>
            */}
        </header>
    );
}

export default Header;