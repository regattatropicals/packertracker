import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';

import EditCommodityInfo from './commodity/EditCommodityInfo.jsx';
import EditPackerInfo from './packers/EditPackerInfo.jsx';
import EditWarehouseInfo from './warehouse/EditWarehouseInfo.jsx';
import PackingInfoMenu from './PackingInfoMenu.jsx';

class PackingInfo extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/packers`}
            component={EditPackerInfo}
          />
          <Route
            path={`${this.props.match.url}/warehouse`}
            component={EditWarehouseInfo}
          />
          <Route
            path={`${this.props.match.url}/commodity`}
            component={EditCommodityInfo}
          />
          <Route
            path={this.props.match.url}
            component={PackingInfoMenu}
          />
        </Switch>
      </div>
    );
  }
}

export default PackingInfo;
