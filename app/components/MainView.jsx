import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import {
  inject, observer,
} from 'mobx-react';

import Nav from './Nav.jsx';
import Shifts from './shifts/Shifts.jsx';
import Report from './report/Report.jsx';
import PackingInfo from './packing-info/PackingInfo.jsx';


const MainView = inject('store')(observer(
  class MainView extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.store.barcodePicker
                && this.props.location.pathname !== prevProps.location.pathname) {
        this.props.store.barcodePicker.handleStopScanning();
      }
    }

    render() {
      const mainViewVisibility = this.props.store.currentlyScanning
        ? 'hidden'
        : 'visible';

      return (
        <div style={{
          'visibility': mainViewVisibility,
        }}
        >
          <Switch>
            <Route
              path="/shifts"
              component={Shifts}
            />
            <Route
              path="/report"
              component={Report}
            />
            <Route
              path="/packing-info"
              component={PackingInfo}
            />
            <Route
              path="/"
              component={Nav}
            />
          </Switch>
        </div>

      );
    }
  }
));

export default MainView;
