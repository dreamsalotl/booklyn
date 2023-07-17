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
        for(i = 0; i < 4; i++) {

                var bookResults = document.getElementById('bookResults');

                bookResults.appendChild(document.createElement("div"));
                bookResults.children[i].append(data.description[i]["#TITLE"]);
                bookResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");
            };
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
            movieResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");
        };
});

clearResults();
}

function clearResults() {

    var bookResults = document.getElementById('bookResults');
    var movieResults = document.getElementById('movieResults');

    while(bookResults.firstChild) {
        bookResults.removeChild(bookResults.firstChild);
    }

    while(movieResults.firstChild) {
        movieResults.removeChild(movieResults.firstChild);
    }
}

$("#searchBtn").on("click", displaySearchResults);