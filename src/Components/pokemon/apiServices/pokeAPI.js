import axios from "axios";
//clean this up , set props redux. 

export const pokemonImage = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getPokemons = async numOfPoke => {
    try{
        const getPokemonLink = `https://pokeapi.co/api/v2/pokemon/?limit=${numOfPoke}`; 
        return await axios.get(getPokemonLink).then(
            response => response.data.results
        )
    }
    catch(error){
        throw Error(error);
    }
};

export const getPokemonByName = async name => {
    try{
        const getPokemonLink = `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${name}`;
        return await axios.get(getPokemonLink).then(
            response => response.data.data
        )
    }   
    catch(error){
        throw Error(error);
    }
}

export const getPokeData = async index => {
    try{
        const pokemonLink = `https://pokeapi.co/api/v2/pokemon/${index}`;
        return await axios.get(`https://cors-anywhere.herokuapp.com/${pokemonLink}`).then(
            response => response
        )
    } 
    catch (error) {
        throw Error(error);
    }
};

export const getPokeSpecies = async index => {
    try{
        const pokemonSpeciesLink = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
        return await fetch(`https://cors-anywhere.herokuapp.com/${pokemonSpeciesLink}`).then(
            response => response
        )
    } 
    catch (error) {
        throw Error(error);
    }
};