import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';
import EditSongItem from '../EditSongItem/EditSongItem';
import './SongLibrary.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



class SongLibrary extends Component {
    state = {
        visible: false
    };

    componentDidMount() {
        this.props.dispatch({
          type: 'FETCH_SONGS'
        });
    }

    togglePopUp = () => {
        this.setState({
         visible: !this.state.visible
        });
    };

  render() {
      
    return (
      <div>
        <h2>Song Library</h2>
        <table>
          <thead>
              <tr>
                  <th>Track Name</th>
                  <th>BPM</th>
                  <th>Time Signature</th>
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
            />
          </DialogContent>
        </Dialog>
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"DELETE SONG?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to DELETE this track?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);