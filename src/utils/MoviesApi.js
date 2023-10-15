export default class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getDataMovies() {
        const promise = fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return promise.then(this._checkStatus);
    }
}

const baseUrl = 'https://api.nomoreparties.co';
export const moviesApi = new MoviesApi(baseUrl);