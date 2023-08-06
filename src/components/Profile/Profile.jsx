import React from 'react';
import { useState } from "react";
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Profile.css';

function Profile({ signOut, isLoggedIn, openMenu, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.about);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleErrors(input) {
        setErrors({
            ...errors,
            [input.name]: input.validationMessage,
          });
    }

    function handleChangeName(e) {
        setName(e.target.value);
        const input = e.target;
        handleErrors(input);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        const input = e.target;
        handleErrors(input);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            email,
        });
    }

    function checkValid() {
        if (
            !errors.name &&
            !errors.email && 
            (name !== currentUser.name || 
            email !== currentUser.email)
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    React.useEffect(() => {
        checkValid();
    }, [name, email, currentUser])

    return (
        <>
            <Header loggedIn={isLoggedIn} openMenu={openMenu} />
            <main className="profile">
                <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
                <form className="profile__form" onSubmit={handleSubmit} noValidate>
                    <div className="profile__line">
                        <p className="profile__element">Имя</p>
                        <input className="profile__element profile__element_value" type="text" name="name" onChange={handleChangeName} value={name || ""} minLength={2} maxLength={30} required></input>
                    </div>
                    <span className="profile__error">{errors.name}</span>
                    <div className="profile__line">
                        <p className="profile__element">E-mail</p>
                        <input className="profile__element profile__element_value" type="email" name="email" onChange={handleChangeEmail} value={email || ""} required></input>
                    </div>
                    <span className="profile__error">{errors.email}</span>
                    <button type="submit" className="profile__editing" disabled={!isValid}>Редактировать</button>
                </form>
                <button type="button" className="profile__exit" onClick={signOut}>Выйти из аккаунта</button>
            </main>
            <Navigation />
        </>
    );
}

export default Profile;