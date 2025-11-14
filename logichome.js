const mode = document.querySelector('#btnmode');
const inputsearch = document.querySelector('#inputsearch');
const btnsearch = document.querySelector('#btnsearch');
const genreall = document.querySelector('#genreall');
const genreRacing = document.querySelector('#genreRacing');
const genreStrategy = document.querySelector('#genreStrategy');
const genreaction = document.querySelector('#genreaction');
const platformall = document.querySelector('#platformall');
const platformpc = document.querySelector('#platformpc');
const platformps = document.querySelector('#platformps');
const platformxbox = document.querySelector('#platformxbox');
const cardshome = document.querySelector('#cardshome');
const gameModal = document.querySelector('#gameModal');
const closeModal = document.querySelector('#closeModal');
const modalImage = document.querySelector('#modalImage');
const modalName = document.querySelector('#modalName');
const modalGenre = document.querySelector('#modalGenre');
const modalPlatforms = document.querySelector('#modalPlatforms');
const modalRating = document.querySelector('#modalRating');
const modalDescription = document.querySelector('#modalDescription');
const btnFav = document.querySelector('#btnFav');
const btnleft = document.querySelector('#btnleft');
const btnright = document.querySelector('#btnright');

let currentGame = [] ; 
let n = 1;
let games = [];
let filergames = [];
let next = null;
let prev = null;
let platform = ""
let genre = ""
let search = ""



  btnright.addEventListener('click', ()=> {
    if(next){
        n++;
        url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
        getgames(url)
    }
});
btnleft.addEventListener('click', ()=> {
    if(prev){
        n--;
        url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
        getgames(url)
    }
});

async function getgames(url) {

   try{
     const respgames = await fetch(url);
     const data = await respgames.json();
     next = data.next
     prev = data.previous
      
     games = data.results;
     console.log(data);
     filergames = [...games];  
   }catch (error) {console.log('error',error); };
   displaygames(filergames);
};

getgames(`https://debuggers-games-api.duckdns.org/api/games?page=${n}`);

btnsearch.addEventListener('click', ()=>{
    search = inputsearch.value
    inputsearch.value = '';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

genreall.addEventListener('click', ()=>{
    n = 1;
    genre = ""
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

genreaction.addEventListener('click', ()=>{
    genre = 'action';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

genreStrategy.addEventListener('click', ()=>{
    genre = 'strategy';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

genreRacing.addEventListener('click', ()=>{
    genre = 'racing';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

platformall.addEventListener('click', ()=>{
    platform = ""
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

platformpc.addEventListener('click', ()=>{
    platform = 'pc';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

platformps.addEventListener('click', ()=>{
    platform = 'PlayStation5';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});

platformxbox.addEventListener('click', ()=>{
    platform = 'xbox-old';
    n = 1;
    url = `https://debuggers-games-api.duckdns.org/api/games?page=${n}&search=${search}&genre=${genre}&platform=${platform}`
    getgames(url)
});


function displaygames(filergames){
    cardshome.innerHTML = '';

    filergames.forEach(game => {
        const card = document.createElement("div");
        card.className = "bg-slate-800 border  p-4 rounded-md shadow text-white  flex flex-col md:gap-5  justify-start relative h-[360px]  hover:scale-105 duration-550";

        card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover m-auto mt-0 mb-2" src="${game.background_image}">
        <h2 class="text-center text-[25px]">${game.name}</h2>
        <div class="flex md:justify-between md:flex-row flex-col">
        <p class="text-[18px] text-left"><strong>Genre:</strong>  ${game.genres.map(g => g.name).join(", ")}</p>
        <div class="flex justify-end items-center gap-[5px] mt-4 ">   
        <i class="fa-regular fa-star text-yellow-400 text-[16px]"></i>
        <p class="text-yellow-400 text-[16px]">${game.rating}</p>
        </div>
        </div>`
        cardshome.appendChild(card);
        card.addEventListener('click', ()=>{
            currentGame = game;
            modalImage.src = game.background_image;
            modalName.textContent = game.name;
            modalGenre.textContent = 'genre:' + game.genre;
            modalPlatforms.textContent = 'Platforms: ' + game.platforms.map(p => p.platform.name).join(', ');
            modalRating.textContent = 'rating' + game.rating;
            let des = game.description;
            des = des.slice(0,500) + '...';
            console.log(des);
            modalDescription.textContent = des || 'no description availables';
            gameModal.classList.remove('hidden');

            btnFav.onclick = () => {
              let favorites = JSON.parse(localStorage.getItem('favorites')) || [] ;
              if (!favorites.find (f=>f.id === currentGame.id)){
                favorites.push(currentGame);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('add to favorites');
                gameModal.classList.add('hidden');
                
              }else {
                alert('this game was already in favoritess');
                gameModal.classList.add('hidden');
              };
            };
              
            closeModal.onclick = () => {
              gameModal.classList.add('hidden');
            };
        });
    });
};





