import React from 'react';
import {
  Link,
} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class EditPackerInfoMenu extends React.Component {
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
            to="/packing-info/packers/add"
            variant="raised"
            size="large"
          >
                        Add Packer
          </Button>
        </Grid>

        <Grid item={true}>
          <Button
            component={Link}
            to="/packing-info/packers/list"
            variant="raised"
            size="large"
          >
                        Packer List
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default EditPackerInfoMenu;
