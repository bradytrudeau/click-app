import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import audioTrack from '../../Audio/FineMetronome.wav';



class SongItem extends Component {
    state = {
        playing: false,
        bpm: 0,
        track: new Audio(audioTrack),
        time: null
    }


    // Get number set in input for the bpm value
    handleBPMChange = (propertyName) => (event) => {

        if (this.state.playing === true) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playTrack, (60 / event.target.value) * 1000);
            this.setState({
                [propertyName]: event.target.value
            })
        }
            else {
            this.setState({
                [propertyName]: event.target.value
            })
        }
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
        }
       }
    
    // Plays imported sound file
    playTrack = () => {
            this.state.track.play();    
    }

    // Take system time of the first click and set it to the state
    // Take system time of the second click and subtract the time
    // of the first click to get the difference
    // Set state to reflect the bpm of that time difference
    tapTempo = () => {
        if (this.state.time === null) {
            this.setState({
                time: Date.now()
            })
        }
        else {
            let secondClick = Date.now();
            let timeDifference = secondClick - this.state.time;
            this.setState({
                bpm: Math.ceil((60 / timeDifference) * 1000),
                time: null
            });
        }
    }

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
                {this.props.song.beats}  
            </td>
            <td>
                <button>Edit</button>
            </td>
            <td>
                <button>Play</button>
            </td>                            
    </tr>
    )
  }
}
export default connect(mapStoreToProps)(SongItem);