import React from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const LogOutButton = (props) => (
  <Tabs
    indicatorColor="primary"
    textColor="secondary"
    value={false}
  >
    <Tab
      label="Log Out"
      onClick={() => props.dispatch({ type: 'LOGOUT' })}
    />
  </Tabs>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
