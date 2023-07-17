function displaySearchResults (event) {
    event.preventDefault();

    var searchTerm = document.getElementById("simple-search").value;
    var oplURL = "https://openlibrary.org/subjects/" + searchTerm + ".json";
    var imdbURL = "https://search.imdbot.workers.dev/?q=" + searchTerm + ".json";


    
    fetch(imdbURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for(i = 0; i < 4; i++) {

                var bookResults = document.getElementById('bookResults');

                bookResults.appendChild(document.createElement("div"));
                bookResults.children[i].append(data.description[i]["#TITLE"]);

        }
        }
    );

    fetch(oplURL)
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        for(i = 0; i < 4; i++) {

            var movieResults = document.getElementById('movieResults');

            movieResults.appendChild(document.createElement("div"));
            movieResults.children[i].append(data.works[i]["title"]);
            

        }
});
}