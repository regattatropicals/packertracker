import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Store from './store';
import createScanner from './scanner';

import AlwaysPresent from './components/AlwaysPresent.js';
import MainView from './components/MainView.js';

import CssBaseline from '@material-ui/core/CssBaseline';

const MainViewWithRouter = withRouter(MainView);

class App extends React.Component {
  componentDidMount() {
    createScanner();
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={Store}>
          <div>
            <CssBaseline />
            <AlwaysPresent />
            <MainViewWithRouter />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

ReactDOM.render((
    <App/>
), document.getElementById('app'));
