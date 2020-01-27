import {connectFourBoard,rowIndexByColumn} from "../../Components/constants/ConnectFourConstants";

const defaultConnectFourStates = {
    connectFourBoard,
    rowIndexByColumn
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
                defaultConnectFourStates: {...state.defaultConnectFourStates, connectFourBoard : action.connectFourBoard, rowIndexByColumn: [...rowIndexByColumn]}
            };
        case "SET_ROW_FOR_COLUMN":
            return{
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, rowIndexByColumn : action.rowIndexByColumn}
            };
        default:
            return {...state}; //save state
    }
};

export default connectFourReducer 