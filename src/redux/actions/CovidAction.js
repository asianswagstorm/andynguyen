import {COVID_TYPE} from "./types";
import {fetchCoronaVirusCases} from "../../Components/covid/coronavirusAPI";

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
    const worldCase = await fetchCoronaVirusCases("world");
    dispatch(setWorldCases(worldCase));
    dispatch(setAPILoaded(apiLoaded, "World"));
}

const modifyCanadianCase = (canadaCases, newQuebec) => ({
    type : COVID_TYPE.MODIFY_CANADIAN_CASES,
    canadaCases :   {   ...canadaCases, records: { ...canadaCases.records,  Quebec: {    ...canadaCases.records.Quebec, 
                                                                                        confirmed: newQuebec.confirmed,
                                                                                        deaths: newQuebec.deaths,
                                                                                        hospitalized : newQuebec.hospitalized,
                                                                                        intensiveCare : newQuebec.intensiveCare
                                                                                    }
                                            }
                    }
});

export const fetchCanadaCases = (apiLoaded) => async dispatch => {
    const canadaCase = await fetchCoronaVirusCases("Canada");
    dispatch(setCanadaCases(canadaCase));
    dispatch(setAPILoaded(apiLoaded, "Canada"));
}

export const fetchQuebecCasesAction = (canadaCases,apiLoaded) => async dispatch => {
    const quebecCase = await fetchCoronaVirusCases("quebec");
    dispatch(setQuebecCases(quebecCase));
    dispatch(modifyCanadianCase(canadaCases,quebecCase.records.Total));
    dispatch(setAPILoaded(apiLoaded, "Quebec"));
}

export const fetchMontrealCasesAction = (apiLoaded) => async dispatch => {
    const montrealCase = await fetchCoronaVirusCases("montreal");
    dispatch(setMontrealCases(montrealCase));
    dispatch(setAPILoaded(apiLoaded, "Montreal"));
}