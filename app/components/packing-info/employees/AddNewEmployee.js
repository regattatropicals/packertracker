import React from "react";
import { Link } from 'react-router-dom';

import makeScanner from '../../../scanner';


class AddNewEmployee extends React.Component {
    render() {
      return (
          <div>
            <div>
                Add Employee
            </div>
            <div id="scandit-barcode-picker">
            </div>  
          </div> 
        );
    }

    componentDidMount() {
        makeScanner();
    }
}

export default AddNewEmployee;
