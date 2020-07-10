const corsAnywhere = "https://cors-anywhere-asianswagstorm.herokuapp.com/";
const recipeAPI =  `${corsAnywhere}https://community-food2fork.p.rapidapi.com`;

//DNW FIND A NEW API!!!! 
export const fetchRecipe = async (recipeName) => { //async functions return a promise
    try{
        return await(await fetch(`${recipeAPI}/api/search?q=${recipeName}`, {
            method: 'get',    
            headers: {
                'Cache-Control': 'no-cache',
                'X-RapidAPI-Host': "community-food2fork.p.rapidapi.com",
                'X-RapidAPI-Key': "0fd490d094mshcada922c1ff45ecp16e7d3jsndd6ef22c3c16"
            }
          })).json(); 
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
