const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('form')
const input = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1
/* você pegou o formulário, pq vc tem que ouvir o evento de submit tlgd?
não teria como capturar oe vento se pegasse direto no input, se pá ate teria mas seria mais complicado então porra, p facilitar já pega o formulario logo q tem o submit tlgd p ecutar o evento pego ua vz*/

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) 
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    // depois de pegar a resposta da api temos que traduzir os dados pra json
    
    
}   

// AHHH agr eu peguei a vz, essa render pokemon ela é uma função que recebe a constante data vindo da outra função que é fetch, essa fetch, ela vai receber um parametro p pegar os dados do pokemon, e vai transformar em json. e vai retornar esse json ai. Então, a render pokemon é a função "pai", pq ela vai receber um parametro pokemon, nisso esse a fetchpokemon vai receber o MESMO parametro que a render tá recebendo, já que a fetch está dentro da render, e então agora a render com os dados do pokemon em JSON, so vai extrair e por dentro do html. porra muito brabo voltando at rabalhar com função e logica ai sim clhh boaaa!


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

