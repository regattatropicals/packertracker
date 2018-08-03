import React from "react";
import { Link } from 'react-router-dom';

import PackerView from './PackerView';

import Card from '@material-ui/core/Card';
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


import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

class ListPackers extends React.Component {
    constructor() {
        super();
        this.state = {
            packers: null,
            search: ''
        };
    }

    async componentDidMount() {
        const res = await fetch('/api/packing-info/packers', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const packerList = await res.json();
        this.setState({
            packers: packerList
        });
    }

    handleChange(stateVar) {
        return (event) => {
            this.setState({ [stateVar]: event.target.value });
        };
    }

    render() {
        if (this.state.packers === null) {
            return (
                <div style={{textAlign: 'center'}}>
                    Loading list of packers...<br />
                    <CircularProgress variant='indeterminate' />
                </div>
                
            );
        } else if (this.state.packers.length === 0) {
            return (
                <div>
                    There are currently no packers stored in the database.
                </div>
            );
        } else {
            const searchTerms = this.state.search.trim().split(/\s+/);
            let shouldDisplay;
            if (searchTerms.length === 1 && searchTerms[0] === '') {
                shouldDisplay = (packer) => {
                    return true;
                }
            } else {
                shouldDisplay = (packer) => {
                    for (let i = 0; i < searchTerms.length; i += 1) {
                        if (packer.employee_firstname.includes(searchTerms[i]) || packer.employee_lastname.includes(searchTerms[i])) {
                            return true
                        }
                    }
                    return false;
                }
            }
            const packerList = this.state.packers.filter(shouldDisplay).map((packer) => {
                return (
                    <ListItem key={packer.packer_id}>
                        <ListItemText>
                            {`${packer.employee_firstname} ${packer.employee_middleinitial} ${packer.employee_lastname}`}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            });
            return (
                <Grid container direction='column' alignContent='center' justify='center' spacing={24}>
                    <Grid item>
                        <FormControl style={{width: '100%'}}>
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
                    <Grid item>
                        <Card raised={true} style={{minWidth: '60%', maxWidth: '80%', margin: 'auto'}}>
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
