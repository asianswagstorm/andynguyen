import React from "react";
import {shallow} from 'enzyme'; //shallow no dom or children is rendered.
import {TicTacToe} from "../TicTacToe";
import {defaultGamesStates} from "../../../redux/reducers/GamesReducer";
import {defaultTicTacToeStates} from "../../../redux/reducers/TicTacToeReducer";

const renderTicTacToe = (args) => {
    const props = {...defaultGamesStates, ...defaultTicTacToeStates, ...args, 
                                            dispatch: jest.fn(), action_props: {
                                            games_action : {
                                                                setPlayer1Score : jest.fn(),
                                                                setPlayer2Score : jest.fn(),
                                                                setGameMessage : jest.fn(),
                                                                setGameOver : jest.fn(),
                                                                setGameType : jest.fn(),
                                                                setTie : jest.fn(),
                                                                setCurrentPlayer : jest.fn()
                                                              
                                                            },
                                            tic_tac_toe_action : {
                                                setWinIndex : jest.fn(),
                                                updatePossibleWinCombo : jest.fn(),
                                                updatePlayerOnePossibleWinCombo : jest.fn(),
                                                updateNextMove : jest.fn(),
                                                updatePlayerOnePossibleWinIndex : jest.fn(),
                                                setTicTacToeCell : jest.fn(),
                                                adjust_number_of_turns : jest.fn(),
                                                updateCurrentPositions : jest.fn()
                                            }
                                            }};
    return shallow(<TicTacToe {...props}  />)
};

describe('TicTacToe', () => {
    it('should render', () => {
        const wrapper = renderTicTacToe()
        expect(wrapper).toMatchSnapshot()
    })
});