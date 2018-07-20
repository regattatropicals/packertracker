import React from "react";
import { Link } from 'react-router-dom';

class EditEmployeeInfoMenu extends React.Component {
    render() {
      return (
            <div>
                <Link to="/packing-info/employees/add">Add Employee</Link>
                <Link to="/packing-info/employees/remove">Remove Employee</Link>
            </div>
        );
    }
}

export default EditEmployeeInfoMenu;
