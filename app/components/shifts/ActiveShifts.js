import React from "react";

import { Link } from 'react-router-dom';

import ShiftList from './ShiftList';

class ActiveShifts extends React.Component {
    render() {
      return (
        <div>
            <label>Active shifts:</label>
            <ShiftList />
            <Link to='/shifts/start'>Start New Shift</Link>
        </div>
        );
    }
}

export default ActiveShifts;
