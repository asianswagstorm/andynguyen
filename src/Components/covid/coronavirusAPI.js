import {filterName} from "./covidFunction";
const covid19GlobalLink = "https://covid19.mathdro.id/api/";
const covid19ByCountryAPILINK =`${covid19GlobalLink}countries/`;
const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const parseHubMontrealProjectToken = "tJP0snf3WbuT";
const parseHubQuebecProjectToken = "t1hHqC7Bd1mm";
const parseHubAPIKey = "tkS-vq_osspq";
const parseHubMontrealLink = `https://www.parsehub.com/api/v2/projects/${parseHubMontrealProjectToken}/last_ready_run/data?api_key=${parseHubAPIKey}`;
const parseHubQuebecLink = `https://www.parsehub.com/api/v2/projects/${parseHubQuebecProjectToken}/last_ready_run/data?api_key=${parseHubAPIKey}`;
const covid193Key = "0fd490d094mshcada922c1ff45ecp16e7d3jsndd6ef22c3c16";
const covid193Host = "covid-193.p.rapidapi.com";

export const fetchAllCountries = async () => {
    const result = await fetch(`${corsAnywhere}https://${covid193Host}/statistics`, {
        headers: {
          'x-rapidapi-host': covid193Host,
          'x-rapidapi-key' : covid193Key
        }
      }).then(response => (
        response.json()
    ));

    const newResponse = result.response.reduce((acc, country) => {
        return { ...acc, [filterName(country.country)] : {"confirmed" : country.cases.total , "recovered": country.cases.recovered, "deaths" : country.deaths.total }}
    }, {});

    return newResponse;    
};

export const fetchQuebecCases = async () => {
    const result = await fetch(`${corsAnywhere}${parseHubQuebecLink}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(response => (
        response.json()
    ));

    let data = {"Total" : { "confirmed" : result.confirmed[20].confirmed.replace(" ", ","), "recovered": 3068, "deaths" : result.deaths[20].deaths.replace(" ", ","),
                            "intensiveCare": result.hospital[1].name.split("Nombre en soins intensifs : ")[1].replace(" ", ","),
                            "hospitalized": result.hospital[2].name.split("Nombre total d’hospitalisations1 : ")[1].replace(" ", ",")}};
    let name = "";
    let quebecConfirmedCase= "0";
    let quebecDeathCase = "0";
    for(let i = 0; i < (result.confirmed).length - 1 ; i++){
        if(i !== 9 && i !== 16 && i !==17){
            name = result.confirmed[i].name.includes(" - ") ?  result.confirmed[i].name.split(" - ")[1] : result.confirmed[i].name;
            quebecConfirmedCase = result.confirmed[i].confirmed.replace(" ", ",");
            quebecDeathCase = result.deaths[i].deaths.replace(" ", ",");
        }
        if(i === 9){ 
            name = "Nord-du-Québec – Nunavik – Terres-Cries-de-la-Baie-James";
            const reduceConfirmedNumber = i => parseInt(result.confirmed[i].confirmed.replace(" ", ""));
            const reduceDeathsNumber = i => parseInt(result.deaths[i].deaths.replace(" ", ""));
            quebecConfirmedCase = reduceConfirmedNumber(9) + reduceConfirmedNumber(16) + reduceConfirmedNumber(17);
            quebecDeathCase = reduceDeathsNumber(9) + reduceDeathsNumber(16) + reduceDeathsNumber(17);
        }
        if(i !== 16 && i !==17)
            data = {...data, [name] :  {"confirmed": quebecConfirmedCase, "deaths" : quebecDeathCase}}
    }
    return data;
}

export const fetchMontrealCases = async () => {
    const result = await fetch(`${corsAnywhere}${parseHubMontrealLink}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(response => (
        response.json()
    ));

    let data = {"Total" : {"confirmed" : result.montrealCases[34].confirmed, "recovered": "NA", "deaths" : result.totalDeath }};
    for(let i = 0; i < (result.montrealCases).length - 2 ; i++){
        let montrealCase = result.montrealCases[i];
        data = {...data, [montrealCase.name] :  {"confirmed": (montrealCase.confirmed.includes("< ") ? montrealCase.confirmed.split("< ")[1] : montrealCase.confirmed)}}
    }
    
   return data;
}

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
        alteredData = {...alteredData, [prov.provinceState] : {confirmed : prov.confirmed, deaths : prov.deaths, recovered: prov.recovered} }
    )
    return alteredData;
}