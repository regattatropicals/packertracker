import React from "react";

import { Route, Switch } from 'react-router-dom';

import ActiveShifts from './ActiveShifts';
import StartShift from './StartShift';

class Shifts extends React.Component {
    render() {
      return (
            <Switch>
                <Route path={this.props.match.url + '/start'}
                       component={StartShift} />
                <Route path={this.props.match.url}
                       component={ActiveShifts} />
            </Switch>
        );
    }
}

export default Shifts;
