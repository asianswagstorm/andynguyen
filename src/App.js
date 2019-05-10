import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from "./Components/Home";
import soen387 from "./Components/soen387";
import soen487 from "./Components/soen487";
import soen287 from "./Components/soen287";
import comp353 from "./Components/comp353";
import comp345 from "./Components/comp345";
import soen423 from "./Components/soen423";
import comp445 from "./Components/comp445";
class App extends Component {

  render=()=>{
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Jamdo" exact component ={soen487} />
        <Route path="/Pokemon" exact component ={soen387} />
        <Route path="/Real_Estate" exact component ={soen287} />
        <Route path="/Medical_Clinic" exact component ={comp353} />
        <Route path="/PowerGrid" exact component ={comp345} />
        <Route path="/Distributed_System" exact component ={soen423} />
        <Route path="/UDP_APP" exact component ={comp445} />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;


