/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Sign up form
 * TODO: Make this a functional component
 */
import React, { useState } from "react";
import { Link, Button, FormControl, FormLabel, Input, FormHelperText, Flex, Spacer } from "@chakra-ui/react";
import PropTypes from 'prop-types';


function SignupForm({ 
  isLoading, 
  onLoginLinkPress, 
  onSignupPress 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [editable, setEditable] = useState(true);

  const isValid = email !== "" && password !== "" && firstname !== "" && lastname !== "";
  return (
    <Flex direction='column'>
      <FormControl id="firstname">
        <FormLabel>First name</FormLabel>
        <Input type="username" onChange={(e) => setFirstname(e.target.value)} />
      </FormControl>
      <FormControl id="lastname">
        <FormLabel>Last name</FormLabel>
        <Input type="username" onChange={(e) => setLastname(e.target.value)} />
      </FormControl>
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
          setEditable(false)
          onSignupPress(email, password, firstname, lastname)
        }}
        isDisabled={!isValid || !editable}
        isLoading={isLoading}
        marginTop='5'
        colorScheme="teal" variant="outline">
        Create Account
      </Button>
      <hr />
      <Link href="#" onClick={onLoginLinkPress} color="inherit">
        Sign In Here
      </Link>
    </Flex>
  );
}
SignupForm.propTypes = {
  isLoading: PropTypes.bool,
  onLoginLinkPress: PropTypes.func,
  onSignupPress: PropTypes.func,
}
export default SignupForm