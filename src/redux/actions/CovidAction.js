import {COVID_TYPE} from "./types";
import {fetchAllCountries,fetchDetailedNumberOfCasesByCountry,fetchQuebecCases,fetchMontrealCases,fetchGraphData,fetchQuebecGraph,fetchMontrealGraph} from "../../Components/covid/coronavirusAPI";

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

const setGraphData = graphData => ({
        type : COVID_TYPE.SET_GRAPH_DATA,
        graphData
});

const setQuebecGraphData = quebecGraphData => ({
    type : COVID_TYPE.SET_QUEBEC_GRAPH_DATA,
    quebecGraphData
});

const setMontrealGraphData = montrealGraphData => ({
    type : COVID_TYPE.SET_MONTREAL_GRAPH_DATA,
    montrealGraphData
});

export const fetchQuebecGraphData = () => async dispatch => {
    Promise.resolve(await fetchQuebecGraph()).then(res => {
        dispatch(setQuebecGraphData({loaded: true, allData: res}));
    });
};

export const fetchMontrealGraphData = () => async dispatch => {
    Promise.resolve(await fetchMontrealGraph()).then(res => {
        dispatch(setMontrealGraphData({loaded: true, allData: res}));
    });
};

export const fetchCountryGraphData = (selectedCountry) => async dispatch => {
    Promise.resolve(await fetchGraphData(selectedCountry)).then(res => {
        dispatch(setGraphData({loaded: true, data: res}));
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