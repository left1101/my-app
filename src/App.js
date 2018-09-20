import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import './App.css';
import rootReducer from './reducers';
import serverApi from './middleware/serverApi';
import Songbook from './container/Songbook';
import * as Actions from './actions';

const logger = createLogger();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(serverApi, logger))
);

export default class App extends Component {
  componentWillMount() {
    store.dispatch(Actions.login(112));
  }
  render() {
    return (
      <Provider store={store}>
        <Songbook />
      </Provider>
    );
  }
}
