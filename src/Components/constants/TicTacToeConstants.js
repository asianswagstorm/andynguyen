//Clean This Up
export const TicTacToeWinCombo = array => [   
    [array[0][0], array[0][1], array[0][2]], //row 1 horizontal 0
    [array[1][0], array[1][1], array[1][2]], //row 2 horizontal 1
    [array[2][0], array[2][1], array[2][2]], //row 3 horizontal 2 
    [array[0][0], array[1][0], array[2][0]], //col 1 vertical 3
    [array[0][1], array[1][1], array[2][1]], //col 2 vertical 4
    [array[0][2], array[1][2], array[2][2]], //col 3 vertical 5
    [array[0][0], array[1][1], array[2][2]], //col 1 diagonal 6
    [array[0][2], array[1][1], array[2][0]] //col 3 diagonal 7
]; 

//order of win combo matters.
export const winCombos = [ //if player 1 has any of these , pop the combo
    [[0,0],[0,1],[0,2]],// 0
    [[1,0],[1,1],[1,2]],// 1
    [[2,0],[2,1],[2,2]],// 2
    [[0,0],[1,0],[2,0]],// 3
    [[0,1],[1,1],[2,1]],// 4
    [[0,2],[1,2],[2,2]],// 5
    [[0,0],[1,1],[2,2]],// 6
    [[0,2],[1,1],[2,0]] // 7
];

//order matters 
export const winIndexs = [
    {index1: [0,0], index2: [0,1], index3: [0,2]},
    {index1: [1,0], index2: [1,1], index3: [1,2]},
    {index1: [2,0], index2: [2,1], index3: [2,2]},
    {index1: [0,0], index2: [1,0], index3: [2,0]},
    {index1: [0,1], index2: [1,1], index3: [2,1]},
    {index1: [0,2], index2: [1,2], index3: [2,2]},
    {index1: [0,0], index2: [1,1], index3: [2,2]},
    {index1: [0,2], index2: [1,1], index3: [2,0]}
];

export const tictactoe_boxes = [ //overwritten
    ['','',''],
    ['','',''],
    ['','','']
];

