import {COVID_TYPE} from "./types";
import {fetchCoronaVirusCases,updateCanadianGraph,updateRegionGraph} from "../../Components/covid/coronavirusAPI";

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

export const updateWorldGraph = (worldCases, country) => async dispatch => {
    const countryGraph = await fetchCoronaVirusCases(country);
    const graphData = countryGraph.graph[country] ? countryGraph.graph[country] : countryGraph.graph;
    let newWorldCases = {...worldCases, graph: {...worldCases.graph, [country]: {graph: graphData, loaded: true}}}
    dispatch(setWorldCases(newWorldCases));
}

const canada = "Canada";
const quebec = "Quebec";

export const fetchCanadaCases = (apiLoaded,canadianGraphLoaded) => async dispatch => {
    const canadaCase = await fetchCoronaVirusCases(canada);
    dispatch(setCanadaCases(canadaCase));
    dispatch(setAPILoaded(apiLoaded, canada));
    const newGraphLoaded = {...canadianGraphLoaded, canada: true};
    dispatch(updateCanadianGraphLoaded(newGraphLoaded));
}

export const fetchQuebecCasesAction = (canadaCases,apiLoaded) => async dispatch => {
        if(!apiLoaded.Quebec){
            let quebecCase =  await updateCanadianGraph(canadaCases.records,canada,quebec); // canadaCases.graph.Quebec empty
        
            dispatch(setQuebecCases(quebecCase));
            dispatch(setAPILoaded(apiLoaded, quebec)); //DNW
            //dispatch(modifyCanadianCase(canadaCases,quebecCase.records.Total));
        }
}

export const fetchMontrealCasesAction = (apiLoaded) => async dispatch => {
    const montrealCase = await fetchCoronaVirusCases("montreal");
    dispatch(setMontrealCases(montrealCase));
    dispatch(setAPILoaded(apiLoaded, "Montreal"));
}

const updateCanadianGraphLoaded = (canadianGraphLoaded) => ({
    type: COVID_TYPE.CANADIAN_GRAPH_LOADED,
    canadianGraphLoaded
});

export const updateCanadianRegionGraph2 = (quebecCases, country, state,region) => async dispatch => {
    const {records} = quebecCases;
    const updatedGraphData = await updateRegionGraph(records,country,state, region);
    const newQuebecCases = {...quebecCases, graph: {...quebecCases.graph, [region] : updatedGraphData} };
    dispatch(setQuebecCases(newQuebecCases));
};

export const updateCanadianRegionGraph = (canadianGraphLoaded,canadaCases, country, state,apiLoaded) => async dispatch => {
    const {records} = canadaCases;
    const updatedGraphData = await updateCanadianGraph(records,country,state);
    const newCanadianCases = {...canadaCases, graph: {...canadaCases.graph, [state] : updatedGraphData} };
    if(state === quebec){
        dispatch(fetchQuebecCasesAction(newCanadianCases,apiLoaded));
    }
    dispatch(setCanadaCases(newCanadianCases));
    const newGraphLoaded = {...canadianGraphLoaded, [state]: true};
    dispatch(updateCanadianGraphLoaded(newGraphLoaded));
};