import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo__header.svg'

function Login() {
    return (
        <main className="login">
            <img className="login__logo" alt="Логотип" src={logo} />
            <h1 className="login__greeting">Рады видеть!</h1>
            <form className="login__form" name="loginForm">
                <div className="login__content">
                    {/* Добавить валидацию на 4 этапе*/}
                    <p className="login__line">E-mail</p>
                    <input type="email" className="login__text" id="email" name="email" placeholder="Введите email" required />
                    <span className="login__error"></span>
                    <p className="login__line">Пароль</p>
                    <input type="password" className="login__text" id="password" name="password" placeholder="Введите пароль" required />
                    <span className="login__error"></span>
                </div>
                <button className="login__save" type="submit">Войти</button>
            </form>
            <p className="login__element">Ещё не зарегестрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
        </main>
    );
}

export default Login;