import {COVID_TYPE} from "./types";
import {fetchAllCountries,fetchDetailedNumberOfCasesByCountry,fetchQuebecCases,fetchMontrealCases,fetchGraphData} from "../../Components/covid/coronavirusAPI";

const setWorldCases = (worldCases) => ({
    type : COVID_TYPE.SET_WORLD_CASES,
    worldCases
});

const setCanadaCases = (canadaCases) => ({
    type : COVID_TYPE.SET_CANADA_CASES,
    canadaCases
});

const setQuebecCases = (quebecCases) => ({
    type : COVID_TYPE.SET_QUEBEC_CASES,
    quebecCases
});

const setMontrealCases = (montrealCases) => ({
    type : COVID_TYPE.SET_MONTREAL_CASES,
    montrealCases
});

const setAPILoaded = (apiLoaded,apiType) => ({
    type : COVID_TYPE.SET_API_LOADED,
    apiLoaded : {...apiLoaded, [apiType] : true}
});

export const fetchWorldCases = (apiLoaded) => async dispatch => {
    const worldCase = await fetchAllCountries();
    dispatch(setWorldCases(worldCase));
    dispatch(setAPILoaded(apiLoaded, "World"));
}

const modifyCanadianCase = (canadaCases, newQuebec) => ({
    type : COVID_TYPE.MODIFY_CANADIAN_CASES,
    canadaCases : {...canadaCases, Quebec: {locationName: "Quebec", ...newQuebec.Total}}
});

const setNewCases = newCase => ({
    type : COVID_TYPE.SET_COUNTRY_NEW_CASES,
    newCase
});

const setNewDeaths = newDeath => ({
    type : COVID_TYPE.SET_COUNTRY_NEW_DEATHS,
    newDeath
});

const setTotalCases = totalCases => ({
    type : COVID_TYPE.SET_COUNTRY_TOTAL_CASES,
    totalCases
});

const setTotalDeaths = totalDeath => ({
    type : COVID_TYPE.SET_COUNTRY_TOTAL_DEATHS,
    totalDeath
});

export const fetchCountryGraphData = (selectedCountry,caseType) => async dispatch => {
    
    Promise.resolve(await fetchGraphData(selectedCountry, caseType)).then(res => {
        let data =  {country: selectedCountry, loaded: true, data : res }
        
        const toReturn = {
            "newCase"    : setNewCases(data),
            "newDeath"  : setNewDeaths(data), 
            "totalCases" : setTotalCases(data),
            "totalDeath" : setTotalDeaths(data)
        };
        return dispatch(toReturn[caseType]);
    });
};


export const fetchCanadaCases = (apiLoaded) => async dispatch => {
    const canadaCase = await fetchDetailedNumberOfCasesByCountry("Canada")
    dispatch(setCanadaCases(canadaCase));
    dispatch(setAPILoaded(apiLoaded, "Canada"));
}

export const fetchQuebecCasesAction = (canadaCases,apiLoaded) => async dispatch => {
    const quebecCase = await fetchQuebecCases();
    dispatch(setQuebecCases(quebecCase));
    dispatch(modifyCanadianCase(canadaCases,quebecCase));
    dispatch(setAPILoaded(apiLoaded, "Quebec"));
}

export const fetchMontrealCasesAction = (apiLoaded) => async dispatch => {
    const montrealCase = await fetchMontrealCases();
    dispatch(setMontrealCases(montrealCase));
    dispatch(setAPILoaded(apiLoaded, "Montreal"));
}