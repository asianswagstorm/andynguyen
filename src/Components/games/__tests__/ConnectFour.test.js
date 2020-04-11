import React from "react";
import {shallow} from 'enzyme'; //shallow no dom or children is rendered.
import {ConnectFour} from "../ConnectFour";
import {defaultGamesStates} from "../../../redux/reducers/GamesReducer";
import {defaultConnectFourStates} from "../../../redux/reducers/ConnectFourReducer";

const renderConnectFour = (args) => {
    const props = {...defaultGamesStates, ...defaultConnectFourStates, ...args, 
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
                                            connect_four_action : {
                                                updateAvailableColumns : jest.fn(),
                                                setRowNumberByColumn : jest.fn(),
                                                setConnectFourBoard : jest.fn()
                                            }
                                            }};
    return shallow(<ConnectFour {...props}  />)
};

describe('ConnectFour', () => {
    it('should render', () => {
        const wrapper = renderConnectFour()
        expect(wrapper).toMatchSnapshot()
    })
});