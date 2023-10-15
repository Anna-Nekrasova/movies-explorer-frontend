import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Navigation from '../Navigation/Navigation';
import './Movies.css';


function Movies({ moviesCards, isLoading, saveMovie, isSaved, deleteMovie, searchMovies, isFound, openMenu, handleButtonMore, isButtonMore, isLoggedIn, handleCheckbox, movieKey, setMovieKey, isCheckboxTrue, setIsCheckboxTrue }) {
    return (
        <>
            <Header loggedIn={isLoggedIn} openMenu={openMenu} />
            <main className="content">
                <SearchForm searchMovies={searchMovies} handleCheckbox={handleCheckbox} movieKey={movieKey} setMovieKey={setMovieKey} isCheckboxTrue={isCheckboxTrue} setIsCheckboxTrue={setIsCheckboxTrue}/>
                {isLoading
                    ? <Preloader />
                    : <MoviesCardList
                        movies={moviesCards}
                        saveMovie={saveMovie}
                        isSaved={isSaved}
                        deleteMovie={deleteMovie}
                        isFound={isFound}
                        handleButtonMore={handleButtonMore}
                        isButtonMore={isButtonMore}
                    />
                }
            </main>
            <Footer></Footer>
            <Navigation />
        </>
    );
}

export default Movies;