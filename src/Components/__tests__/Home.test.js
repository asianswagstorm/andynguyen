import React from 'react';
import ReactDOM from 'react-dom';
import Home from "../Home.js"

describe('HomeRenders', () => {
    describe('render', () => {
        it('home renders without crashing', () => {
          const div = document.createElement('div');
          ReactDOM.render(<Home/>, div);
          ReactDOM.unmountComponentAtNode(div);
        });
      });
});