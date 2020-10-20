import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Blip from '../../Audio/Blip.wav';
import Clap from '../../Audio/Clap.wav';
import Clave from '../../Audio/Clave.wav';
import Cowbell from '../../Audio/Cowbell.wav';
import Logic from '../../Audio/Logic1.wav';
import Stick from '../../Audio/Stick.WAV';
import Tick from '../../Audio/Tick_High.wav';
import Triangle from '../../Audio/Triangle.wav';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditSongItem from '../EditSongItem/EditSongItem';



class SongItem extends Component {
    state = {
        count: 0,
        playing: false,
        deleting: false,
        visible: false
    }

    regularSound = (regularSoundToBePlayed) => {
        let regularAudio;
        switch(regularSoundToBePlayed) {
            case "Blip":
                regularAudio = new Audio(Blip);
                return regularAudio;
            case "Clap":
                regularAudio = new Audio(Clap);
                return regularAudio;
            case "Clave":
                regularAudio = new Audio(Clave);
                return regularAudio;
            case "Cowbell":
                regularAudio = new Audio(Cowbell);
                return regularAudio;
            case "Logic":
                regularAudio = new Audio(Logic);
                return regularAudio;
            case "Stick":
                regularAudio = new Audio(Stick);
                return regularAudio;
            case "Tick":
                regularAudio = new Audio(Tick);
                return regularAudio;
            case "Triangle":
                regularAudio = new Audio(Triangle);
                return regularAudio;
        }
        return regularAudio;
    }

    accentSound = (accentSoundToBePlayed) => {
        let accentAudio;
        switch(accentSoundToBePlayed) {
            case "Blip":
                accentAudio = new Audio(Blip);
                return accentAudio;
            case "Clap":
                accentAudio = new Audio(Clap);
                return accentAudio;
            case "Clave":
                accentAudio = new Audio(Clave);
                return accentAudio;
            case "Cowbell":
                accentAudio = new Audio(Cowbell);
                return accentAudio;
            case "Logic":
                accentAudio = new Audio(Logic);
                return accentAudio;
            case "Stick":
                accentAudio = new Audio(Stick);
                return accentAudio;
            case "Tick":
                accentAudio = new Audio(Tick);
                return accentAudio;
            case "Triangle":
                accentAudio = new Audio(Triangle);
                return accentAudio;
        }
        return accentAudio;
    }

    handleStartStop = () => {
        // If the track isn't playing, change status to playing
        // And run the function that plays the audio
        if (this.state.playing === true) {
            clearInterval(this.timer);
            this.setState({
                playing: !this.state.playing,
                count: 0
            })
            console.log('Stopping track');
        }
        else {
            this.timer = setInterval(this.playTrack, (60 / this.props.song.bpm) * 1000);
            this.setState({
                playing: !this.state.playing
            }, this.playTrack);
            console.log('Starting track');
            console.log('STATE', this.state);
        }
       }
    
    // Plays imported sound file
    playTrack = () => {

        this.setState({
            count: this.state.count + 1,
        })
        if (this.state.count === 1 || this.state.count === 0) {
            this.accentSound(this.props.song.accent).play();
        }
        else if (this.state.count === this.props.song.beats + 1) {
            this.setState({
                count: 1
            })
            this.accentSound(this.props.song.accent).play();   
        }
        else{
            this.regularSound(this.props.song.regular).play();
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

    onClickEdit = () => {
        this.props.dispatch({
            type: 'SET_SONG_TO_EDIT',
            payload: this.props.song
        });
        this.toggleEditPopUp();
    };

    openDelete = () => {
        this.setState({
            deleting: true
        })
    };

    closeDelete = () => {
        this.setState({
            deleting: false
        })
    };
    
    toggleEditPopUp = () => {
        this.setState({
         visible: !this.state.visible
        });
    };

  render() {
      console.log('NEWEST SONG LIST', this.props.song);
      
      
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
                    {this.props.song.accent}
                </td>
                <td>
                    {this.props.song.regular}
                </td>
                <td>
                    <Button
                        disabled={this.state.playing}
                        onClick={this.onClickEdit} 
                        variant="contained" 
                        color="primary">
                            Edit
                    </Button>
                    <Dialog 
                        open={this.state.visible} 
                        onClose={this.toggleEditPopUp} 
                        aria-labelledby="form-dialog-title"
                        TransitionComponent={Slide}
                    >
                        <DialogTitle id="form-dialog-title">Edit Track</DialogTitle>
                        <DialogContent>
                            <EditSongItem 
                                toggleEdit={this.toggleEditPopUp}
                                setSongs={this.props.setSongs}
                            />
                        </DialogContent>
                    </Dialog>
                </td>
                <td>
                    <Button
                        disabled={this.state.playing}
                        onClick={this.openDelete} 
                        variant="contained" 
                        color="primary">
                            Delete
                    </Button>
                    <Dialog
                        open={this.state.deleting}
                        onClose={this.closeDelete}
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