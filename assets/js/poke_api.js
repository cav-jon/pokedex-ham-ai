
const pokeApi = {}

function pokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(pokeApiDetailToPokemon)
}

pokeApi.getDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(DetailsPokePage)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url) // faz uma requisição http, retorna uma promise apresentando a resposta
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error))
}



// Detalhes Pokemon Página
function getDetailsPage(){
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

   return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error))
}


function DetailsPokePage(detailsPoke){
    const pokemon = new Pokemon()
    pokemon.species = PokemonDetails.species;
    pokemon.height = PokemonDetails.height;
    pokemon.weight = PokemonDetails.weight;
    pokemon.gender = PokemonDetails.gender;
    pokemon.egg = PokemonDetails.egg;
    
    const abilities = detailsPoke.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability


    return pokemon

}
