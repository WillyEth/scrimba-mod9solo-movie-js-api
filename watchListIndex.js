const watchListPage = document.getElementById("start-info").innerText
const mainEl = document.getElementById("movie-list")
const divEl = document.getElementById("wrapper")
const btnEl = document.getElementById("btn-clear-all")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
let myList = []


btnEl.addEventListener("click", () => {
    localStorage.clear()

    getmovieInfo()
})


function setRemoveList(imdbID) {
    leadsFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
    
    if (leadsFromLocalStorage.length > 0) {
        myList = leadsFromLocalStorage.filter((value) => {
            if (value === imdbID) {
            } else return value
        })
        localStorage.setItem("myList", JSON.stringify(myList))
        if (myList) {
            getmovieInfo(myList)
        }
    }
}

const getmovieInfo = async (data) => {
    mainEl.innerHTML = ""

    for (let movie in data) {
        const response = await fetch(`https://www.omdbapi.com/?i=${data[movie]}&apikey=cbb6fa09`)
        const movieInfo = await response.json()
        let {
            Title,
            Plot,
            Poster,
            Runtime,
            Genre,
            Metascore,
            Writer,
            Director,
            BoxOffice,
            imdbID,
        } = movieInfo

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
            <button onclick=setRemoveList("${imdbID}") class="css-button-shadow-border--sand" >Remove from WatchList</button>
             </div>
           
        </div>
        </div>
    </div>`
    }
}

if (watchListPage === "Your Watchlist") {
    if (leadsFromLocalStorage.length > 0) {
        getmovieInfo(leadsFromLocalStorage)
    }
}
