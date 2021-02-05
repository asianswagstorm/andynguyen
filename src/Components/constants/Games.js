export const score_label = (type) => [  { label: (type ==="tictactoe") ? 'X' : 'Red', id: "user-label"},
                                        {    label: (type ==="tictactoe") ? 'O' : 'Yellow', id: "computer-label"}];



export const playerSymbols = { userLabel : 'X', computerLabel : 'O' };

export const playerPicker = [
    {isComp : false, name: "Human", id: "H-opponent"},
    {isComp : true, name: "Computer", id: "C-opponent"}
];