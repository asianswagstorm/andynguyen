import React, { Component } from "react";
import Search from "./pokemonHelper/Search";
import PokemonCard from "./PokemonCard";
import NoResults from "./pokemonHelper/NoResults";
import "./styles/Pokemons.css";

import axios from "axios";

export default class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by_name: false,
      url: "https://pokeapi.co/api/v2/pokemon/?limit=", //807
      num_of_pokemon: 12,
      pokemon: null,
      isLoading: false,
      searchQuery: "",
      tracker: 0 
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `${this.state.url}${this.state.num_of_pokemon}`
    ); 
    
    this.setState({ pokemon: res.data["results"] });
    
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      (process.env.NODE_ENV.trim() !== 'production') && console.log("you're at the bottom of the page");
      this.setState({
        isLoading: true,
        error: undefined,
        tracker: this.state.tracker + this.state.num_of_pokemon
      });
      
      setTimeout( () => this.loadMore(), 1000);
    }
  };

  loadMore = () => {

    fetch(`${this.state.url}${this.state.tracker + this.state.num_of_pokemon}`)
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            pokemon: res.results,
            cursor: res.cursor,
            isLoading: false
          });
        },
        error => {
          this.setState({ isLoading: false, error });
        }
      );
    this.setState({ isLoading: false, error: undefined });
  };

  search = e => { //onChange???? 
    e.preventDefault();
    const poke = e.target.elements.pokename.value;
    if (poke !== "") { //clean this up 
      axios
        .get(
          `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${poke}`
        )
        .then(res => {
          (process.env.NODE_ENV.trim() !== 'production') && console.log('response',res.data.data);
          if((res.data.data).length === 0 ){
            this.setState({ searchQuery: poke });
          }
          this.setState({ pokemon: res.data.data, by_name: true });
        });
    }
    document.removeEventListener("scroll", this.trackScrolling);
  };

  render() {
    return (
      <div>
        <header className="MyHeader"> 
            <h1 id="my-games">
            <a href="/">
               Pokedex
            </a>
            </h1>
        </header>
        <div className="row">
          <div className="pokemon_search">
            <Search searchResult={this.search} />
          </div>
        </div>
        <div className="pokemon_row">
          {(this.state.pokemon && (this.state.pokemon).length > 0) ? (
            <div className="list_pokemon">
              {this.state.pokemon.map(pokemon => (
                <div className = "single_card_1">
                    <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                    id={pokemon.id}
                    by_name={this.state.by_name}
                    />
                </div>
               
              ))}
              
            </div>
          ) : (
            <NoResults searchQuery = {this.state.searchQuery}/>
          )}
        </div>
      </div>
    );
  }
}
