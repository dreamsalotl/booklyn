var oplURL = "https://openlibrary.org/subjects/love.json"
var imdbURL = "https://search.imdbot.workers.dev/?q=love.json"



fetch(omdbURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        console.log(data);
    }
    );
