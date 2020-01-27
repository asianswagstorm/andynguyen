import {GAMES_TYPE} from "./types";

export const resetGame = () => ({type: GAMES_TYPE.RESET_GAME});

export const setGameType = (gameType) => ({
    type : GAMES_TYPE.SET_GAME_TYPE,
    gameType
});

export const pickedPlayer = picked_player => ( {
        type: GAMES_TYPE.PICK_PLAYER_TYPE,
        picked_player
    });

export const setTie = isTie => ({
        type: GAMES_TYPE.SET_TIE_TRUE,
        isTie
    });

export const setCurrentPlayer = player_one_turn => ({
        type: GAMES_TYPE.SET_CURRENT_PLAYER,
        player_one_turn
    });

const setOpponentSuccess = compEnabled => ({
        type: GAMES_TYPE.SET_COMP_ENABLED,
        compEnabled 
    });

export const setOpponent = compEnabled => dispatch =>{
    dispatch(setOpponentSuccess(compEnabled))
};

export const setGameOver = (gameOver) => ({
        type: GAMES_TYPE.SET_GAME_OVER,
        gameOver
    });

export const setGameMessage = game_message => ({
        type: GAMES_TYPE.SET_GAME_MESSAGE,
        game_message
    });

export const setPlayer1Score = player1_score => ({
        type: GAMES_TYPE.SET_PLAYER1_SCORE,
        player1_score: player1_score 
    });

export const setPlayer2Score = player2_score => ({
        type: GAMES_TYPE.SET_PLAYER2_SCORE,
        player2_score: player2_score 
    });


