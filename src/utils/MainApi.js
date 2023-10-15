export default class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getHeaders() {
        return {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        }
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        const promise = fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })

        return promise.then(this._checkStatus);
    }

    sendUserInfo({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                email: email,
            })
        })
            .then(this._checkStatus);
    }

    getSavedMovies() {
        const promise = fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._getHeaders(),
        })

        return promise.then(this._checkStatus);
    }

    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        })
            .then(this._checkStatus);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkStatus);
    }
}

//const baseUrl = 'https://api.movies.explorer.nomoredomains.work';
const baseUrl =  "http://localhost:3001";
export const mainApi = new MainApi(baseUrl);