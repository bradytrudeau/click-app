import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';

import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Metronome from '../Metronome/Metronome';
import SongForm from '../SongForm/SongForm';
import SongLibrary from '../SongLibrary/SongLibrary';
import EditSongItem from '../EditSongItem/EditSongItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import LogOutButton from '../LogOutButton/LogOutButton';


import './App.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }
  


  render() {
    return (
      <div>
        <div>
          <h1 className="appTitle">CLICK!</h1>
        </div>
        <span className="nav-right">
          <Router>
            {/* {!this.props.store.user.id && (
              <>
                <Link className="nav-link" to="/login">Login / Register</Link>
              </>
            )} */}
            {this.props.store.user.id && (
              <>
                <LogOutButton className="nav-link" />
              </>
            )}
          </Router>
        </span>
          <Router>
            {this.props.store.user.id && (
              <Route 
                render={(history) => (
                  <div className="tabArea">
                    <Tabs
                      value={history.location.pathname}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <Tab 
                        label="Home"
                        value="/home"
                        component={Link}
                        to="/home"
                      />
                      <Tab 
                        label="Metronome"
                        value="/metronome"
                        component={Link}
                        to="/metronome"
                      />
                      <Tab 
                        label="Add a Song"
                        value="/songform"
                        component={Link}
                        to="/songform"
                      />
                      <Tab 
                        label="Song Library"
                        value="/songlibrary"
                        component={Link}
                        to="/songlibrary"
                      />
                    </Tabs>
                  </div>
                )}
                />
              )}
            <Switch>
              <Redirect exact from="/" to="/home" />
              <ProtectedRoute 
                path="/metronome" 
                component={Metronome}
              />
              <ProtectedRoute 
                path="/songform" 
                component={SongForm}
              />
              <ProtectedRoute 
                path="/songlibrary" 
                component={SongLibrary}
              />
              <ProtectedRoute
                exact
                path="/login"
                component={LoginPage}
                authRedirect="/home"
              />  
              <ProtectedRoute
                exact
                path="/registration"
                component={RegisterPage}
                authRedirect="/home"
              />
              <ProtectedRoute
                exact
                path="/home"
                component={LandingPage}
              />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        <Footer/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(App);
