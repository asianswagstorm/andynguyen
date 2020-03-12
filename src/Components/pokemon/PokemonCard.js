import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./styles/PokemonCard.css";
import spinner from "./spinner.gif";
import {pokemonImage} from "./apiServices/pokeAPI";

class PokemonCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageLoading: true,
      toManyRequests: false
    };
  };

  render() {
    const {  pokemonIndex, name } = this.props;
    return (
    
      <div className="individual_card">
        <a className="link-hover" href={`#/Pokemon/${pokemonIndex}`}>
            <div className="card">
              <h5 className="card-header">{pokemonIndex}</h5>
             
              <div className="card-body mx-auto">
                {this.state.imageLoading ? (
                <img
                  src={spinner}
                  alt={"loading gif"}
                  style={{ width: "5em", height: "5em" }}
                  className="card-img-top rounded mx-auto d-block mt-2"
                />
              ) : null}
              <img
                src={pokemonImage(pokemonIndex)}
                alt="some pokemon"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })}
                style={
                  this.state.toManyRequests
                    ? { display: "none" }
                    : this.state.imageLoading
                    ? null
                    : { display: "block",
                        width: '100%',
                        height: '100%',
                   }
                }
              />
              {this.state.toManyRequests ? (
                <h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">
                    Too Many Requests
                  </span>
                </h6>
              ) : null}
                <h3 className="card-title"> {name.charAt(0).toUpperCase() + name.slice(1)} </h3>
              </div>
          </div>
        </a>
      </div> 
    );
  }
};

const mapStateToProps = state => { 
  return {};
};

export default withRouter(connect(mapStateToProps)(PokemonCard));
