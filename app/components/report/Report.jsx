import React from 'react';

import Button from '@material-ui/core/Button';

class Report extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <h3>Generate Report:</h3>
        Start Date / Time:
        End Date / Time:
        Location:
        Line:
        Commodity:
        <Button
          variant="raised"
          color="primary"
        >Generate
        </Button>
      </div>
    );
  }
}

export default Report;
