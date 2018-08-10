import React from 'react';

import {
  Link,
} from 'react-router-dom';

class StartShift extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <h3>Start New Shift:</h3>
        Location:
        Line:
        Commodity:
        <Link to="/shifts">
          Start Now
        </Link>
      </div>
    );
  }
}

export default StartShift;
