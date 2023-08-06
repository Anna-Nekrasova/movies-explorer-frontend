import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ handleCheckbox, isCheckboxTrue, setIsCheckboxTrue }) {
    const [checkbox, setCheckbox] = React.useState(false);

    function handleCheckboxInput(evt) {
        const isShortFilms = evt.target.checked;
        setCheckbox(isShortFilms);
        handleCheckbox(isShortFilms);
        setIsCheckboxTrue(isShortFilms)
    };

    return (
            <section className="filter">
                <label className={`filter__switch ${isCheckboxTrue ? "filter__switch_on" : ""}`}>
                    <input className="filter__input" type="checkbox" onChange={handleCheckboxInput} checked={checkbox} required></input>
                </label>
                <p className="filter__text">Короткометражки</p>
            </section>
    );
}

export default FilterCheckbox;