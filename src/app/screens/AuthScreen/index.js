//Based on https://github.com/mmazzarolo/react-native-login-animation-example
import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import { loadUser, doSignup, doLogin } from 'app/store/auth';
import { connect } from 'react-redux';
import { Flex, Spacer, Divider  } from "@chakra-ui/react";
import PropTypes from 'prop-types';

//import metrics from '../../config/metrics';

import Opening from "./components/Opening";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

//const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;
function AuthScreen({
  loadUser, 
  doLogin,
  doSignup,
}){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(null);

  const loadEverything = async () =>  {
    await loadUser();
  }
  const handleLoginException = async (e) => {
    let message = "";
    switch (e.code) {
      case "auth/weak-password":
        message = "The given password is too weak.";
        break;
      case "auth/wrong-password":
        message = "The password is invalid.";
        break;
      default:
        message = e.message;
        break;
    }
    console.log(message);
  };
  /**
   * Two login functions
   */
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      doLogin(email, password);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (e) {
      await handleLoginException(e);
    }
  };

  const signUp = async (email, password, firstname, lastname) => {
    try {
      setIsLoading(true);
      doSignup(email, password, firstname, lastname);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (e) {
      await handleLoginException(e);
    }
  };

  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(async (e) => {
        await handleLoginException(e);
      });
  };

  return (
    <Flex direction='column' justify='center' align='center' height='100%'>
      <Spacer />
      <h2>{"Welcome to Recedo!"}</h2>
      {!visibleForm && !isLoggedIn && (
        <Opening
          onCreateAccountPress={() => setVisibleForm("SIGNUP")}
          onSignInPress={() => setVisibleForm("LOGIN")}
        />
      )}
      {visibleForm === "SIGNUP" && (
        <SignupForm
          onLoginLinkPress={() => setVisibleForm("LOGIN")}
          onSignupPress={signUp}
          isLoading={isLoading}
        />
      )}
      {visibleForm === "LOGIN" && (
        <LoginForm
          onSignupLinkPress={() => setVisibleForm("SIGNUP")}
          onLoginPress={login}
          isLoading={isLoading}
        />
      )}
      <Spacer />
    </Flex>
  );
}

AuthScreen.propTypes = {
  loadUser: PropTypes.func,
  doLogin: PropTypes.func,
  doSignup: PropTypes.func,
}
export default connect(
  null, 
  {
    loadUser, 
    doSignup,
    doLogin,
  },
)(AuthScreen);