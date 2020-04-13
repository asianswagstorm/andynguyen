import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import Home from "./Components/Home";
import TicTacToe from "./Components/games/TicTacToe";
import ConnectFour from "./Components/games/ConnectFour";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Metso from "./Components/Metso";
import Pokemons from "./Components/pokemon/Pokemons"; //eslint-disable-line import/no-named-as-default
import Pokemon from "./Components/pokemon/Pokemon";
import RecipeComponent from "./Components/recipes/RecipeComponent";
import Recipe from "./Components/recipes/Recipe";
import SpotifyComponent from "./Components/spotify/SpotifyComponent";
import CovidComponent from "./Components/covid/CovidComponent";
import CanadaMap from "./Components/covid/CanadaCovid";

import * as games_action from './redux/actions/GamesAction';
import * as tic_tac_toe_action from './redux/actions/TicTacToeAction';
import * as connect_four_action from './redux/actions/ConnectFourAction';
import * as pokemon_action from "./redux/actions/PokemonAction";
import * as recipe_action from "./redux/actions/RecipeAction";
import * as music_master_action from "./redux/actions/MusicMasterAction";
//redux on pokemon
import 'antd/dist/antd.css';

export class App extends Component {

  render=()=>{
    const routes_components = [ {path: `/`, component: Home},
                                {path:  `/TicTacToe`, component: TicTacToe},
                                {path:  `/Connect4`, component: ConnectFour},
                                {path:  `/Experience1`, component: Metso},
                                {path:  `/Pokemon`, component: Pokemons},
                                {path:  `/Pokemon/:pokemonIndex`, component: Pokemon},
                                {path:  `/Recipes`, component: RecipeComponent},
                                {path:  `/Recipes/:id`, component: Recipe},
                                {path:  `/Spotify`, component: SpotifyComponent},
                                {path:  `/Covid`, component: CovidComponent},
                                {path:  `/CovidCanada`, component: CanadaMap},
                                {path: "*", component: NotFound}];
    return (
      <div className="page-wrap">
        <Navbar/>
        <section id="main">
          <section id ="main__page">
            <HashRouter>
              <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={450}
                      classNames="fade"
                    >
                      <Switch>
                        {
                          routes_components.map((route, key) => 
                          <Route key={key} exact path = {route.path} render={props => <route.component {...props} action_props={this.props}/>}/>
                          )
                        }  
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
              )} />
            </HashRouter>
          </section>
          <Footer />
        </section>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    games_action,
    tic_tac_toe_action,
    connect_four_action,
    pokemon_action,
    recipe_action,
    music_master_action,
    dispatch
  };
};

export default connect(null,mapDispatchToProps)(App);


