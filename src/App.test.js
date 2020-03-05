import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';


const middlewares = [];
const mockStore = configureStore(middlewares);

//describe is test suite.
it('renders without crashing', () => {//it is test case
  const div = document.createElement('div');
  const initialState = {}
  const store = mockStore(initialState)
  ReactDOM.render(
  <Provider store={store}><App/></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
