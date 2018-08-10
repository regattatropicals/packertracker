import React from 'react';
import {
  inject, observer,
} from 'mobx-react';

import {
  OK,
} from '../../../utils/status';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';
import CameraIcon from '@material-ui/icons/CameraEnhance';
import CloseIcon from '@material-ui/icons/Close';

const AddNewPacker = inject('store')(observer(
  class AddNewPacker extends React.Component {
    constructor() {
      super();
      this.state = {
        'packerFirstName': '',
        'packerMiddleInitial': '',
        'packerLastName': '',
        'packerBadgeId': null,
      };
      this.changeStateOnEvent = this.changeStateOnEvent.bind(this);
      this.handleScanButtonPress = this.handleScanButtonPress.bind(this);
      this.handleClearScanButtonPress = this.handleClearScanButtonPress.bind(this);
      this.handleAddPacker = this.handleAddPacker.bind(this);
    }

    changeStateOnEvent(state) {
      const handler = function handler(ev) {
        const newState = {};

        newState[state] = ev.target.value;
        this.setState(newState);
      }.bind(this);

      return handler;
    }

    handleScanButtonPress() {
      this.props.store.barcodePicker.handleStartScanning('code39', (scanResult) => {
        this.setState({
          'packerBadgeId': scanResult,
        });
      });
    }

    handleClearScanButtonPress() {
      this.setState({
        'packerBadgeId': null,
      });
      this.props.store.barcodePicker.handleStartScanning('code39', (scanResult) => {
        this.setState({
          'packerBadgeId': scanResult,
        });
      });
    }

    async handleAddPacker() {
      const res = await fetch('/api/packing-info/packers', {
        'method': 'POST',
        'credentials': 'include',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({
          'packerFirstName': this.state.packerFirstName,
          'packerMiddleInitial': this.state.packerMiddleInitial,
          'packerLastName': this.state.packerLastName,
          'packerBadgeId': this.state.packerBadgeId,
        }),
      });

      if (res.status === OK) {
        this.setState({
          'packerFirstName': '',
          'packerMiddleInitial': '',
          'packerLastName': '',
          'packerBadgeId': null,
        });
      } else {
        console.info('failed');
      }
    }

    canAddPacker() {
      return this.state.packerFirstName !== ''
                   && this.state.packerMiddleInitial.length <= 1
                   && this.state.packerLastName !== ''
                   && this.state.packerBadgeId !== null;
    }

    render() {
      if (! this.props.store.barcodePicker) {
        return <div>Waiting for your camera to activate.</div>;
      }

      if (! this.props.store.hasCamera) {
        return <div>You must have a camera to add an Packer.</div>;
      }

      let badgeSpot;

      if (this.state.packerBadgeId === null) {
        const onClick = this.props.store.currentlyScanning
          ? null
          : this.handleScanButtonPress;

        badgeSpot = (
          <div>
            <Button
              variant="raised"
              onClick={onClick}
            >
              Scan Packer Badge
              <CameraIcon
                style={{
                  'marginLeft': '9px',
                }}
              />
            </Button>
          </div>
        );
      } else {
        badgeSpot = (
          <div>
              Badge ID:
            { this.state.packerBadgeId }
            <Button
              variant="raised"
              size="small"
              onClick={this.handleClearScanButtonPress}
              style={{
                'marginLeft': '20px',
              }}
            >
              Scan Again
              <CloseIcon
                color="error"
                style={{
                  'marginLeft': '9px',
                }}
              />
            </Button>
          </div>
        );
      }

      return (
        <Grid
          container={true}
          alignItems="center"
          direction="column"
          spacing={40}
        >
          <Card
            raised={true}
            style={{
              'marginTop': '30px',
              'minWidth': '60%',
              'maxWidth': '80%',
            }}
          >
            <CardHeader title="Add a new packer:" />

            <CardContent>
              <Grid
                container={true}
                alignItems="center"
                direction="column"
                spacing={24}
              >
                <Grid
                  item={true}
                  style={{
                    'width': '100%',
                    'maxWidth': '450px',
                  }}
                >
                  <TextField
                    label="Packer First Name"
                    onChange={this.changeStateOnEvent('packerFirstName')}
                    value={this.state.packerFirstName}
                    fullWidth={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  style={{
                    'width': '100%',
                    'maxWidth': '450px',
                  }}
                >
                  <TextField
                    label="(Optional) Middle Initial"
                    onChange={this.changeStateOnEvent('packerMiddleInitial')}
                    error={this.state.packerMiddleInitial.length > 1}
                    value={this.state.packerMiddleInitial}
                    fullWidth={true}
                  />

                </Grid>
                <Grid
                  item={true}
                  style={{
                    'width': '100%',
                    'maxWidth': '450px',
                  }}
                >
                  <TextField
                    label="Packer Last Name"
                    onChange={this.changeStateOnEvent('packerLastName')}
                    value={this.state.packerLastName}
                    fullWidth={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  style={{
                    'marginTop': '10px',
                    'marginBottom': '15px',
                  }}
                >
                  {badgeSpot}
                </Grid>
              </Grid>
            </CardContent>

          </Card>

          <Grid item={true}>
            <Button
              variant="raised"
              color="primary"
              disabled={! this.canAddPacker()}
              onClick={this.handleAddPacker}
            >
                            Add Packer
              <AddIcon style={{
                'marginLeft': '9px',
              }}
              />
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
));

export default AddNewPacker;
