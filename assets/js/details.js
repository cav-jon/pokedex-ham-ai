
const pokeDetailApi = {}
// Obtendo os dados dos Pokémon da API
/*function obterDadosPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => exibirCartas(data))
    .catch(error => console.error(error));
}*/

// Página de detalhes do Pokémon
function exibirDetalhesPokemon() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => DetailsPokePage(jsonBody)) //Aqui precisei retornar apenas o jsonBody com a função já para construir a página de detalhes Pokemon
        .catch((error) => console.log(error))
}

function DetailsPokePage(detailsPoke) {
    const pokemonsDet = new Pokemon()
    pokemonsDet.name = detailsPoke.name;
    pokemonsDet.egg = detailsPoke.egg;
    pokemonsDet.stats = detailsPoke.stats;
    pokemonsDet.height = detailsPoke.height;
    pokemonsDet.weight = detailsPoke.weight;
    pokemonsDet.gender = detailsPoke.gender;
    pokemonsDet.number = detailsPoke.number;
    pokemonsDet.photo = detailsPoke.photo;

    const types = detailsPoke.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonsDet.types = types
    pokemonsDet.type = type

    pokemonsDet.photo = detailsPoke.sprites.other.dream_world.front_default


    const abilities = detailsPoke.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities

    const status = detailsPoke.stats.map((statSlot) => [statSlot.stat.name, statSlot.base_stat])


    pokemonsDet.abilities = abilities
    pokemonsDet.ability = ability
    pokemonsDet.stats = status


    return exibirDetalhes(pokemonsDet)

}

// Exibir os detalhes do Pokémon na página de detalhes
function exibirDetalhes(pokemon) {
    const detalhesContainer = document.getElementById('cardList');

    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhes');

    detalhes.innerHTML = `
        <div class="card ${pokemon.types[0]}">
        <div class="card-header">
                <div class="back_page">
                    <img src="/assets/img/arrow-left.svg" alt="" srcset="" onclick="window.history.back()">
                </div>
                <div class="heart">
                    <img src="/assets/img/heart.svg" alt="" srcset="">
                </div>
            </div>
            <div class="card-title">
                <h1>${pokemon.name}</h1>
                <ul class="type">
                    ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')} 
                </ul>
            </div>
            

            <div class="image_body">
                <img src="${pokemon.photo}" id="imgPoke" alt="${pokemon.name}" srcset="">
            </div>

            <div class="card_body">
                <div class="body_tags">
                    <div class="about active"><button type="button">About</button></div>
                    <div class="base_stats"><button type="button">Base Stats</button></div>
                    <div class="evolution"><button type="button">Evolution</button></div>
                    <div class="moves"><button type="button">Moves</button></div>
                </div>
                <div class="content-card">
                    <div class="details">
                        <ul>
                            <li>
                                <p>Species</p>
                            </li>
                            <li>
                                <p>Height: ${pokemon.height}</p>
                            </li>
                            <li>
                                <p>Weight: ${pokemon.weight}</p>
                            </li>
                            <li>
                                <span>Abilities:${pokemon.abilities.map((ability) =>
        `<p>${ability}</p>`
    ).join('')}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="extra-details">
                        <h4 id="extra-details">Breeding</h4>
                        <div class="gender">Gender</div>
                        <div class="egg_group">Egg Groups</div>
                        <div class="egg_cycle">Egg Cycle</div>
                    </div>
                </div>
            </div>
            </div>
`;

    detalhesContainer.appendChild(detalhes);
}

// Chamando a função para obter e exibir os dados dos Pokémon
exibirDetalhesPokemon()


//details v1 
/*
   <div class="title"> 
        <h1>${pokemon.name}</h1>
    </div>

    <div class="tags">
    ${pokemon.types.map((type) => `<div class="${type} type1">${type}</div>`).join('')} 
    </div>
    
    <div class="image_body"> 
        <img src="${pokemon.photo}" id="imgPoke" alt="${pokemon.name}" srcset="">
    </div>

    <div class="card_body">
        <div class="body_tags acordeon">
            <div class="about"><button class=btnTrigger type="button">About</button>
              <div class="about_tags">
              <div class="content>
            <div class="species"></div>
            <div class="height">${pokemon.height}</div>
            <div class="weight">${pokemon.weight}</div>
            <div class="abilities">${pokemon.abilities.map((ability) =>
              `<div>${ability}</div>`
            ).join('')}</div>
            </div>
            <span class="breeding">
                <h4 id="br1">Breeding</h4>
                <div class="gender">Gender</div>
                <div class="egg_group">Egg Groups</div>
                <div class="egg_cycle">Egg Cycle</div>
            </span>
        </div>
            </div>
            <div class="base_stats"><button class=btnTrigger type="button">Base Stats</button>
            <div class="content open">
            <ul>
              ${pokemon.stats.map((stat) =>
                `
                <li>${stat[0]}: ${stat[1]}</li>
              `
              ).join('')}
              </ul>
              </div>
            </div>
            <div class="evolution"><button class=btnTrigger type="button">Evolution</button></div>
            <div class="moves"><button class=btnTrigger type="button">Moves</button></div>
        </div>
    </div>
</div> 
*/