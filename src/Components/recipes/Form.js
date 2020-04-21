import React from 'react';

const Form = props => (
  <form className="recipeForm" onSubmit={props.getRecipe} style={{ marginBottom:"2rem" }}>
    <input className="recipeForm__input" type="text" name="recipeName" placeholder="search for recipes here" defaultValue = {props.recipeName}/>
    <button className="recipeForm__button">  <span className="icon fa-search" id = "recipe__search__icon"> Search </span> </button> 
  </form>
);

export default Form;