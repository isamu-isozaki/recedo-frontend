/* eslint-disable react/prop-types */
/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Shows option to create account or sign in
 * TODO: Make this a functional component
 */
import React, { Component } from 'react';

import CustomButton from './components/CustomButton';
// import metrics from '../../config/metrics';

export default (props) => (
  <div className="container">
    <CustomButton
      text="Create Account"
      variant="success"
      block
      onPress={props.onCreateAccountPress}
    />
    <hr />
    <CustomButton
      text="Sign In"
      onPress={props.onSignInPress}
      block
    />
  </div>
);
