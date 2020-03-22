import React from 'react';

import { Link } from "react-router-dom";

const Recipes = props => (
  <div className="container">
    <div className="row">

    {props.api_limit &&
       <div className="error_box">
      <p className="bg-danger error_message">API LIMIT REACHED.</p>
      </div>}

      {props.error &&
      <div className="error_box">
      <p className="bg-danger error_message">No Recipes Found</p>
      </div>}
      
    { props.recipes && props.recipes.map((recipe, key) => {
      return (
        <div key={key} className="col-md-4" style={{ marginBottom:"2rem" }}>
          <div className="recipes__box">
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
              <button className="recipe_buttons">
                <Link to={{ 
                  pathname: `/recipe/${recipe.recipe_id}`//, //key id
                  /*state: { recipe_title: recipe.title,
                            recipe_ID: recipe.recipe_id } don't need this*/
                }}>View Recipe</Link>
              </button>
          </div>
        </div>
      );
    })}
    </div>
  </div>
);

export default Recipes;