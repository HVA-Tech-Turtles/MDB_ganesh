/// API endpoint for fetching a list of movies.
const URL = "https://api.themoviedb.org/3/discover/movie?&api_key=23e17483aaafd33b60b11bec9a1fd77c&page=2";

///The base URL for retrieving movie poster images.
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

///The API endpoint for searching movies by a query.
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=23e17483aaafd33b60b11bec9a1fd77c&query=";

///html elements............................
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchButton = document.getElementById("search-button");

///retrieves the favorite movies initially
getMovies(URL);

/// async func starts
async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  const movies = responseData.results;

  console.log(responseData);

  // Check if any movies are returned in the response
  if (movies.length === 0) {
    showNoResultsMessage();
    return;
  }

  // function to display the movies.
  showMovies(movies);
}

function showMovies(movies) {
  // Clears the  main element
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title } = movie;
    const movieX = document.createElement("div");
    movieX.classList.add("movie");

    movieX.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title} Poster"/>
      <div class="movie-info">
        <h3>${title}</h3>
      </div>
    `;

    main.appendChild(movieX);
  });
}

function showNoResultsMessage() {
  main.innerHTML = `
    <div class="no-results">
      <p>No results found.</p>
      <p>Please enter a valid movie name.</p>
      <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="No results Giphy" />
    </div>
  `;
}

function handSearch(event) {
  event.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  } else {
    showNoResultsMessage();
  }
}

form.addEventListener("submit", handSearch);
searchButton.addEventListener("click", handSearch);
