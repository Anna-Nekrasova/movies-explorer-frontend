import React from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ searchMovies, handleCheckbox, movieKey, setMovieKey, isCheckboxTrue, setIsCheckboxTrue }) {
    const [searchKey, setSearchKey] = React.useState("");
    const [errors, setErrors] = useState({});
    const location = useLocation().pathname;

    function handleErrors(input) {
        setErrors({
            ...errors,
            [input.name]: input.validationMessage,
        });
    }

    const handleChange = (evt) => {
        const input = evt.target;
        handleErrors(input);
        if (location === "/movies") {
            setMovieKey(input.value);
        } else {
            setSearchKey(input.value);
        }

    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (location === "/movies") {
            localStorage.setItem('moviesKey', JSON.stringify(movieKey));
            searchMovies(movieKey);
        } else {
            searchMovies(searchKey, isCheckboxTrue);
        }

    };

    return (
        <>
            <section className="search">
                <form className="search__form" name="searchForm" onSubmit={handleSubmit} noValidate>
                    <div className="search__content">
                        <input type="text" className="search__field" id="searchField" name="searchField" placeholder="Введите название фильма" value={location === "/movies" ? (movieKey || "") : (searchKey || "")} onChange={handleChange} required />
                    </div>
                    <button className="search__button" type="submit"></button>
                </form>
                <span className="search__error">{errors.searchField}</span>
            </section>
            <FilterCheckbox handleCheckbox={handleCheckbox} isCheckboxTrue={isCheckboxTrue} setIsCheckboxTrue={setIsCheckboxTrue} />
        </>
    );
}

export default SearchForm;
