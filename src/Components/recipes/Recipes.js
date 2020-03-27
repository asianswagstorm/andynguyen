import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';


const filterRecipeName = (reciceName) => {
  let nameToReturn = reciceName;

  if (nameToReturn.includes("&nbsp;"))
    nameToReturn = nameToReturn.replace("&nbsp;", " ");

  if (nameToReturn.length >= 28)
    nameToReturn = `${nameToReturn.substring(0, 26)}...`;

  return nameToReturn;
};

const Recipes = props => (
    <div className="recipes__wrapper">
      <div className="recipes">
        { (props.recipes.length > 0 ) ? props.recipes.map((recipe, key) => 
              <div key={key} className="recipes__box">
                <img 
                  className="recipe__box-img" 
                  src={recipe.image_url} 
                  alt={recipe.title}/>
              <div className="recipe__text">
                <h5 className="recipes__title">
                  {filterRecipeName(recipe.title)}
                </h5>
                <p className="recipes__subtitle">Publisher: <span>
                    { recipe.publisher }
                </span></p>
              </div>
                      <button className="recipe__buttons">
                        <Link id="view_recipe" to={{ 
                          pathname: `/Recipes/${recipe.recipe_id}`
                        }}>View Recipe</Link>
                      </button>
              </div>
        ) :  
        <div className="error__box"> {/** clean this section, make it nicer */}
          {props.count === 0 ?
            <p className="error__message"> {`No Recipes Found for ${props.recipeName}`}</p>
              :
            <p className="inital__message"> Start by searching by a category.</p> 
          }
        </div>
        }
      </div>
    </div>
);

const mapStateToProps = state => { 
  const recipeProps  = state.RecipeReducer.defaultRecipeStates; 
  const {recipes,count,recipeName} = recipeProps;

  return {recipes,count,recipeName};
};

export default withRouter(connect(mapStateToProps)(Recipes));
