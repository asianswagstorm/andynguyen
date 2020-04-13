const covid19ByCountryAPILINK ="https://covid19.mathdro.id/api/countries/";

export const fetchNumberOfCasesByCountry = async (country) => {

return await fetch(`${covid19ByCountryAPILINK}${country}`).then(response => (
    response.json()
))

}


export const fetchDetailedNumberOfCasesByCountry = async (country) => {
    let alteredData = {};

    const result = await fetch(`${covid19ByCountryAPILINK}${country}/confirmed`).then(response => (
        response.json()
    ))    

    result.forEach(prov => 
        alteredData = {...alteredData, [prov.provinceState] : {confirmed : prov.confirmed, deaths : prov.confirmed, recovered: prov.recovered} }
    )
    return alteredData;
}