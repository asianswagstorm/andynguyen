const covid19GlobalLink = "https://covid19.mathdro.id/api/";
const covid19ByCountryAPILINK =`${covid19GlobalLink}countries/`;

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