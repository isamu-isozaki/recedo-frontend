/* eslint-disable react/prop-types */
/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Shows option to create account or sign in
 * TODO: Make this a functional component
 */
import React from 'react';
import { Button, Flex, Spacer, Divider } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function Opening({onCreateAccountPress, onSignInPress}) {
  return (
    <Flex direction='column' marginTop='10'>
      <Button
        onClick={onCreateAccountPress}
        colorScheme="teal" variant="outline">
          Create Account
      </Button>
      <Button
        marginTop='5'
        onClick={onSignInPress}
        colorScheme="teal" variant="outline">
          Sign In
      </Button>
    </Flex>
  );
}
Opening.propTypes = {
  onCreateAccountPress: PropTypes.func,
  onSignInPress: PropTypes.func,
}
export default Opening