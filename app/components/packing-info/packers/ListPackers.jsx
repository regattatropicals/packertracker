import React from 'react';

import {
  OK,
} from '../../../utils/status';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Modal from '@material-ui/core/Modal';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

class ListPackers extends React.Component {
  constructor() {
    super();
    this.state = {
      'packers': null,
      'search': '',
      'displayModal': false,
      'chosenPacker': null,
      'inMiddleOfRequest': false,
    };
    this.handleSetPackerInactive = this.handleSetPackerInactive.bind(this);
    this.onClickDeactivate = this.onClickDeactivate.bind(this);
    this.handleClickAwayFromModal = this.handleClickAwayFromModal.bind(this);
  }

  async componentDidMount() {
    const res = await fetch('/api/packing-info/packers', {
      'method': 'GET',
      'credentials': 'include',
      'headers': {
        'Content-Type': 'application/json',
      },
    });
    const packerList = await res.json();

    this.setState({
      'packers': packerList,
    });
  }

  handleSetPackerInactive() {
    this.setState({
      'inMiddleOfRequest': true,
    }, async() => {
      const res = await fetch('/api/packing-info/packers', {
        'method': 'DELETE',
        'body': JSON.stringify({
          'packer_id': this.state.chosenPacker.packer_id,
        }),
        'credentials': 'include',
        'headers': {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === OK) {
        const chosenPacker = this.state.chosenPacker;
        const oldPackerList = this.state.packers;
        const indexOfChosenPacker = oldPackerList.indexOf(chosenPacker);

        oldPackerList.splice(indexOfChosenPacker, 1);
        this.setState({
          'displayModal': false,
          'chosenPacker': null,
          'inMiddleOfRequest': false,
        });
      } else {
        console.info('failed');
      }
    });
  }

  handleChange(stateVar) {
    return (event) => {
      this.setState({
        [stateVar]: event.target.value,
      });
    };
  }

  onClickDeactivate(packer) {
    return () => {
      this.setState({
        'displayModal': true,
        'chosenPacker': packer,
      });
    };
  }

  handleClickAwayFromModal() {
    if (! this.state.inMiddleOfRequest) {
      this.setState({
        'displayModal': false,
        'chosenPacker': null,
      });
    }
  }

  render() {
    if (this.state.packers === null) {
      return (
        <div
          style={{
            'textAlign': 'center',
          }}
        >
          Loading list of packers...<br />
          <CircularProgress variant="indeterminate" />
        </div>
      );
    } else if (this.state.packers.length === 0) {
      return (
        <div>
          There are currently no packers stored in the database.
        </div>
      );
    } else {
      const searchTerms = this.state.search.toLocaleLowerCase().trim()
        .split(/\s+/);
      let shouldDisplay;

      if (searchTerms.length === 1 && searchTerms[0] === '') {
        shouldDisplay = () => {
          return true;
        };
      } else {
        shouldDisplay = (packer) => {
          let searchTerm;

          for (let i = 0; i < searchTerms.length; i += 1) {
            searchTerm = searchTerms[i];
            if (packer.employee_firstname.toLocaleLowerCase().includes(searchTerm) || packer.employee_lastname.toLocaleLowerCase().includes(searchTerm)) {
              return true;
            }
          }
          return false;
        };
      }
      const packerList = this.state.packers.filter(shouldDisplay).map((packer) => {
        return (
          <div key={packer.packer_id}>
            <ListItem>
              <ListItemText>
                {`${packer.employee_firstname} ${packer.employee_middleinitial} ${packer.employee_lastname}`}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={this.onClickDeactivate(packer)}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <hr />
          </div>
        );
      });

      const closeModalAction = (
        <CardAction>
          <CloseIcon onClick={this.handleClickAwayFromModal} />
        </CardAction>
      );

      let modalActionSection;

      if (this.state.inMiddleOfRequest) {
        modalActionSection = (
          <Grid
            container={true}
            direction="column"
            spacing={24}
            style={{
              'marginTop': '10px',
            }}
          >
            <Grid item={true}>
              <CircularProgress variant="indeterminate" />
            </Grid>
          </Grid>);
      } else {
        modalActionSection = (
          <Grid
            container={true}
            direction="column"
            spacing={24}
            style={{
              'marginTop': '10px',
            }}
          >
            <Grid item={true}>
              <Button
                variant="raised"
                onClick={this.handleSetPackerInactive}
              >
                Set as inactive
              </Button>
            </Grid>
            <Grid item={true}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.handleClickAwayFromModal}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>);
      }
      return (
        <Grid
          container={true}
          direction="column"
          alignContent="center"
          justify="center"
          spacing={24}
        >
          <Modal
            open={this.state.displayModal}
            onBackdropClick={this.handleClickAwayFromModal}
          >
            <Grid
              container={true}
              direction="column"
              justify="center"
              style={{
                'height': '100%',
                'pointerEvents': 'none',
              }}
            >
              <Grid
                item={true}
                style={{
                  'height': 'auto',
                  'maxWidth': '400px',
                  'width': '80%',
                  'margin': 'auto',
                }}
              >
                <Card
                  raised={true}
                  style={{
                    'height': 'auto',
                    'width': '100%',
                    'textAlign': 'center',
                    'padding': 'auto',
                    'pointerEvents': 'auto',
                  }}
                >
                  <CardHeader
                    title="Set packer as inactive?"
                    action={closeModalAction}
                  />
                  <CardContent>
                    {this.state.chosenPacker
                      ? `
                        Do you really want to set
                        ${this.state.chosenPacker.employee_firstname}
                        ${this.state.chosenPacker.employee_middleinitial}
                        ${this.state.chosenPacker.employee_lastname}
                        (badge ID ${this.state.chosenPacker.packer_code}) as inactive?
                        Only do this if the packer will not be working future shifts.
                      `
                      : null}
                    {modalActionSection}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Modal>
          <Grid item={true}>
            <FormControl style={{
              'width': '100%',
            }}
            >
              <InputLabel htmlFor="search-by-name">Search by name: </InputLabel>
              <Input
                id="search-by-name"
                value={this.state.search}
                onChange={this.handleChange('search')}
                endAdornment={
                  <InputAdornment position="end">
                    <Icon>
                      <SearchIcon />
                    </Icon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item={true}>
            <Card
              raised={true}
              style={{
                'minWidth': '60%',
                'maxWidth': '80%',
                'margin': 'auto',
              }}
            >
              <List>
                {packerList}
              </List>
            </Card>
          </Grid>
        </Grid>
      );
    }
  }
}

export default ListPackers;
