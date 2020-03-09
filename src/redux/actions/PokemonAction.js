import {POKEMON_TYPE} from "./types";
import {getPokemons,getPokemonByName} from "../../Components/pokemon/apiServices/pokeAPI";

export const getPokemonsLimit = numOfPoke => dispatch => {
    try{
        getPokemons(numOfPoke).then(
            response =>  dispatch(setPokemon(response))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const getPokemonsByName = name => dispatch => {
    dispatch(setPokemon([]));
    try{
        getPokemonByName(name).then(
            response =>  dispatch(setPokemon(response))
        );
    }
    catch (error) {
        throw(error);
    };
};

export const setPokemon = pokemons => ({
    type: POKEMON_TYPE.SET_POKEMONS,
    pokemons

});