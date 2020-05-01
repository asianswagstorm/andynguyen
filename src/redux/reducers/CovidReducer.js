export const defaultCovidStates = {
    worldCases  : {population: "7,594,000,000", confirmed: 0, recovered: 0, deaths: 0 },
    canadaCases : {population: "38,844,182", confirmed: 0, recovered: 0, deaths: 0 },
    quebecCases : {population: "8,485,400", confirmed: 0, recovered: 0, deaths: 0 },
    montrealCases : {population: "1,784,694", confirmed: 0, recovered: 0, deaths: 0 },
    apiLoaded : {   World : false,
                    Canada : false,
                    Quebec : false,
                    Montreal : false
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
        default:
            return state; 
    } 
};

export default covidReducer 