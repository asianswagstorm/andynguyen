import TicTacToe from "./TicTacToe.jsx"
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {    
    setPlayer1Score,
    setPlayer2Score,
    setGameMessage,
    setGameOver,
    setTie,
    setGameType,
    setCurrentPlayer
} from "../../../redux/actions/GamesAction";

import {    
    setWinIndex,
    updatePossibleWinCombo,
    updatePlayerOnePossibleWinCombo,
    updateNextMove,
    setTicTacToeCell,
    adjust_number_of_turns,
    updateCurrentPositions,
    updatePlayerOnePossibleWinIndex
} from "../../../redux/actions/TicTacToeAction";

const mapStateToProps = state => { 
    process.env.NODE_ENV.trim() !== 'production' && console.log('state: ', state)
    const  TicTacToeProps  = state.ticTacToeReducer.defaultTicTacToeStates; 
    const GamesProps = state.gamesReducer.defaultGamesStates;
    const { 
            compEnabled,player1_score,
            player2_score,game_message,player_one_turn,gameOver,
            isTie,picked_player
          } = GamesProps;
  
    const { 
            player1IndexPossibleWin,tictactoe_boxes,winIndex,remaining_turns,
            current_positions,possible_winning_combo,next_moves,player_one_possible_winning_combo
    } = TicTacToeProps;
    return {
      player1IndexPossibleWin,tictactoe_boxes,compEnabled,player1_score,player2_score,game_message,
      player_one_turn,gameOver,winIndex,remaining_turns,isTie,picked_player,current_positions,
      possible_winning_combo,next_moves,player_one_possible_winning_combo
    };
};

const mapDispatchToProps = (dispatch) => ({
    setGameType:(gameType="tictactoe") => dispatch(setGameType(gameType)),
    setPlayer1Score: (player1Score = 0) => dispatch(setPlayer1Score(player1Score)),
    setPlayer2Score: (player2Score = 0) => dispatch(setPlayer2Score(player2Score)),
    setGameMessage: (gameMessage = "") => dispatch(setGameMessage(gameMessage)),
    setGameOver: (gameOver=true) => dispatch(setGameOver(gameOver)),
    setTie: (isTie=true) => dispatch(setTie(isTie)),
    setCurrentPlayer: currentPlayer => dispatch(setCurrentPlayer(currentPlayer)),
    
    setWinIndex: winIndex => dispatch(setWinIndex(winIndex)),
    updatePossibleWinCombo: newPossibleWinCombo => dispatch(updatePossibleWinCombo(newPossibleWinCombo)), 
    updatePlayerOnePossibleWinCombo: newPossibleWinCombo => dispatch(updatePlayerOnePossibleWinCombo(newPossibleWinCombo)),
    updateNextMove: nextMoves => dispatch(updateNextMove(nextMoves)), 
    setTicTacToeCell: tictactoe_boxes => dispatch(setTicTacToeCell(tictactoe_boxes)),
    adjust_number_of_turns: remaining_turns => dispatch(adjust_number_of_turns(remaining_turns)),
    updateCurrentPositions: current_positions => dispatch(updateCurrentPositions(current_positions)),
    updatePlayerOnePossibleWinIndex: player1IndexPossibleWin => dispatch(updatePlayerOnePossibleWinIndex(player1IndexPossibleWin))
});
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TicTacToe)); 
