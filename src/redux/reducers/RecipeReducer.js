const defaultRecipeStates = {
    recipes : [],
    count:-1,
    recipeName : "",
    currentRecipe : []
};

const DEFAULT_STATES = {defaultRecipeStates: {...defaultRecipeStates}};

const RecipeReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case "SET_RECIPES":
            return {
                ...state,
                defaultRecipeStates: {...state.defaultRecipeStates, recipes : action.recipes, count: action.count, recipeName: action.recipeName, currentRecipe: []}
            };
        case "SET_CURRENT_RECIPE":
            return {
                ...state,
                defaultRecipeStates: {...state.defaultRecipeStates, currentRecipe: action.currentRecipe}
            };
        default:
            return state;
    }
};

export default RecipeReducer