import React, { Component } from "react";
import Headers from "../Headers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {score_label, playerPicker } from "../constants/Games"; //tictactoe_boxes

class GamesHead extends Component {

    setPlayerType = isCompEnabled => {
        const {dispatch} = this.props;
        const {setOpponent,pickedPlayer,setGameMessage} = this.props.action_props.games_action;
        dispatch(setOpponent(isCompEnabled));
        dispatch(pickedPlayer(true));
        dispatch(setGameMessage('Make your move.'));
    };

    resetGame = () => {
        const {dispatch} = this.props;
        const {resetGame} = this.props.action_props.games_action;
        
        dispatch(resetGame(this.props.gameType));
    };

  render = () => {
    return (
      <div>
        <Headers linkTo = "#/" headerTitle=  {this.props.gameType === "tictactoe" ? "Tic Tac Toe" : "Connect Four" } origin="games"/>
        <div className="score-board">
          {score_label(this.props.gameType).map((label, key) => ( //this.props.gameType
            <div key={key} id={label.id} className="badge">
              {label.label}
            </div>
          ))}
          <span id="user-score"> {[this.props.player1_score]} </span>:
          <span id="computer-score"> {[this.props.player2_score]} </span>
        </div>

        <div className="message">
          <p id="game-message"> {[this.props.game_message]} </p>
        </div>
        {this.props.picked_player === true && (
          <div className="reset">
            <button
              onClick={this.resetGame}
              className="button button-block"
              id="reset-game"
            >
              Reset Game
            </button>
          </div>
        )}

        {this.props.picked_player === false && (
          <div className="play">
            <p id="game-message"> Play with Human or Computer? </p>
            {playerPicker.map((player, key) => (
              <button
                key={key}
                onClick={() => this.setPlayerType(player.isComp)}
                className="button button-block"
                id={player.id}
              >
                {player.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
};

const mapStateToProps = state => { 

    const GamesProps  = state.gamesReducer.defaultGamesStates;  //rename
    const { 
            player1_score,
            player2_score,game_message,
            picked_player,
            gameType
          } = GamesProps; //games props
    return {
        player1_score, player2_score,game_message,picked_player,gameType
    };
  };
  
export default withRouter(connect(mapStateToProps)(GamesHead)); 