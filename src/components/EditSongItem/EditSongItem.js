import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditSongItem extends Component {
    handleClick = () => {
        this.props.togglePopUp();
    };

  render() {
      
    return (
        <div>
            <div className="modal_content">
                <span className="close" onClick={this.handleClick}>
                    &times;
                </span>
                <p>I'm A Pop Up!!!</p>
            </div>
        </div>
    )
  }
}
export default connect(mapStoreToProps)(EditSongItem);