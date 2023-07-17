function displaySearchResults (event) {
    event.preventDefault();

    var searchTerm = document.getElementById("simple-search").value;
    var oplURL = "https://openlibrary.org/subjects/" + searchTerm + ".json";
    var imdbURL = "https://search.imdbot.workers.dev/?q=" + searchTerm + ".json";
    
    fetch(imdbURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        console.log(data.description[0]["#TITLE"]);
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
}

$("#searchBtn").on("click", displaySearchResults);