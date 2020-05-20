export const defaultCovidStates = {
    worldCases  : {},
    canadaCases : {},
    quebecCases : {},
    montrealCases : {},
    selectedCountry : "Canada",
    newCase: {country: "Canada", loaded: false , data: []},
    newDeath: {country: "Canada",loaded: false , data: []},
    totalCases: {country: "Canada",loaded: false , data: []},
    totalDeath: {country: "Canada",loaded: false , data: []},
    apiLoaded : {   World : false,
                    Canada : false,
                    Quebec : false,
                    Montreal : false
                }
}

const DEFAULT_STATES = {defaultCovidStates: {...defaultCovidStates}};
const covidReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'SET_COUNTRY_NEW_CASES': 
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, newCase: action.newCase}
            };
        case 'SET_COUNTRY_NEW_DEATHS': 
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, newDeath: action.newDeath}
            };
        case 'SET_COUNTRY_TOTAL_CASES': 
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, totalCases: action.totalCases}
            };
        case 'SET_COUNTRY_TOTAL_DEATHS': 
            return {
                ...state,
                defaultCovidStates: {...state.defaultCovidStates, totalDeath: action.totalDeath}
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