function displaySearchResults(event) {
  event.preventDefault();
  // Search term must be in lowercase for the books API to work
  var searchTerm = document.getElementById("simple-search").value;
  var oplURL = "https://openlibrary.org/subjects/" + searchTerm.toLowerCase() + ".json";
  var imdbURL = "https://search.imdbot.workers.dev/?q=" + searchTerm + ".json";
  var previousSearches = [];


  fetch(oplURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("books", data);
      if (data.works.length === 0) {
        return;
      }
      for (i = 0; i < 4; i++) {
        // create variables to avoid repeating the DOM navigation calls
        var bookTitle = data.works[i]["title"];
        var bookResults = document.getElementById("bookResults");
        var bookElement = document.createElement("div");
        var bookCoverid = data.works[i].cover_id;
        var bookCoverURL = `https://covers.openlibrary.org/b/ID/${bookCoverid}-M.jpg`;
        var author = data.works[i].authors[0].name;
        var year = data.works[i].first_publish_year;
      
        bookElement.setAttribute("onclick", `exploreBook("${author}", "${year}", "${bookTitle}", "${bookCoverURL}")`);

        bookResults.appendChild(bookElement);
        bookResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");
        bookResults.children[i]?.append(bookTitle);
      }
    });

  fetch(imdbURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("movies", data);
      if (data.description.length === 0) {
        return;
      }
      for (i = 0; i < 4; i++) {
        // create variables to avoid repeating the DOM navigation calls
        var movieTitle = data.description[i]?.["#TITLE"];
        var movieResults = document.getElementById("movieResults");
        var movieElement = document.createElement("div");
        var movieActors = data.description[i]?.["#ACTORS"];
        var movieYear = data.description[i]?.["#YEAR"];
        var movieCover = data.description[i]?.["#IMG_POSTER"];


        
        console.log("movieTitle", movieTitle);
        movieElement.setAttribute("onclick", `exploreMovie("${movieActors}", "${movieYear}", "${movieTitle}", "${movieCover}")`);
        movieResults.appendChild(movieElement);
        movieResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");
        movieResults.children[i]?.append(movieTitle);
      }
    });

  clearResults();
}

function clearResults() {
  var bookResults = document.getElementById("bookResults");
  var movieResults = document.getElementById("movieResults");

  while (bookResults.firstChild) {
    bookResults.removeChild(bookResults.firstChild);
  }

  while (movieResults.firstChild) {
    movieResults.removeChild(movieResults.firstChild);
  }
  document.getElementById("preview-section").setAttribute("style", "display: none");

}


// Book section 
function exploreBook(author, year, title, coverURL) {
    var contentElement = document.getElementById("preview-content");
    contentElement.innerHTML = "";
  console.log(
    "title",
    title,
    "author",
    author,
    "year",
    year,
    "coverURL",
    coverURL
  );
  //update the content of element with id preview-content
  var coverElement = document.createElement("img")
  coverElement.setAttribute("src", coverURL)
  contentElement.appendChild(coverElement);

  //add title 
var titleElement = document.createElement("h3")
titleElement.innerText = `Title: ${title}`
contentElement.appendChild(titleElement)
  //add author
var authorElement = document.createElement("p")
authorElement.innerText = `Author: ${author}`
contentElement.appendChild(authorElement)
  //add year
  var yearElement = document.createElement("p")
  yearElement.innerText = `Year: ${year}`
  contentElement.appendChild(yearElement)

  document.getElementById("preview-section").setAttribute("style", "display: flex");

}

function exploreMovie(movieActors, movieYear, movieTitle, movieCover) {
    var contentElement = document.getElementById("preview-content");
    contentElement.innerHTML = "";
   console.log("Actors", movieActors, "year", movieYear, "title", movieTitle, "cover", movieCover)

    var coverElement = document.createElement("img")
    coverElement.setAttribute("src", movieCover)
    contentElement.appendChild(coverElement);

    var titleElement = document.createElement("h3")
    titleElement.innerText = `Title: ${movieTitle}`
    contentElement.appendChild(titleElement)

    var actorElement = document.createElement("p")
    actorElement.innerText = `Actors: ${movieActors}`
    contentElement.appendChild(actorElement)

    var yearElement = document.createElement("p")
    yearElement.innerText = `Year: ${movieYear}`
    contentElement.appendChild(yearElement)

    document.getElementById("preview-section").setAttribute("style", "display: flex");
};

$("#searchBtn").on("click", displaySearchResults);



