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
            //console.log(data.description[i]["#TITLE"]);
            console.log(data.description);
            

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
            //console.log(data.works[i]["title"]);
            console.log(data.works);
            

        }
});
}

$("#searchBtn").on("click", displaySearchResults);