import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
      return (
            <nav>
                <Link to='/shifts'>Manage Shifts</Link>
                <Link to='/report'>Generate Report</Link>
                <Link to='/packing-info'>Edit Packing Info</Link>
            </nav>
        );
    }
}

export default Nav;
