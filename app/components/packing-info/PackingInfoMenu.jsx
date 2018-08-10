import React from 'react';
import {
  Link,
} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class PackingInfoMenu extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <Grid
        container={true}
        alignItems="center"
        spacing={40}
        direction="column"
        justify="center"
        style={{
          'marginTop': '25px',
        }}
      >
        <Grid item={true}>
          <Button
            component={Link}
            to="/packing-info/packers"
            variant="raised"
            size="large"
          >
                    Edit Packer Info
          </Button>
        </Grid>

        <Grid item={true}>
          <Button
            component={Link}
            to="/packing-info/warehouse"
            variant="raised"
            size="large"
          >
                    Edit Warehouse Info
          </Button>
        </Grid>

        <Grid item={true}>
          <Button
            component={Link}
            to="/packing-info/commodity"
            variant="raised"
            size="large"
          >
                    Edit Commodity Info
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default PackingInfoMenu;
