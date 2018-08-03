import React from "react";
import { Switch, Route } from "react-router-dom";

import AddNewPacker from "./AddNewPacker";
import ListPackers from "./ListPackers";
import EditPackerInfoMenu from "./EditPackerInfoMenu";

class EditPackerInfo extends React.Component {
    render() {
      return (
            <div>
                <Switch>
                    <Route path={this.props.match.url + '/add'}
                        component={AddNewPacker} />
                    <Route path={this.props.match.url + '/list'}
                        component={ListPackers} />
                    <Route path={this.props.match.url}
                        component={EditPackerInfoMenu} />
                </Switch>
            </div>
        );
    }
}

export default EditPackerInfo;