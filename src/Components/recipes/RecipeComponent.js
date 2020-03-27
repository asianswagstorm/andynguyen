import React, { Component } from 'react';
import './Recipe.css';
import Headers from "../Headers";
import Form from "./Form";
import Recipes from "./Recipes";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class RecipeComponent extends Component {
  //cleanUP && add tests!!! 
  //use async await when you want async code to run like synchronous code
  getRecipe = async (e) => { //async functions return a promise
    const {dispatch} = this.props;
    const {getRecipes} = this.props.action_props.recipe_action;

    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    dispatch(getRecipes(recipeName));
  }

  //redux store losing state on refresh!!! 
  componentDidMount = () => { // the component has been rendered, componentDidMount is the best place to put calls to fetch data
    const json = localStorage.getItem("recipeData"); 
    if(json){
      const {dispatch} = this.props;
      const {setRecipes} = this.props.action_props.recipe_action;
      dispatch(setRecipes(JSON.parse(json)))
    }
  };

  //what ever happens here is when state changes. As soon as state is updated this is called. deprecated
  componentDidUpdate = () => {
    const recipes = this.props.recipes;
    localStorage.setItem("recipeData", JSON.stringify({recipes, count : this.props.count, recipeName: this.props.recipeName}));
  }
  render = () => {
    return (
      <div>
        <Headers linkTo = "#/" headerTitle="Recipe App"/>
        <div className="recipe__section" >
        <Form getRecipe={this.getRecipe} />
        <Recipes/> 
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const recipeProps  = state.RecipeReducer.defaultRecipeStates; 
  const {recipes,count,recipeName} = recipeProps;

  return {recipes,count,recipeName};
};

export default withRouter(connect(mapStateToProps)(RecipeComponent));
