import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';


class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>
        <h2>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
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
        </div>
        <div>
          <div className="addTrackBtn">
            <Button 
              type="submit"
              variant="contained" 
              color="primary">
                  Log In
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
