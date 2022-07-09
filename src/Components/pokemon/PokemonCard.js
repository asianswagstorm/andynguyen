import React, { Component } from "react";
import "./styles/PokemonCard.css";
import spinner from "./spinner.gif";
import {pokemonImage,pokemonGif} from "./apiServices/pokeAPI";

export class PokemonCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageLoading: true,
      gifNotFound: false,
      toManyRequests: false
    };
  };
  render() {
    const {  pokemonIndex, name } = this.props;
  
    return (
    
      <div className="individual__card">
        <a className="link-hover" href={`/Pokemon/${pokemonIndex}`}>
            <div className="card">
              <h5 className="card-header">{pokemonIndex}</h5>
              <div className="card-body">
                <div className="pokemon__image">
                  {this.state.imageLoading && (
                  <img
                    src={spinner}
                    alt={"loading gif"}
                    id="pokemonGif"
                    className="card-img-top rounded mx-auto d-block mt-2"
                  />
                )}
                {this.state.gifNotFound ? (
                  <img
                  src={pokemonImage(pokemonIndex)} 
                  alt="some pokemon"
                  id="pokemonImg"
                  onLoad={() => this.setState({ imageLoading: false })}
                  onError={() => this.setState({ toManyRequests: true })}
                />
                )  :  <img
                src={pokemonGif(name)} 
                alt="some pokemon"
                id="pokemonGif"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ gifNotFound: true })}
              />}

              {this.state.toManyRequests && (
                <h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">
                    Too Many Requests
                  </span>
                </h6>
              ) }

              </div>
                <h3 className="card-title"> {name.charAt(0).toUpperCase() + name.slice(1)} </h3>
              </div>
          </div>
        </a>
      </div> 
    );
  }
};

export default PokemonCard;
