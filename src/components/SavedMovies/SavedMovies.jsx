import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Navigation from '../Navigation/Navigation';


function SavedMovies({ savedMoviesCards, isSaved, deleteMovie, searchMovies, isFound, handleButtonMore, openMenu, isButtonMore, handleCheckbox, isCheckboxTrue, setIsCheckboxTrue, isLoggedIn }) {
    return (
        <>
            <Header loggedIn={isLoggedIn} openMenu={openMenu} />
            <main className="content">
                <SearchForm searchMovies={searchMovies} handleCheckbox={handleCheckbox} isCheckboxTrue={isCheckboxTrue} setIsCheckboxTrue={setIsCheckboxTrue} />
                <MoviesCardList
                    movies={savedMoviesCards}
                    isSaved={isSaved}
                    deleteMovie={deleteMovie}
                    isFound={isFound}
                    handleButtonMore={handleButtonMore}
                    isButtonMore={isButtonMore}
                />
            </main>
            <Footer></Footer>
            <Navigation />
        </>
    );
}

export default SavedMovies;