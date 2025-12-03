export function Equip (){
    this.composition = [];
    this.position = 0;
}

Equip.prototype.putPokemon = function (id){
    if(this.composition.length < 5){
       this.composition.push(id) 
    } 
    console.log(this.composition)
}


Equip.prototype.updatePosition = function(mode){
    if(mode == 0){
        if(this.position > 0){
            this.position--
        }
    }else if(1){
        this.position++
    }

    console.log(this.position);
}

Equip.prototype.getPosition = function (){
    console.log(this.position)
    return this.position;
}

Equip.prototype.getEquip = function (){
    return this.composition;
}

Equip.prototype.generateCard = function (pokemon){
    
    return `<div class="mountGroup-card">         
            <div class="poke-description">
                <img src="${pokemon.img}" alt="Girl in a jacket" width="80" height="80">
                <span>${pokemon.nome}</span>
                <span>${pokemon.getTypes()}</span>
            </div>
            <div class="poke-lvl">
                <span>LEVEL</span>
                <span>energia</span>
            </div>
        </div>`
}