var oplURL = "https://openlibrary.org/subjects/love.json"
var imdbURL = "https://search.imdbot.workers.dev/?q=love.json"



fetch(imdbURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        console.log(data);
        }
    );

fetch(oplURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        console.log(data);
        }
    );
    