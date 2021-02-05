const defaultRecipeStates = {
    recipes : [],
    count:-1,
    recipeName : "",
    currentRecipe : [],
    isLoading : false,
};

const DEFAULT_STATES = {defaultRecipeStates: {...defaultRecipeStates}};

const RecipeReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case "SET_RECIPES":
            return {
                ...state,
                defaultRecipeStates: {...state.defaultRecipeStates, recipes : action.recipes, count: action.count, recipeName: action.recipeName, currentRecipe: [],isLoading :action.isLoading}
            };
        case "SET_CURRENT_RECIPE":
            return {
                ...state,
                defaultRecipeStates: {...state.defaultRecipeStates, currentRecipe: action.currentRecipe}
            };
        case "SET_IS_LOADING":
                return {
                    ...state,
                    defaultRecipeStates: {...state.defaultRecipeStates, isLoading: action.isLoading,recipes : []}
                };
        default:
            return state;
    }
};

export default RecipeReducer