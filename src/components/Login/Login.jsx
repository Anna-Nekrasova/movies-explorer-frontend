import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo__header.svg';
import useForm from '../../hooks/useForm.js';

function Login({ loginUser }) {
    const { form, errors, handleChange } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!form.email || !form.password) {
            return
        }
        loginUser(form)
    };

    return (
        <main className="login">
            <Link to="/"><img className="login__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="login__greeting">Рады видеть!</h1>
            <form className="login__form" name="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="login__content">
                    <p className="login__line">E-mail</p>
                    <input type="email" className="login__text" id="email" name="email" placeholder="Введите email" value={form.email} onChange={handleChange} required />
                    <span className="login__error">{errors.email}</span>
                    <p className="login__line">Пароль</p>
                    <input type="password" className="login__text" id="password" name="password" placeholder="Введите пароль" value={form.password} onChange={handleChange} required />
                    <span className="login__error">{errors.password}</span>
                </div>
                <button className="login__save" type="submit">Войти</button>
            </form>
            <p className="login__element">Ещё не зарегестрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
        </main>
    );
}

export default Login;