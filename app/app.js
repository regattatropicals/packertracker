import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav.js';
import Shifts from './components/shifts/Shifts.js';
import Report from './components/report/Report.js';
import PackingInfo from './components/packing-info/PackingInfo';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1><Link to='/'>Packer Tracker</Link></h1>
        <Switch>
          <Route path="/shifts" component={Shifts}/>
          <Route path="/report" component={Report}/>
          <Route path="/packing-info" component={PackingInfo}/>
          <Route path="/" component={Nav}/>
        </Switch>
      </div>
    );
  }
}


ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'));