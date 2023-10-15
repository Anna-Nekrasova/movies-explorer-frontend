import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';
import * as authApi from "../../utils/AuthApi.js";
import { mainApi } from '../../utils/MainApi.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

function App() {
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesInfo, setMoviesInfo] = React.useState([]);
  const [savedMoviesInfo, setSavedMoviesInfo] = React.useState([]);
  const [allSavedMoviesInfo, setAllSavedMoviesInfo] = React.useState([]);
  const [resizedSavedMoviesInfo, setResizedSavedMoviesInfo] = React.useState([]);
  const [foundSavedMoviesInfo, setFoundSavedMoviesInfo] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFound, setIsFound] = React.useState(true);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [moreCards, setMoreCards] = React.useState(0);
  const [isButtonMore, setIsButtonMore] = React.useState(false);
  const [isButtonMoreSavedMovies, setIsButtonMoreSavedMovies] = React.useState(false);
  const [isCheckboxTrueSavedMovies, setIsCheckboxTrueSavedMovies] = React.useState(false);
  const [movieKey, setMovieKey] = React.useState("");
  const [savedMovieKey, setSavedMovieKey] = React.useState("");
  const [isCheckboxTrue, setIsCheckboxTrue] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  React.useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      setIsLoading(true);
      moviesApi.getDataMovies()
        .then((moviesData) => {
          setAllMovies(moviesData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });

      mainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });

      getSavedMoviesFromApi();

      if (localStorage.moviesKey) {
        setMovieKey(JSON.parse(localStorage.getItem('moviesKey')));
      } else {
        localStorage.setItem('moviesKey', JSON.stringify(""));
      }

      if (localStorage.isCheckboxTrue === "true") {
        setIsCheckboxTrue(true);
      } else {
        setIsCheckboxTrue(false);
      }

    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    window.addEventListener('resize', checkWindowWidth);
    handleResizeMovies();
  }, [windowWidth, location]);

  React.useEffect(() => {
    searchSavedMovies(savedMovieKey, isCheckboxTrueSavedMovies);
  }, [allSavedMoviesInfo]);

  React.useEffect(() => {
    setSavedMovieKey("");
    setIsCheckboxTrueSavedMovies(false);
  }, [location]);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  function handleMenuOpen() {
    setIsMenuPopupOpen(true);
  };

  function handleMenuClose() {
    setIsMenuPopupOpen(false);
  }

  //Поиск фильмов
  function searchMovies(key) {
    if (key === "") {
      return
    }
    setIsFound(true);
    localStorage.setItem('moviesKey', JSON.stringify(key));
    const isCheckboxTrue = JSON.parse(localStorage.getItem('isCheckboxTrue'));
    if (isCheckboxTrue) {
      const filterMoviesList = allMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(key.toLowerCase());
      });
      const filterShortMoviesList = handleCheckboxFilter(filterMoviesList);
      if (filterShortMoviesList.length === 0) {
        setIsFound(false);
      } else {
        setMoviesInfo(filterShortMoviesList);
        localStorage.setItem('foundMovies', JSON.stringify(filterShortMoviesList));
      }
    } else {
      const filterMoviesList = allMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(key.toLowerCase());
      });
      if (filterMoviesList.length === 0) {
        setIsFound(false);
      } else {
        setMoviesInfo(filterMoviesList);
        localStorage.setItem('foundMovies', JSON.stringify(filterMoviesList));
      }
    }
    handleResizeMovies();
  }

  //Чекбокс короткометражки
  function handleCheckbox(isCheckboxTrue) {
    if (location === "/movies") {
      localStorage.setItem('isCheckboxTrue', JSON.stringify(isCheckboxTrue));
      const key = JSON.parse(localStorage.getItem('moviesKey'));
      if (key === "") {
        return
      }
      searchMovies(key);
    } else {
      setIsCheckboxTrueSavedMovies(isCheckboxTrue);
      searchSavedMovies(savedMovieKey, isCheckboxTrue);
    }
  }

  function handleCheckboxFilter(data) {
    const filterMoviesList = data.filter((movie) => {
      return movie.duration <= 40;
    });
    return filterMoviesList;
  }

  //Отображаемые фильмы
  function handleResizeMovies() {
    checkWindowWidth();
    const array = JSON.parse(localStorage.getItem('foundMovies'));
    if (array === null) {
      return
    }
    if (windowWidth >= 1250) {
      setMoreCards(3);
      const newArray = array.slice(0, 12);
      localStorage.setItem('resizedMovies', JSON.stringify(newArray));
      array.length === newArray.length ? setIsButtonMore(false) : setIsButtonMore(true);
      setMoviesInfo(newArray);
    } else if (windowWidth > 765 && windowWidth < 1250) {
      setMoreCards(2);
      const newArray = array.slice(0, 8);
      localStorage.setItem('resizedMovies', JSON.stringify(newArray));
      array.length === newArray.length ? setIsButtonMore(false) : setIsButtonMore(true);
      setMoviesInfo(newArray);
    } else if (windowWidth <= 765) {
      setMoreCards(2);
      const newArray = array.slice(0, 5);
      localStorage.setItem('resizedMovies', JSON.stringify(newArray));
      array.length === newArray.length ? setIsButtonMore(false) : setIsButtonMore(true);
      setMoviesInfo(newArray);
    }
  }

  //Кнопка еще
  function handleButtonMore() {
    if (location === "/movies") {
      const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
      const resizedMovies = JSON.parse(localStorage.getItem('resizedMovies'));
      const newMoviesList = foundMovies.slice(0, resizedMovies.length + moreCards);
      localStorage.setItem('resizedMovies', JSON.stringify(newMoviesList));
      setMoviesInfo(newMoviesList);
      foundMovies.length === newMoviesList.length ? setIsButtonMore(false) : setIsButtonMore(true);
    } else {
      const newMoviesList = foundSavedMoviesInfo.slice(0, resizedSavedMoviesInfo.length + moreCards);
      setResizedSavedMoviesInfo(newMoviesList);
      setSavedMoviesInfo(newMoviesList);
      foundSavedMoviesInfo.length === newMoviesList.length ? setIsButtonMoreSavedMovies(false) : setIsButtonMoreSavedMovies(true);
    }
  }

  //Получаем фильмы с сервера
  function getSavedMoviesFromApi() {
    mainApi.getSavedMovies()
      .then((data) => {
        setAllSavedMoviesInfo(data.movies);
        localStorage.setItem('allSavedMovies', JSON.stringify(data.movies));
        setSavedMoviesInfo(data.movies);
        setFoundSavedMoviesInfo(data.movies);
        handleResizeSavedMovies(data.movies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //Поиск в сохраненных фильмах
  function searchSavedMovies(key, isCheckboxTrueSavedMovies) {
    setSavedMovieKey(key);
    setIsFound(true);
    const filterMoviesList = allSavedMoviesInfo.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(key.toLowerCase());
    });
    if (filterMoviesList.length === 0) {
      setIsFound(false);
    } else {
      if (isCheckboxTrueSavedMovies) {
        setSavedMoviesInfo(handleCheckboxFilter(filterMoviesList));
        setFoundSavedMoviesInfo(handleCheckboxFilter(filterMoviesList));
        handleResizeSavedMovies(handleCheckboxFilter(filterMoviesList));
      } else {
        setSavedMoviesInfo(filterMoviesList);
        setFoundSavedMoviesInfo(filterMoviesList);
        handleResizeSavedMovies(filterMoviesList);
      }
    }
  }

  //Отображаемые сохраненные фильмы
  function handleResizeSavedMovies(array) {
    checkWindowWidth();
    if (windowWidth >= 1250) {
      setMoreCards(3);
      const newArray = array.slice(0, 12);
      setResizedSavedMoviesInfo(newArray)
      array.length === newArray.length ? setIsButtonMoreSavedMovies(false) : setIsButtonMoreSavedMovies(true);
      setSavedMoviesInfo(newArray);
    } else if (windowWidth > 765 && windowWidth < 1250) {
      setMoreCards(2);
      const newArray = array.slice(0, 8);
      setResizedSavedMoviesInfo(newArray)
      array.length === newArray.length ? setIsButtonMoreSavedMovies(false) : setIsButtonMoreSavedMovies(true);
      setSavedMoviesInfo(newArray);
    } else if (windowWidth <= 765) {
      setMoreCards(2);
      const newArray = array.slice(0, 5);
      setResizedSavedMoviesInfo(newArray)
      array.length === newArray.length ? setIsButtonMoreSavedMovies(false) : setIsButtonMoreSavedMovies(true);
      setSavedMoviesInfo(newArray);
    }
  }

  //Пользователь
  function registerUser({ name, email, password }) {
    authApi.register(name, email, password)
      .then((res) => {
        loginUser({ email, password });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function loginUser({ email, password }) {
    authApi.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      authApi.getUserData(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesKey');
    localStorage.removeItem('isCheckboxTrue');
    localStorage.removeItem('resizedMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('allSavedMovies');
    setMoviesInfo([]);
    setMovieKey("");
    setIsCheckboxTrue(false);
    setIsButtonMore(false);
    setAllSavedMoviesInfo([]);
    setSavedMoviesInfo([]);
    setResizedSavedMoviesInfo([]);
    setFoundSavedMoviesInfo([]);
    setIsLoggedIn(false);
    navigate('/');
  }

  //Сохранение/удаление фильмов
  function isSaved(movie) {
    const isSavedMovies = allSavedMoviesInfo.find(
      (item) => item.movieId === movie.id || movie._id || movie.movieId
    );
    if (isSavedMovies) {
      return true;
    }
    return false;
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((data) => {
        const newSavedMovie = data;
        setAllSavedMoviesInfo([newSavedMovie, ...allSavedMoviesInfo]);
        getSavedMoviesFromApi();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function deleteMovie(movie) {
    const isLiked = allSavedMoviesInfo.find((item) => (item.nameRU) === (movie.nameRU) && item.owner);
    mainApi.deleteMovie(isLiked._id)
      .then(() => {
        const newList = allSavedMoviesInfo.filter((item) => item._id !== isLiked._id);
        localStorage.setItem('allSavedMovies', JSON.stringify(newList));
        setAllSavedMoviesInfo(JSON.parse(localStorage.getItem('allSavedMovies')));
        setSavedMoviesInfo(JSON.parse(localStorage.getItem('allSavedMovies')));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function likeOrDislikeMovie(movie) {
    isSaved(movie) ? deleteMovie(movie) : saveMovie(movie);
  }

  //редактирование информации о пользователе
  function onUpdateUser({ name, email }) {
    mainApi.sendUserInfo({
      name: name,
      email: email,
    })
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">
        <Routes>
          <Route path="/" element={<Main
            isLoggedIn={isLoggedIn}
            openMenu={handleMenuOpen} />}
          />
          <Route path="/signup" element={<Register registerUser={registerUser} />} />
          <Route path="/signin" element={<Login loginUser={loginUser} />} />
          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            moviesCards={moviesInfo}
            isLoading={isLoading}
            saveMovie={likeOrDislikeMovie}
            isSaved={isSaved}
            deleteMovie={deleteMovie}
            searchMovies={searchMovies}
            isFound={isFound}
            openMenu={handleMenuOpen}
            handleButtonMore={handleButtonMore}
            isButtonMore={isButtonMore}
            handleCheckbox={handleCheckbox}
            movieKey={movieKey}
            setMovieKey={setMovieKey}
            isCheckboxTrue={isCheckboxTrue}
            setIsCheckboxTrue={setIsCheckboxTrue}
            isLoggedIn={isLoggedIn} />}
          />
          <Route path="/saved-movies" element={<ProtectedRoute
            element={SavedMovies}
            savedMoviesCards={savedMoviesInfo}
            isSaved={isSaved}
            deleteMovie={deleteMovie}
            searchMovies={searchSavedMovies}
            isFound={isFound}
            openMenu={handleMenuOpen}
            handleButtonMore={handleButtonMore}
            isButtonMore={isButtonMoreSavedMovies}
            handleCheckbox={handleCheckbox}
            isCheckboxTrue={isCheckboxTrueSavedMovies}
            setIsCheckboxTrue={setIsCheckboxTrueSavedMovies}
            isLoggedIn={isLoggedIn} />}
          />
          <Route path="/profile" element={<ProtectedRoute
            element={Profile}
            signOut={signOut}
            openMenu={handleMenuOpen}
            onUpdateUser={onUpdateUser}
            isLoggedIn={isLoggedIn} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Navigation isOpen={isMenuPopupOpen} onClose={handleMenuClose} />
      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
