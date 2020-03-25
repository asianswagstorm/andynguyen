const defaultRecipeStates = {
    recipes : [],
    count:0
};

const DEFAULT_STATES = {defaultRecipeStates: {...defaultRecipeStates}};

const RecipeReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case "SET_RECIPES":
            return {
                ...state,
                defaultRecipeStates: {...state.defaultRecipeStates, recipes : action.recipes, count: action.count}
            };
        default:
            return {...state};
    }
};

export default RecipeReducer