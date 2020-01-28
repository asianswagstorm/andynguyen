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

    checkHorizontalWin = (position) => {
        //0, 5
        let copyConnectFour = [...this.props.connectFourBoard];
        let win = false;
        const row = position.row;
        const column = position.column;
        //should check left and right. 
        /*
        0: check right
        1: check right
        2: check right
        3: check right and check left
        4: check left
        5: check left
        6: check left
        */ 
        console.log((copyConnectFour[column-3]) && copyConnectFour[column-3].rowArrays[row]);
        console.log((copyConnectFour[column-2]) && copyConnectFour[column-2].rowArrays[row]);
        console.log((copyConnectFour[column-1]) && copyConnectFour[column-1].rowArrays[row]);
        console.log(copyConnectFour[column].rowArrays[row]);

        if( (copyConnectFour[column-3] && copyConnectFour[column-2] && copyConnectFour[column-1]) &&            
           (copyConnectFour[column].rowArrays[row] === 
           copyConnectFour[column-1].rowArrays[row]) === 
            (copyConnectFour[column-2].rowArrays[row] === 
            copyConnectFour[column-3].rowArrays[row])){
            return true;
           }
        
        return win;
    };
    ///////////////////////////
    checkWin = (position) => (this.checkHorizontalWin(position)); //|| checkVerticalWin(position) || checkLeftDiagonal(position) || checkRightDiagonal(position));
    
    //setConnectFourBoard
    insertToken = async (column) => {
       if (this.props.picked_player === true) {
            const {dispatch} = this.props;
            const {setCurrentPlayer,setGameMessage,setGameOver,setPlayer1Score,setPlayer2Score} = this.props.action_props.games_action;
            const {setConnectFourBoard,setRowNumberByColumn} = this.props.action_props.connect_four_action;
            
            if(this.props.gameOver === false){
                let copyConnectFour = [...this.props.connectFourBoard];
                let copyRowByColumn = [...this.props.rowIndexByColumn];
                console.log("column is", column);
                
                //before set should check. clicking the column.
            
                if(copyRowByColumn[column] >= 0) {
                    copyConnectFour[column].rowArrays[copyRowByColumn[column]] = (this.props.player_one_turn === true) ? "p1" : "p2";
                    await dispatch(setConnectFourBoard(copyConnectFour));
                    const position = {column, row: copyRowByColumn[column]};
                    if(this.checkWin(position) === true){
                        await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} Wins.`));
                        await (this.props.player_one_turn === true) ? dispatch(setPlayer1Score(this.props.player1_score + 1)) : dispatch(setPlayer2Score(this.props.player2_score + 1));
                        await dispatch(setGameOver(true));
                        
                    }

                    if(this.props.gameOver === false){
                        copyRowByColumn[column] =  (copyRowByColumn[column] - 1);
                        await dispatch(setRowNumberByColumn(copyRowByColumn));
                        
                        await dispatch(setCurrentPlayer(!this.props.player_one_turn)) 
                        await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} 's turn.`)); 
                    }
                
                }else{
                    await popUpNotification("warning", "This column is full.", "Pick another column.");
                    await dispatch(setGameMessage('No free spaces in this column. Pick another location.'));
                } 
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

    const {connectFourBoard,rowIndexByColumn} = connectFourProps;
    const {player_one_turn,gameOver,player1_score,player2_score,picked_player} = gamesProps

    return {connectFourBoard,player_one_turn,gameOver,rowIndexByColumn,player1_score,player2_score,picked_player};
  };
  
  export default withRouter(connect(mapStateToProps)(ConnectFour)); 
