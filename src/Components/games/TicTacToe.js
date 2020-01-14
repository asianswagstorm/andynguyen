import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/TicTacToe.css";
import { popUpNotification } from "../constants/HelperFunction/Functions";
import { TicTacToeWinCombo, playerPicker ,tictactoe_score_label,playerSymbols,winIndexs} from "../constants/Games"; //tictactoe_boxes
class TicTacToe extends Component {
  
  setPlayerType = isCompEnabled => {
    // console.log(`props is:`, this.props) 
    const {dispatch} = this.props;
    const {setOpponent,pickedPlayer,setGameMessage} = this.props.action_props.games_action;
    dispatch(setOpponent(isCompEnabled));
    dispatch(pickedPlayer(true));
    dispatch(setGameMessage('Make your move.'));
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
  checkWin = async () => {
    //return or set prop to winning indexs
    // TicTacToeWinCombo // return an array of arrays.
    const {dispatch} = this.props;
    const {setPlayer1Score,setPlayer2Score,setGameMessage,setGameOver,setWinIndex,setTie} = this.props.action_props.games_action;
 
    const winCombo = TicTacToeWinCombo([...this.props.tictactoe_boxes]);

    let win = [];
    winCombo.forEach(winCombination => {
      if (winCombination.every(value => (value === winCombination[0] &&  winCombination[0]!== '') ) === true )
          win.push(true);
      else
          win.push(false);
    })
 
    if(win.includes(true)) {
      const winIndex = win.indexOf(true);
      await dispatch(setWinIndex(winIndex));
      // console.log('win index', winIndex);
      (this.props.player_one_turn === true) ? await dispatch(setPlayer1Score(this.props.player1_score + 1 )):await dispatch(setPlayer2Score(this.props.player2_score + 1));
          // winCombination[0] === 'X' ? 
      await dispatch(setGameMessage(`Player ${ this.props.player_one_turn === true ? '1' : '2'} Wins`));
      win = [];
      await dispatch(setGameOver(true));
    };

    if(this.props.remaining_turns === 0 && this.props.winIndex === ''){
      await dispatch(setGameMessage(`It's a Tie`));
      await dispatch(setTie(true));
      await dispatch(setGameOver(true));
    };
  };
  
  /**
   * On Change on the tic tac toe boxes
   */
  OnChange = async event => {
    if (this.props.gameOver === false && this.props.picked_player === true) {
    const {dispatch} = this.props;
    const {setTicTacToeCell,setCurrentPlayer,adjust_number_of_turns} = this.props.action_props.games_action;
    process.env.NODE_ENV.trim() !== 'production' && console.log('event is', event.target);
    const indexs = JSON.parse((event.target).id);
    let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; //important

    const row_key = indexs.row_key;
    const data_key = indexs.data_key;
    ticTacToeBoxesCopy[row_key][data_key] = (this.props.player_one_turn === true) ? playerSymbols.userLabel : playerSymbols.computerLabel;
    //checkWin
    await dispatch(setTicTacToeCell(ticTacToeBoxesCopy));
    await dispatch(adjust_number_of_turns([this.props.remaining_turns] - 1));
    await this.checkWin();
    if(this.props.gameOver === false)
      await dispatch(setCurrentPlayer(!this.props.player_one_turn))  
    }
    else {
      if(this.props.gameOver === false)
        popUpNotification('error', "You must select an opponent before starting the game!", "Click on Human to play a local game, or Computer to play with the computer." )
      else 
        popUpNotification('warning', "The game is already over!", "Click Reset Game to start a new game." )
    }
  };

  changeBackgroundIfWin = (row_index,data_index) => {
    const class_name = 'tictactoe-cell';
    if(this.props.winIndex !== ''){
      const winIndexObject = winIndexs[this.props.winIndex]; //{index1: [0,0], index2: [0,1] , index3:[0,2]}
    
      if( (row_index === winIndexObject.index1[0] && data_index === winIndexObject.index1[1]) ||
          (row_index === winIndexObject.index2[0] && data_index === winIndexObject.index2[1]) ||
          (row_index === winIndexObject.index3[0] && data_index === winIndexObject.index3[1]) ){
        return `${class_name}-win-player${this.props.player_one_turn === true ? '1' : '2'}`//changed player turn
      }
    } else return class_name
  };

  render = () => {
    const tieDisabled = (this.props.isTie === true) ? 'disabled-tie': 'disabled';
      //need redux for the prop states. 
    return (
      <section>
        <header className = "Games">
          {/* Add a back Button */}
          <h1 id="tictactoe"><a href = "/"> <span className="icon fa-home"></span> Tic Tac Toe </a></h1>
          <h2 id="tictactoe">Written in React with Redux</h2>
        </header>

        <div className="score-board">
            {tictactoe_score_label.map((label, key) => (
          <div key = {key} id= {label.id} className="badge">
           {label.label}
          </div>))}
          <span id="user-score"> {[this.props.player1_score]} </span>:<span id="computer-score"> {[this.props.player2_score]} </span>
        </div>

        <div className="message">
          <p> {[this.props.game_message]} </p>
        </div>
        {this.props.picked_player === true &&
          <div className="reset">
            <button
              onClick={this.resetGame}
              className="button button-block"
              id="reset-game"
            >
              Reset Game
            </button>
          </div>
        }
      
        {this.props.picked_player === false && 
          <div className="play">
            <p> Play with Human or Computer? </p>
            {
              playerPicker.map((player, key) => (
                <button key={key} onClick= {() => this.setPlayerType(player.isComp)} className="button button-block" id= {player.id}>
                  {player.name}
                </button>
              ))
            }
          </div>
        }
            {/* Clean this up  */}
        <div className="Boxes" id="board">
          <table className="tictactoetable" id= {this.props.gameOver === false || [this.props.picked_player] === true ? "notdisabled" : "disabled"} >
              <tbody>
              {
                [...this.props.tictactoe_boxes].map((table_row,row_key) => 
                    <tr key = {row_key} id={`row${row_key+1}`}>
                        {[...table_row].map((table_data, data_key) => 
                        // function
                            <td className={this.changeBackgroundIfWin(row_key,data_key)} key = {data_key} id={this.props.gameOver === false ? ((table_data === '') ? JSON.stringify({ row_key : row_key,
                                                                            data_key : data_key}) : tieDisabled) : (tieDisabled)}
                              onClick = {(table_data === '') ? this.OnChange : null}> {`${table_data}`} </td>
                            )}
                    </tr>
                  )
              }
              </tbody>
          </table>
        </div>
      </section>
    );
  };
};

const mapStateToProps = state => { 
  process.env.NODE_ENV.trim() !== 'production' && console.log('state: ', state)
  const  TicTacToeProps  = state.gamesReducer.defaultTicTacToeStates; 
  const {tictactoe_boxes,compEnabled,player1_score,player2_score,game_message,player_one_turn,gameOver,winIndex,remaining_turns,isTie,picked_player} = TicTacToeProps;
  return {
    tictactoe_boxes,compEnabled,player1_score,player2_score,game_message,player_one_turn,gameOver,winIndex,remaining_turns,isTie,picked_player
  };
};

export default withRouter(connect(mapStateToProps)(TicTacToe)); 