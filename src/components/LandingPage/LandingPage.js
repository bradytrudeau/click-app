import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import metronome from '../../images/metronome.png';
import add from '../../images/plus.png';
import library from '../../images/library.png';


import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    loggedIn: true,
  };

  componentDidMount = () => {
    this.onPageLoad();
  }

  onPageLoad = () => {
    if (this.props.store.user.id != null) {
      this.setState({
        loggedIn: true
      })
    }
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div>
        <Dialog onClose={this.state.loggedIn === false} aria-labelledby="simple-dialog-title" open={this.state.loggedIn}>
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
        {this.state.loggedIn ? null :
          <div>
            <RegisterForm /> 
            <center>
              <p>Already registered?</p>
              <Button 
                onClick={() => {
                  this.props.history.push('/login');
                }} 
                variant="outlined" 
                color="primary">
                  Log In
              </Button>
            </center>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
