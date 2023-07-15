const imdbURL = "https://search.imdbot.workers.dev/?q=";

const fetchMovies = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export { imdbURL, fetchMovies };