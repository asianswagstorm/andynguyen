import React, { Component } from "react";
import {pokemonImage} from "../apiServices/pokeAPI"

export default class Evolution extends Component {
  render = () => {
    return (
      <div className="pokemon_evolution">
        <div className="individual_pokemon_row">
          <div className="pokemon_col">
              <strong>Stage 1: </strong> <br />
                <img
                  onClick= {() => this.props.updatePokemon(this.props.stage1ID)}
                  src={pokemonImage(this.props.stage1ID)}
                  alt={"A Photograph of a Stage 1 Pokemon"}
                />
                <br />
                <strong>{this.props.stage1}</strong>
          </div>

          <div className="pokemon_col">
            <i className="pokemon_arrow"> &#x2192;  </i>
          </div>

          <div className="pokemon_col">
              <strong>Stage 2: </strong> <br />
              <img
                onClick= {() => this.props.updatePokemon(this.props.stage2ID)}
                src={pokemonImage(this.props.stage2ID)}
                alt={"A Photograph of a Stage 2 Pokemon"}
              />
              <br />
              <strong>{this.props.stage2}</strong>
          </div>

          <div className="pokemon_col">
            <i className="pokemon_arrow">&#x2192;</i> 
          </div>

          <div className="pokemon_col">
              <strong>Stage 3: </strong> <br />
                <img 
                    onClick= {() => this.props.updatePokemon(this.props.stage3ID)}
                    src={pokemonImage(this.props.stage3ID)}
                    alt={"A Photograph of a Stage 3 Pokemon"}/>
                <br />
                <strong>{this.props.stage3}</strong>
          </div>
        </div>
      </div>
    );
  };
};
