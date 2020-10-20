import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './EditSongItem.css';



class EditSongItem extends Component {

    // newTrack is the Track created by adding info to the input fields
    state = {
        newTrack: {
            name: this.props.store.edit.name,
            bpm: this.props.store.edit.bpm,
            beats: this.props.store.edit.beats,
            regular: this.props.store.edit.regular,
            accent: this.props.store.edit.accent,
            track: this.props.store.edit.track,
            track2: this.props.store.edit.track2,
            id: this.props.store.edit.id,
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
    editTrack = (event) => {
        event.preventDefault();
        this.props.dispatch({ 
            type: 'EDIT_SONG', 
            payload: this.state.newTrack })
        this.setState({
            newTrack: {
                name: '',
                bpm: '',
                beats: '',
                regular: '',
                accent: '',
                track: '',
                track2: '',
                id: '',
                }
            });
            this.props.toggle();
            this.props.setSongs();
            console.log('This.State.NEWTRACK', this.state.newTrack);
            
    }

    handleCancel = () => {
        this.setState({
            newTrack: {
                name: '',
                bpm: '',
                beats: '',
                regular: '',
                accent: '',
                track: '',
                track2: '',
                id: '',
                }
            });
            this.props.toggle();
        }

  render() {
      
    return (
        <div>
            <form className="newSongForm" onSubmit={this.editTrack}>
                <TextField 
                    label='Track Name'
                    type='text'
                    value={this.state.newTrack.name}
                    fullWidth={true}
                    onChange={(event) => this.handleChangeFor('name', event)} 
                />
                <TextField 
                    label='BPM'
                    type='number'
                    value={this.state.newTrack.bpm}
                    fullWidth={true}
                    onChange={(event) => this.handleChangeFor('bpm', event)} 
                />
                <FormControl id="dropdown" fullWidth>
                    <InputLabel id="beatSelectLabel">Time Signature</InputLabel>
                    <Select
                        labelId="beatSelectLabel"
                        id="demo-simple-select"
                        onChange={(event) => this.handleChangeFor('beats', event)}
                        defaultValue={this.props.store.edit.beats}
                        displayEmpty={true}
                    >
                        <MenuItem value={1}>1/4</MenuItem>
                        <MenuItem value={2}>2/4</MenuItem>
                        <MenuItem value={3}>3/4</MenuItem>
                        <MenuItem value={4}>4/4</MenuItem>
                        <MenuItem value={5}>5/4</MenuItem>
                        <MenuItem value={6}>6/4</MenuItem>
                        <MenuItem value={7}>7/4</MenuItem>
                        <MenuItem value={8}>8/4</MenuItem>
                        <MenuItem value={9}>9/4</MenuItem>
                        <MenuItem value={10}>10/4</MenuItem>
                        <MenuItem value={11}>11/4</MenuItem>
                        <MenuItem value={12}>12/4</MenuItem>
                        <MenuItem value={13}>13/4</MenuItem>
                    </Select>
                </FormControl>
                <FormControl 
                    id="dropdown"  
                    fullWidth
                >
                    <InputLabel 
                        id="beatSelectLabel">
                            Accent Beat Sound
                    </InputLabel>
                    <Select
                        disabled={this.state.playing}
                        labelId="beatSelectLabel"
                        id="demo-simple-select"
                        onChange={(event) => this.handleChangeFor('accent', event)}
                        defaultValue={this.props.store.edit.accent}
                        displayEmpty={true}
                    >
                        <MenuItem value="Blip">Blip</MenuItem>
                        <MenuItem value="Clap">Clap</MenuItem>
                        <MenuItem value="Clave">Clave</MenuItem>
                        <MenuItem value="Cowbell">Cowbell</MenuItem>a
                        <MenuItem value="Logic">Logic Pro</MenuItem>
                        <MenuItem value="Stick">Stick Click</MenuItem>
                        <MenuItem value="Tick">Tick</MenuItem>
                        <MenuItem value="Triangle">Triangle</MenuItem>
                    </Select>
                </FormControl>
                <FormControl 
                    id="dropdown"  
                    fullWidth
                >
                    <InputLabel 
                        id="beatSelectLabel">
                            Regular Beat Sound
                    </InputLabel>
                    <Select
                        disabled={this.state.playing}
                        labelId="beatSelectLabel"
                        id="demo-simple-select"
                        onChange={(event) => this.handleChangeFor('regular', event)}
                        defaultValue={this.props.store.edit.regular}
                        displayEmpty={true}
                    >
                        <MenuItem value="Blip">Blip</MenuItem>
                        <MenuItem value="Clap">Clap</MenuItem>
                        <MenuItem value="Clave">Clave</MenuItem>
                        <MenuItem value="Cowbell">Cowbell</MenuItem>
                        <MenuItem value="Logic">Logic Pro</MenuItem>
                        <MenuItem value="Stick">Stick Click</MenuItem>
                        <MenuItem value="Tick">Tick</MenuItem>
                        <MenuItem value="Triangle">Triangle</MenuItem>
                    </Select>
                </FormControl>
                <div className="addTrackBtn">
                    <Button variant='contained' type="submit" color='primary'>Update Track</Button>
                </div>
                <div className="cancelTrackBtn">
                    <Button variant='contained' onClick={this.handleCancel} color='primary'>Cancel</Button>
                </div>
            </form>
        </div>
    )
  }
}
export default connect(mapStoreToProps)(EditSongItem);