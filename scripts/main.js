import { menuOptions } from "./config/menuConfig.js";
import { apiBaseInfo } from "./config/apiConfig.js";
import { request } from "./api/apiConnection.js"
import { Pokemon } from "./models/pokemonModel.js"
import { Equip } from "./models/equipModel.js"


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
    const list = await request(apiBaseInfo.getPokedexPage(20))
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
    if (mode == 0 && document.pokedexPage>=19){
        loadPokedex(document.pokedexPage)
        document.pokedexPage -= 20
    }else if (mode == 1){
        loadPokedex(document.pokedexPage)
        document.pokedexPage += 20
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

window.updatePokeView = async function( equip ){
    const response = await request(apiBaseInfo.getPokemon(equip.getPosition()+1));
    const json = await response.json();
    
    const poke = new Pokemon(json);
    console.log(poke.getTypes())

    document.querySelector(".windown-view").innerHTML = poke.getCardPoke();
}

window.updatePokeViewList = async function (equip) {
    let html = ""
    for(let i in equip.composition){
        const response = await request(apiBaseInfo.getPokemon(equip.composition[i] + 1));
        const json = await response.json();
        
        const poke = new Pokemon(json);
        html += equip.generateCard(poke)
    }

    document.querySelector("#mountGroup-view").innerHTML = html
        
}

window.initMountGroupPage = function(){

    let equip = new Equip()

     document.querySelector(".button-left")
    .addEventListener("click", () => { equip.updatePosition(0); updatePokeView(equip);});

    document.querySelector(".button-right")
        .addEventListener("click", () => { equip.updatePosition(1); updatePokeView(equip);});

    document.querySelector("#select-button")
        .addEventListener("click", () => {equip.putPokemon(equip.getPosition()); updatePokeViewList(equip);});

    document.querySelector(".exit-btn")
        .addEventListener("click", () => {window.location.href = "index.html"});

     document.querySelector(".search-btn")
        .addEventListener("click", () => { 
            let search = parseInt(document.querySelector("#search-input").value)
            console.log(search)

            if(search > 0){
                equip.setPosition(search)

                updatePokeView(equip); 
            }
            
        });

    console.log(equip.getEquip())
}