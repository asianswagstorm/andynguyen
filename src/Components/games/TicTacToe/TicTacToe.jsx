import React, { Component } from "react";
import "./TicTacToe.scss";
import { popUpNotification } from "../../constants/HelperFunction/Functions";
import {playerSymbols} from "../../constants/Games";
import { TicTacToeWinCombo,winIndexs} from "../../constants/TicTacToeConstants"; //tictactoe_boxes
import GamesHead from "../gameComponent/GamesHead";

export default class TicTacToe extends Component {
  
  componentDidMount = () => {
    window.scrollTo(0, 0);

    const {setGameType} = this.props
    setGameType("tictactoe");
  };
  /**
   * checkWin Function
   */
  checkWin = async () => {
    //return or set prop to winning indexs
    // TicTacToeWinCombo // return an array of arrays.
    const {setPlayer1Score,setPlayer2Score,setGameMessage,setGameOver,setTie,setWinIndex} = this.props;

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
      await setWinIndex(winIndex);
      // console.log('win index', winIndex);
      (this.props.player_one_turn === true) ? await setPlayer1Score(this.props.player1_score + 1 ):await setPlayer2Score(this.props.player2_score + 1);
          // winCombination[0] === 'X' ? 
      await setGameMessage(`Player ${ this.props.player_one_turn === true ? '1' : '2'} Wins`);
      win = [];
      await setGameOver();
    };

    if(this.props.remaining_turns === 0 && this.props.winIndex === ''){
      await setGameMessage(`It's a Tie`);
      await setTie();
      await setGameOver();
    };
  };
  
  countNumberOfElement = (array, value) => {//DNW
    let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; 
    let numberOfElement = 0;
    array.forEach(index => {
      if(ticTacToeBoxesCopy[index[0]][index[1]] === [value])
        numberOfElement++;
      })
    return numberOfElement;
  };

  /**
   * Need to block player1
   */
  returnBestWinCombo = (newPossibleWinCombo, compPositionsArray) => {
    let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; 
    
    let possibleWinCombo = [...newPossibleWinCombo];
    let indexIfMoreThanOne = 0;
    let indexs = [];
    process.env.NODE_ENV.trim() !== 'production' && console.log("possibleWinCombo",possibleWinCombo);
  
    if(possibleWinCombo.length > 1){

    //index is null 
    let isFine = false;
    let lastIndex = 1;
    while(isFine === false){

    let latestCompPosition = compPositionsArray[compPositionsArray.length - lastIndex];
    process.env.NODE_ENV.trim() !== 'production' && console.log("last position", latestCompPosition);//undefined
    for(let i = 0; i< possibleWinCombo.length ; i++){
      const possible_indexes = possibleWinCombo[i];
      for(let j = 0; j< possible_indexes.length ; j++){
        const index = possible_indexes[j];
        if(index === undefined || !latestCompPosition)
          isFine = true;
        if (index && latestCompPosition && ((index[0] === latestCompPosition[0]) && (index[1] === latestCompPosition[1]) && (ticTacToeBoxesCopy[index[0]][index[1]] !== 'X')))
          indexs.push(i);
      }
    }
 
    process.env.NODE_ENV.trim() !== 'production' && console.log("indexs", indexs);//what if more then 2 index? // wrong 
    lastIndex++;
    if(indexs.length > 0) //last position no longer available, check previous 
      isFine = true;
    }
    }
    if(indexs.length > 1){
      if(this.countNumberOfElement(possibleWinCombo[indexs[0]]) < this.countNumberOfElement(possibleWinCombo[indexs[1]]))
        indexIfMoreThanOne = 1;
    }

    if(indexs.length > 2){
      if(this.countNumberOfElement(possibleWinCombo[indexs[1]]) < this.countNumberOfElement(possibleWinCombo[indexs[2]]))
        indexIfMoreThanOne = 2;
    }

    const returningCombo = ([...possibleWinCombo].length > 1 && indexs.length > 0)  ? possibleWinCombo[indexs[indexIfMoreThanOne]] : (indexs.length === 0) && [...possibleWinCombo][0]; 

    process.env.NODE_ENV.trim() !== 'production' && console.log("returningCombo", returningCombo);
    return returningCombo;
  }; 

  filterPossibleWinCombo = (last_position, playerType) => {
    const {updatePossibleWinCombo, updatePlayerOnePossibleWinCombo} = this.props;

    let checkIfExists = [];
    let possibleWinCombo = (playerType === "player1") ? [...this.props.player_one_possible_winning_combo] : [...this.props.possible_winning_combo];

    process.env.NODE_ENV.trim() !== 'production' && console.log("last_position", last_position);

    possibleWinCombo.map(winning_indexes => {
      winning_indexes.forEach( position => {
          if(((position[0] === last_position[0]) && (position[1] === last_position[1])))
            checkIfExists.push(true);
          else checkIfExists.push(false);
      });
      let newArray = [];
      for(let position = 0 ; position < checkIfExists.length ; position++){ 
        let positionArray = [];
        for (let j = 0 ; j < 3 ;j++){
          positionArray.push(checkIfExists[position+j])
        };
        newArray.push(positionArray)
        if([...newArray].length > 0 && ([...newArray][position/3]).includes(true)){ 
          possibleWinCombo[position/3] = false
        }
        position = position+2;
      }  
      let newPossibleWinCombo = [...possibleWinCombo].filter(win_combo => (win_combo !== false && win_combo));
     
      if(playerType === "player1")
        updatePlayerOnePossibleWinCombo(newPossibleWinCombo);
      else if(playerType === "player2")
        updatePossibleWinCombo(newPossibleWinCombo);

      return newPossibleWinCombo;
      }
    );
  };

  static aboutToWin = (computerPositions, recommendedPositions) => {
    let aboutToWin = false;
    let numberOfIndexs = 0;
    computerPositions.forEach(positions => 
            recommendedPositions.forEach(recPosition => {
               if(positions[0] === recPosition[0] && positions[1] === recPosition[1])
                numberOfIndexs= ++numberOfIndexs; 
            }
        )
    );

    if(numberOfIndexs === 2)
      aboutToWin = true;

    return aboutToWin;
  }

  /**
   * On Change on the tic tac toe boxes
   * //trigger if comps turn
   */
  checkBestPosition = (currentPosition,PlayerType) => {
    if([...this.props.possible_winning_combo].length > 0 ){

    const {updateNextMove,updatePlayerOnePossibleWinIndex} = this.props;

    const compPositionsArray = [...currentPosition].filter(i => [...currentPosition].indexOf(i) % 2 !== 0);//comp postions
    
    // const player1PositionsArray = [...currentPosition].filter(i => [...currentPosition].indexOf(i) % 2 === 0);
    
    const latestCompPosition = compPositionsArray[compPositionsArray.length - 1];
    
    // const player1_position = player1PositionsArray[player1PositionsArray.length -1] ;//last added 
    
    if(PlayerType === "computer" && [this.props.remaining_turns] < 8 ){
     
        //not being called
        let getNextPosition = () => {
          const best_position = this.returnBestWinCombo([...this.props.possible_winning_combo], compPositionsArray); // function, the index where a 0 already exists. //index is []
        
          let possible_positions = [...best_position].filter(position1 => ((position1[0] !== latestCompPosition[0]) || (position1[1] !== latestCompPosition[1])));
      
          process.env.NODE_ENV.trim() !== 'production' && console.log("possible_positions",possible_positions); //wrong
          let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; 
          process.env.NODE_ENV.trim() !== 'production' && console.log("ticTacToeBoxesCopy",ticTacToeBoxesCopy);
    
          let next_position = (possible_positions.length > 1) ? ((ticTacToeBoxesCopy[possible_positions[0][0]][possible_positions[0][1]] === '') ?  possible_positions[0] : possible_positions[1])  : possible_positions; 
          
          const indextoplay = this.checkPlayerOneWin([...ticTacToeBoxesCopy]); //tries to block player 1 win.
          if(indextoplay.length > 0){
            if(this.constructor.aboutToWin(compPositionsArray,best_position) === false){
              next_position = indextoplay;
              updatePlayerOnePossibleWinIndex([]);
            } 
          }

          next_position = (next_position) ? next_position : getNextPosition();
          process.env.NODE_ENV.trim() !== 'production'&& console.log("next_position",next_position);
          updateNextMove(next_position);
          return next_position;
        };

        return getNextPosition();
      };
    }
    else {
      return [Math.floor(Math.random() * 3),Math.floor(Math.random() * 3)]
    }
  };
  //Block Player 1 not implemented
  compPickPosition = async () => {
    const {setCurrentPlayer,setTicTacToeCell,adjust_number_of_turns,updateCurrentPositions} = this.props;
    
    let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; 
    //possibly make an check for winning positions instead of random. 
    //clean this up 
    let emptyPosition = false;

    const arrayToSubmit = [...[...this.props.current_positions]];
    // this.checkBestPosition(arrayToSubmit, "computer"); // return me an index 
    
    const bestPosition = (this.props.remaining_turns < 8 && [...this.props.possible_winning_combo].length > 0 ) && this.checkBestPosition(arrayToSubmit, "computer");

    let row_key = (this.props.remaining_turns === 8  || this.props.possible_winning_combo.length === 0 ) ? Math.floor(Math.random() * 3) : bestPosition[0];
    let data_key = (this.props.remaining_turns === 8  || this.props.possible_winning_combo.length === 0) ? Math.floor(Math.random() * 3) : bestPosition[1];
    
    if([...this.props.player_one_possible_winning_combo].length > 0) {
      this.filterPossibleWinCombo([row_key,data_key],"player1"); 
    }

    if(ticTacToeBoxesCopy[row_key][data_key] === '')
      emptyPosition = true;

    if(emptyPosition === true){
      
      ticTacToeBoxesCopy[row_key][data_key] =  playerSymbols.computerLabel;
      await updateCurrentPositions([...this.props.current_positions , [row_key,data_key]]); 
      
      await setTicTacToeCell(ticTacToeBoxesCopy);
    
      await adjust_number_of_turns([this.props.remaining_turns] - 1);
      await this.checkWin();
      
      if(this.props.gameOver === false){
        await setCurrentPlayer(!this.props.player_one_turn)  
      }
    }
    else{
      this.compPickPosition();
    }
  };
  //TicTacToeWinCombo
  checkPlayerOneWin = (ticTacToeBoxesCopy) => {
    const {updatePlayerOnePossibleWinIndex} = this.props;
    const playerOnePossibleWinCombo = [...this.props.player_one_possible_winning_combo];
    let indexToReturn = this.props.player1IndexPossibleWin;
    playerOnePossibleWinCombo.forEach(win_combo => {
      let countX = 0;
      win_combo.forEach(index => {
        if(ticTacToeBoxesCopy[index[0]][index[1]] === 'X')
          countX = countX + 1;
      } )
      if (countX === 2)

        indexToReturn = [...win_combo].filter(element => ticTacToeBoxesCopy[element[0]][element[1]] !== 'X')[0];
    })
    updatePlayerOnePossibleWinIndex(indexToReturn);
    process.env.NODE_ENV.trim() !== 'production' && console.log("indexaboutToWin:", indexToReturn)
    return indexToReturn;
  };

  onChange = async event => {
    if (this.props.gameOver === false && this.props.picked_player === true) {
      const {setCurrentPlayer, setTicTacToeCell,adjust_number_of_turns,updateCurrentPositions} = this.props;
      const indexs = JSON.parse((event.target).id);
      let ticTacToeBoxesCopy = [...this.props.tictactoe_boxes]; //important

      const row_key = indexs.row_key;
      const data_key = indexs.data_key;

      if (this.props.player_one_turn === true) {
        this.filterPossibleWinCombo([row_key,data_key],"player2"); 
      }

      ticTacToeBoxesCopy[row_key][data_key] = (this.props.player_one_turn === true) ? playerSymbols.userLabel : playerSymbols.computerLabel;
      await updateCurrentPositions([...this.props.current_positions , [row_key,data_key]]);
      (this.props.compEnabled === true && this.props.possible_winning_combo.length > 0 ) && this.checkBestPosition([...[...this.props.current_positions , [row_key,data_key]]] , "human"); 
      //checkWin
      await setTicTacToeCell(ticTacToeBoxesCopy);
      
      await adjust_number_of_turns([this.props.remaining_turns] - 1);
      await this.checkWin();
    
      if(this.props.gameOver === false){
          await setCurrentPlayer(!this.props.player_one_turn)  
        }

      if(this.props.compEnabled === true && this.props.gameOver === false){//comp is enabled.
        this.compPickPosition();
       
      }
    } else {
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
      <section id="main">
        <GamesHead />
           
        <div className="Boxes" id="board">
          <table className="tictactoetable" id= {this.props.gameOver === false || [this.props.picked_player] === true ? "notdisabled" : "disabled"} >
              <tbody>
              {
                [...this.props.tictactoe_boxes].map((table_row,row_key) => 
                    <tr key = {row_key} id={`row${row_key+1}`}>
                        {[...table_row].map((table_data, data_key) =>  
                            <td className={this.changeBackgroundIfWin(row_key,data_key)} key = {data_key} id={this.props.gameOver === false ? ((table_data === '') ? JSON.stringify({ row_key : row_key,
                                                                            data_key : data_key}) : tieDisabled) : (tieDisabled)}
                              onClick = {(table_data === '') ? this.onChange : null}> {`${table_data}`} </td>
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
