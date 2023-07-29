import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo__header.svg';
import HeaderNav from "./HeaderNav/HeaderNav";

function Header() {
    return (
        <header className="header">
            <Link to="/"><img className="header__logo" alt="Логотип" src={logo} /></Link>
            {/*Здесь будет стэйт LoggedIn*/}
            <HeaderNav />
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