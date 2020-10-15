import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import metronome from '../../images/metronome.png';
import add from '../../images/plus.png';
import library from '../../images/library.png';



class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  state = {
    dialog: true
  }
  render() {
    return (
    <Dialog onClose={this.state.dialog === false} aria-labelledby="simple-dialog-title" open={this.state.dialog}>
      <DialogTitle id="simple-dialog-title">Hello, {this.props.store.user.first_name}! Where would you like to navigate to?</DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={metronome}/>
          </ListItemAvatar>
          <ListItemText primary="Metronome"/>
        </ListItem>

        <ListItem button>
          <ListItemAvatar>
            <Avatar src={add}/>
          </ListItemAvatar>
          <ListItemText primary="Add a Song"/>
        </ListItem>

        <ListItem button>
          <ListItemAvatar>
            <Avatar src={library}/>
          </ListItemAvatar>
          <ListItemText primary="Song Library"/>
        </ListItem>

      </List>
    </Dialog>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
