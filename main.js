const listPokemons = document.querySelector("#pokemons");
const detalhes = document.querySelector("#detalhes");

function main(limit = 5){
    const pokemons = `
        {
            pokemons(first: ${limit}){
                id,
                name,
                classification,
                image
            }
        }
    `;
    requestApi(pokemons).then(res =>showPokenons(res.pokemons));
}

function getOnePokemon(id){
    const query = `
        {
            pokemon(id: "${id}"){
                id,
                name,
                image,
                classification,
                weaknesses,
                maxHP,
                resistant
            
            }
        }
    `;
    requestApi(query).then(res =>showPokenon(res.pokemon));
    
}

function showPokenon(pokemon){
    let template = `
        <div class="card">
        <img class="card-img" src="${pokemon.image}">
        <div class="card-body">
            <h2 class="card-tittle">
                ${pokemon.name}
            </h2>
        </div>
        <ul class="list-group list-group-flush list-unstyled">
            <li class="list-group-item">Classificação: ${pokemon.classification}</li>
            <li class="list-group-item">HP: ${pokemon.maxHP}</li>
            <li class="list-group-item">Fraquezas: ${pokemon.weaknesses}</li>
            <li class="list-group-item">Resistência: ${pokemon.resistant}</li>
        </ul>
        </div>
`;
    detalhes.innerHTML = template; 
}

function showPokenons(pokemons){
    let template = "";
    pokemons.forEach(pokemon => (
        template += `
            <li class="media" style="margin: 10px 0; padding: 10px;  border: 1px solid #CCC; border-radius: 5px">
                <img class="mr-3" width="100" src="${pokemon.image}" />
                <div class="media-body">
                    <h3>${pokemon.name}</h3>
                    <p>${pokemon.classification}</p>
                    <button class="btn btn-primary" style="float:right" onclick="getOnePokemon('${pokemon.id}')">Detalhes</button>
                </div>
            </li>
        `)
    );

    listPokemons.innerHTML = `
        <ul class="list-unstyled">
            ${template}
        </ul>
        <button class="btn btn-block btn-default" style="border: 1px solid #CCC; margin-bottom: 10px" onclick="main(${pokemons.length + 5})">Carregar mais...</button>
    `;
}

async function requestApi(query){
    let response = await fetch(`https://graphql-pokemon.now.sh/?query=${query}`);
    response = await response.json();
    return response.data;
}

main();