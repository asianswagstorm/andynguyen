import React from 'react';
import {shallow} from 'enzyme';
import Evolution from '../pokemonHelper/Evolution';
import {NoResults} from '../pokemonHelper/NoResults';
import Profile from '../pokemonHelper/Profile';
import Search from '../pokemonHelper/Search';
import Stats from '../pokemonHelper/Stats';

const shallowRenderEvolution = () => {
    const props = {
        updatePokemon : jest.fn(),
        stage1 : "",
        stage1ID : "",
        stage2 : "",
        stage2ID : "",
        stage3 : "",
        stage3ID : "",
    }
    return shallow(<Evolution {...props} />)
}

const shallowRenderNoResults = () => {
    const props = {
        searchedPokemon : ""
    }
    return shallow(<NoResults {...props} />)
}

const shallowRenderProfile = () => {
    const props = {
        profile_type : "",
        genderRatioTrue : false,
        profile_value : ""
    }
    return shallow(<Profile {...props} />)
}

const shallowRenderSearch = () => {
    const props = {
        onChange : jest.fn(),

        searchedPokemon : ""
    }
    return shallow(<Search {...props} />)
}

const shallowRenderStats = () => {
    const props = {
        stats_type : "",
        stats_size : "",
        themeColor : ""
    }
    return shallow(<Stats {...props} />)
}

describe('Snapshot', () => {
    let wrapper;
    it('Evolution should match snapshot', () => {
        wrapper = shallowRenderEvolution();
        expect(wrapper).toMatchSnapshot();
    })
    it('NoResults should match snapshot', () => {
        wrapper = shallowRenderNoResults();
        expect(wrapper).toMatchSnapshot();
    })
    it('Profile should match snapshot', () => {
        wrapper = shallowRenderProfile();
        expect(wrapper).toMatchSnapshot();
    })
    it('Search should match snapshot', () => {
        wrapper = shallowRenderSearch();
        expect(wrapper).toMatchSnapshot();
    })
    it('Stats should match snapshot', () => {
        wrapper = shallowRenderStats();
        expect(wrapper).toMatchSnapshot();
    })
})

describe('test inputs', () => {
    let wrapper;
    it('should have pokemon_stats', () => {
        wrapper = shallowRenderStats();
        expect(wrapper.find('div.pokemon_stats').exists()).toBe(true)
    })
   
})