import React from 'react';

import {
  Link,
} from 'react-router-dom';

import ShiftList from './ShiftList.jsx';

class ActiveShifts extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        Active shifts:
        <ShiftList />
        <Link to="/shifts/start">Start New Shift</Link>
      </div>
    );
  }
}

export default ActiveShifts;
