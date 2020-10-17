import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import LandingPage from '../LandingPage/LandingPage';
import Metronome from '../Metronome/Metronome';
import SongForm from '../SongForm/SongForm';
import SongLibrary from '../SongLibrary/SongLibrary';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';


const Nav = (props) => {
  // let loginLinkData = {
  //   path: '/login',
  //   text: 'Login / Register',
  // };

  // if (props.store.user.id != null) {
  //   loginLinkData.path = '/home';
  //   loginLinkData.text = 'Home';
  // }


  
  // const [selectedTab, setSelectedTab] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };



  return (
    <div className="nav">
      {/* <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}> */}
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {/* {loginLinkData.text}
        </Link> */}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {/* {props.store.user.id && (
          <>
            <Link className="nav-link" to="/metronome">
              Metronome
            </Link>
            <Link className="nav-link" to="/songform">
              Add a Song
            </Link>
            <Link className="nav-link" to="/songlibrary">
              Song Library
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
      </div> */}
      {/* <Router>
        <Route path='/'>
          <Paper>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab 
                label="Home"
                component={Link}
                to="/home"
              />
              <Tab 
                label="Metronome"
                component={Link}
                to="/metronome"
              />
              <Tab 
                label="Add a Song"
                component={Link}
                to="/songform"
              />
              <Tab 
                label="Song Library"
                component={Link}
                to="/songlibrary"
              />
            </Tabs>
          </Paper>
          {selectedTab === 0 && <LandingPage />}
          {selectedTab === 1 && <Metronome />}
          {selectedTab === 2 && <SongForm />}
          {selectedTab === 3 && <SongLibrary />}
        </Route>
        <Switch>
          <Route path="/metronome" component={Metronome}/>
          <Route path="/songform" component={SongForm}/>
          <Route path="/songlibrary" component={SongLibrary}/>
        </Switch>
      </Router> */}

    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
