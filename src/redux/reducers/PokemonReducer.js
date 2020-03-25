const defaultPokemonStates = {
    pokemons : [],
    hasErrors : false,
    tracker : 0,
    searchedPokemon : "",
    pokemon:{},
    pokemonIndex: 0,
    speciesData:{}
};

const DEFAULT_STATES = {defaultPokemonStates: {...defaultPokemonStates}};

const PokemonReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case "SET_POKEMON_ID":
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, pokemonIndex : action.pokemonIndex}
            };
        case "SET_POKEMON_TRACKER":
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, tracker : action.tracker}
            };
        case "SET_POKEMONS":  
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, pokemons : action.pokemons}
            };
        case "SET_POKEMON_DATA":
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, pokemon : action.pokemon}
            };
        case "SET_POKEMON_SPECIES":
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, speciesData : action.speciesData}
            };
        default:
            return {...state};
    }
};

export default PokemonReducer