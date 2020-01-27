/**
 * column x row 
 * //An array of linked lists ???  
 */
export const connectFourBoard = [
    {columnNumber : 0 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 1 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 2 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 3 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 4 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 5 , rowArrays: ["","","","","",""]}, 
    {columnNumber : 6 , rowArrays: ["","","","","",""]}
];
   

//[column,row] 
export const boardIndex = [
    [[0,0], [1,0], [2,0], [3,0] , [4,0], [5,0], [6,0]],
    [[0,1], [1,1], [2,1], [3,1] , [4,1], [5,1], [6,1]],
    [[0,2], [1,2], [2,2], [3,2] , [2,4], [5,2], [6,2]],
    [[0,3], [1,3], [2,3], [3,3] , [3,4], [5,2], [6,3]],
    [[0,4], [1,4], [2,4], [3,4] , [4,4], [5,2], [6,4]],
    [[0,5], [1,5], [2,5], [3,5] , [5,4], [5,2], [6,5]],
];

export const rowIndexByColumn = [5,5,5,5,5,5,5];
/**
 * unshift
 * column 0 :[]
 * column 1 :[]
 * column 2 :[]
 * column 3 :[]
 * column 4 :[]
 * column 5 :[]
 * column 6 :[]
 */

 //column 0 :["","","","","",""] , pop then push