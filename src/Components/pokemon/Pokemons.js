import React, { Component } from "react";
import Headers from "../Headers";
import Search from "./pokemonHelper/Search";
import PokemonCard from "./PokemonCard";
import NoResults from "./pokemonHelper/NoResults";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./styles/Pokemons.css";

class Pokemons extends Component {

  getNumPokemon = () => 12;

  componentDidMount() {
    const {dispatch} = this.props;
    const {getPokemonsLimit, getPokemonSpecies,getPokemonData} = this.props.action_props.pokemon_action;
    dispatch(getPokemonsLimit(this.getNumPokemon()));
    document.addEventListener("scroll", this.trackScrolling);
  
    dispatch(getPokemonSpecies(1));
    dispatch(getPokemonData(1));
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
      // (process.env.NODE_ENV.trim() !== 'production') && console.log("you're at the bottom of the page");
      dispatch(setPokeTracker(this.props.tracker + this.getNumPokemon()));
      setTimeout( async() => await this.loadMore(), 1000);
    };
  };

  loadMore = async () => {
    const {dispatch} = this.props;
    const {getPokemonsLimit} = this.props.action_props.pokemon_action;
    await dispatch(getPokemonsLimit(this.props.tracker + 3))
  };

  change = async e => { 
    const {dispatch} = this.props;
    const {getPokemonsByName,getPokemonsLimit} = this.props.action_props.pokemon_action;
  
    const poke = (e.target.value).trim();
    if (poke !== "") { 
      dispatch(getPokemonsByName(poke));
    }else{
      await dispatch(getPokemonsLimit(this.getNumPokemon()));
    }
    document.removeEventListener("scroll", this.trackScrolling);
  };

  render = () => {
    return (
      <div>
        <Headers linkTo = "#/" headerTitle="Pokedex"/>   
        <div className="row">
          <div className="pokemon_search">
            <span className="icon fa-search" id = "search__icon"/>
            <Search onChange={this.change} />
          </div>
        </div>
        <div className="pokemon_row">
          {( [...this.props.pokemons].length > 0) ? (
            <div className="list_pokemon">
              {[...this.props.pokemons].map((pokemon,key) => (
                <div key={key} className = "single_card_1">
                    <PokemonCard
                      action_props = {this.props.action_props}
                      name={pokemon.name}
                      image = {pokemon.image ? pokemon.image : null}
                      pokemonIndex={!pokemon.url ? pokemon.id : pokemon.url.split("/")[pokemon.url.split("/").length - 2]}
                    />
                </div>   
              ))}
              
            </div>
          ) : (
            <NoResults searchedPokemon = {this.props.searchedPokemon}/>
          )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const pokemonProps  = state.PokemonReducer.defaultPokemonStates; 
  const {pokemons,searchedPokemon,tracker} = pokemonProps;

  return {pokemons,searchedPokemon,tracker};
};

export default withRouter(connect(mapStateToProps)(Pokemons));
