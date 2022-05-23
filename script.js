"use strict"

const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHURL ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const main = document.querySelector("main")
const form = document.querySelector("form")
const search = document.querySelector("input")
const span = document.querySelector("span")

// Uzkrauna popaliarius filmus
fetch(APIURL)
.then(response => response.json())
.then(appendMovieData )
.catch(error=> console.log(error))

// Uzkrauna filmus pagal search raktazodi

form.addEventListener("submit", function(e){
  e.preventDefault()
  // jeigu input tuscias nieko negrazina
   if(!search.value) return
  // Isvalo innerHtml
  main.innerHTML =""


  let searchTerm = search.value
    //  Pakeicia search termina
    span.innerText = searchTerm




fetch(SEARCHURL + searchTerm)
.then(response => response.json())
.then(appendMovieData)
.catch(error=> console.log(error))
})
// isvalo input
search.value =""

function appendMovieData(data){
  const dataResults = data.results
  
  dataResults.map(x=>{
        
      let createMovie = document.createElement("div")
      createMovie.classList.add("movie")
     
    
     
      createMovie.innerHTML = 
     
      `
   
      <img
        src="${IMGPATH + x.backdrop_path}"alt="${x.original_title}"
      />
      <div class="movie-info">
        <h3>${x.original_title}</h3>
        <span id="vote"> ${x.vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview:</h3>
        <p>
        ${x.overview}
        </p>
      </div>
  
      `
      // 1 variantas su if else ir ikelta i funkcija
      let vote = createMovie.querySelector("span")
   getRatingColor(x.vote_average, vote)
      main.append(createMovie)
 
  })
  
  console.log(dataResults)
}

// funkcina kuri keicia spalva priklausanciai nuo raitingo
function getRatingColor(rating, vote){

  if(rating >= 8){
    vote.style.color  = "green"
  }else if(rating >= 5){
    vote.style.color ="orange"
  }
  else{
    vote.style.color = "red"
  }

}

