import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const Recipes = props => (
    <div className="recipes__wrapper">
     
      {props.api_limit &&
        <div className="error_box">
        <p className="bg-danger error_message">API LIMIT REACHED.</p>
        </div>}

{/* DNW */}
        {(props.count === 0 && props.recipes.length === 0) &&
        <div className="error_box">
        <p className="bg-danger error_message">No Recipes Found</p>
        </div>}

      <div className="recipes">
        { (props.recipes.length > 0) && props.recipes.map((recipe, key) => 
              <div key={key} className="recipes__box">
                <img 
                  className="recipe__box-img" 
                  src={recipe.image_url} 
                  alt={recipe.title}/>
              <div className="recipe__text">
                <h5 className="recipes__title">
                  { recipe.title.length < 28 ? `${recipe.title}` : `${recipe.title.substring(0, 26)}...` }
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
        )}
      </div>
    </div>
);

const mapStateToProps = state => { 
  const recipeProps  = state.RecipeReducer.defaultRecipeStates; 
  const {recipes,count} = recipeProps;

  return {recipes,count};
};

export default withRouter(connect(mapStateToProps)(Recipes));
