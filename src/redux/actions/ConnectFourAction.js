import {CONNECTFOUR_TYPE} from "./types";
import {connectFourBoard,rowIndexByColumn} from "../../Components/constants/ConnectFourConstants";
export const setConnectFourBoard = (connectFourBoard) => ({

    type: CONNECTFOUR_TYPE.SET_CONNECT_FOUR_TABLE,
    connectFourBoard 
});

export const resetConnectFour = () => ({
    type: CONNECTFOUR_TYPE.RESET_CONNECT_FOUR_GAME,
    connectFourBoard : [...connectFourBoard],
    rowIndexByColumn : [...rowIndexByColumn]
});

export const setRowNumberByColumn = rowIndexByColumn => ({
    type: CONNECTFOUR_TYPE.SET_ROW_FOR_COLUMN,
    rowIndexByColumn
});

//UPDATE_COMPUTER_COLUMN
export const updateComputerColumn = computerCurrentColumn => ({
    type: CONNECTFOUR_TYPE.UPDATE_COMPUTER_COLUMN,
    computerCurrentColumn
});
//UPDATE_AVAILABLE_COLUMNS
export const updateAvailableColumns = availableCols => ({
    type: CONNECTFOUR_TYPE.UPDATE_AVAILABLE_COLUMNS,
    availableCols
});