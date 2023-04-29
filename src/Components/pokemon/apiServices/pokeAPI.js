import axios from "axios";
//clean this up , set props redux. 

export const pokemonImage = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
export const pokemonGif = name => `https://projectpokemon.org/images/normal-sprite/${name.charAt(0).toLowerCase() + name.slice(1)}.gif`;
const corsAnywhere = "";

export const getPokemonEvolution = async evolution_url => {
        try{
            const evolutionLink =  `${corsAnywhere}${evolution_url}`; 
            return await axios.get(evolutionLink).then(
                response => response
            );
        }
        catch(error){
            throw Error(error);
        }
    };
export const getPokemons = async numOfPoke => {
    try{
        const getPokemonLink = `https://pokeapi.co/api/v2/pokemon/?limit=${numOfPoke}`; 
        return await axios.get(getPokemonLink).then(
            response => response.data.results
        );
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
        );
    }   
    catch(error){
        throw Error(error);
    }
}

export const getPokeData = async index => {
    try{
        const pokemonLink = `https://pokeapi.co/api/v2/pokemon/${index}`;
        return await axios.get(`${corsAnywhere}${pokemonLink}`).then(
            response => response
        );
    } 
    catch (error) {
        throw Error(error);
    }
};

export const getPokeSpecies = async index => {
    try{
        const pokemonSpeciesLink = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
        return await fetch(`${corsAnywhere}${pokemonSpeciesLink}`).then(
            response => response
        );
    } 
    catch (error) {
        throw Error(error);
    }
};