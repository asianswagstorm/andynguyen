import React from 'react';
import {shallow} from 'enzyme'; //shallow no dom or children is rendered.
import {Pokemons} from '../Pokemons';
import Search from '../pokemonHelper/Search';
import {defaultPokemonStates} from "../../../redux/reducers/PokemonReducer";

const renderPokemons = (args) => {
    const props = { ...defaultPokemonStates,
                    dispatch: jest.fn(), action_props: {
                    pokemon_action : {
                                        getPokemonsLimit : jest.fn(),
                                        setPokeTracker : jest.fn(),
                                        getPokemonsByName: jest.fn()
                                    }
                    },
                    ...args
    }; 
    return shallow(<Pokemons {...props} />);
};

describe('Pokemons', () => {
    it('should render', () => {
        const wrapper = renderPokemons()
        expect(wrapper).toMatchSnapshot()
    })

    it('should contain pokemon__app', () =>{
        const wrapper = renderPokemons()
        expect(wrapper.find('div.pokemon__app').length).toEqual(1)
    })
})

describe('functions', () => {
    describe('getNumPokemon', () => {
        it('should return 12', () => {
            const wrapper = renderPokemons()
            expect(wrapper.instance().getNumPokemon()).toBe(12);
        })
    })
    describe('SearchPokemon', () => {
        it('should call searchPokemon', () => {
            const wrapper = renderPokemons()
            const spy = jest.spyOn(wrapper.instance(), 'searchPokemon') //Jest mock function. jest.spyOn(object, methodName)
            wrapper.find('div.pokemon__search__button').at(0).simulate('click');            
            expect(spy).toHaveBeenCalled();
        })
        it('should call onChange', () => {
            const wrapper = renderPokemons()
            const onChangeSpy = jest.spyOn(wrapper.instance(), 'change') 
            const searchWrapper = shallow(<Search searchPokemon ={() => jest.spyOn(wrapper.instance(), 'searchPokemon')} onChange={onChangeSpy} searchedPokemon={"aPokemon"} />);
            searchWrapper.find('input').simulate('change', {target: {value: 'pikachu'} });   
            expect(onChangeSpy).toHaveBeenCalled();
        })
    })
})
