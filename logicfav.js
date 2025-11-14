

const gameModalfav = document.querySelector('#gameModalfav');
const closeModalfav = document.querySelector('#closeModalfav');
const modalImagefav = document.querySelector('#modalImagefav');
const modalNamefav = document.querySelector('#modalNamefav');
const modalGenrefav = document.querySelector('#modalGenrefav');
const modalPlatformsfav = document.querySelector('#modalPlatformsfav');
const modalRatingfav = document.querySelector('#modalRatingfav');
const modalDescriptionfav = document.querySelector('#modalDescriptionfav');
const btnremoveFav = document.querySelector('#btnremoveFav');

const cardsfav = document.querySelector('#favocard');

gamefav = null;
function displaygamesfav(){
  if(cardsfav){
    const favorites = JSON.parse(localStorage.getItem('favorites') || "[]");
    console.log("=======>",favorites)
    favorites.forEach(game => {
      const card = document.createElement('div');
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
        
        card.addEventListener('click', () => {
        gamefav = game;
        modalImagefav.src = game.background_image;
        modalNamefav.textContent = game.name;
        modalGenrefav.textContent = 'Genre: ' + game.genre;
        modalPlatformsfav.textContent = 'Platforms: ' + game.platforms.map(p => p.platform.name).join(', ');
        modalRatingfav.textContent = 'Rating: ' + game.rating;
        modalDescriptionfav.textContent = game.description.slice(0,500)+'...' || 'No description available';
        gameModalfav.classList.remove('hidden');
      });
          cardsfav.appendChild(card);


            btnremoveFav.onclick = () => {
                if (!gamefav) return alert('No game selected to remove');
                let favoritesNow = JSON.parse(localStorage.getItem('favorites')) || [];
                favoritesNow = favoritesNow.filter(f => f.id !== gamefav.id);
                localStorage.setItem('favorites', JSON.stringify(favoritesNow));
                alert('Removed from favorites!');
                location.reload();
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
