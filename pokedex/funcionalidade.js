const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  eletric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#98d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const main_types = Object.keys(colors);

const fetchPokemons = async() => {
  for(let i = 1;i<=pokemons_number;i++){
    await getPokemon(i);
  }
}

const getPokemon = async id => {
  const url =`https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  createPokemonCard(pokemon);
}

function createPokemonCard(pokemon){
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  
  const poke_types = pokemon.types.map(el => el.type.name)
                                       
   const types = main_types.find(eltype => poke_types.indexOf(eltype)>-1);          
   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
   const color = colors[types]
  
  const pokeInnerHTML = `
    <div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
    </div>
    <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${types}</span></small>
    </div>
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  pokemonEl.style.backgroundColor = color;
  
  poke_container.appendChild(pokemonEl)
}

fetchPokemons();