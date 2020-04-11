import React from 'react';
import {shallow,mount} from 'enzyme';
import {PokemonCard} from '../PokemonCard';
//contextType (Router!!! )
//set defaultState!!!! test different conditions

const pokemonCardComponent = <PokemonCard  name={"aPokemon"}
                                           image = {"pokemonImageLink"}
                                           pokemonIndex={1}/>

const mountPokemonCard = () => mount(pokemonCardComponent);

const shallowRenderPokemonCard = () => shallow(pokemonCardComponent);

describe('Pokemons Card', () => {
    it('should render', () => {
        const wrapper = shallowRenderPokemonCard()
        expect(wrapper).toMatchSnapshot()
    })

    it('should contain individual__card', () =>{
        const wrapper = mountPokemonCard()
        expect(wrapper.find('div.individual__card').length).toEqual(1)
    })
})

