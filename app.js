

const mode = document.querySelector('#btnmode');

const inputsearch = document.querySelector('#inputsearch');
const btnsearch = document.querySelector('#btnsearch');

const genreall = document.querySelector('#genreall');
const genrerpg = document.querySelector('#genrerpg');
const genresumilation = document.querySelector('#genresumilation');
const genreaction = document.querySelector('#genreaction');


const platformall = document.querySelector('#platformall');
const platformpc = document.querySelector('#platformpc');
const platformps = document.querySelector('#platformps');
const platformxbox = document.querySelector('#platformxbox');

const rateall = document.querySelector('#rateall');
const rate9 = document.querySelector('#rate9');
const rate8 = document.querySelector('#rate8');
const rate7 = document.querySelector('#rate7');

const cardshome = document.querySelector('#cardshome');
const cardsfav = document.querySelector('#favocard');


const gameModal = document.querySelector('#gameModal');
const closeModal = document.querySelector('#closeModal');
const modalImage = document.querySelector('#modalImage');
const modalName = document.querySelector('#modalName');
const modalGenre = document.querySelector('#modalGenre');
const modalPlatforms = document.querySelector('#modalPlatforms');
const modalRating = document.querySelector('#modalRating');
const modalDescription = document.querySelector('#modalDescription');
const btnFav = document.querySelector('#btnFav');


const gameModalfav = document.querySelector('#gameModalfav');
const closeModalfav = document.querySelector('#closeModalfav');
const modalImagefav = document.querySelector('#modalImagefav');
const modalNamefav = document.querySelector('#modalNamefav');
const modalGenrefav = document.querySelector('#modalGenrefav');
const modalPlatformsfav = document.querySelector('#modalPlatformsfav');
const modalRatingfav = document.querySelector('#modalRatingfav');
const modalDescriptionfav = document.querySelector('#modalDescriptionfav');
const btnremoveFav = document.querySelector('#btnremoveFav');

let currentGame = [] ; 



function changemode(){
    document.body.classList.toggle('bg-[#fffbfb]');
  document.body.classList.toggle('bg-black');
};


let games = [];
let filergames = [];

async function getgames() {
   try{
     const respgames = await fetch('https://debuggers-games-api.duckdns.org/api/games');
     const data = await respgames.json();

     games = data.results;
     console.log(games);
     filergames = [...games];
     
    
   }catch (error) {console.log('error',error); };

   displaygames(filergames);
};

getgames();


function displaygames(filergames){
    cardshome.innerHTML = '';

    filergames.forEach(game => {
        const card = document.createElement("div");
        card.className = "bg-slate-800 border border-[#E51E1B] p-4 rounded-md shadow text-white text-center hover:scale-105 duration-300";
        card.innerHTML = `
        <img class="rounded-md" src="${game.background_image}">
        <h2>${game.name}</h2>
        <p>${game.genre}</p>
        <p>${game.platforms.map(p => p.platform.name).join(', ')}</p>
        <p>${game.rating}</p>`
        cardshome.appendChild(card);
        card.addEventListener('click', ()=>{
            currentGame = game;
            modalImage.src = game.background_image;
            modalName.textContent = game.name;
            modalGenre.textContent = 'genre:' + game.genre;
            modalPlatforms.textContent = 'Platforms: ' + game.platforms.map(p => p.platform.name).join(', ');
            modalRating.textContent = 'rating' + game.rating;
            modalDescription.textContent = game.description || 'no description availables';
            gameModal.classList.remove('hidden');

            btnFav.onclick = () => {
              let favorites = JSON.parse(localStorage.getItem('favorites')) || [] ;
              if (!favorites.find (f=>f.id === currentGame.id)){
                favorites.push(currentGame);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('add to favorites');
                
              }else {
                alert('this game was already in favoritess');
              };
            };

            closeModal.onclick = () => {
              gameModal.classList.add('hidden');
            };
        });
    });
};

gamefav = null;
function displaygamesfav(){
  if(cardsfav){
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log("=======>",favorites)
    favorites.forEach(game => {
      const card = document.createElement('div');
       card.className = "bg-slate-800 border border-[#E51E1B] p-4 rounded-md shadow text-white text-center hover:scale-105 duration-300";
        card.innerHTML = `
        <img class="rounded-md" src="${game.background_image}">
        <h2>${game.name}</h2>
        <p>${game.genre}</p>
        <p>${game.platforms?.map(p => p.platform.name).join(', ')}</p>
        <p>${game.rating}</p>`;
        
        card.addEventListener('click', () => {
        gamefav = game;
        modalImagefav.src = game.background_image;
        modalNamefav.textContent = game.name;
        modalGenrefav.textContent = 'Genre: ' + game.genre;
        modalPlatformsfav.textContent = 'Platforms: ' + game.platforms.map(p => p.platform.name).join(', ');
        modalRatingfav.textContent = 'Rating: ' + game.rating;
        modalDescriptionfav.textContent = game.description || 'No description available';
        gameModalfav.classList.remove('hidden');
      });
          cardsfav.appendChild(card);


            btnremoveFav.onclick = () => {
                if (!gamefav) return alert('No game selected to remove');
                let favoritesNow = JSON.parse(localStorage.getItem('favorites')) || [];
                favoritesNow = favoritesNow.filter(f => f.id !== gamefav.id);
                localStorage.setItem('favorites', JSON.stringify(favoritesNow));
                alert('Removed from favorites!');
                gameModalfav.classList.add('hidden');
                displaygamesfav(); 
  };

            closeModalfav.onclick = () => {
              gameModalfav.classList.add('hidden');
            }
    });
  }
};

                                                    
displaygamesfav();
