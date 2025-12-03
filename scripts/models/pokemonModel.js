export function Pokemon (pokemon) {

    this.nome = pokemon.name,
    this.img = pokemon.sprites.front_default,
    this.types = pokemon.types,
    this.color = pokemon.color


Pokemon.prototype.updateImg = (img)=> {
    this.img = img;
}

Pokemon.prototype.getCardPoke = function() {
    return `<div class="poke-card"> 
                <img src="${this.img}" alt="Girl in a jacket" width="100" height="100">
                <div class="poke-card-description">
                    <h3>${this.nome}</h3>
                    <h4>${this.getTypes()}</h4>
                </div>
            </div>`
}

Pokemon.prototype.getTypes = function(){
    let typeString = ""
    for (let i of this.types){
        typeString += `<span>${i.type.name}</span>`
    }
    return typeString;
}
}
