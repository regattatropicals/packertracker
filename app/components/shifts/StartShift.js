import React from "react";

import { Link } from 'react-router-dom';

class StartShift extends React.Component {
    render() {
      return (
            <div>
                <h3>Start New Shift:</h3>
                <label>Location:</label>
                <label>Line:</label>
                <label>Commodity:</label>
                <Link to='/shifts'>Start Now</Link>
            </div>
        );
    }
}

export default StartShift;
