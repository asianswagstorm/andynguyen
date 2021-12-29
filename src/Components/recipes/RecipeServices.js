const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const recipeAPI =  `${corsAnywhere}https://recipesapi.herokuapp.com`;

//write test 
export const fetchRecipe = async (recipeName) => {
    try{
        let result = ""
        await fetch(`${recipeAPI}/api/search?q=${recipeName}`).then(res => result = res.json());
        console.log("recipe result", result)
        return result 
    }catch(error){
        throw Error(error)
    }
};
export const fetchRecipeByID = recipeID => {
    try{
        return fetch(`${recipeAPI}/api/get?rId=${recipeID}`); 
    }catch(error){
        throw Error(error)
    }
};
