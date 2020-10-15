import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import metronome from '../../images/metronome.png';
import add from '../../images/add.png';
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
        {/* <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card> */}
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        image={metronome}
                        title="Metronome"
                        style={{ height: "150px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Metronome
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          A classic programmable metronome for keeping time on the fly!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        image={add}
                        title="Metronome"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Metronome
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          A classic programmable metronome for keeping time on the fly!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        image={library}
                        title="Metronome"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Metronome
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          A classic programmable metronome for keeping time on the fly!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            {/* </Card>
          </Grid>
        </Grid> */}
        
        {/* <Dialog onClose={this.state.loggedIn === false} aria-labelledby="simple-dialog-title" open={this.state.loggedIn}>
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
        } */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
