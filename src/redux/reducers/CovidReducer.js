export const defaultCovidStates = {
    worldCases  : {},
    canadaCases : {},
    quebecCases : {},
    montrealCases : {},
    selectedCountry : "Canada",
    apiLoaded : {   World : false,
                    Canada : false,
                    Quebec : false,
                    Montreal : false
                },
    canadianGraphLoaded : {
        "Canada" : false,
        "Quebec" : false,
        "Ontario" : false,
        "Alberta" : false,
        "British Columbia" : false,
        "Nova Scotia" : false,
        "Saskatchewan" : false,
        "Manitoba" : false,
        "Newfoundland and Labrador" : false,
        "New Brunswick" : false,
        "Prince Edward Island": false,
        "Yukon": false,
        "Northwest Territories": false,
        "Nunavut": false
    }
}

const DEFAULT_STATES = {defaultCovidStates: {...defaultCovidStates}};
const covidReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
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
        case 'CANADIAN_GRAPH_LOADED':
            return {
                ...state, 
                defaultCovidStates: {...state.defaultCovidStates, canadianGraphLoaded: action.canadianGraphLoaded }
            };
        default:
            return state; 
    } 
};

export default covidReducer 