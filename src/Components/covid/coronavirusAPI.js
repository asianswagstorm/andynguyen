const covidWorld = "http://localhost:8080/world"; //https://covid-world-data-andy.herokuapp.com/
const QuebecLink = `http://localhost:8080/world/Canada/Quebec`; 
const MontrealLink = `https://covid-world-data-andy.herokuapp.com/montreal`; 
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTEwIiwibmFtZSI6Ik93bmVyIiwiaXNWYWxpZCI6dHJ1ZX0.2XiynBEvXwIKla8KNbTR9GaZASLdOyWQQqyhziyTFSo";

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
    const result = await fetch(`${linkToReturn(type)}`, { 
        headers: {
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${jwtKey}`
        }
      }).then(response => (
        response.json()
    ))
    return result;  
};

export const updateCanadianGraph = async (regions, country, state) => {
    const result = await fetch(`${covidWorld}/${country}/${state}`, { 
        method: 'POST',    
        headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtKey}`,
        },
        body: JSON.stringify(regions)
        
      }).then(response => (
        response.json()
    ));

    return result;  
};