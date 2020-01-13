import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/TicTacToe.css";
import { TicTacToeWinCombo, playerPicker ,tictactoe_score_label,playerSymbols} from "../constants/Games"; //tictactoe_boxes
class TicTacToe extends Component {
  
  setPlayerType = isCompEnabled => {
    // console.log(`props is:`, this.props) 
    const {dispatch} = this.props;
    const {setOpponent} = this.props.action_props.games_action;
    dispatch(setOpponent(isCompEnabled));
  };


  resetGame = () => {
    const {dispatch} = this.props;
    const {resetTicTacToeCell} = this.props.action_props.games_action;
    window.location.href = '/TicTacToe'; //refresh then reset????
    dispatch(resetTicTacToeCell()); //doesn't work and the props keep resetting. , tictactoe boxes const getting overwritten!!!
    // window.location.href = '/TicTacToe'; // temporary
  };
  /**
   * checkWin Function
   */
  
  /**
   * On Change on the tic tac toe boxes
   */
  OnChange = async event => {
    const {dispatch} = this.props;
    const {setTicTacToeCell,setCurrentPlayer} = this.props.action_props.games_action;
    process.env.NODE_ENV.trim() !== 'production' && console.log('event is', event.target);
    const indexs = JSON.parse((event.target).id);
    let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; //important

    const row_key = indexs.row_key;
    const data_key = indexs.data_key;
    ticTacToeBoxesCopy[row_key][data_key] = (this.props.player_one_turn === true) ? playerSymbols.userLabel : playerSymbols.computerLabel;
    //checkWin
    await dispatch(setTicTacToeCell(ticTacToeBoxesCopy));
    await dispatch(setCurrentPlayer(!this.props.player_one_turn))
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
            onClick={this.resetGame}
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
          <table className="tictactoetable">
              <tbody>
              {
                [...this.props.tictactoe_boxes].map((table_row,row_key) => 
                    <tr key = {row_key} id={`row${row_key+1}`}>
                        {[...table_row].map((table_data, data_key) => 
                            <td className="tictactoe-cell" key = {data_key} id={table_data === '' ? JSON.stringify({ row_key : row_key,
                                                                            data_key : data_key}) : 'disabled'}
                              onClick = {table_data === '' ? this.OnChange : null}> {`${table_data}`} </td>
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
  process.env.NODE_ENV.trim() !== 'production' && console.log('state: ', state)
  const  TicTacToeProps  = state.gamesReducer.defaultTicTacToeStates; 
  const {tictactoe_boxes,compEnabled,player1_score,player2_score,game_message,player_one_turn} = TicTacToeProps;
  return {
    tictactoe_boxes,compEnabled,player1_score,player2_score,game_message,player_one_turn
  };
};

export default withRouter(connect(mapStateToProps)(TicTacToe)); 