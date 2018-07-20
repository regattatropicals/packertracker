import React from "react";
import { Switch, Route } from "react-router-dom";

import AddNewEmployee from "./AddNewEmployee";
import RemoveEmployee from "./RemoveEmployee";
import EditEmployeeInfoMenu from "./EditEmployeeInfoMenu";

class EditEmployeeInfo extends React.Component {
    render() {
      return (
            <div>
                <Switch>
                    <Route path={this.props.match.url + '/add'}
                        component={AddNewEmployee} />
                    <Route path={this.props.match.url + '/remove'}
                        component={RemoveEmployee} />
                    <Route path={this.props.match.url}
                        component={EditEmployeeInfoMenu} />
                </Switch>
            </div>
        );
    }
}

export default EditEmployeeInfo;