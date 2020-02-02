import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/ConnectFour.css";
import GamesHead from "./GamesHead";
import { popUpNotification } from "../constants/HelperFunction/Functions";

//to do: highlight the winning cells  
class ConnectFour extends Component {

    componentDidMount = () => {
        const {dispatch} = this.props;
        const {setGameType} = this.props.action_props.games_action;
        dispatch(setGameType("connectFour"));
      };

    checkIsTie = () => {
        let countNegativeIndex = 0;
        [...this.props.rowIndexByColumn].forEach(element => {
            // console.log("element is", element);
            if(element === -1)
                countNegativeIndex = countNegativeIndex+1;
        });
        // console.log(countNegativeIndex)
        return countNegativeIndex === 7;
    };

    checkDirection = (position, direction) => {
        let copyConnectFour = [...this.props.connectFourBoard];
        let isWin = false;
        const row = position.row;
        const column = position.column;
        
        const playerUnit = (this.props.player_one_turn === true) ? "p1" : "p2";
        let truthyArray = [];
        
        //(-1,+2)(second position), (-2+1) (third position) //positions not checked 
        const minusOneTwoPlusOneTwo = (direction) => {
           const dataToReturn = {
               "horizontal": (  
                                copyConnectFour[column-1] &&
                                copyConnectFour[column+1] && 
                                copyConnectFour[column+2] && 
                                copyConnectFour[column-1].rowArrays[row] === playerUnit &&
                                copyConnectFour[column+1].rowArrays[row] === playerUnit &&
                                copyConnectFour[column+2].rowArrays[row] === playerUnit),
               
                "diagonal_left": (  
                                    copyConnectFour[column-1] && 
                                    copyConnectFour[column+1] && 
                                    copyConnectFour[column+2] &&
                                    copyConnectFour[column-1].rowArrays[row+1] &&
                                    copyConnectFour[column+1].rowArrays[row-1] &&
                                    copyConnectFour[column+2].rowArrays[row-2] &&
                                    copyConnectFour[column-1].rowArrays[row+1]=== playerUnit &&
                                    copyConnectFour[column+1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column+2].rowArrays[row-2] === playerUnit),
               
                "diagonal_right":(  copyConnectFour[column+1] &&
                                    copyConnectFour[column-2] &&
                                    copyConnectFour[column-1] &&
                                    copyConnectFour[column-1].rowArrays[row-1] &&
                                    copyConnectFour[column+1].rowArrays[row+1] &&
                                    copyConnectFour[column-2].rowArrays[row-2] &&
                                    copyConnectFour[column+1].rowArrays[row+1] === playerUnit &&
                                    copyConnectFour[column-1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row-2] === playerUnit)
           }; 
           return dataToReturn[direction];
        }; 
        
        //(+1,-2) (third position) , (+2-1) (second position)
        const plusOneTwoMinusOneTwo = (direction) => {
            const dataToReturn = {
                "horizontal":   (   copyConnectFour[column-1] &&
                                    copyConnectFour[column-2] && 
                                    copyConnectFour[column+1] && 
                                    copyConnectFour[column+1].rowArrays[row] === playerUnit &&
                                    copyConnectFour[column-1].rowArrays[row] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row] === playerUnit),
                
                "diagonal_left": (  copyConnectFour[column-1] && 
                                    copyConnectFour[column-2] &&
                                    copyConnectFour[column+1] && 
                                    copyConnectFour[column+1].rowArrays[row-1] && 
                                    copyConnectFour[column-1].rowArrays[row+1] &&
                                    copyConnectFour[column-2].rowArrays[row+2] &&
                                    copyConnectFour[column+1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column-1].rowArrays[row+1] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row+2] === playerUnit),
                //something is missing
                "diagonal_right":(  copyConnectFour[column-1] &&
                                    copyConnectFour[column+2] &&
                                    copyConnectFour[column+1] &&
                                    copyConnectFour[column+1].rowArrays[row+1] &&
                                    copyConnectFour[column+1].rowArrays[row+1] === playerUnit &&
                                    copyConnectFour[column-1].rowArrays[row-1] &&
                                    copyConnectFour[column+2].rowArrays[row+2] &&
                                    copyConnectFour[column-1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column+2].rowArrays[row+2] === playerUnit)
            };    
            return dataToReturn[direction];
        };

        const directionsPlusMinus = (arithmetic_expression, direction, column,row) => {

            const inCommonColumnAdd = {
                index1: column+1,
                index2: column+2,
                index3: column+3
            };

            const inCommonColumnSubstract = {
                index1: column-1,
                index2: column-2,
                index3: column-3
            };

            const columnsToReturn = {
                "addition" : {
                    "horizontal": {...inCommonColumnAdd},
                    "vertical" : {
                        index1: column,
                        index2: column,
                        index3: column
                    },
                    "diagonal_left" : {...inCommonColumnSubstract},
                    "diagonal_right" : {...inCommonColumnAdd}
                },
                "substraction" : {
                    "horizontal": {...inCommonColumnSubstract},
                    "vertical" : {
                        index1: column,
                        index2: column,
                        index3: column
                    },
                    "diagonal_left" : {...inCommonColumnAdd},
                    "diagonal_right" : {...inCommonColumnSubstract}
                }
            };

            const diagonalADDRowCommon = {
                index1: row+1,
                index2: row+2,
                index3: row+3
            };

            const diagonalSUBSTRACTRowCommon = {
                index1: row-1,
                index2: row-2,
                index3: row-3
            };

            const rowsToReturn = {
              
                "addition" : {
                    "horizontal" : {
                        index1: row,
                        index2: row,
                        index3: row
                    },
                    "vertical" : {...diagonalADDRowCommon},
                    "diagonal_left" : {
                        ...diagonalADDRowCommon
                    },
                    "diagonal_right" : {
                        ...diagonalADDRowCommon
                    }
                },
                
                "substraction" :  {"horizontal" : {
                                    index1: row,
                                    index2: row,
                                    index3: row
                                },
                                "diagonal_left" : {
                                    ...diagonalSUBSTRACTRowCommon
                                },
                                "diagonal_right" : {
                                    ...diagonalSUBSTRACTRowCommon
                                }
                }
            };
 
            return (
                copyConnectFour[column].rowArrays[row] === playerUnit &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index1] && 
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index1].rowArrays[rowsToReturn[arithmetic_expression][direction].index1] &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index1].rowArrays[rowsToReturn[arithmetic_expression][direction].index1] === playerUnit &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index2] &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index2].rowArrays[rowsToReturn[arithmetic_expression][direction].index2] &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index2].rowArrays[rowsToReturn[arithmetic_expression][direction].index2] === playerUnit &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index3] &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index3].rowArrays[rowsToReturn[arithmetic_expression][direction].index3] &&
                copyConnectFour[columnsToReturn[arithmetic_expression][direction].index3].rowArrays[rowsToReturn[arithmetic_expression][direction].index3] === playerUnit
            );
        };
                if( ((direction === "horizontal") && //fix horzontal is wrong
                    ( //i+0, i-1, i+2,i+3

                    (directionsPlusMinus("addition","horizontal",column,row)) || //first position
                   
                    (minusOneTwoPlusOneTwo("horizontal")) || //second position 1, third position 2
                      
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row] === playerUnit && //here is wrong
                     minusOneTwoPlusOneTwo("horizontal"))  || //third position 1
                     
                    (plusOneTwoMinusOneTwo("horizontal")) ||//second position 3, third position 4
                    
                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row] === playerUnit && 
                     plusOneTwoMinusOneTwo("horizontal")) ||  //second position 4
              
                    ((directionsPlusMinus("substraction","horizontal",column,row)))  //last position 
                    )
                    ) || 

                   (direction === "vertical" && directionsPlusMinus("addition", "vertical",column,row)) ||  //first position
                   
                   ((direction === "diagonal_left") && 
                   
                   (
                    (directionsPlusMinus("addition", "diagonal_left",column,row)) || //first position
                    //second position 3, third position 4 
                    (minusOneTwoPlusOneTwo("diagonal_left")) ||
                    //second position 4
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row+2] && copyConnectFour[column-2].rowArrays[row+2] === playerUnit &&
                     minusOneTwoPlusOneTwo("diagonal_left")) || 
                    //second position 1, third position 2
                    (plusOneTwoMinusOneTwo("diagonal_left")) ||
                    //third position 1
                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row-2] && copyConnectFour[column+2].rowArrays[row-2]  === playerUnit && 
                    plusOneTwoMinusOneTwo("diagonal_left")) ||
                    (directionsPlusMinus("substraction", "diagonal_left",column,row))  //last position 
                   )
                   ) || 
                    //WRONG!! because of or.
                   ((direction === "diagonal_right") && 
                   //CHANGE minusOneTwoPlusOneTwo and plusOneTwoMinusOneTwo
                   (
                     (directionsPlusMinus("addition","diagonal_right",column,row))                
                     || //first position
                    //One of these is causing issues!!!!!! 
                    // second position 1, third position 2
                    (minusOneTwoPlusOneTwo("diagonal_right")) ||
                    //second position 4
                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row+2] && copyConnectFour[column+2].rowArrays[row+2]  === playerUnit &&
                     minusOneTwoPlusOneTwo("diagonal_right"))||
                    //second position 3, third position 4 
                    (plusOneTwoMinusOneTwo("diagonal_right")) ||
                    //third position 1
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row-2] && copyConnectFour[column-2].rowArrays[row-2] === playerUnit &&
                     plusOneTwoMinusOneTwo("diagonal_right")) ||

                    (directionsPlusMinus("substraction","diagonal_right",column,row))                  //last position 
                   )) ) {
                        isWin = true;
                        }
                return isWin;
            };

    /**
     * @param position Object - position is an object containing the column and row of the current token.
     * This method checks if there is a horizontal win condition.
     * Not checking every position, only checking from my latest position.
     */
    checkHorizontalWin = (position) => this.checkDirection(position, "horizontal");
    checkVerticalWin = (position) => this.checkDirection(position, "vertical");
    checkLeftDiagonal = (position) => this.checkDirection(position, "diagonal_left");
    checkRightDiagonal = (position) => this.checkDirection(position, "diagonal_right");

    checkWin = (position) => this.checkHorizontalWin(position) || this.checkVerticalWin(position) || this.checkLeftDiagonal(position) || this.checkRightDiagonal(position);
    
    //Todo pick best positions for computer
    computerTurn = () => { //availableCols is array of available col index
        const {dispatch} = this.props;
        const {updateAvailableColumns} = this.props.action_props.connect_four_action;
        const {setGameOver} = this.props.action_props.games_action;
        let computerColumn;
        let isValidColumn = false;
        while(isValidColumn === false && this.props.gameOver === false){
            computerColumn = Math.floor(Math.random() * [...this.props.availableCols].length)//this.props.computerCurrentColumn;
            if([...this.props.rowIndexByColumn][computerColumn] >= 0)
                isValidColumn = true;
            else{
                let newAvailableCol = [...this.props.availableCols].filter(element => element !== computerColumn);
                if(newAvailableCol.length === 0){
                    dispatch(setGameOver(true));
                    isValidColumn = true;
                }else{
                    dispatch(updateAvailableColumns(newAvailableCol));
               }
            }
        };

        return computerColumn;
    };

    updateBoard = async (column) => {
        const {dispatch} = this.props;
        const {setCurrentPlayer, setGameMessage,setGameOver,setPlayer1Score,setPlayer2Score,setTie} = this.props.action_props.games_action;
        const {setRowNumberByColumn,setConnectFourBoard} = this.props.action_props.connect_four_action;
        
        let copyConnectFour = [...this.props.connectFourBoard];
        let copyRowByColumn = [...this.props.rowIndexByColumn];

        if(copyRowByColumn[column] >= 0) {
            copyConnectFour[column].rowArrays[copyRowByColumn[column]] = (this.props.player_one_turn === true) ? "p1" : "p2";
            await dispatch(setConnectFourBoard(copyConnectFour));
            const position = {column, row: copyRowByColumn[column]};
            if(this.checkWin(position) === true){
                await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} Wins.`));
                await (this.props.player_one_turn === true) ? dispatch(setPlayer1Score(this.props.player1_score + 1)) : dispatch(setPlayer2Score(this.props.player2_score + 1));
                await dispatch(setGameOver(true));
            };

            if(this.props.gameOver === false){
                copyRowByColumn[column] =  (copyRowByColumn[column] - 1);
                await dispatch(setRowNumberByColumn(copyRowByColumn));
              
                if(this.checkIsTie() === true){
                    await dispatch(setGameMessage("It's a tie, please reset the game to start a new round."));
                    await dispatch(setTie(true));
                    await dispatch(setGameOver(true));
                };

                if(this.props.gameOver === false){
                    await dispatch(setCurrentPlayer(!this.props.player_one_turn)) 
                    await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} 's turn.`)); 
                }
            };
        }else{
            await popUpNotification("warning", "This column is full.", "Pick another column.");
            await dispatch(setGameMessage('No free spaces in this column. Pick another location.'));
        } ;
    };

    //setConnectFourBoard
    insertToken = async (column) => {
       if (this.props.picked_player === true) {    
            if(this.props.gameOver === false){
                await this.updateBoard(column);
                    if(this.props.gameOver === false && this.props.compEnabled === true && this.props.player_one_turn === false){
                        const computersColumn = this.computerTurn();
                        await this.updateBoard(computersColumn);
                    };
                }
            else {
                await popUpNotification("warning", "The Game is Over!", "Reset Game to start a new one.");
            }
        }else{
            await popUpNotification("error", "You must select opponent type first", "Click on Human or Computer");
        }
    };

    determineCirclePosition = (type) => {
        const classNameToReturn = {
            "" : (this.props.gameOver === false) ? `free${this.props.picked_player === true ? "" : "-disabled"}` : "game_over",
            "p1" : "red",
            "p2" : "yellow"
        };
        return classNameToReturn[type];
    };

    render = () => {
        const xyCoordinates = "50";
        const radius = "40";
        return (
        <section id="main">
            <GamesHead action_props = {this.props.action_props} />
            <div className="connectFourArea"> 
                <div className="connectFourBoard" id={`game-board${(this.props.picked_player === true && this.props.gameOver === false) ? "" : "-disabled"}`}>  
                {[...this.props.connectFourBoard].map((column, column_key) => (
                    <div className="column" key = {column_key} id={`column-${column_key}`} data-x= {column_key} onClick = {() => this.insertToken(column_key)}>
                        {(column.rowArrays).map((row,row_key) => (
                        <svg id="connectFourSVG" key={row_key} className={`row-${row_key}`}>
                        <circle  cx={xyCoordinates} cy={xyCoordinates} r={radius} stroke="#0B4E72" strokeWidth="3" className= {this.determineCirclePosition(row)} /> 
                        </svg> 
                        ))
                        }
                    </div>
                    ))}
                </div>
            </div>
        </section>
        )
    };
};
const mapStateToProps = state => { 
    // process.env.NODE_ENV.trim() !== 'production' && console.log('conect4 state: ', state)
    const gamesProps  = state.gamesReducer.defaultGamesStates; 
    const connectFourProps  = state.connectFourReducer.defaultConnectFourStates; 

    const {connectFourBoard,rowIndexByColumn,computerCurrentColumn,availableCols} = connectFourProps;
    const {player_one_turn,gameOver,player1_score,player2_score,picked_player,compEnabled,isTie} = gamesProps

    return {connectFourBoard,player_one_turn,gameOver,rowIndexByColumn,player1_score,player2_score,picked_player,compEnabled,computerCurrentColumn,availableCols,isTie};
  };
  
  export default withRouter(connect(mapStateToProps)(ConnectFour)); 
