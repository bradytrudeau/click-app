import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';
import EditSongItem from '../EditSongItem/EditSongItem';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, FormControl, InputLabel, MenuItem, Modal } from '@material-ui/core';
import './SongLibrary.css';


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
        {/* {this.state.visible ? <EditSongItem toggle={this.togglePopUp}/> : null} */}
        <Modal
          open={this.state.visible}
          onClose={this.togglePopUp}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <EditSongItem toggle={this.togglePopUp}/>
        </Modal>
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);