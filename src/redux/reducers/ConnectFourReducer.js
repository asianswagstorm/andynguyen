import {connectFourBoard} from "../../Components/constants/ConnectFourConstants";

const defaultConnectFourStates = {
    connectFourBoard
};

const DEFAULT_STATES = {defaultConnectFourStates: {...defaultConnectFourStates}};

const connectFourReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
    
        case "SET_CONNECT_FOUR_TABLE":  
            return {
                ...state,
                defaultConnectFourStates: {...state.defaultConnectFourStates, connectFourBoard : action.connectFourBoard}
            };
        default:
            return state; //save state
    };
};

export default connectFourReducer 