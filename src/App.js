import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Home from "./Components/Home";
// import Games from "./Components/Games";
import TicTacToe from "./Components/games/TicTacToe";//test
import NotFound from "./Components/NotFound";
import * as games_action from './redux/actions/GamesAction';

class App extends Component {

  // componentDidMount = () => {
  //   console.log('App props', this.props);
  // }

  render=()=>{

    const routes_components = [ {path: "/", component: Home},
                                // {path= "/Games", component: <Games/>},
                                {path: "/TicTacToe", component: TicTacToe},
                                {path: "*", component: NotFound}];
    return (

      <BrowserRouter>
      <Switch>
        {
          routes_components.map((route, key) => 
          <Route key={key} exact path = {route.path} render={props => <route.component {...props} action_props={this.props}/>}/>
          )
        }  
      </Switch>
    </BrowserRouter>

    );
  }
}

export const mapDispatchToProps = dispatch => {
  console.log("game action", games_action); // this.props is undefined
  return {
    games_action,
    dispatch
  };
};

export default connect(null,mapDispatchToProps)(App);


