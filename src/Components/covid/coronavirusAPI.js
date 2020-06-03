import {filterName} from "./covidFunction";
const covid19GlobalLink = "https://covid19.mathdro.id/api/";
const covid19ByCountryAPILINK =`${covid19GlobalLink}countries/`;
const corsAnywhere = "https://cors-anywhere-asianswagstorm.herokuapp.com/";
const MontrealLink = `https://covid-world-data-andy.herokuapp.com/montreal`;
const QuebecLink = `https://covid-world-data-andy.herokuapp.com/quebec`;
const covid193Key = "0fd490d094mshcada922c1ff45ecp16e7d3jsndd6ef22c3c16";
const covid193Host = "covid-193.p.rapidapi.com";
const covidGraphData = "https://covid-world-data-andy.herokuapp.com/world";
export const fetchGraphData = async (country) => {
    const result = await fetch(`${corsAnywhere}${covidGraphData}/${country}/line`, {
        method: 'get', 
        headers: {
          'Cache-Control': 'no-cache',
        }    
    }).then(response => response.json())

    return result;
};

export const fetchAllCountries = async () => {
    const result = await fetch(`https://${covid193Host}/statistics`, {
        method: 'get',    
        headers: {
            'x-rapidapi-host': covid193Host,
            'x-rapidapi-key' : covid193Key
            }
      }).then(response => (
        response.json()
    ));

    const newResponse = result.response.reduce((acc, country) => {
        return { ...acc, [filterName(country.country)] : {"locationName": filterName(country.country), "confirmed" : country.cases.total , "recovered": country.cases.recovered, "deaths" : country.deaths.total }}
    }, {});

    return newResponse;    
};

export const fetchQuebecGraph = async () => {
    const result = await fetch(`${corsAnywhere}${QuebecLink}/line`, { 
        method: 'get',
        headers: {
          'Cache-Control': 'no-cache',
        }
      }).then(response => (
        response.json()
    ));

    return result;
};

export const fetchMontrealGraph = async () => {
    const result = await fetch(`${corsAnywhere}${MontrealLink}/line`, { 
        method: 'get',
        headers: {
          'Cache-Control': 'no-cache',
        }
      }).then(response => (
        response.json()
    ));
    return result;
};

export const fetchQuebecCases = async () => {
    const result = await fetch(`${corsAnywhere}${QuebecLink}`, { 
        method: 'get',
        headers: {
          'Cache-Control': 'no-cache',
        }
      }).then(response => (
        response.json()
    ));

    const recent = (result.length - 1);
    return result[recent];
};

export const fetchMontrealCases = async () => {
    const result = await fetch(`${corsAnywhere}${MontrealLink}`, { 
        method: 'get', 
        headers: {
            'Cache-Control': 'no-cache'
        }
      }).then(response => (
        response.json()
    ));
 
    const recent = (result.length - 1);
    return result[recent];
};

export const fetchNumberOfCasesByCountry = async (country) => {
    return await fetch(`${covid19ByCountryAPILINK}${country}`).then(response => (
    response.json()
))
}

export const fetchGlobalCases = async () => {

    const result = await fetch(`${covid19GlobalLink}`).then(response => (
        response.json()
    ))

    return {confirmed : result.confirmed.value , recovered: result.recovered.value , deaths: result.deaths.value}
}

export const fetchCanadianCases = async () => {
    const result =  await fetch(`${covid19ByCountryAPILINK}Canada`).then(response => (
        response.json()
    ))

    return {population: "38,844,182" , confirmed : result.confirmed.value , recovered: result.recovered.value , deaths: result.deaths.value}
}

export const fetchDetailedNumberOfCasesByCountry = async (country) => {
    let alteredData = {};

    const result = await fetch(`${covid19ByCountryAPILINK}${country}/confirmed`).then(response => (
        response.json()
    ))    

    result.forEach(prov => 
        alteredData = {...alteredData, [prov.provinceState] : {locationName: prov.provinceState, confirmed : prov.confirmed, deaths : prov.deaths, recovered: prov.recovered} }
    )
    return alteredData;
}