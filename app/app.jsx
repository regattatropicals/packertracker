import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter,
} from 'react-router-dom';
import {
  Provider,
} from 'mobx-react';

import store from './utils/store';
import createScanner from './utils/scanner';

import AlwaysPresent from './components/AlwaysPresent.jsx';
import MainView from './components/MainView.jsx';

import CssBaseline from '@material-ui/core/CssBaseline';

const MainViewWithRouter = withRouter(MainView);

class App extends React.Component {
  componentDidMount() {
    createScanner();
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
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

ReactDOM.render(
  <App />
  , document.getElementById('app'));
