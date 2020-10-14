import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';


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
                    />
                )}
            </tbody>
        </table>
        {/* {this.state.visible ? <PopUp toggle={this.togglePopUp} /> : null} */}
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);