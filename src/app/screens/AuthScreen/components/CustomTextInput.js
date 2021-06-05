/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * TODO: Make into functional component
 */
import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

/**
 * isEnabled {boolean}. 
 * Returns text input.
 */
export default class AuthTextInput extends Component {
  state = {
    isFocused: false,
  };

  focus = () => this.textInputRef.focus();

  render() {
    const {isEnabled, ...otherProps} = this.props;
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='d-flex justify-content-start'>
            <Form.Label>{this.props.placeholder}</Form.Label>
          </div>
          <Form.Control
            {...otherProps}
          />
        </div>
      </div>
    );
  }
}
