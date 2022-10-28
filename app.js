// http://www.omdbapi.com/?apikey=[yourkey]&
// http://www.omdbapi.com/?i=tt3896198&apikey=91703714
// 91703714
// `http://www.omdbapi.com/?i=tt3896198&apikey=91703714&s=${title}`

/**   ---------------------------------------------------------------- */

const movieWrapperEl = document.querySelector(".movies__list--wrapper");
const userInput = document.querySelector(".input__field");
const userBtn = document.querySelector(".search__btn");
const searchResults = document.querySelector(".search");
let title;

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function userSearchInput(event) {
  title = document.body.querySelector(".input__field").value;
}

function userSearchBtn() {
  movieWrapperEl.classList += " movies__loading";
  const searchResultsHTML = `<h2 class="search">Search results for: <span class="brand__color">   ${title} </span> </h2>`;
  searchResults.innerHTML = searchResultsHTML;
  setTimeout(() => {
    renderMovies(title);
    movieWrapperEl.classList.remove("movies__loading");
  }, 1500);
}

async function renderMovies(title) {
  const movies = await fetch(
    `https://omdbapi.com/?type=movie&apikey=91703714&s=${title}`
  );
  moviesData = await movies.json();
  const films = moviesData.Search.slice(0, 6);
  movieWrapperEl.innerHTML = films.map((movie) => moviesHTML(movie)).join("");
}

function moviesHTML(movie) {
  return `<div class="movie__wrapper">
    <div class="movie__card no-drop">
        <div class="card__overlay"></div>
        <figure class="movie__img--wrapper">
            <img class="" src="${movie.Poster}" alt="">
        </figure>
        </div>
        <div class="movie__description">
            <i class="fas fa-camera-movie"></i>
            <div class="name">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
    </div>`;
}
