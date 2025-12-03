export const apiBaseInfo = {
    url: "https://pokeapi.co/api/v2/",
    getPokedexPage: (offset, limit=20)=>{
        return apiBaseInfo.url + `pokemon/?offset=${offset}&limit=${limit}`
    },
    getPokemon: (id)=>{
        return apiBaseInfo.url + `pokemon/${id}/`
    }

}

