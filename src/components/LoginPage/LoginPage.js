import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
  render() {
    return (
      <div className="loginPage">
        <LoginForm />

        <center>
          <p>
            Don't have an account?
          </p>
          <Button 
            onClick={() => {
              this.props.history.push('/registration');
            }} 
            variant="outlined" 
            color="primary">
                Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
