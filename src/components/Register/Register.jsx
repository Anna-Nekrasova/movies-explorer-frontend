import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo__header.svg'

function Register() {
    return (
        <main className="register">
            <Link to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__greeting">Добро пожаловать!</h1>
            <form className="register__form" name="registerForm">
                <div className="register__content">
                    {/* Добавить валидацию на 4 этапе*/}
                    <p className="register__line">Имя</p>
                    <input type="text" className="register__text" id="name" name="name" placeholder="Введите имя" required />
                    <span className="register__error"></span>
                    <p className="register__line">E-mail</p>
                    <input type="email" className="register__text" id="email" name="email" placeholder="Введите email" required />
                    <span className="register__error"></span>
                    <p className="register__line">Пароль</p>
                    <input type="password" className="register__text" id="password" name="password" placeholder="Введите пароль" required />
                    <span className="register__error"></span>
                </div>
                <button className="register__save" type="submit">Зарегестрироваться</button>
            </form>
            <p className="register__element">Уже зарегестрированы? <Link to="/signin" className="register__link">Войти</Link></p>
        </main>
    );
}

export default Register;