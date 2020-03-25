const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const recipeAPI =  `${corsAnywhere}https://recipesapi.herokuapp.com`;
const API_KEY = "";

//write test 
export const fetchRecipe = async (recipeName) => { //async functions return a promise
    try{
        return await(await fetch(`${recipeAPI}/api/search?key=${API_KEY}&q=${recipeName}&count=9`)).json(); 
    }catch(error){
        throw Error(error)
    }
};

export const fetchRecipeByID = async recipeID => {
    try{
        return await(await fetch(`${recipeAPI}/api/get?key=${API_KEY}&rId=${recipeID}`)).json(); 
    }catch(error){
        throw Error(error)
    }
};
