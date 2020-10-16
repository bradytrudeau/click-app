import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import metronome from '../../images/metronome.png';
import add from '../../images/add.png';
import library from '../../images/library.png';
import './LandingPage.css';

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
        <center>
          <h2>
            Hello, {this.props.store.user.first_name}! Where would you like to navigate to?
          </h2>
        </center>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <Card
              style={{width: "275px", height: "325px"}}
            >
              <CardActionArea
                onClick={() => this.props.history.push('/metronome')}
              >
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
            <Card
              style={{width: "275px", height: "325px"}}
            >
              <CardActionArea
                onClick={() => this.props.history.push('/songform')}
              >
                <CardMedia
                  image={add}
                  title="New Song"
                  style={{ height: "150px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    New Song
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Add a new song tempo track to your song library for quick access to multiple tempo files!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card
              style={{width: "275px", height: "325px"}}
            >
              <CardActionArea
                onClick={() => this.props.history.push('/songlibrary')}
              >
                <CardMedia
                  image={library}
                  title="Song Library"
                  style={{ height: "150px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Song Library
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    A library of song tempo tracks that you've already created! 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
