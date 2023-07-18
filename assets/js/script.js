function displaySearchResults(event) {
  event.preventDefault();
  // Search term must be in lowercase for the books API to work
  var searchTerm = document.getElementById("simple-search").value;
  var oplURL = "https://openlibrary.org/subjects/" + searchTerm.toLowerCase() + ".json";
  var imdbURL = "https://search.imdbot.workers.dev/?q=" + searchTerm + ".json";

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
        
        bookResults.appendChild(document.createElement("div"));
        bookResults.children[i].append(data.works[i][bookTitle]);
        bookResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");

        bookElement.setAttribute("onclick", `exploreItem("${author}", "${year}", "${bookTitle}", "${bookCoverURL}")`);
        bookResults.appendChild(bookElement);
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
        
         movieResults.appendChild(document.createElement("div"));
         movieResults.children[i].append(data.description[i][movieTitle]);
         movieResults.children[i].classList.add("style", "box-border", "p-4", "border-4", "border-black", "bg-gray-200", "text-center", "text-2xl", "font-bold", "rounded-lg", "shadow-lg", "hover:bg-gray-300", "hover:shadow-xl", "transition", "duration-500", "ease-in-out", "transform", "hover:-translate-y-1", "hover:scale-110");

        console.log("movieTitle", movieTitle);
        movieElement.setAttribute("onclick", `exploreItem("${movieTitle}")`);
        movieResults.appendChild(movieElement);
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
}

function exploreItem(author, year, title, coverURL) {
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

}

$("#searchBtn").on("click", displaySearchResults);
