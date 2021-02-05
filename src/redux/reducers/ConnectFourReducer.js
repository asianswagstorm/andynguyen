/**
 * column x row 
 * Clean this up by using a create object. 
 */
const connectFourBoard = [
    {columnNumber : 0 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 1 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 2 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 3 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 4 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 5 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 6 , rowArrays: ["","","","","",""]}
];

export const defaultConnectFourStates = {
    connectFourBoard,
    rowIndexByColumn : [5,5,5,5,5,5,5],
    computerCurrentColumn : 0, //for testing purposes.
    availableCols: [0,1,2,3,4,5,6] 
};

const DEFAULT_STATES = {defaultConnectFourStates: {...defaultConnectFourStates}};

const connectFourReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
    
        case "SET_CONNECT_FOUR_TABLE":  
            return {
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, connectFourBoard : action.connectFourBoard}
            };
        case "RESET_CONNECT_FOUR_GAME":
            return {
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, connectFourBoard : action.connectFourBoard, rowIndexByColumn: [...action.rowIndexByColumn],
                                           computerCurrentColumn: 0  }
            };
        case "SET_ROW_FOR_COLUMN":
            return{
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, rowIndexByColumn : action.rowIndexByColumn}
            };
        case "UPDATE_COMPUTER_COLUMN": 
            return {
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, computerCurrentColumn : action.computerCurrentColumn}
            };
        case "UPDATE_AVAILABLE_COLUMNS": 
            return {
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, availableCols : action.availableCols}
            };
        default:
            return state; //save state
    }
};

export default connectFourReducer 