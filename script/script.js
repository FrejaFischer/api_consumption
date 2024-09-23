"use strict"

const now_playing_btn = document.querySelector("#now_playing");
const popular_btn = document.querySelector("#popular");
const top_rated_btn = document.querySelector("#top_rated");
const upcoming_btn = document.querySelector("#upcoming");

const movies_container = document.createElement("div"); // container for having each movie in it, before appending to main after loop
const main = document.querySelector("main");

// First load of site - fetch Now Playing data
fetchData("now_playing");
activeBtn(now_playing_btn);

// Eventlisteners for nav buttons
now_playing_btn.addEventListener("click", (e)=>{navEvent("now_playing", e)});
popular_btn.addEventListener("click", (e)=>{navEvent("popular", e)});
top_rated_btn.addEventListener("click", (e)=>{navEvent("top_rated", e)});
upcoming_btn.addEventListener("click", (e)=>{navEvent("upcoming", e)});

function navEvent(endpoint, e){
    fetchData(endpoint);
    activeBtn(e.target);
}

// function to fetch data from API
function fetchData(endpoint){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWM3MDg1MzU1ZWZjMjdmY2NhNjdkYzMzZGY1MDgzYSIsIm5iZiI6MTcyNjQ4NjIyMi44MzY1ODYsInN1YiI6IjY2ZTgwYjEwZTgyMTFlY2QyMmIwZmJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D1rswkW_doLsLeh97TSAExTxk4oqW9yz1YOXT-sXV58'
            }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => showData(response))
    .catch(err => console.error(err));
};

function showData(response){
    main.innerHTML = ""; // empty main for existing content
    movies_container.innerHTML = ""; // empty movies_container for content
    const movies = response.results; //movies is an object with several items. We need the array with all the movies

    movies.forEach(movie => {
        const movieArticle = document.createElement("article");

        const movieHeader = document.createElement("header");
        const movieTitle = document.createElement("h2");
        movieTitle.innerText = movie.original_title;
        movieHeader.appendChild(movieTitle);
        
        const movieImage = document.createElement("img");
        movieImage.setAttribute("src", `https://image.tmdb.org/t/p/w400/${movie.poster_path}`);
        movieImage.setAttribute("alt", movie.title);
        
        const movieTextSection = document.createElement("section");
        movieTextSection.innerHTML = `
        <p>${movie.overview}</p>
        <p><span>Original Title: </span>${movie.original_title}</p>
        <p><span>Release Date: </span>${movie.release_date}</p>
        `;
        
        const stylingDiv = document.createElement("div"); // this is used for styling
        stylingDiv.append(movieImage, movieTextSection);

        movieArticle.append(movieHeader, stylingDiv);
        movies_container.appendChild(movieArticle);

    });
    main.appendChild(movies_container);
};

// function for adding the active styling to the current button
function activeBtn(active_btn){
now_playing_btn.classList.remove("active");
popular_btn.classList.remove("active");
top_rated_btn.classList.remove("active");
upcoming_btn.classList.remove("active");

active_btn.classList.add("active");
};
