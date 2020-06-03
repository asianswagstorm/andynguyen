export const defaultCovidStates = {
    worldCases  : {},
    canadaCases : {},
    quebecCases : {},
    montrealCases : {},
    selectedCountry : "Canada",
    graphData : {loaded: false, data: {newCase : [] , newDeath: [], totalCases: [], totalDeath: [] }},
    quebecGraphData : {loaded: false, allData : {}},
    montrealGraphData : {loaded: false, allData : {}},
    apiLoaded : {   World : false,
                    Canada : false,
                    Quebec : false,
                    Montreal : false
                }
}

const DEFAULT_STATES = {defaultCovidStates: {...defaultCovidStates}};
const covidReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'SET_GRAPH_DATA':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, graphData: action.graphData}
            };    
        case 'SET_QUEBEC_GRAPH_DATA':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, quebecGraphData: action.quebecGraphData}
            };  
        case 'SET_MONTREAL_GRAPH_DATA':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, montrealGraphData: action.montrealGraphData}
            };  
        case 'SET_WORLD_CASES':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, worldCases: action.worldCases}
            };
        case 'SET_CANADA_CASES':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, canadaCases: action.canadaCases}
            }; 
        case 'SET_QUEBEC_CASES':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, quebecCases: action.quebecCases}
            };
        case 'SET_MONTREAL_CASES':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, montrealCases: action.montrealCases }
            };
        case 'MODIFY_CANADIAN_CASES':
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, canadaCases: action.canadaCases }
            };
        case 'SET_API_LOADED':
            return {
                ...state, 
                defaultCovidStates: {...state.defaultCovidStates, apiLoaded: action.apiLoaded }
            };
        default:
            return state; 
    } 
};

export default covidReducer 