import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/TicTacToe.css";
import { TicTacToeWinCombo, playerPicker ,tictactoe_score_label, tictactoe_boxes } from "../constants/Games";
class TicTacToe extends Component {
  
  setPlayerType = isCompEnabled => {
    // console.log(`props is:`, this.props) 
    const {dispatch} = this.props;
    const {setOpponent} = this.props.action_props.games_action;
    dispatch(setOpponent(isCompEnabled));
  };
  
  render = () => {
      //need redux for the prop states. 
      
    return (
      <div>
        <header className = "Games">
          {/* Add a back Button */}
          <h1><a href = "/">Tic Tac Toe </a></h1>
          <h3> © Copyright 2018 Andy Nguyen. All rights reserved.</h3>
        </header>

        <div className="score-board">
            {tictactoe_score_label.map((label, key) => (
          <div key = {key} id= {label.id} className="badge">
           {label.label}
          </div>))}
          {/* This should be a prop */}
          <span id="user-score">0 </span>:<span id="computer-score">0</span>
        </div>

        <div className="message">
          <p> Make your move. </p>
        </div>

        <div className="reset">
          <button
            // onClick="startGame()"
            className="button button-block"
            id="reset-game"
          >
            Reset Game
          </button>
        </div>
        <div className="play">
            {/* Clean this up */}
          <p> Play with Human or Computer? </p>
          {
            playerPicker.map((player, key) => (
              <button key={key} onClick= {() => this.setPlayerType(player.isComp)} className="button button-block" id= {player.id}>
                {player.name}
              </button>
            ))
          }
        </div>
            {/* Clean this up  */}
        <div className="Boxes" id="board">
          <table>
              <tbody>
              {
                  tictactoe_boxes.map((table_row,row_key) => 
                    <tr key = {row_key} id={`row${row_key+1}`}>
                        {table_row.map((table_data, data_key) => 
                            <td className="cell" key = {data_key} id= {table_data.index} > {table_data.value} </td>
                            )}
                    </tr>
                  )
              }
              </tbody>
          </table>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  console.log('state: ', state)
  const  TicTacToeProps  = state.gamesReducer.defaultTicTacToeStates; //state.GamesReducer undefined
  const {tictactoe_boxes,compEnabled,player1_score,player2_score,game_message} = TicTacToeProps;
  return {
    tictactoe_boxes,compEnabled,player1_score,player2_score,game_message
  };
};

export default withRouter(connect(mapStateToProps)(TicTacToe)); 
