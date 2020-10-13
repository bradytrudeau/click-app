import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SongForm extends Component {
    // newTrack is the Track created by adding info to the input fields
    state = {
        newTrack: {
            name: '',
            bpm: '',
            beats: '',
        }
    }

    // captures the input values in the state
    handleChangeFor = (property, event) => {
        console.log('event happened')
        this.setState({
            newTrack: {
                ...this.state.newTrack,
                [property]: event.target.value,
            }
        });
    }

    // submits the values captured via sagas and resets input fields to default values
    addNewTrack = (event) => {
        event.preventDefault();
        this.props.dispatch({ 
            type: 'ADD_SONG', 
            payload: this.state.newTrack })
        this.setState({
            newTrack: {
                name: '',
                bpm: '',
                beats: '',
                }
            });
    }

    handleCancel = () => {
        this.setState({
            newTrack: {
                name: '',
                bpm: '',
                beats: '',
                }
            });    
        }
    render() {
        return (
            <div>

                <h2>Add a Tempo Track</h2>
                <form className="newSongForm" onSubmit={this.addNewTrack}>
                    <TextField 
                        label='Track Name'
                        type='text'
                        value={this.state.newTrack.name}  
                        fullWidth='true'  
                        onChange={(event) => this.handleChangeFor('name', event)} 
                    />
                    <TextField 
                        label='BPM'
                        type='number'
                        value={this.state.newTrack.bpm}
                        fullWidth='true'    
                        onChange={(event) => this.handleChangeFor('bpm', event)} 
                    />
                        <FormControl id="dropdown" fullWidth>
                                <InputLabel id="beatSelectLabel">Time Signature</InputLabel>
                                <Select
                                    labelId="beatSelectLabel"
                                    id="demo-simple-select"
                                    onChange={(event) => this.handleChangeFor('beats', event)}
                                >
                                    <MenuItem value="1">1/4</MenuItem>
                                    <MenuItem value="2">2/4</MenuItem>
                                    <MenuItem value="3">3/4</MenuItem>
                                    <MenuItem value="4">4/4</MenuItem>
                                    <MenuItem value="5">5/4</MenuItem>
                                    <MenuItem value="6">6/4</MenuItem>
                                    <MenuItem value="7">7/4</MenuItem>
                                    <MenuItem value="8">8/4</MenuItem>
                                    <MenuItem value="9">9/4</MenuItem>
                                    <MenuItem value="10">10/4</MenuItem>
                                    <MenuItem value="11">11/4</MenuItem>
                                    <MenuItem value="12">12/4</MenuItem>
                                    <MenuItem value="13">13/4</MenuItem>
                                </Select>
                        </FormControl>
                    <div className="buttonArea">
                        <Button variant='contained' type="submit" color='primary'>Add a New Track</Button>
                    </div>
                </form>
                <Button variant='contained' onClick={this.handleCancel} color='primary'>Cancel</Button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SongForm);