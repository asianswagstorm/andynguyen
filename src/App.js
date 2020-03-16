import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import Home from "./Components/Home";
import TicTacToe from "./Components/games/TicTacToe";//test
import ConnectFour from "./Components/games/ConnectFour";//test
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Metso from "./Components/Metso";
import Pokemons from "./Components/pokemon/Pokemons";
import Pokemon from "./Components/pokemon/Pokemon";
import * as games_action from './redux/actions/GamesAction';
import * as tic_tac_toe_action from './redux/actions/TicTacToeAction';
import * as connect_four_action from './redux/actions/ConnectFourAction';
import * as pokemon_action from "./redux/actions/PokemonAction";
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
                                {path: "*", component: NotFound}];
    return (
      <div className="page-wrap">
        <Navbar/>
        <section id="main">
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
          <Footer />
        </section>
      
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  // (process.env.NODE_ENV.trim() !== 'production') && console.log("game action", {games_action , tic_tac_toe_action}); // this.props is undefined
  return {
    games_action,
    tic_tac_toe_action,
    connect_four_action,
    pokemon_action,
    dispatch
  };
};

export default connect(null,mapDispatchToProps)(App);


