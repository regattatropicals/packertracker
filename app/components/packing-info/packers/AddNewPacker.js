import React from "react";
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const AddNewPacker = inject('store')(observer(
    class AddNewPacker extends React.Component {
        constructor() {
            super();
            this.state = {
                packerFirstName: '',
                packerMiddleInitial: '',
                packerLastName: '',
                packerBadgeId: null,
            };
            this.changeStateOnEvent = this.changeStateOnEvent.bind(this);
            this.onScanButtonPress = this.onScanButtonPress.bind(this);
            this.onClearScanButtonPress = this.onClearScanButtonPress.bind(this);
            this.onAddPacker = this.onAddPacker.bind(this);
        }

        changeStateOnEvent(state) {
            const handler = function (ev) {
                const newState = {};
                newState[state] = ev.target.value;
                this.setState(newState);

            }.bind(this);

            return handler;
        }

        onScanButtonPress(ev) {
            this.props.store.barcodePicker.startScanning('code39', (scanResult) => {
                this.setState({ packerBadgeId: scanResult });
            });
        }

        onClearScanButtonPress(ev) {
            this.setState({ packerBadgeId: null });
            this.props.store.barcodePicker.startScanning('code39', (scanResult) => {
                this.setState({ packerBadgeId: scanResult });
            });
        }

        async onAddPacker(ev) {
            const res = await fetch('/api/packing-info/packers', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    packerFirstName: this.state.packerFirstName,
                    packerMiddleInitial: this.state.packerMiddleInitial,
                    packerLastName: this.state.packerLastName,
                    packerBadgeId: this.state.packerBadgeId
                })
            });
            if (res.status !== 200) {
            } else {
                this.setState({
                    packerFirstName: '',
                    packerMiddleInitial: '',
                    packerLastName: '',
                    packerBadgeId: null
                });
            }
        }

        canAddPacker() {
            return this.state.packerFirstName !== "" &&
                   this.state.packerMiddleInitial.length <= 1 &&
                   this.state.packerLastName !== "" &&
                   this.state.packerBadgeId !== null;
        }

        render() {
            if (!this.props.store.barcodePicker) {
                return <div>Waiting for your camera to activate.</div>
            }

            if (!this.props.store.hasCamera) {
                return <div>You must have a camera to add an Packer.</div>;
            }

            let badgeSpot;
            if (this.state.packerBadgeId === null) {
                badgeSpot = (
                    <div>
                        <Button variant="raised"
                                onClick={this.props.store.currentlyScanning ? null : this.onScanButtonPress }>
                            Scan Packer Badge
                            <i className="material-icons" 
                               style={{verticalAlign: 'middle'}}>
                                camera_enhance
                            </i>
                        </Button>
                    </div>
                );
            } else {
                badgeSpot = (
                    <div>
                        <label>Badge ID: </label> { this.state.packerBadgeId }
                        <Button variant="raised"
                                size="small"
                                onClick={ this.onClearScanButtonPress }
                                style={{marginLeft: '20px'}}>
                            Scan Again
                            <i className="material-icons"
                               style={{color: 'red', verticalAlign: 'middle'}}>
                                close
                            </i>
                        </Button>
                    </div>
                    
                );
            }

            return (
                <Grid container alignItems='center' direction='column' spacing={40}>
                    <Card raised={true} style={{marginTop: '30px', minWidth: '60%', maxWidth: '80%'}}>
                        <h3>Add a new packer:</h3>
                        <Grid container alignItems='center' direction='column' spacing={24}>
                            <Grid item>
                                <TextField label="Packer First Name"
                                        onChange={this.changeStateOnEvent('packerFirstName')}
                                        value={this.state.packerFirstName}
                                        fullWidth={true}/>
                            </Grid>
                            <Grid item>
                                <TextField label="(Optional) Middle Initial"
                                        onChange={this.changeStateOnEvent('packerMiddleInitial')}
                                        error={this.state.packerMiddleInitial.length > 1}
                                        value={this.state.packerMiddleInitial} />
                            </Grid>
                            <Grid item>
                                <TextField label="Packer Last Name"
                                        onChange={this.changeStateOnEvent('packerLastName')}
                                        value={this.state.packerLastName} />
                            </Grid>
                            <Grid item style={{marginBottom: '30px'}}>
                            {badgeSpot}  
                            </Grid>
                        </Grid>
                    </Card>
                    
                    <Grid item>
                        <Button variant="raised"
                                color="primary" 
                                disabled={!this.canAddPacker()}
                                onClick={this.onAddPacker}>
                            Add Packer
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }
));

export default AddNewPacker;
