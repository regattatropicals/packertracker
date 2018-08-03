import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Store from './store';
import './scanner';

import Nav from './components/Nav.js';
import Shifts from './components/shifts/Shifts.js';
import Report from './components/report/Report.js';
import PackingInfo from './components/packing-info/PackingInfo';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <CssBaseline />
          <div id="scandit-barcode-picker"
               style={{position: 'absolute', visibility: 'hidden', width: '100%', zIndex: '3', pointerEvents: 'none'}}>
          </div>
          <AppBar position='sticky'>
            <Button component={Link} to='/' fullWidth={true} size='large' variant='flat'>Packer Tracker</Button>
          </AppBar>
          <Switch>
            <Route path="/shifts" component={Shifts}/>
            <Route path="/report" component={Report}/>
            <Route path="/packing-info" component={PackingInfo}/>
            <Route path="/" component={Nav}/>
          </Switch> 
        </div>
      </Provider>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'));
