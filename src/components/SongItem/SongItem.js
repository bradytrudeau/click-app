import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import audioTrack from '../../Audio/FineMetronome.wav';
import audioTrack2 from '../../Audio/MegaClap.wav';




class SongItem extends Component {
    state = {
        playing: false,
        bpm: this.props.song.bpm,
        track: new Audio(audioTrack),
        track2: new Audio(audioTrack2),
        beats: this.props.song.beats,
        count: 0,
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
                    {this.props.song.beats}/4 
                </td>
                <td>
                    <button
                        onClick={this.togglePopUp}>
                            Edit
                    </button>
                </td>
                <td>
                    <button
                        onClick={this.deleteSong}>
                            Delete
                    </button>
                </td>
                <td>
                    <button
                        onClick={this.handleStartStop}>
                        {this.state.playing ? 'Stop' : 'Start'}
                    </button>
                </td>                            
            </tr>
    )
  }
}
export default connect(mapStoreToProps)(SongItem);