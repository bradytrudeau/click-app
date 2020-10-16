import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField 
            label='Username'
            type='text'
            name='username'
            value={this.state.username}  
            fullWidth={true}  
            onChange={this.handleInputChangeFor('username')} 
            />
          <TextField 
            label='Password'
            type='password'
            name='password'
            value={this.state.password}
            fullWidth={true}    
            onChange={this.handleInputChangeFor('password')} 
          />
          <TextField 
            label='First Name'
            type='text'
            name='first_name'
            value={this.state.first_name}  
            fullWidth={true}  
            onChange={this.handleInputChangeFor('first_name')} 
            />
          <TextField 
            label='Last Name'
            type='text'
            name='last_name'
            value={this.state.last_name}
            fullWidth={true}    
            onChange={this.handleInputChangeFor('last_name')} 
          />
        </div>
        <div>
          <div className="addTrackBtn">
            <Button 
              type="submit"
              value="Register"
              variant="contained" 
              color="primary">
                  Register
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RegisterForm));
