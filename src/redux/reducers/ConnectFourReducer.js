import {connectFourBoard,rowIndexByColumn} from "../../Components/constants/ConnectFourConstants";

const defaultConnectFourStates = {
    connectFourBoard,
    rowIndexByColumn,
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
                defaultConnectFourStates: {...state.defaultConnectFourStates, connectFourBoard : action.connectFourBoard, rowIndexByColumn: [...rowIndexByColumn],
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
            return {...state}; //save state
    }
};

export default connectFourReducer 