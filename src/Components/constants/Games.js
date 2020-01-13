export const TicTacToeWinCombo = array => [   
    [array[0][0], array[0][1], array[0][2]], //row 1 horizontal
    [array[1][0], array[1][1], array[1][2]], //row 2 horizontal
    [array[2][0], array[2][1], array[2][2]], //row 3 horizontal
    [array[0][0], array[1][0], array[2][0]], //col 1 vertical
    [array[0][1], array[1][1], array[2][1]], //col 2 vertical
    [array[0][2], array[1][2], array[2][2]], //col 3 vertical
    [array[0][0], array[1][1], array[2][2]], //col 1 diagonal
    [array[0][2], array[1][1], array[2][0]] //col 3 diagonal
]; 

//remove these index
export const tictactoe_boxes = [ //overwritten
    ['','',''],
    ['','',''],
    ['','','']
];

export const tictactoe_score_label = [  { label: 'X', id: "user-label"},
                                        {    label: 'O', id: "computer-label"}];

export const playerSymbols = { userLabel : 'X', computerLabel : 'O' };

export const playerPicker = [
    {isComp : false, name: "Human", id: "H-opponent"},
    {isComp : true, name: "Computer", id: "C-opponent"}
];