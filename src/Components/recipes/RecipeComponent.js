import React, { Component } from 'react';
import './Recipe.css';

import Form from "./Form";
import Recipes from "./Recipes";
import {recipeAPI} from "./recipeConstants";
const API_KEY = "";

class App extends Component {
  state = { //react 16, doesnt need constructor
    recipes: [],
    error : '',
    api_limit : ''
  }

  //use async await when you want async code to run like synchronous code
  getRecipe = async (e) => { //async functions return a promise
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const data = await fetch(`${recipeAPI}/api/search?key=${API_KEY}&q=${recipeName}&count=9`); 
  
    //without await response that resolves to a promise. With await response is the actual data
    //await only waits for single promises.
    
    const jsonData = await data.json();
    // const jsonData  = {"count": 0, "recipes": []};
    if (!jsonData) {
      this.setState({ api_limit: "API Limit Reached" });
      console.log("API Limit Reached");
    } 
    else if(jsonData.recipes.length === 0 ){ //
      this.setState({ error: "No search result found" ,  recipes: []});
      console.log("No search result found");
    }
    else {
    this.setState({ recipes: jsonData.recipes ,error: ''});
    console.log(this.state.recipes);
    }
  }

  //
  componentDidMount = () => { // the component has been rendered, componentDidMount is the best place to put calls to fetch data
    const json = localStorage.getItem("recipes"); //localStorage property allows you to access a Storage object for the Document's origin
    const recipes = JSON.parse(json);
    this.setState({ recipes }); //set the recipes state , equivalent to ES6 {recipes : recipes}
  }

  //what ever happens here is when state changes. As soon as state is updated this is called.
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div>
        <header className="MyHeader"> 
            <h1 id="my-games">
            <a href="#/">
               Recipe App
            </a>
            </h1>
        </header>
        <div className="recipe__section" >
        <Form getRecipe={this.getRecipe} />
        
        <Recipes recipes={this.state.recipes}  error = {this.state.error} api_limit = {this.state.api_limit} />
        </div>
      </div>
    );
  }
}

export default App;