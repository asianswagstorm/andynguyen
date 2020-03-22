import React from 'react';

//form button not responsive
const Form = props => (
  <form onSubmit={props.getRecipe} style={{ marginBottom:"2rem" }}>
    <input className="form__input" type="text" name="recipeName" placeholder="search for recipes here" />
    <button className="form__button"> <i className="fas fa-search"/> Search </button> 
  </form>
);

export default Form;