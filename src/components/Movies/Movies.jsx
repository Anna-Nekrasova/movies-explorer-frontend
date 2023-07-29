import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
//import Preloader from './Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Navigation from '../Navigation/Navigation';
import './Movies.css';


function Movies() {
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

export default Movies;