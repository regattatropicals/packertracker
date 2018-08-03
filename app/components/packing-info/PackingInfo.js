import React from "react";
import { Route, Switch } from "react-router-dom";

import EditCommodityInfo from './commodity/EditCommodityInfo';
import EditPackerInfo from './packers/EditPackerInfo';
import EditWarehouseInfo from './warehouse/EditWarehouseInfo';
import PackingInfoMenu from './PackingInfoMenu';

class PackingInfo extends React.Component {
    render() {
      return (
            <div>
                <Switch>
                    <Route path={this.props.match.url + '/packers'}
                        component={EditPackerInfo} />
                    <Route path={this.props.match.url + '/warehouse'}
                        component={EditWarehouseInfo} />
                    <Route path={this.props.match.url + '/commodity'}
                        component={EditCommodityInfo} />
                    <Route path={this.props.match.url}
                        component={PackingInfoMenu} />
                </Switch>
            </div>
        );
    }
}

export default PackingInfo;
