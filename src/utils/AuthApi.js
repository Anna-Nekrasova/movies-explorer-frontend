//export const baseUrl = "https://api.movies.explorer.nomoredomains.work/";
export const baseUrl =  "http://localhost:3001/";


const makeRequest = (url, method, body, token) => {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${baseUrl}${url}`, options).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Ошибка код ${response.status}`);
    });
};

export function register (name, email, password) {
    return makeRequest("signup", "POST", { name, email, password });
};

export function authorize (email, password) {
    return makeRequest("signin", "POST", { email, password });
};

export function getUserData(token) {
    return makeRequest("users/me", "GET", null, token);
};