//Based on https://github.com/mmazzarolo/react-native-login-animation-example
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import firebase from "firebase/app";
import "firebase/auth";
import CustomButton from "./components/CustomButton";
import { loadUser, doSignup, doLogin } from 'app/store/auth';
import { loadIncomingMail } from 'app/store/mail/incomingMail';
import { loadMasterMail } from 'app/store/mail/masterMail';
import { loadUserMail } from 'app/store/mail/userMail';
import { loadDomains } from 'app/store/domains';
import { connect } from 'react-redux';


import "../../assets/css/login.css";

import GoogleSocialButton from "./components/GoogleSocialButton";
import FacebookSocialButton from "./components/FacebookSocialButton";
import TwitterSocialButton from "./components/TwitterSocialButton";

//import metrics from '../../config/metrics';

import Opening from "./Opening";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Form } from "react-bootstrap";

//const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;
function AuthScreen({
  loadUser, 
  doLogin,
  doSignup,
  loadIncomingMail, 
  loadMasterMail, 
  loadUserMail, 
  loadDomains
}){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(null);

  const loadEverything = async () =>  {
    await loadUser(); 
    loadIncomingMail();
    loadMasterMail();
    loadUserMail();
    loadDomains();
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
    console.log(e);
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

  const signUp = async (email, password, username) => {
    try {
      setIsLoading(true);
      doSignup(email, password, username);
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

  const _setVisibleForm = async (newVisibleForm) => {
    setVisibleForm(newVisibleForm)
  };

  return (
    <div className="container-fluid" style={{height: '100%'}}>
      <div className="row d-flex justify-content-center" style={{height: '100%'}}>
          <div className="align-self-center col-md-6">
            <div
              className="text-center"
            >
              <h2>Welcome to Kiara!</h2>
            </div>
            <Form>
              <div className="row">
                <div className="col-md-5">
                  {!visibleForm && !isLoggedIn && (
                    <Opening
                      onCreateAccountPress={() =>
                        _setVisibleForm("SIGNUP")
                      }
                      onSignInPress={() => _setVisibleForm("LOGIN")}
                    />
                  )}
                  {visibleForm === "SIGNUP" && (
                    <SignupForm
                      onLoginLinkPress={() =>
                        _setVisibleForm("LOGIN")
                      }
                      onSignupPress={signUp}
                      isLoading={isLoading}
                    />
                  )}
                  {visibleForm === "LOGIN" && (
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group w-100">
                          <LoginForm
                            onSignupLinkPress={() =>
                              _setVisibleForm("SIGNUP")
                            }
                            onLoginPress={login}
                            isLoading={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col p-0">
                  <div className="vl">
                    
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group block">
                        <GoogleSocialButton
                          onClick2={googleSignIn}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group w-100">
                        <FacebookSocialButton />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group w-100">
                        <TwitterSocialButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
        </div>
      </div>
    </div>
  );
}
export default connect(
  null, 
  {
    loadUser, 
    doSignup,
    doLogin,
    loadIncomingMail, 
    loadMasterMail, 
    loadUserMail, 
    loadDomains
  },
)(AuthScreen);