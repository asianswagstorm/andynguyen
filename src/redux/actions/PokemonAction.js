import {POKEMON_TYPE} from "./types";
import {getPokemons,getPokemonByName,getPokeData,getPokeSpecies} from "../../Components/pokemon/apiServices/pokeAPI";

export const setPokeTracker = tracker => ({
    type: POKEMON_TYPE.SET_POKEMON_TRACKER,
    tracker
});

export const setPokemonSpecies = speciesData => ({
    type: POKEMON_TYPE.SET_POKEMON_SPECIES,
    speciesData
});

export const setPokemonData = pokemon => ({
    type: POKEMON_TYPE.SET_POKEMON_DATA,
    pokemon
});

export const setPokemonID = pokemonIndex => ({
    type: POKEMON_TYPE.SET_POKEMON_ID,
    pokemonIndex
});

export const getPokemonSpecies = pokemonIndex => dispatch => {
    try{
        getPokeSpecies(pokemonIndex).then(response => response.json()).then(
            response => dispatch(setPokemonSpecies(response))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const getPokemonData = pokemonIndex => dispatch => {
    try{
        getPokeData(pokemonIndex).then(
            response => dispatch(setPokemonData(response.data))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const getPokemonsLimit = numOfPoke => dispatch => {
    try{
        getPokemons(numOfPoke).then(
            response =>  dispatch(setPokemon("",response))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const getPokemonsByName = searchedPokemon => dispatch => {
    //dispatch(setPokemon("", [])); //reset
    try{
        getPokemonByName(searchedPokemon).then(
            response => dispatch(setPokemon(searchedPokemon,response))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const setPokemon = (searchedPokemon,pokemons) => ({
    type: POKEMON_TYPE.SET_POKEMONS,
    searchedPokemon,
    pokemons
});