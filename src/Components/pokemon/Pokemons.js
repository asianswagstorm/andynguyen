import React, { Component } from "react";
import Headers from "../Headers";
import Search from "./pokemonHelper/Search";
import PokemonCard from "./PokemonCard";
import NoResults from "./pokemonHelper/NoResults";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./styles/Pokemons.css";

export class Pokemons extends Component {

  getNumPokemon = () => 12;

  componentDidMount = () => {
   const {dispatch} = this.props;
   const {getPokemonsLimit,setPokeTracker} = this.props.action_props.pokemon_action;
   
   if(this.props.searchedPokemon.trim() === ""){
      dispatch(setPokeTracker(0));
      dispatch(getPokemonsLimit(this.getNumPokemon()));
      document.addEventListener("scroll", this.trackScrolling);
    }   
  };

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  /**
   * @description scrolling bottom of page loads more pokemons.
   */
  trackScrolling = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.props.tracker <= 792) {
      const {dispatch} = this.props;
      const {setPokeTracker} = this.props.action_props.pokemon_action;
      dispatch(setPokeTracker(this.props.tracker + this.getNumPokemon()));
      setTimeout( async() => await this.loadMore(), 1000);
    };
  };

  /**
   * Fetch more pokemons
   */
  loadMore = async () => {
    const {dispatch} = this.props;
    const {getPokemonsLimit} = this.props.action_props.pokemon_action;
    await dispatch(getPokemonsLimit(this.props.tracker + 3))
  };

  searchPokemon = (poke) => {
    const {dispatch} = this.props;
    const {getPokemonsByName} = this.props.action_props.pokemon_action;
    if (poke !== "") { 
      dispatch(getPokemonsByName(poke));
    }
  };

  change = e => { 
    const {dispatch} = this.props;
    const {getPokemonsLimit} = this.props.action_props.pokemon_action;
  
    const poke = (e.target.value).trim();
    if (poke !== "") { 
     this.searchPokemon(poke);
    }
    else{
      dispatch(getPokemonsLimit(this.getNumPokemon()));
    }
    document.removeEventListener("scroll", this.trackScrolling);
  };

  render = () => {
    return (
      <div className="pokemon__app">
        <Headers linkTo = "#/" headerTitle="Pokedex"/>   
        <div className="pokemon_row">
          <div className="pokemon_search">
            <div className="pokemon__search__button" onClick={() => this.searchPokemon(this.props.searchedPokemon)}>
              <span className="icon fa-search" id = "pokemon__search__icon"/>
            </div>
            <Search searchPokemon ={() => this.searchPokemon} onChange={this.change} searchedPokemon={this.props.searchedPokemon} />
          </div>
        </div>
        <div className="pokemon_row">
          {( [...this.props.pokemons].length > 0) ? (
            <div className="list_pokemon">
              {[...this.props.pokemons].map((pokemon,key) => (
                <div key={key} className = "single_card_1">
                    <PokemonCard
                      name={pokemon.name}
                      image = {pokemon.image ? pokemon.image : null}
                      pokemonIndex={!pokemon.url ? pokemon.id : pokemon.url.split("/")[pokemon.url.split("/").length - 2]}
                    />
                </div>   
              ))}
              
            </div>
          ) : (
            this.props.apiLoaded === true &&
            <NoResults searchedPokemon = {this.props.searchedPokemon}/>
          )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const pokemonProps  = state.PokemonReducer.defaultPokemonStates; 
  const {pokemons,searchedPokemon,tracker, apiLoaded} = pokemonProps;

  return {pokemons,searchedPokemon,tracker,apiLoaded};
};

export default withRouter(connect(mapStateToProps)(Pokemons));
