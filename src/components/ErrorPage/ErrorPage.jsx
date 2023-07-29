import React from "react";
import { useNavigate } from "react-router-dom";
import './ErrorPage.css';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <main className="error">
            <h1 className="error__code">404</h1>
            <p className="error__text">Страница не найдена</p>
            <button className="error__back" onClick={() => navigate(-1)}>Назад</button>
        </main>
    );
}

export default ErrorPage;