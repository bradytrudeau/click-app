import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />

        <center>
          <p>
            Already registered?
          </p>
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
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
