// http://www.omdbapi.com/?apikey=91703714&s=${title}
// http://www.omdbapi.com/?i=tt3896198&apikey=91703714
// 91703714
// `http://www.omdbapi.com/?i=tt3896198&apikey=91703714&s=${title}`

/**   ---------------------------------------------------------------- */

const movieWrapperEl = document.querySelector(".movies__list--wrapper");
const movieWrapper = document.getElementById("movie__wrapper");
const userInput = document.querySelector(".input__field");
const userBtn = document.querySelector(".search__btn");
const searchResults = document.querySelector(".search");
let title;
const loading = document.getElementById("loading");
const movieSection = document.querySelector(".movies__section");
const footer = document.getElementById("footer");

function displayMovieSection(){
  movieSection.style.display = "block";
  footer.style.height = '250px';
}

function openLoadingDiv() {
  // document.body.classList += " menu--open";
  // movieWrapper.classList += " show__movies";
  loading.style.display = "block";
}

function closeLoadingDiv() {
  // document.body.classList.remove("menu--open");
  // movieWrapper.classList.remove("show__loading--state");
  loading.style.display = "none";
}


function userSearchInput(event) {
  title = document.body.querySelector(".input__field").value;
  if (event.keyCode == 13) {
    console.log("enter button pressed")
    userSearchBtn()
  }
}


async function userSearchBtn(event) {
  movieWrapper.classList += " show__loading--state";
  movieWrapper.classList.remove("show__movies")
  var searchResultsHTML = `<h2 class="search">Search results for: <span class="brand__color">   ${title} </span> </h2>`;
  searchResults.innerHTML = searchResultsHTML;
  let result = await renderMovies(title);
  if(result.length == 0){
    userInput.value = '';
    userInput.focus();
    searchResultsHTML = `<h2 class="search">No results found for: <span class="brand__color">${title}</span> . Please try again.</h2>`;
    searchResults.innerHTML = searchResultsHTML;
  }
}


async function renderMovies(title) {
  displayMovieSection();
  cleanMoviesHtml();
  openLoadingDiv();
  
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=91703714&s=${title}`
  );
  moviesData = await movies.json();

  if(moviesData.Response === "False" || moviesData.Search === undefined){
    closeLoadingDiv();
    return [];
  }
  else{
    const films = moviesData.Search.slice(0, 6);
    setTimeout(() => {
      closeLoadingDiv();
      movieWrapperEl.innerHTML = films.map((movie) => moviesHTML(movie)).join("");
    }, 3 * 1000);
    return films;
  }

}

function cleanMoviesHtml(){
  movieWrapperEl.innerHTML = '';
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