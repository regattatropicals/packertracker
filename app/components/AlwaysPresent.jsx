import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  inject, observer,
} from 'mobx-react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

const AlwaysPresent = inject('store')(observer(
  class AlwaysPresent extends React.Component {
    render() {
      const AppBarVisibility = this.props.store.currentlyScanning
        ? 'hidden'
        : 'visible';
      const ScannerVisibility = this.props.store.currentlyScanning
        ? 'visible'
        : 'hidden';

      let scannerInteractionComponent;

      if (this.props.store.hasCamera && this.props.store.barcodePicker) {
        scannerInteractionComponent = (
          <IconButton
            style={{
              'position': 'absolute',
              'top': '0px',
              'right': '0px',
            }}
          >
            <CloseIcon onClick={this.props.store.barcodePicker.handleStopScanning} />
          </IconButton>);
      }

      return (
        <div>
          <div
            id="scandit-barcode-picker"
            style={{
              'position': 'absolute',
              'visibility': ScannerVisibility,
              'width': '100%',
              'zIndex': '1101',
              'margin': 'auto',
              'top': '0',
              'left': '0',
              'bottom': '0',
              'right': '0',
            }}
          >
            {scannerInteractionComponent}
          </div>
          <AppBar
            position="sticky"
            style={{
              'visibility': AppBarVisibility,
            }}
          >
            <Button
              component={Link}
              to="/"
              fullWidth={true}
              size="large"
              variant="flat"
            >Packer Tracker
            </Button>
          </AppBar>
        </div>
      );
    }
  }
));

export default AlwaysPresent;
