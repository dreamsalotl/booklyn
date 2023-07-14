// I'm going to need a script that pulls from the New York Public Library API and saves the data to a variable

var oplURL = "https://openlibrary.org/subjects/love.json"
var omdbURL = "http://www.omdbapi.com/?g=love&apikey=3a173ad9"



fetch(omdbURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        console.log(data);
    }
    );
