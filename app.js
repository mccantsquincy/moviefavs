// http://www.omdbapi.com/?apikey=[yourkey]&
// http://www.omdbapi.com/?i=tt3896198&apikey=91703714
// 91703714

/**   ---------------------------------------------------------------- */

const movieWrapperEl = document.querySelector(".movies__list--wrapper");
const userInput = document.querySelector(".input__field");
const userBtn = document.querySelector(".search__btn");
const searchResults = document.querySelector(".search")
const loader = document.querySelector(".loading")
let title;

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
   document.body.classList.remove("menu--open")
}

function userSearchInput(event){
   title = event.target.value;
} 

function userSearchBtn() {
   renderMovies(title)
   const searchResultsHTML = `<h2 class="search">Search results for: <span class="brand__color">   ${title} </span> </h2>`;  
   setTimeout(() => {
      searchResults.innerHTML = searchResultsHTML
   }, 1500);  
   
}

async function renderMovies(title) {
    const movies = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=91703714&s=${title}`);
    moviesData = await movies.json() 
    // movieWrapperEl.classList += (' movies__loading')
    displayLoading()
    setTimeout(() => { 
        movieWrapperEl.innerHTML = moviesData.Search.map((movie) => 
        moviesHTML(movie))
        .join(""); 
    }, 1500);   
    
}
renderMovies(title) 

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
    </div>`
}

function displayLoading() {
    loader.classList.add("display")
    movieWrapperEl.classList.remove(".movies__list--wrapper")
      setTimeout(() => {
         loader.classList.remove("display")
      }, 1500)
  }