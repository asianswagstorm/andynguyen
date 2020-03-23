import React from 'react';

const Form = props => (
  <form className="recipeForm" onSubmit={props.getRecipe} style={{ marginBottom:"2rem" }}>
    <input className="recipeForm__input" type="text" name="recipeName" placeholder="search for recipes here" />
    <button className="recipeForm__button">  <span className="icon fa-search" id = "search__icon"/> Search </button> 
  </form>
);

export default Form;