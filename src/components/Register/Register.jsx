import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo__header.svg';
import useForm from '../../hooks/useForm.js';

function Register({ registerUser }) {
    const [isValid, setIsValid] = React.useState(false);

    const { form, errors, handleChange } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        registerUser(form);
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
        if (!errors.name
            && !errors.email
            && !errors.password
            && form.name !== ""
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
        <main className="register">
            <Link to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__greeting">Добро пожаловать!</h1>
            <form className="register__form" name="registerForm" onSubmit={handleSubmit} noValidate>
                <div className="register__content">
                    <p className="register__line">Имя</p>
                    <input type="text" className="register__text" id="name" name="name" placeholder="Введите имя" value={form.name} onChange={handleChange} minLength={2} maxLength={30} required />
                    <span className="register__error">{errors.name}</span>
                    <p className="register__line">E-mail</p>
                    <input type="email" className="register__text" id="email" name="email" placeholder="Введите email" value={form.email} onChange={handleChange} required />
                    <span className="register__error">{errors.email}</span>
                    <p className="register__line">Пароль</p>
                    <input type="password" className="register__text" id="password" name="password" placeholder="Введите пароль" value={form.password} onChange={handleChange} required />
                    <span className="register__error">{errors.password}</span>
                </div>
                <button className="register__save" type="submit" disabled={!isValid}>Зарегестрироваться</button>
            </form>
            <p className="register__element">Уже зарегестрированы? <Link to="/signin" className="register__link">Войти</Link></p>
        </main>
    );
}

export default Register;