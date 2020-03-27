import {RECIPE_TYPE} from "./types";
import {fetchRecipe,fetchRecipeByID} from "../../Components/recipes/RecipeServices";
//fetchRecipeByID

export const setRecipes = recipes => ({
    type: RECIPE_TYPE.SET_RECIPES,
    recipes : (recipes.recipes).filter((recipe, key) => (   recipe.image_url !== recipes.recipes[(key-1 === -1) ? 1 : key-1].image_url && 
                                                            recipe.title !== recipes.recipes[(key-1 === -1) ? 1 : key-1].title               )), //remove duplicate
    count : recipes.count,
    recipeName : recipes.recipeName
});

export const getRecipes = recipeName => dispatch => {
    try{
        fetchRecipe(recipeName).then(
            response => dispatch(setRecipes({...response, recipeName} )) 
        );
    }
    catch (error) {
        throw(error);
    };
};

export const setCurrentRecipe = currentRecipe => ({
    type : RECIPE_TYPE.SET_CURRENT_RECIPE,
    currentRecipe
});

// SET_CURRENT_RECIPE
export const getCurrentRecipe = recipeID => dispatch => {
    try{
        fetchRecipeByID(recipeID).then(
            response => dispatch(setCurrentRecipe(response.recipe))
        ); 
    }
    catch (error) { //fail to fetch
        dispatch(setCurrentRecipe([]));
    };
};

