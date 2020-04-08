import React, { Component } from "react";

export default class Search extends Component {
  
    handleKeyPress = event => {
      if (event.key === "Enter") {
        this.props.searchPokemon(this.props.searchedPokemon);
      }
    };

  render() {
    return (
        <form className="pokemon__search__form">
          <input  onKeyPress={this.handleKeyPress} defaultValue = {this.props.searchedPokemon} onChange = {this.props.onChange} placeholder="Search Pokemon"  type = 'text' name = 'pokename' className="poke__search__input" />  
        </form>
    );
  }
}
