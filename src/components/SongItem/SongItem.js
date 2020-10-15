import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import audioTrack from '../../Audio/FineMetronome.wav';
import audioTrack2 from '../../Audio/MegaClap.wav';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

class SongItem extends Component {
    state = {
        playing: false,
        name: this.props.song.name,
        bpm: this.props.song.bpm,
        id: this.props.song.id,
        track: new Audio(audioTrack),
        track2: new Audio(audioTrack2),
        beats: this.props.song.beats,
        count: 0,
        deleting: false
    }

    handleStartStop = () => {
        // If the track isn't playing, change status to playing
        // And run the function that plays the audio
        if (this.state.playing === true) {
            clearInterval(this.timer);
            this.setState({
                playing: !this.state.playing
            })
            console.log('Stopping track');
        }
        else {
            this.timer = setInterval(this.playTrack, (60 / this.state.bpm) * 1000);
            this.setState({
                playing: !this.state.playing
            }, this.playTrack);
            console.log('Starting track');
            console.log('STATE', this.state);
        }
       }
    
    // Plays imported sound file
    playTrack = () => {
        this.state.count++;
        console.log('COUNT', this.state.count);
        if (this.state.count === 1) {
            this.state.track2.play();
        }
        else if (this.state.count === this.state.beats + 1) {
            this.setState({
                count: 1
            })
            this.state.track2.play();
        }
        else{
            this.state.track.play();
        }     
    }

    // Delete song
    deleteSong = () => {
        this.props.dispatch({
            type: 'DELETE_SONG',
            payload: this.props.song.id
        });
        this.setState({
            deleting: false
        })
    }

    handleClick = () => {
        this.props.dispatch({
            type: 'DISPLAY_EDIT_WINDOW',
            payload: this.state
        });
        this.props.toggle();
    };

    openDelete = () => {
        this.setState({
            deleting: true
        })
    };

    handleClose = () => {
        this.setState({
            deleting: false
        })
    };


  render() {
      
    return (
            <tr>
                <td>
                    {this.props.song.name}
                </td>
                <td>
                    {this.props.song.bpm}
                </td>
                <td>
                    {this.props.song.beats}/4 
                </td>
                <td>
                    <Button 
                        onClick={this.handleClick} 
                        variant="contained" 
                        color="primary">
                            Edit
                    </Button>
                </td>
                <td>
                    <Button 
                        onClick={this.openDelete} 
                        variant="contained" 
                        color="primary">
                            Delete
                    </Button>
                    <Dialog
                        open={this.state.deleting}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        TransitionComponent={Slide}>
                        <DialogTitle 
                            id="alert-dialog-title">
                                {"DELETE SONG?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText 
                                id="alert-dialog-description">
                                    Are you sure you want to DELETE this track?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={this.handleClose} 
                                variant="contained" 
                                color="primary">
                                    No
                            </Button>
                            <Button 
                                onClick={this.deleteSong} 
                                variant="contained" 
                                color="primary">
                                    Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </td>
                <td>
                    <Button 
                        onClick={this.handleStartStop} 
                        variant="contained" 
                        color="primary">
                            {this.state.playing ? 'Stop' : 'Start'} 
                    </Button>
                </td>
            </tr>
    )
  }
}
export default connect(mapStoreToProps)(SongItem);