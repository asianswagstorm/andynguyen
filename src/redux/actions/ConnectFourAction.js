import {CONNECTFOUR_TYPE} from "./types";
import {connectFourBoard} from "../../Components/constants/ConnectFourConstants";
export const setConnectFourBoard = (connectFourBoard) => ({

    type: CONNECTFOUR_TYPE.SET_CONNECT_FOUR_TABLE,
    connectFourBoard 
});

export const resetConnectFour = () => ({
    type: CONNECTFOUR_TYPE.RESET_CONNECT_FOUR_GAME,
    connectFourBoard : [...connectFourBoard]
});