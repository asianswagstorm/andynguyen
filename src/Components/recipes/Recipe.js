import React from 'react';
import {recipeAPI} from "./recipeConstants";
import Headers from "../Headers";
const API_KEY = "";

//ingredients
/*
recipe: List of Recipe Parameters ->
	image_url: URL of the image
	source_url: Original Url of the recipe on the publisher's site
	f2f_url: Url of the recipe on Food2Fork.com
	title: Title of the recipe
	publisher: Name of the Publisher
	publisher_url: Base url of the publisher
	social_rank: The Social Ranking of the Recipe (As determined by our Ranking Algorithm)
	ingredients: The ingredients of this recipe
*/

class Recipe extends React.Component {
  state = {
    activeRecipe: [],
    message: "Loading..."
  }
  //component just mounted to the screen
  componentDidMount = async () => { //react life-cycle hook: fired as soon as component mounted to web browser. Once component is loaded execute asyncly. 
    try{
    //const title = this.props.location.state.recipe_title; //handle undefined
    //console.log(title);
    //redux prop
    const recipeID = this.props.match.params.id;//this.props.location.state.recipe_ID;
    console.log(recipeID); //handle undefined
   
    // start timeout
    // setTimeout(() => {
    // }, 1500);
    // https://cors-anywhere.herokuapp.com/
    // axios
    const data = await fetch(`${recipeAPI}/api/get?key=${API_KEY}&rId=${recipeID}`);
    //`https://food2fork.com/api/search?key=${API_KEY}&q=${title}`
    
    const jsonData = await data.json();
    
    if (jsonData.recipe.length === 0) {
      this.setState({ message: "No such Recipe Found" })
    } else {
      this.setState({ activeRecipe: jsonData.recipe });//s[0]
    }

    console.log(jsonData);
    console.log(this.state.activeRecipe);
    } catch (error) {
      console.log("Invalid recipe ID");
      console.log(error);
      this.setState({ message: "Uh oh, accident happend" })
    }
  };
  
  render() {
    const recipe = this.state.activeRecipe;
    
    if(!recipe){
      return (
        <div className="App">
      {/* clean up */}
      <div className="container"></div>
      <p>Food2Fork API has reach it's maximum Calls. </p> 
      </div>
   ); }
    else
    return (
      <div className="App">
        <Headers linkTo = "#/Recipes" headerTitle="Recipe App"/>
      <div className="container">
      <div className="content">
        { this.state.activeRecipe.length !== 0 &&
          <div className="active-recipe">
            <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title}/>
            <h3 className="active-recipe__title">{ recipe.title }</h3>
            <p className="active-recipe__website"><strong>See the recipe in detail: </strong>
              <span className="recipe_link"><a id="recipe__link" target = "_blank" rel="noopener noreferrer" href={recipe.source_url}>{recipe.publisher_url}</a></span>
            </p>
            {/* list-group , list-group-item part of bootstrap */}
            <div className="active-recipe__ingredients">
            <ul className="list-group mt-4">
                  <h4 className="mt-3 mb-4">Ingredients</h4>
                  {recipe.ingredients.map((item, index) => {
                    return (
                      <li key={index} className="list-group-item text-slanted">
                        {item}
                      </li>
                    );
                  })}
                </ul>
            </div>    
           
            <h4 className="active-recipe__publisher"> 
            <strong>Recipe Publisher:</strong> <span>{ recipe.publisher }</span>
            </h4>
          </div>
        }
  { this.state.activeRecipe.length === 0 &&
      
      <div >
        {this.state.message}      
      </div>
  }
  </div>
      </div>
      </div>
    );
  }
};

export default Recipe;