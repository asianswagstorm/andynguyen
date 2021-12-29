import React, { Component } from 'react';
import './Recipe.css';
import Headers from "../Headers";
import Form from "./Form";
import Recipes from "./Recipes";
import { withRouter } from "../../helpers";
import { connect } from 'react-redux';

class RecipeComponent extends Component {
  //cleanUP && add tests!!! 
  //use async await when you want async code to run like synchronous code
  componentDidMount = () => {
    window.scrollTo(0, 0);
  }
  
  getRecipe = async (e) => { //async functions return a promise
    const {dispatch} = this.props;
    const {getRecipes} = this.props.action_props.recipe_action;

    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    dispatch(getRecipes(recipeName));
  }

  render = () => {
    const {recipeName ,dispatch,action_props} = this.props;
    return (
      <div>
        <Headers linkTo = "#/" headerTitle="Recipe App"/>
        <div className="recipe__section" >
        <Form getRecipe={this.getRecipe} recipeName={recipeName} dispatch= {dispatch} recipe_action={action_props.recipe_action} />
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
