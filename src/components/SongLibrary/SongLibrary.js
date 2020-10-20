import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';
import './SongLibrary.css';
import Typography from '@material-ui/core/Typography';

class SongLibrary extends Component {

    componentDidMount() {
      this.setSongs();
    }

    setSongs = () => {
      this.props.dispatch({
        type: 'FETCH_SONGS'
      });
    }

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
        {/* <Dialog 
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
        </Dialog> */}
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);