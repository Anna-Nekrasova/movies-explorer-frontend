import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo__header.svg';
import useForm from '../../hooks/useForm.js';

function Login({ loginUser }) {
    const [isValid, setIsValid] = React.useState(false);

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

    function checkValidEmail() {
        const email = form.email;
        const valid = email.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu);
        if (valid === null) {
            return false;
        } else {
            return true;
        }
    }

    function checkValid() {
        const isValidEmail = checkValidEmail();
        if (!errors.email
            && !errors.password
            && form.email !== ""
            && form.password !== ""
            && isValidEmail === true
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    React.useEffect(() => {
        checkValid();
    }, [form])

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
                <button className="login__save" type="submit" disabled={!isValid}>Войти</button>
            </form>
            <p className="login__element">Ещё не зарегестрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
        </main>
    );
}

export default Login;