export default class API{
    async getPokemon(id){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        return data
    }
}