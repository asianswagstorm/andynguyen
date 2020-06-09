const corsAnywhere = "https://cors-anywhere-asianswagstorm.herokuapp.com/";
const covidWorld = "https://covid-world-data-andy.herokuapp.com/world";
const QuebecLink = `https://covid-world-data-andy.herokuapp.com/quebec`;
const MontrealLink = `https://covid-world-data-andy.herokuapp.com/montreal`;

const linkToReturn = (type) => {
    switch(type){
        case "world": 
            return covidWorld;
        case "quebec": 
            return QuebecLink;
        case "montreal": 
            return MontrealLink;
        default: 
            return `${covidWorld}/${type}`;
    };
};

export const fetchCoronaVirusCases = async (type) => {
    const result = await fetch(`${corsAnywhere}${linkToReturn(type)}`, {
        method: 'get',    
        headers: {
            'Cache-Control': 'no-cache',
        }
      }).then(response => (
        response.json()
    ));

    return result;  
};
