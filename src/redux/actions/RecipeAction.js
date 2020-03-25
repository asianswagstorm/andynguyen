import {RECIPE_TYPE} from "./types";
import {fetchRecipe} from "../../Components/recipes/RecipeServices";
//fetchRecipeByID

export const setRecipes = recipes => ({
    type: RECIPE_TYPE.SET_RECIPES,
    recipes : (recipes.recipes).filter((recipe, key) => (   recipe.image_url !== recipes.recipes[(key-1 === -1) ? 1 : key-1].image_url && 
                                                            recipe.title !== recipes.recipes[(key-1 === -1) ? 1 : key-1].title               )), //remove duplicate
    count : recipes.count
});

export const getRecipes = recipeName => dispatch => {
    try{
        fetchRecipe(recipeName).then(
            response => dispatch(setRecipes(response)) //count and recipes
        );
    }
    catch (error) {
        throw(error);
    };
};
