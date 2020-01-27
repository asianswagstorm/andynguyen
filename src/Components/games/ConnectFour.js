import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/ConnectFour.css";
import GamesHead from "./GamesHead";
import {connectFourBoard} from "../constants/ConnectFourConstants";
class ConnectFour extends Component {

    componentDidMount = () => {
        const {dispatch} = this.props;
        const {setGameType} = this.props.action_props.games_action;
        dispatch(setGameType("connectFour"));
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
                    <div className="column" key = {column_key} id={`column-${column_key}`} data-x= {column_key}>
                        {(column.rowArrays).map((row,row_key) => (
                        <svg id="connectFourSVG" key={row_key} className={`row-${row_key}`}>
                        <circle cx={xyCoordinates} cy={xyCoordinates} r={radius} stroke="#0B4E72" stroke-width="3" className= {this.determineCirclePosition(row)} /> 
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
    // const gamesProps  = state.gamesReducer.defaultGamesStates; 
    const connectFourProps  = state.connectFourReducer.defaultConnectFourStates; 

    const {connectFourBoard} = connectFourProps;

    return {connectFourBoard};
  };
  
  export default withRouter(connect(mapStateToProps)(ConnectFour)); 
