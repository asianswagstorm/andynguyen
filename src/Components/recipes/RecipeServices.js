const corsAnywhere = "https://cors-anywhere-asianswagstorm.herokuapp.com/";
const recipeAPI =  `${corsAnywhere}https://recipesapi.herokuapp.com`;

//write test 
export const fetchRecipe = async (recipeName) => { //async functions return a promise
    try{
        return await(await fetch(`${recipeAPI}/api/search?q=${recipeName}`)).json(); 
    }catch(error){
        throw Error(error)
    }
};

export const fetchRecipeByID = async recipeID => {
    try{
        return await(await fetch(`${recipeAPI}/api/get?rId=${recipeID}`)).json(); 
    }catch(error){
        throw Error(error)
    }
};
