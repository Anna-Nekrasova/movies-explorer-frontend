import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, saveMovie, isSaved, deleteMovie, isFound, handleButtonMore, isButtonMore }) {

    return (
        <section className="movies">
            {isFound
                ? <>
                    <div className="movies__list">
                        {movies.map((item) =>
                            <MoviesCard
                                saveMovie={saveMovie}
                                isSaved={isSaved}
                                deleteMovie={deleteMovie}
                                movie={item}
                                key={item.id || item._id || item.movieId}
                                image={item.image}
                                nameRU={item.nameRU}
                                duration={item.duration}
                                trailerLink={item.trailerLink}
                            />
                        )}
                    </div>
                    <button type="button" className={isButtonMore ? "movies__button" : "movies__button_off"} onClick={handleButtonMore}>Ещё</button>
                </>
                : <h3 className="movies__not-found">Ничего не найдено</h3>
        }

        </section>
    );
}

export default MoviesCardList;