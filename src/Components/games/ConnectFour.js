import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/ConnectFour.css";
import GamesHead from "./GamesHead";
import { popUpNotification } from "../constants/HelperFunction/Functions";
  
class ConnectFour extends Component {

    componentDidMount = () => {
        const {dispatch} = this.props;
        const {setGameType} = this.props.action_props.games_action;
        dispatch(setGameType("connectFour"));
      };


    //getFreeRow(column)

    //setConnectFourBoard
    onChange = async (column) => {
       
        const {dispatch} = this.props;
        const {setCurrentPlayer} = this.props.action_props.games_action;
        const {setConnectFourBoard,setRowNumberByColumn} = this.props.action_props.connect_four_action;

        let copyConnectFour = [...this.props.connectFourBoard];
        let copyRowByColumn = [...this.props.rowIndexByColumn];
        console.log("column is", column);
        // console.log("row is", row); row should be the most free row.
        
        //before set should check. clicking the column.
        //setRowNumberByColumn

        if(copyRowByColumn[column] > -1) {
            copyConnectFour[column].rowArrays[copyRowByColumn[column]] = (this.props.player_one_turn === true) ? "p1" : "p2";
            dispatch(setConnectFourBoard(copyConnectFour));
            copyRowByColumn[column] =  (copyRowByColumn[column] - 1);
            dispatch(setRowNumberByColumn(copyRowByColumn));

            if(this.props.gameOver === false){
             await dispatch(setCurrentPlayer(!this.props.player_one_turn))  
            }
        }else{
            popUpNotification("warning", "This column is full.", "Pick another column.");
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
