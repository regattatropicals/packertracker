import React from "react";

import { Link } from 'react-router-dom';

class Report extends React.Component {
    render() {
      return (
            <div>
                <h3>Generate Report:</h3>
                <label>Start Date / Time:</label>
                <label>End Date / Time:</label>
                <label>Location:</label>
                <label>Line:</label>
                <label>Commodity:</label>
                <button>Generate</button>
            </div>
        );
    }
}

export default Report;
