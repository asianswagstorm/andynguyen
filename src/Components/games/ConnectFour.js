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


    //detectWin use the previous.
    // checkHorizontalWin
    // checkWin = (position) => (checkHorizontalWin(position) || checkVerticalWin(position) || checkLeftDiagonal(position) || checkRightDiagonal(position));
    
   //setConnectFourBoard
    onChange = async (column) => {
       
        const {dispatch} = this.props;
        const {setCurrentPlayer,setGameMessage} = this.props.action_props.games_action;
        const {setConnectFourBoard,setRowNumberByColumn} = this.props.action_props.connect_four_action;

        let copyConnectFour = [...this.props.connectFourBoard];
        let copyRowByColumn = [...this.props.rowIndexByColumn];
        console.log("column is", column);
        
        //before set should check. clicking the column.
     
        if(copyRowByColumn[column] >= 0) {
            copyConnectFour[column].rowArrays[copyRowByColumn[column]] = (this.props.player_one_turn === true) ? "p1" : "p2";
            await dispatch(setConnectFourBoard(copyConnectFour));
            copyRowByColumn[column] =  (copyRowByColumn[column] - 1);
            await dispatch(setRowNumberByColumn(copyRowByColumn));
            // const position = {column, row: copyRowByColumn[column]};
            // this.checkWin(position);
            if(this.props.gameOver === false){
             await dispatch(setCurrentPlayer(!this.props.player_one_turn)) 
             await dispatch(setGameMessage(`${this.props.player_one_turn === true ? 'Red' : 'Yellow'} 's turn.`)); 
            }
        }else{
            await popUpNotification("warning", "This column is full.", "Pick another column.");
            await dispatch(setGameMessage('No free spaces in this column. Pick another location.'));
        }
    };

    determineCirclePosition = (type) => {
        const classNameToReturn = {
            "" : "free",
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
                <div id="game-board">  
                {[...this.props.connectFourBoard].map((column, column_key) => (
                    <div className="column" key = {column_key} id={`column-${column_key}`} data-x= {column_key} onClick = {() => this.onChange(column_key)}>
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
    const {player_one_turn,gameOver} = gamesProps

    return {connectFourBoard,player_one_turn,gameOver,rowIndexByColumn};
  };
  
  export default withRouter(connect(mapStateToProps)(ConnectFour)); 
