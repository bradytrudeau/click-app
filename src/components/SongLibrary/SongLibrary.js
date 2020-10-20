import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';
import EditSongItem from '../EditSongItem/EditSongItem';
import './SongLibrary.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

class SongLibrary extends Component {
    state = {
        visible: false,
        songs: this.props.store.songs
    };

    componentDidMount() {
      this.setSongs();
    }

    setSongs = () => {
      this.props.dispatch({
        type: 'FETCH_SONGS'
      });
      this.setState({
        songs: this.props.store.songs
      });
      setTimeout(() => {console.log('SONGS SET!', this.props.store.songs)}, 2000)      
      setTimeout(() => {this.setState({songs: this.props.store.songs})}, 2000)
      setTimeout(() => {console.log('STATE SET!', this.state.songs)}, 3000)      

    }

    togglePopUp = () => {
        this.setState({
         visible: !this.state.visible
        });
    };

  render() {
      
    return (
      <div>
        <center className="introBlurb">
          <Typography 
            variant="h4" 
            component="h2">
              Song Library
          </Typography>
        </center>
        <table>
          <thead>
              <tr>
                  <th>Track Name</th>
                  <th>BPM</th>
                  <th>Time Signature</th>
                  <th>Accent Click Sound</th>
                  <th>Regular Click Sound</th>
                  <th>Edit Track</th>
                  <th>Delete Track</th>
                  <th>Play Track</th>
              </tr>
          </thead>
          <tbody>
          {this.props.store.songs.map((song, i) => 
                <SongItem
                  key={song.id}
                  song={song}
                  toggle={this.togglePopUp}
                />
              )}
          </tbody>
        </table>
        <Dialog 
          open={this.state.visible} 
          onClose={this.togglePopUp} 
          aria-labelledby="form-dialog-title"
          TransitionComponent={Slide}
        >
          <DialogTitle id="form-dialog-title">Edit Track</DialogTitle>
          <DialogContent>
            <EditSongItem 
              toggle={this.togglePopUp}
              setSongs={this.setSongs}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);