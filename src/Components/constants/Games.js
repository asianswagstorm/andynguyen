export const TicTacToeWinCombo = [   [0, 1, 2],
[0, 4, 8],
[0, 3, 6],
[1, 4, 7],
[2, 4, 6],
[2, 5, 8],
[3, 4, 5],
[6, 7 , 8]  ]; 

export const tictactoe_boxes = [ 
    [{index:1, value: ''},{index:2, value: ''},{index:3, value: ''}],
    [{index:4, value: ''},{index:5, value: ''},{index:6, value: ''}],
    [{index:7, value: ''},{index:8, value: ''},{index:9, value: ''}]
];

export const tictactoe_score_label = [  { label: 'X', id: "user-label"},
                                        {    label: 'O', id: "computer-label"}];

export const playerSymbols = { userLabel : 'X', computerLabel : 'O' };

export const playerPicker = [
    {isComp : false, name: "Human", id: "H-opponent"},
    {isComp : true, name: "Computer", id: "C-opponent"}
];