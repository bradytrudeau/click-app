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
        playing: false,
        name: this.props.song.name,
        bpm: this.props.song.bpm,
        id: this.props.song.id,
        regular: this.props.song.regular,
        accent: this.props.song.accent,
        track: this.props.song.regular,
        track2: this.props.song.accent,
        beats: this.props.song.beats,
        count: 0,
        deleting: false,
    }

    componentDidMount = () => {
        this.regularConditional();
        this.accentConditional();
        setTimeout(() => {console.log('ITEMS SET!', this.state)}, 5000)      
        
    }

    regularConditional = () => {
        if(this.props.song.regular === "Blip") {
            this.setState({
                track: new Audio(Blip)
            });
        }
        else if (this.props.song.regular === "Clap") {
            this.setState({
                track: new Audio(Clap)
            });
        }
        else if (this.props.song.regular === "Clave") {
            this.setState({
                track: new Audio(Clave)
            });
        }
        else if (this.props.song.regular === "Cowbell") {
            this.setState({
                track: new Audio(Cowbell)
            });
        }
        else if (this.props.song.regular === "Logic") {
            this.setState({
                track: new Audio(Logic)
            });
        }
        else if (this.props.song.regular === "Stick") {
            this.setState({
                track: new Audio(Stick)
            });
        }
        else if (this.props.song.regular === "Tick") {
            this.setState({
                track: new Audio(Tick)
            });
        }
        else if (this.props.song.regular === "Triangle") {
            this.setState({
                track: new Audio(Triangle)
            });
        }
    }

    accentConditional = () => {
        if(this.props.song.accent === "Cowbell") {
            this.setState({
                track2: new Audio(Cowbell)
            });
        }
        else if (this.props.song.accent === "Clap") {
            this.setState({
                track2: new Audio(Clap)
            });
        }
        else if (this.props.song.accent === "Clave") {
            this.setState({
                track2: new Audio(Clave)
            });
        }
        else if (this.props.song.accent === "Cowbell") {
            this.setState({
                track2: new Audio(Cowbell)
            });
        }
        else if (this.props.song.accent === "Logic") {
            this.setState({
                track2: new Audio(Logic)
            });
        }
        else if (this.props.song.accent === "Stick") {
            this.setState({
                track2: new Audio(Stick)
            });
        }
        else if (this.props.song.accent === "Tick") {
            this.setState({
                track2: new Audio(Tick)
            });
        }
        else if (this.props.song.accent === "Triangle") {
            this.setState({
                track2: new Audio(Triangle)
            });
        }
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
        console.log('THIS STATE', this.state);
        
        this.setState({
            count: this.state.count + 1,
        })
        if (this.state.count === 1 || this.state.count === 0) {
            this.state.track2.play();
        }
        else if (this.state.count === this.props.song.beats + 1) {
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