import API from './api.js'

const api = new API()
const pokemonContainer = document.querySelector('#pokemon-container')
const pokemonDataContainer = document.querySelector('#pokemon-data')
const next = document.querySelector('#next')
const before = document.querySelector('#before')
let currentPokemon = 1

next.addEventListener('click',async () => {
    const pokemon = await api.getPokemon(++currentPokemon)
   // console.log(pokemon)
    const pokemonData = new Pokemon(pokemon).stats
    console.log(pokemon)
    var ctx = document.getElementById('myChart').getContext('2d');
    var myRadarChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',
        // The data for our dataset
        data: {
            labels: [pokemonData[0].stat.name, pokemonData[1].stat.name, pokemonData[2].stat.name, pokemonData[3].stat.name, pokemonData[4].stat.name, pokemonData[5].stat.name],
            datasets: [{
                label: "Estadisticas",
                data: [pokemonData[0].base_stat, pokemonData[1].base_stat, pokemonData[2].base_stat, pokemonData[3].base_stat, pokemonData[4].base_stat, pokemonData[5].base_stat],
                backgroundColor:[
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(100, 255, 0, 0.5)",
                    "rgba(200, 50, 255, 0.5)",
                    "rgba(0, 100, 255, 0.5)",
                    "rgba(120, 60, 0, 0.3)",
                    "rgba(200, 55, 125, 0.7)"
                  ],
                borderColor: "rgba(0, 0, 0, 0.8)"                
            }]
        },
        // Configuration options go here
        options : {
            angleLines: {
            display: true,
            labelString: "Prueba"
            },
            ticks: {
                suggestedMin: 5,
                suggestedMax: 100
            },
            responsive: true,
            maintainAspectRatio: false,
        }     
    })
})

before.addEventListener('click',async () => {
    currentPokemon = currentPokemon - 1
    console.log(currentPokemon)
    if(currentPokemon <= 0){
        currentPokemon = 1
    }
    const pokemon = await api.getPokemon(currentPokemon)
   // console.log(pokemon)
    const pokemonData = new Pokemon(pokemon).stats
    console.log(pokemon)
    var ctx = document.getElementById('myChart').getContext('2d');
    var myRadarChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',
        // The data for our dataset
        data: {
            labels: [pokemonData[0].stat.name, pokemonData[1].stat.name, pokemonData[2].stat.name, pokemonData[3].stat.name, pokemonData[4].stat.name, pokemonData[5].stat.name],
            datasets: [{
                label: "Estadisticas",
                data: [pokemonData[0].base_stat, pokemonData[1].base_stat, pokemonData[2].base_stat, pokemonData[3].base_stat, pokemonData[4].base_stat, pokemonData[5].base_stat],
                backgroundColor:[
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(100, 255, 0, 0.5)",
                    "rgba(200, 50, 255, 0.5)",
                    "rgba(0, 100, 255, 0.5)",
                    "rgba(120, 60, 0, 0.3)",
                    "rgba(200, 55, 125, 0.7)"
                  ],
                borderColor: "rgba(0, 0, 0, 0.8)"
                }]
        },
        // Configuration options go here
        options : {
            angleLines: {
            display: true,
            },
            ticks: {
                suggestedMin: 5,
                suggestedMax: 100
            },
            responsive: true,
            maintainAspectRatio: false,
        }     
    })
})

async function initApp(initPokemonId){
    let pokemonData = await api.getPokemon(initPokemonId)
    pokemonData = new Pokemon(pokemonData).stats
    //console.log(pokemonData)    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myRadarChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',
        // The data for our dataset
        data: {
            labels: [pokemonData[0].stat.name, pokemonData[1].stat.name, pokemonData[2].stat.name, pokemonData[3].stat.name, pokemonData[4].stat.name, pokemonData[5].stat.name],
            datasets: [{
                label: "Estadisticas",
                data: [pokemonData[0].base_stat, pokemonData[1].base_stat, pokemonData[2].base_stat, pokemonData[3].base_stat, pokemonData[4].base_stat, pokemonData[5].base_stat],
                backgroundColor:[
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(100, 255, 0, 0.5)",
                    "rgba(200, 50, 255, 0.5)",
                    "rgba(0, 100, 255, 0.5)",
                    "rgba(120, 60, 0, 0.3)",
                    "rgba(200, 55, 125, 0.7)"
                  ],
                borderColor: "rgba(0, 0, 0, 0.8)"
            }]
        },
        // Configuration options go here
        options : {
            angleLines: {
            display: true,
            labelString: "Prueba"
            },
            ticks: {
                suggestedMin: 5,
                suggestedMax: 100
            },
            responsive: true,
            maintainAspectRatio: false,
        }     
    })  
}

initApp(currentPokemon)


class Pokemon{
    constructor({name, sprites, types, weight, stats}){
        this.name = name
        this.img = sprites.front_default
        this.type = types[0].type.name
        this.weight = weight
        this.stats = stats
/*         console.log(this.stats)
 */        this.render()
    }
    buildPokemon(){
        return `<article class="pokemon">
        <div class="pokemon-card">
            <h1>${this.name}</h1>
            <img src=${this.img} alt="">
        </div>
    </article>`
    }
    buildDataPokemon(){
        for (let index = 0; index < this.stats.length; index++) {
            const element = this.stats[index];
            //console.log(element.stat.name)
        }
        return `
        <article class="pokemon-info">
        
        <div class="info">
            <p class="info-left">Nombre:  <span>${this.name}</span></p>
            <p class="info-left">Tipo:    <span>${this.type}</span></p>
            <p class="info-left">Peso:          ${this.weight} Kgr</p>
            <p class="info-left">Estadisticas:</p>
            <p class="info-left">${this.stats[0].stat.name}: ${this.stats[0].base_stat}</p>
            <p class="info-right">${this.stats[1].stat.name}: ${this.stats[1].base_stat}</p>
            <p class="info-right">${this.stats[2].stat.name}: ${this.stats[2].base_stat}</p>
            <p class="info-right">${this.stats[3].stat.name}: ${this.stats[3].base_stat}</p>
            <p class="info-right">${this.stats[4].stat.name}: ${this.stats[4].base_stat}</p>
            <p class="info-right">${this.stats[5].stat.name}: ${this.stats[5].base_stat}</p>
        </div>
    </article>`
    }
    render(){
        pokemonContainer.innerHTML = this.buildPokemon()
        pokemonDataContainer.innerHTML = this.buildDataPokemon()
    }
}
