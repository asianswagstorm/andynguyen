
const defaultPokemonStates = {
    pokemons : [],
    hasErrors : false,
    tracker : 0,
    searchedPokemon : ""

};

const DEFAULT_STATES = {defaultPokemonStates: {...defaultPokemonStates}};

const PokemonReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
    
        case "SET_POKEMONS":  
            return {
                ...state,
                defaultPokemonStates: {...state.defaultPokemonStates, pokemons : action.pokemons}
            };

        default:
            return {...state};
    }
};

export default PokemonReducer