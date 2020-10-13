import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SongItem from '../SongItem/SongItem';


class SongLibrary extends Component {

    componentDidMount() {
        this.props.dispatch({
          type: 'FETCH_SONGS'
        });
      }

  render() {
      
    return (
      <div>
        <h2>Song Library</h2>
        <table>
            <thead>
                <tr>
                <th>Track Name</th>
                <th>BPM</th>
                <th>Beats Per Measure</th>
                <th>Edit Track</th>
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
      </div>
    )
  }
}
export default connect(mapStoreToProps)(SongLibrary);