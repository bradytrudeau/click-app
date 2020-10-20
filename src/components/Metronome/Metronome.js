import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Metronome.css';
// import audioTrack from '../../Audio/Fineshrine.m4a';
import audioTrack from '../../Audio/Blip.wav';
import audioTrack2 from '../../Audio/Clap.wav';
import audioTrack3 from '../../Audio/Clave.wav';
import audioTrack4 from '../../Audio/Cowbell.wav';
import audioTrack5 from '../../Audio/Logic1.wav';
import audioTrack6 from '../../Audio/Stick.WAV';
import audioTrack7 from '../../Audio/Tick_High.wav';
import audioTrack8 from '../../Audio/Triangle.wav';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



class Metronome extends Component {
    state = {
        playing: false,
        bpm: 0,
        regular: new Audio(audioTrack),
        accent: new Audio(audioTrack2),
        time: null,
        beats: 4,
        count: 0,
        mode: true
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

    // Get sound set in input for the sound values
    handleSoundChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: new Audio(event.target.value)
        })

    }

    // If the track isn't playing, change status to playing
    // And run the function that plays the audio
    handleStartStop = () => {
        if (this.state.playing === true) {
            clearInterval(this.timer);
            this.setState({
                playing: !this.state.playing,
                count: 0
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
    // On the first count of every measure, play a
    // different sound file to indicate start of measure
    playTrack = () => {
        this.setState({
            count: this.state.count + 1,
            mode: !this.state.mode
        })

        if (this.state.count === 1 || this.state.count === 0) {
            this.state.accent.play();
        }
        else if (this.state.count === this.state.beats + 1) {
            this.setState({
                count: 1,
            })
            this.state.accent.play();
        }
        else{
            this.state.regular.play();
        }    
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
        <div className="metronomePage">
            <Container>
                <Card className={`metronome ${this.state.mode}`}>
                    <Typography 
                        variant="h4" 
                        component="h2">
                            Metronome
                    </Typography>
                    <CardContent className="metronomeInside">
                        <TextField
                            disabled={this.state.playing}
                            id="bpmSelect" 
                            label='BPM'
                            type='number'
                            value={this.state.bpm}
                            fullWidth={true}    
                            onChange={this.handleBPMChange('bpm')} 
                        />
                            <FormControl 
                                id="dropdown"  
                                fullWidth
                            >
                                    <InputLabel 
                                        id="beatSelectLabel">
                                            Time Signature
                                    </InputLabel>
                                    <Select
                                        disabled={this.state.playing}
                                        labelId="beatSelectLabel"
                                        id="demo-simple-select"
                                        onChange={this.handleBPMChange('beats')}
                                        defaultValue={4}
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
                                        onChange={this.handleSoundChange('accent')}
                                        defaultValue={audioTrack2}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={audioTrack}>Blip</MenuItem>
                                        <MenuItem value={audioTrack2}>Clap</MenuItem>
                                        <MenuItem value={audioTrack3}>Clave</MenuItem>
                                        <MenuItem value={audioTrack4}>Cowbell</MenuItem>
                                        <MenuItem value={audioTrack5}>Logic</MenuItem>
                                        <MenuItem value={audioTrack6}>Stick</MenuItem>
                                        <MenuItem value={audioTrack7}>Tick</MenuItem>
                                        <MenuItem value={audioTrack8}>Triangle</MenuItem>
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
                                        onChange={this.handleSoundChange('regular')}
                                        defaultValue={audioTrack}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={audioTrack}>Blip</MenuItem>
                                        <MenuItem value={audioTrack2}>Clap</MenuItem>
                                        <MenuItem value={audioTrack3}>Clave</MenuItem>
                                        <MenuItem value={audioTrack4}>Cowbell</MenuItem>
                                        <MenuItem value={audioTrack5}>Logic</MenuItem>
                                        <MenuItem value={audioTrack6}>Stick</MenuItem>
                                        <MenuItem value={audioTrack7}>Tick</MenuItem>
                                        <MenuItem value={audioTrack8}>Triangle</MenuItem>
                                    </Select>
                            </FormControl>
                        <div className="startBtn">
                            <Button
                                disabled={this.state.bpm === 0}
                                variant='contained' 
                                type="submit" 
                                color='primary'
                                onClick={this.handleStartStop}>
                                {this.state.playing ? 'Stop' : 'Start'}
                            </Button>
                        </div>
                        <div className="tapBtn">
                            <Button 
                                variant='contained' 
                                onClick={this.tapTempo} 
                                color='primary'>
                                    Tap Tempo
                            </Button>
                        </div>
                        <Typography 
                            variant="h5" 
                            component="h2">
                                Count: {this.state.count}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
  }
}
export default connect(mapStoreToProps)(Metronome);