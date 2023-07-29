import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <>
            <section className="search">
                <form className="search__form" name="searchForm">
                    <div className="search__content">
                        <input type="search" className="search__field" id="searchField" name="searchField" placeholder="Фильм" required />
                    </div>
                    <button className="search__button" type="submit"></button>
                </form>
            </section>
            <FilterCheckbox />
        </>
    );
}

export default SearchForm;
