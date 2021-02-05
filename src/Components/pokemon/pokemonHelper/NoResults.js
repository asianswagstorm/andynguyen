import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

export class NoResults extends Component {
  render = () => (
        <div className="no__results">
             <h5 className="no__results__text"> {`No pokemons found containing "${this.props.searchedPokemon}"`}</h5>
        </div>
    );
};

const mapStateToProps = state => { 
  const pokemonProps  = state.PokemonReducer.defaultPokemonStates; 
  const {searchedPokemon} = pokemonProps;

  return {searchedPokemon};
};

export default withRouter(connect(mapStateToProps)(NoResults));