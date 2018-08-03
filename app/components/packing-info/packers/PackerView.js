import React from "react";
import { Link } from 'react-router-dom';


class PackerView extends React.Component {
    render() {
        return (
                <div className="mui--text-justified">
                    <li>
                        {this.props.packerFirstName}
                        {this.props.packerMiddleInitial}
                        {this.props.packerLastName}
                        {this.props.packerBadgeId}
                        {this.props.packerId}
                    </li>
                </div>
        );
    }
}

export default PackerView;
