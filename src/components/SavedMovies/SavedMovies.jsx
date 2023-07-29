import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Navigation from '../Navigation/Navigation';


function SavedMovies() {
    return (
        <>
            <Header />
            <main className="content">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer></Footer>
            <Navigation />
        </>
    );
}

export default SavedMovies;