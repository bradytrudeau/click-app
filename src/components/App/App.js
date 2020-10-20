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
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Metronome from '../Metronome/Metronome';
import SongForm from '../SongForm/SongForm';
import SongLibrary from '../SongLibrary/SongLibrary';
import { Tabs, Tab } from '@material-ui/core';
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
                      textColor="secondary"
                      centered
                    >
                      <Tab 
                        label="Home"
                        value="/home"
                        component={Link}
                        to="/home"
                        className="tabs"
                      />
                      <Tab 
                        label="Metronome"
                        value="/metronome"
                        component={Link}
                        to="/metronome"
                        className="tabs"
                      />
                      <Tab 
                        label="Add a Song"
                        value="/songform"
                        component={Link}
                        to="/songform"
                        className="tabs"
                      />
                      <Tab 
                        label="Song Library"
                        value="/songlibrary"
                        component={Link}
                        to="/songlibrary"
                        className="tabs"
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
