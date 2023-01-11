/***************Variaveis***************/
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('form')
const input = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1

/***************Funções***************/

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) 
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}   

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerText = data.name
        pokemonNumber.innerHTML = data.id + " "
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default
        input.value = ''
        searchPokemon = data.id

    } else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Nada Aqui'
        pokemonNumber.innerHTML = ''
    }
}
/***************Eventos***************/

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon-= 1
        renderPokemon(searchPokemon)
    }
})

btnNext.addEventListener('click', ()=>{
    searchPokemon+= 1
    renderPokemon(searchPokemon)
   
})

renderPokemon(searchPokemon)

