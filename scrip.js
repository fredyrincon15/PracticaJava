const URL ="https://pokeapi.co/api/v2/pokemon/"
const searchInput=document.getElementById ("search");
const pokedexContainer =document.getElementById("pokedex");
const pokeStats = document.querySelector('[pokedex2]');
function showError(msg){
    pokedexContainer.innerHTML=
    `
    <p>${msg}</p>

    `;
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}


async function searchPokermon(){

    const searchedPokemon= searchInput.value.trim();

    try {

        const reponse = await fetch(URL + searchedPokemon)
        if(!reponse.ok){
            showError (`No encontro ningun pokermon llamado:  ${searchedPokemon}`)
            return;
    }

        const data = await reponse.json();

      
        
        pokedexContainer.innerHTML=
        `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}">
        <p>Home: ${data.id}</p>
        <h3>${data.types[0].type.name}</h2>
        <h3>${data.types[1].type.name}</h2>
        
        
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Special-attack: ${data.stats[3].base_stat}</p>
        <p>Special-defense: ${data.stats[4].base_stat}</p>
        <p>Speed: ${data.stats[5].base_stat}</p>

        
     

        

        `;
     
    }catch(error){
        console.error(error);
        showError ('ha ocurrido un error al buscar el pokemon');


    }
}
document.getElementById("btn-search").addEventListener("click", searchPokermon);
renderPokemonStats(stats);