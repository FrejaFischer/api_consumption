"use strict"

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWM3MDg1MzU1ZWZjMjdmY2NhNjdkYzMzZGY1MDgzYSIsIm5iZiI6MTcyNjQ4NjIyMi44MzY1ODYsInN1YiI6IjY2ZTgwYjEwZTgyMTFlY2QyMmIwZmJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D1rswkW_doLsLeh97TSAExTxk4oqW9yz1YOXT-sXV58'
        }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));