import React from 'react';

import {
  Route, Switch,
} from 'react-router-dom';

import ActiveShifts from './ActiveShifts.jsx';
import StartShift from './StartShift.jsx';

class Shifts extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/start`}
          component={StartShift}
        />
        <Route
          path={this.props.match.url}
          component={ActiveShifts}
        />
      </Switch>
    );
  }
}

export default Shifts;
