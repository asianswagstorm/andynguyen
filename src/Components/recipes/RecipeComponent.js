import React, { Component } from 'react';
import './Recipe.css';
import Headers from "../Headers";
import Form from "./Form";
import Recipes from "./Recipes";
// import {fetchRecipe} from "./RecipeServices";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class RecipeComponent extends Component {
  state = { //react 16, doesnt need constructor
    // recipes: [],
    error : '',
    api_limit : ''
  }
  //cleanUP && add tests!!! 
  //use async await when you want async code to run like synchronous code
  getRecipe = async (e) => { //async functions return a promise
    const {dispatch} = this.props;
    const {getRecipes} = this.props.action_props.recipe_action;

    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
     
    dispatch(getRecipes(recipeName));
    
    if(this.props.count === 0 ){ 
      this.setState({ error: "No search result found" }); //,  recipes: []
      process.env.NODE_ENV.trim() !== 'production' && console.log("No search result found");
    }
    else {
    // this.setState({ recipes: jsonData.recipes ,error: ''});
    process.env.NODE_ENV.trim() !== 'production' && console.log(this.props.recipes);
    }
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
    localStorage.setItem("recipeData", JSON.stringify({recipes, count : this.props.count}));
  }
  render = () => {
    return (
      <div>
        <Headers linkTo = "#/" headerTitle="Recipe App"/>
        <div className="recipe__section" >
        <Form getRecipe={this.getRecipe} />
        {/*  recipes={this.props.recipes} error = {this.state.error} */}
        <Recipes  api_limit = {this.state.api_limit} /> 
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const recipeProps  = state.RecipeReducer.defaultRecipeStates; 
  const {recipes,count} = recipeProps;

  return {recipes,count};
};

export default withRouter(connect(mapStateToProps)(RecipeComponent));
