const searchEl = document.getElementById("btn-search")
const mainEl = document.getElementById("movie-list")
const inputEl = document.getElementById("search-bar")

let dataMovie = []

function myFunction(get) {
    console.log("hello")
}

 

searchEl.addEventListener("click", (event) => {
    event.preventDefault()
    getmovieDB().then((data) => renderList(data))
})

const getmovieDB = async () => {
    let searchValue = inputEl.value.trim().replaceAll(` `, `+`)

    const response = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=cbb6fa09`)
    const data = await response.json()
    return data
}

function setWatchList() {
    console.log("clicked")
}

const renderList = (data) => {
    if (data.Response === "True") {
        dataMovie = []
        dataMovie = data.Search.map((item) => item.imdbID)

        getmovieInfo(dataMovie)
    } else {
        alert("Search again No info found")
    }
}

const getmovieInfo = async (data) => {
    mainEl.innerHTML = ""

    for (let movie in data) {
        const response = await fetch(`https://www.omdbapi.com/?i=${data[movie]}&apikey=cbb6fa09`)
        const movieInfo = await response.json()
        let { Title, Plot, Poster, Runtime, Genre, Metascore, Writer, Director, BoxOffice } =
            movieInfo
        console.log(movieInfo)
        mainEl.innerHTML += `<div class="movie-container">
        <img class="poster" src="${Poster}" />
        <div class="movie-info">
            <h3 class="movie-card-title">${Title}</h3>
         
            <div class="movie-sub-info">
                <h3>${Runtime}</h3>
                <h3>${Genre}</h3>
                <h3>⭐${Metascore}</h3>
            </div>
            <small class="movie-card-title">${Plot}</small>
            <div>
            <small class="movie-card-more">Writer: ${Writer}</small>
            <small class="movie-card-more">Director: ${Director}</small>
            <small class="movie-card-more">BoxOffice: ${BoxOffice}</small>
             </div>
           
        </div>
        </div>
    </div>`
    }
   
}

 