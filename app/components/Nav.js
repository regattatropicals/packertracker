import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Nav extends React.Component {
    render() {
        return (
            <Grid container={true} alignItems='center' spacing={40} direction='column' justify='center' style={{marginTop: '25px'}}>
                <Grid item>
                    <Button component={Link}
                            to='/shifts'
                            variant='raised'
                            size='large'>
                        Manage Shifts
                    </Button>
                </Grid>
                
                <Grid item>
                    <Button component={Link}
                            to='/report'
                            variant='raised'
                            size='large'>
                        Generate Report
                    </Button>
                </Grid>

                <Grid item>
                    <Button component={Link}
                            to='/packing-info'
                            variant='raised'
                            size='large'>
                        Edit Packing Info
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Nav;
