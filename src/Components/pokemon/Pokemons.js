import React, { Component } from "react";
import Search from "./pokemonHelper/Search";
import PokemonCard from "./PokemonCard";
import NoResults from "./pokemonHelper/NoResults";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./styles/Pokemons.css";
import {} from "./apiServices/pokeAPI";

class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by_name: false,
      pokemon: [],
      searchedPokemon: "",
      tracker: 0 
    };
  }

  getNumPokemon = () => 12;

  async componentDidMount() {
    const {dispatch} = this.props;
    const {getPokemonsLimit} = this.props.action_props.pokemon_action;
    await dispatch(getPokemonsLimit(this.getNumPokemon()));

    this.setState({ by_name: false }); //name and url
    document.addEventListener("scroll", this.trackScrolling);
  };

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.state.tracker <= 792) {
      (process.env.NODE_ENV.trim() !== 'production') && console.log("you're at the bottom of the page");
      this.setState({
        error: undefined,
        tracker: this.state.tracker + this.getNumPokemon()
      });
      setTimeout( async() => await this.loadMore(), 1000);
    };
  };

  loadMore = async () => {
    const {dispatch} = this.props;
    const {getPokemonsLimit} = this.props.action_props.pokemon_action;
    await dispatch(getPokemonsLimit(this.state.tracker + 3))
  
    this.setState({ by_name: false, error: undefined });
  };

  change = async e => { 
    const {dispatch} = this.props;
    const {getPokemonsByName,getPokemonsLimit} = this.props.action_props.pokemon_action;
  
    const poke = (e.target.value).trim();
    if (poke !== "") { 
      dispatch(getPokemonsByName(poke));
      this.setState({ by_name: true});
    }else{
      await dispatch(getPokemonsLimit(this.getNumPokemon()));
    }
    document.removeEventListener("scroll", this.trackScrolling);
  };

  render() {
  
    return (
      <div>
        <header className="MyHeader"> 
            <h1 id="my-games">
            <a href="#/">
               Pokedex
            </a>
            </h1>
        </header>
        <div className="row">
          <div className="pokemon_search">
            <Search onChange={this.change} />
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
            <NoResults searchedPokemon = {this.state.searchedPokemon}/>
          )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  // process.env.NODE_ENV.trim() !== 'production' && console.log('conect4 state: ', state)
  const pokemonProps  = state.PokemonReducer.defaultPokemonStates; 
  const {pokemons} = pokemonProps;

  return {pokemons};
};

export default withRouter(connect(mapStateToProps)(Pokemons));
