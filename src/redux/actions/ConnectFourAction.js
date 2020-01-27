import {CONNECTFOUR_TYPE} from "./types";

export const setConnectFourBoard = (connectFourBoard) => ({

    type: CONNECTFOUR_TYPE.SET_CONNECT_FOUR_TABLE,
    connectFourBoard
});

