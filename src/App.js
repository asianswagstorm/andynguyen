import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import ConnectFour from "./Components/games/ConnectFour";
import TicTacToe from "./Components/games/TicTacToe";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
// import cvPdf from "./Components/pdf/AndyNguyen.pdf";
import Pokemon from "./Components/pokemon/Pokemon";
import Pokemons from "./Components/pokemon/Pokemons";
import { IG_LINK, LINKEDIN_LINK } from "./configs/const";
import * as connect_four_action from "./redux/actions/ConnectFourAction";
import * as covid_action from "./redux/actions/CovidAction";
import * as games_action from "./redux/actions/GamesAction";
import * as music_master_action from "./redux/actions/MusicMasterAction";
import * as pokemon_action from "./redux/actions/PokemonAction";
import * as recipe_action from "./redux/actions/RecipeAction";
import * as tic_tac_toe_action from "./redux/actions/TicTacToeAction";

const CVComponent = () => {
  return (
    <div className="AndyCV" style={{ height: "100vh" }}>
      <iframe src={cvPdf} title="AndyNguyen" height="100%" width="100%" />
    </div>
  );
};

const LinkedIn = () => {
  window.location.href = LINKEDIN_LINK;
  return null;
};

const Instagram = () => {
  window.location.href = IG_LINK;
  return null;
};

export class App extends Component {
  render = () => {
    const routes_components = [
      { path: `/`, component: Home },
      // {path:'/AndyNguyenCV', component: CVComponent},
      // {path:'/CV', component: CVComponent},
      // {path:'/AndyNguyen', component: CVComponent},
      // {path:'/HireMe', component: CVComponent},
      { path: `/TicTacToe`, component: TicTacToe },
      { path: `/Connect4`, component: ConnectFour },
      { path: `/Pokemon`, component: Pokemons },
      { path: `/Pokemon/:pokemonIndex`, component: Pokemon },
      { path: `/connect`, component: LinkedIn },
      { path: `/ig`, component: Instagram },

      //{path:  `/Recipes`, component: RecipeComponent},
      //{path:  `/Recipes/:id`, component: Recipe},
      // {path:  `/Spotify`, component: SpotifyComponent},
      // { path: `/Covid`, component: CovidComponent },
      { path: "*", component: NotFound },
    ];

    return (
      <div className="page-wrap">
        <Navbar />
        <section id="main">
          <section id="main__page">
            <HashRouter>
              <Routes>
                {routes_components.map((route, key) => (
                  <Route
                    key={key}
                    exact
                    path={route.path}
                    element={
                      <route.component
                        {...this.props}
                        action_props={this.props}
                      />
                    }
                  />
                ))}
              </Routes>
            </HashRouter>
          </section>
          <Footer />
        </section>
      </div>
    );
  };
}

//can just do this in the index!!!
export const mapDispatchToProps = (dispatch) => {
  return {
    games_action,
    tic_tac_toe_action,
    connect_four_action,
    pokemon_action,
    recipe_action,
    music_master_action,
    covid_action,
    dispatch,
  };
};

export default connect(null, mapDispatchToProps)(App);
