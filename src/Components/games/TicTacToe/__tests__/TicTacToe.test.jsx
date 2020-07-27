import React from "react";
import {shallow} from 'enzyme'; //shallow no dom or children is rendered.
import TicTacToe from "../TicTacToe";
import {defaultGamesStates} from "../../../../redux/reducers/GamesReducer";
import {defaultTicTacToeStates} from "../../../../redux/reducers/TicTacToeReducer";
import {TICTACTOE_TYPE} from "../../../../redux/actions/types";
import ticTacToeReducer from "../../../../redux/reducers/TicTacToeReducer";

describe('TicTacToe', () => {
    
    let wrapper, instance;
    let dispatch = jest.fn();
    let setPlayer1Score = jest.fn();
    let setPlayer2Score = jest.fn();
    let setGameMessage = jest.fn();
    let setGameOver = jest.fn();
    let setGameType = jest.fn();
    let setTie = jest.fn();
    let setCurrentPlayer = jest.fn();
                       
    let setWinIndex = jest.fn();
    let updatePossibleWinCombo = jest.fn();
    let updatePlayerOnePossibleWinCombo = jest.fn();
    let updateNextMove = jest.fn();
    let updatePlayerOnePossibleWinIndex = jest.fn();
    let setTicTacToeCell = jest.fn();
    let adjust_number_of_turns = jest.fn();
    let updateCurrentPositions = jest.fn();

    const renderTicTacToe = (args) => {
        const props = { ...defaultGamesStates,
                        ...defaultTicTacToeStates,
                        ...args,
                        dispatch,
                        setPlayer1Score,
                        setPlayer2Score,
                        setGameMessage,
                        setGameOver,
                        setGameType,    
                        setTie,
                        setCurrentPlayer,
                        setWinIndex,
                        updatePossibleWinCombo,
                        updatePlayerOnePossibleWinCombo,
                        updateNextMove,
                        updatePlayerOnePossibleWinIndex,
                        setTicTacToeCell,
                        adjust_number_of_turns,
                        updateCurrentPositions
        };
        wrapper = shallow(<TicTacToe {...props}  />)
        instance = wrapper.instance();
    };

    beforeEach(()=> {
        window.scrollTo = jest.fn();
        renderTicTacToe();
    })

    afterEach(() => {
        wrapper.unmount();
    })

    describe("snapshot", () => {
        it('should render', () => {
            expect(wrapper).toMatchSnapshot()
        })
    });

    describe("components", () => {
        it("should contain 3 table rows and 9 table data", () => {
            expect(wrapper.find("tr").length).toBe(3);
            expect(wrapper.find("td.tictactoe-cell").length).toBe(9);
        })
    })

    describe("functions", () => {
        it("aboutToWin should return correct response", () => {
            let computerPositions = [[2,0],[2,2],[0,1]];
            const recommendedPositions = [[2,0],[2,1],[2,2]];
            expect(TicTacToe.aboutToWin(computerPositions,recommendedPositions)).toBeTruthy();
            computerPositions = [[2,0],[1,2],[0,1]];
            expect(TicTacToe.aboutToWin(computerPositions,recommendedPositions)).toBeFalsy();
        })
    })

    describe("reducers", () => {
        it("should update next move", ()=> {
            const action = {
                type: TICTACTOE_TYPE.UPDATE_NEXT_MOVE,
                next_moves: [0,0]
            };

            const nextState = ticTacToeReducer({defaultTicTacToeStates: {next_moves: []}}, action);
            expect(nextState.defaultTicTacToeStates.next_moves).toEqual([0,0]);
        })

        it("handles actions with unknown type", () => {
            const action = {
                type: "UNKNOWN_TYPE"
            };
            const nextState = ticTacToeReducer({defaultTicTacToeStates: {}}, action);
            expect(nextState.defaultTicTacToeStates).toEqual({});
        })
    })

});