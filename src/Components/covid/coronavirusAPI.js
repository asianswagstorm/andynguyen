const domain = "https://covid-world-data-andy.herokuapp.com/";//"http://localhost:8080/"; 
const covidWorld = `${domain}world`; 
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTEwIiwibmFtZSI6Ik93bmVyIiwiaXNWYWxpZCI6dHJ1ZX0.2XiynBEvXwIKla8KNbTR9GaZASLdOyWQQqyhziyTFSo";

const linkToReturn = (type) => {
    switch(type){
        case "world": 
            return covidWorld;
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

export const updateRegionGraph = async (regions, country, state, region) => {
    const result = await fetch(`${covidWorld}/${country}/${state}/${region}`, { 
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