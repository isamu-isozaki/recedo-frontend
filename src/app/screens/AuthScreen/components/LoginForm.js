/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Login form
 * TODO: Make this a functional component
 */
 import React, { useState } from "react";
import { Link, Button, FormControl, FormLabel, Input, FormHelperText, Flex, Spacer  } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function LoginForm({
  isLoading,
  onSignupLinkPress,
  onLoginPress,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email !== "" && password !== "";
  return (
    <Flex direction='column'>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Spacer />
      <Button
        onClick={() => {
          onLoginPress(email, password);
        }}
        isDisabled={!isValid}
        isLoading={isLoading}
        marginTop='5'
        colorScheme="teal" variant="outline">
          Log in
      </Button>
      <Link href="#" onClick={onSignupLinkPress} color="inherit">
        Register Here
      </Link>
    </Flex>
  );
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  onSignupLinkPress: PropTypes.func,
  onLoginPress: PropTypes.func,
}
export default LoginForm