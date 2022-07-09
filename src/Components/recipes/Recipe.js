import React from 'react';
import { withRouter } from "../../helpers";
import { connect } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Headers from "../Headers";

const override = `
  display: block;
  margin: 0 auto;
  border-color: #19B5FE;
`;

class Recipe extends React.Component {
  state = {
    message: "Loading...",
    isLoading : true
  }
  componentDidMount = async () => {
    const recipeID = this.props.match.params.id;
    try{
      const {dispatch} = this.props;
      const {getCurrentRecipe} = this.props.action_props.recipe_action;
      dispatch(getCurrentRecipe(recipeID));
    
    } catch (error) {
      this.setState({ message: `No recipes corresponding to id ${recipeID}`, isLoading : false });
    }
  };
  
  render() {
    const recipe = this.props.currentRecipe;
  
    const filterRecipeName = (reciceName) => {
      let nameToReturn = reciceName;
    
      if (nameToReturn.includes("&nbsp;"))
        nameToReturn = nameToReturn.replace("&nbsp;", " ");
    
      return nameToReturn;
    };

    return (
      <div className="App">
        <Headers linkTo = "/Recipes" headerTitle="Recipe App"/>
          <div>
            { recipe && recipe.length !== 0 ?
              <div className="active-recipe">
                <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title}/>
              <div className="recipe__content">
                <h3 className="active-recipe__title">{ filterRecipeName(recipe.title) }</h3>

                <h4 className="active-recipe__publisher"> 
                <strong>Recipe Publisher:</strong> <span>{ recipe.publisher }</span>
                </h4>

                <p className="active-recipe__website"><strong>See the recipe in detail: </strong>
                  <span className="recipe_link"><a id="recipe__link" target = "_blank" rel="noopener noreferrer" href={recipe.source_url}>{recipe.publisher_url.replace("http", "https")}</a></span>
                </p>
                <div className="active-recipe__ingredients">
                <ul className="ingredient__list">
                      <h4 className="mt-3 mb-4">Ingredients</h4>
                      {recipe.ingredients.map((item, index) => {
                        return (
                          <li key={index} className="list-group-item text-slanted ingredient__list__item">
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                </div>    
              </div>
              </div>
            : 
            <div className="recipe__loading" >
              <ClipLoader
                css={override}
                size={150}
                color={"#19B5FE"}
                loading={this.state.isLoading}
              />
                {this.state.message}     
            </div>
            }
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => { 
  const recipeProps  = state.RecipeReducer.defaultRecipeStates; 
  const {currentRecipe} = recipeProps;

  return {currentRecipe};
};

export default withRouter(connect(mapStateToProps)(Recipe));
