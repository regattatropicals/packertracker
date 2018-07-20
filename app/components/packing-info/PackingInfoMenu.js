import React from "react";
import { Link } from 'react-router-dom';

class PackingInfoMenu extends React.Component {
    render() {
      return (
            <div>
                <Link to="/packing-info/employees">Edit Employee Info</Link>
                <Link to="/packing-info/warehouse">Edit Warehouse Info</Link>
                <Link to="/packing-info/commodity">Edit Commodity Info</Link>
            </div>
        );
    }
}

export default PackingInfoMenu;
