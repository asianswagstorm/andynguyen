import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/ConnectFour.css";
import GamesHead from "./GamesHead";
import { popUpNotification } from "../constants/HelperFunction/Functions";
// import {directions} from "../constants/ConnectFourConstants";
  
class ConnectFour extends Component {

    componentDidMount = () => {
        const {dispatch} = this.props;
        const {setGameType} = this.props.action_props.games_action;
        dispatch(setGameType("connectFour"));
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
               "horizontal": (  copyConnectFour[column+1] && 
                                copyConnectFour[column+2] && 
                                copyConnectFour[column+1].rowArrays[row] === playerUnit &&
                                copyConnectFour[column+2].rowArrays[row] === playerUnit),
               
                "diagonal_left": (  copyConnectFour[column+1] && 
                                    copyConnectFour[column+2] &&
                                    copyConnectFour[column+1].rowArrays[row-1] &&
                                    copyConnectFour[column+2].rowArrays[row-2] &&
                                    copyConnectFour[column+1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column+2].rowArrays[row-2] === playerUnit),
               
                "diagonal_right":(  copyConnectFour[column+1] &&
                                    copyConnectFour[column-2] &&
                                    copyConnectFour[column+1].rowArrays[row+1] &&
                                    copyConnectFour[column-2].rowArrays[row-2] &&
                                    copyConnectFour[column+1].rowArrays[row+1] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row-2] === playerUnit)
           }; 
           return dataToReturn[direction];
        }; 
        
        //(+1,-2) (third position) , (+2-1) (second position)
        const plusOneTwoMinusOneTwo = (direction) => {
            const dataToReturn = {
                "horizontal":   (  copyConnectFour[column-1] &&
                                    copyConnectFour[column-2] && 
                                    copyConnectFour[column-1].rowArrays[row] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row] === playerUnit),
                
                "diagonal_left": (  copyConnectFour[column-1] && 
                                    copyConnectFour[column-2] &&
                                    copyConnectFour[column-1].rowArrays[row+1] &&
                                    copyConnectFour[column-2].rowArrays[row+2] &&
                                    copyConnectFour[column-1].rowArrays[row+1] === playerUnit &&
                                    copyConnectFour[column-2].rowArrays[row+2] === playerUnit),
                
                "diagonal_right":(  copyConnectFour[column-1] &&
                                    copyConnectFour[column+2] &&
                                    copyConnectFour[column-1].rowArrays[row-1] &&
                                    copyConnectFour[column+2].rowArrays[row+2] &&
                                    copyConnectFour[column-1].rowArrays[row-1] === playerUnit &&
                                    copyConnectFour[column+2].rowArrays[row+2] === playerUnit)
            };    
            return dataToReturn[direction];
        };

            for(let i = 0 ; i< 4 ;i++){ //-1 +2, +1 -2 // the column is wrong.
                //this only check consecutives. 
                //how to clean this up??? 
                if( ((direction === "horizontal") &&
                    ( 
                    (copyConnectFour[column+i] && copyConnectFour[column+i].rowArrays[row] === playerUnit) || //first position
                   
                    (copyConnectFour[column-1] && copyConnectFour[column-1].rowArrays[row] === playerUnit && //second position 1, third position 2
                     minusOneTwoPlusOneTwo("horizontal")) ||
                    
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row] === playerUnit && 
                     minusOneTwoPlusOneTwo("horizontal"))  || //third position 1
                     
                    (copyConnectFour[column+1] && copyConnectFour[column+1].rowArrays[row] === playerUnit && //second position 3, third position 4
                     plusOneTwoMinusOneTwo("horizontal")) ||

                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row] === playerUnit && 
                     plusOneTwoMinusOneTwo("horizontal")) ||  //second position 4
              
      
                    (copyConnectFour[column-i] && copyConnectFour[column-i].rowArrays[row] === playerUnit)  //last position 
                    )
                    ) || 

                   (direction === "vertical" && copyConnectFour[column].rowArrays[row+i] && copyConnectFour[column].rowArrays[row+i] === playerUnit) ||  //first position
                   
                   ((direction === "diagonal_left") && 
                   
                   (
                    (copyConnectFour[column-i] && copyConnectFour[column-i].rowArrays[row+i] && copyConnectFour[column-i].rowArrays[row+i]  === playerUnit) || //first position
                    //second position 3, third position 4 
                    (copyConnectFour[column-1] && copyConnectFour[column-1].rowArrays[row+1] && copyConnectFour[column-1].rowArrays[row+1]=== playerUnit && 
                     minusOneTwoPlusOneTwo("diagonal_left")) ||
                    //second position 4
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row+2] && copyConnectFour[column-2].rowArrays[row+2] === playerUnit &&
                     minusOneTwoPlusOneTwo("diagonal_left")) || 
                    //second position 1, third position 2
                    (copyConnectFour[column+1] && copyConnectFour[column+1].rowArrays[row-1] && copyConnectFour[column+1].rowArrays[row-1] === playerUnit && 
                     plusOneTwoMinusOneTwo("diagonal_left")) ||
                    //third position 1
                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row-2] && copyConnectFour[column+2].rowArrays[row-2]  === playerUnit && 
                    plusOneTwoMinusOneTwo("diagonal_left")) ||
                    (copyConnectFour[column+i] && copyConnectFour[column+i].rowArrays[row-i] && copyConnectFour[column+i].rowArrays[row-i] === playerUnit)  //last position 
                   )
                   ) || 

                   ((direction === "diagonal_right") && 
                   
                   (
                    (copyConnectFour[column+i] && copyConnectFour[column+i].rowArrays[row+i] && copyConnectFour[column+i].rowArrays[row+i]  === playerUnit) || //first position
                    //second position 1, third position 2
                    (copyConnectFour[column-1] && copyConnectFour[column-1].rowArrays[row-1] && copyConnectFour[column-1].rowArrays[row-1]=== playerUnit &&
                     minusOneTwoPlusOneTwo("diagonal_right")) ||
                    //second position 4
                    (copyConnectFour[column+2] && copyConnectFour[column+2].rowArrays[row+2] && copyConnectFour[column+2].rowArrays[row+2]  === playerUnit &&
                     minusOneTwoPlusOneTwo("diagonal_right"))||
                    //second position 3, third position 4 
                    (copyConnectFour[column+1] && copyConnectFour[column+1].rowArrays[row+1] && copyConnectFour[column+1].rowArrays[row+1] === playerUnit && 
                     plusOneTwoMinusOneTwo("diagonal_right")) ||
                    //third position 1
                    (copyConnectFour[column-2] && copyConnectFour[column-2].rowArrays[row-2] && copyConnectFour[column-2].rowArrays[row-2] === playerUnit &&
                     plusOneTwoMinusOneTwo("diagonal_right")) ||
                    
                    (copyConnectFour[column-i] && copyConnectFour[column-i].rowArrays[row-i] && copyConnectFour[column-i].rowArrays[row-i] === playerUnit)  //last position 
                   )
                   ) 

                   )

                {
                        truthyArray.push(true);
                }
            };
        if( truthyArray.length === 4 ){
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
    computerTurn = () => {
        const {dispatch} = this.props;
        const {updateComputerColumn} = this.props.action_props.connect_four_action;
        const {setGameOver} = this.props.action_props.games_action;
        let computerColumn = this.props.computerCurrentColumn;

        if([...this.props.rowIndexByColumn][computerColumn] < 0 && computerColumn <= 6){
            computerColumn = computerColumn+1;
            dispatch(updateComputerColumn(computerColumn));
        }
        else if( computerColumn > 6)
            dispatch(setGameOver(true));

        return computerColumn;
    };

    updateBoard = async (column) => {
        const {dispatch} = this.props;
        const {setCurrentPlayer, setGameMessage,setGameOver,setPlayer1Score,setPlayer2Score} = this.props.action_props.games_action;
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
                
                await dispatch(setCurrentPlayer(!this.props.player_one_turn)) 
                await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} 's turn.`)); 
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
        <section>
            <GamesHead action_props = {this.props.action_props} />
            <div className="connectFourArea"> 
                <div className="connectFourBoard" id={`game-board${this.props.picked_player === true ? "" : "-disabled"}`}>  
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
    process.env.NODE_ENV.trim() !== 'production' && console.log('conect4 state: ', state)
    const gamesProps  = state.gamesReducer.defaultGamesStates; 
    const connectFourProps  = state.connectFourReducer.defaultConnectFourStates; 

    const {connectFourBoard,rowIndexByColumn,computerCurrentColumn} = connectFourProps;
    const {player_one_turn,gameOver,player1_score,player2_score,picked_player,compEnabled} = gamesProps

    return {connectFourBoard,player_one_turn,gameOver,rowIndexByColumn,player1_score,player2_score,picked_player,compEnabled,computerCurrentColumn};
  };
  
  export default withRouter(connect(mapStateToProps)(ConnectFour)); 
