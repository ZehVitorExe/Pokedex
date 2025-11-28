import { menuOptions } from "./config/menuConfig.js";
import { apiBaseInfo } from "./config/apiConfig.js";
import { request } from "./api/apiConnection.js"
import { Pokemon } from "./models/pokemonModel.js"


function generateMenu() {
    const display = document.querySelector(".windown-view");
    display.innerHTML = ""; 

    menuOptions.forEach(option  => {
        display.innerHTML += `<button><a href="${option.link}">${option.name}</a></button>`
    });
}

function generatePokedexPage(page) {
    page.forEach(page => {
        
    });
}

//generateMenu();
document.pokedexPage=0
async function loadPokedex(page){
    document.querySelector(".pokedex-view").innerHTML=""
    //document.pokedexPage = page
    const list = await request(apiBaseInfo.getPokedexPage(15))
    .then(result => result.json())
    .then(json => json.results)


    for(let i in list){
    const response = await request(apiBaseInfo.getPokemon(parseInt(i) + 1 + document.pokedexPage));
    const json = await response.json();
    
    const poke = new Pokemon(json);
    console.log(poke.getTypes())

    document.querySelector(".pokedex-view").innerHTML += poke.getCardPoke();
    }
}

function updatePokedexPage(mode){
    if (mode == 0 && document.pokedexPage>=14){
        loadPokedex(document.pokedexPage)
        document.pokedexPage -= 15
    }else if (mode == 1){
        loadPokedex(document.pokedexPage)
        document.pokedexPage += 15
    }
}



console.log(request(apiBaseInfo.getPokedexPage(1))
.then(result => result.json())
.then(json => json.results));

//loadPokedex(document.pokedexPage)

console.log(request(apiBaseInfo.getPokemon(1)).then(result => result.json()).then(json => json))

window.initPokedexPage = function (){
    document.querySelector(".button-left")
    .addEventListener("click", () => updatePokedexPage(0));

    document.querySelector(".button-right")
        .addEventListener("click", () => updatePokedexPage(1));

    document.querySelector("#select-button")
        .addEventListener("click", () => {document.location.pathname = "/index.html"});

    loadPokedex(document.pokedexPage)
}

window.initPokedexIndex = function(){

    generateMenu();
}

window.initMountGroupPage = function(){
    document.pokeView 
}