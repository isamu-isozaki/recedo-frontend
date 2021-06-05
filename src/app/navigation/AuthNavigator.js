/**
 * Author: Isamu Isozaki
 * Handles firebase sign in
 */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadUser } from 'app/store/auth';
import { loadIncomingMail } from 'app/store/mail/incomingMail';
import { loadMasterMail } from 'app/store/mail/masterMail';
import { loadUserMail } from 'app/store/mail/userMail';
import { loadDomains } from 'app/store/domains';

import { connect } from 'react-redux';
import Registration from '../screens/Registration';
import AuthScreen from '../screens/AuthScreen';
import SignInStack from './SignInStack';

/**
 *
 * @param {object} param0
 * user {object}. Current user
 * loadUser {function}. Loads user
 * loadIncomingMail {function}. Load all incoming mails
 * loadMasterMail {function}. Load all master mails
 * loadUserMail {function}. Load all user mails
 * loadDomains {function}. Load all domains
 * Handle firebase sign in/out and load all data from backend. If signed in, go to main app in <SignInStack>
 */
function AuthNavigator({
  user,
  isRegistered,
  loadUser,
  loadDomains,
  loadIncomingMail,
  loadMasterMail,
  loadUserMail,
}) {
  const [initializing, setInitializing] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function onAuthStateChanged(result) {
    if (!result) {
      setInitializing(true);
    }
    if (result && initializing) {
      await loadUser();
      await loadDomains();
      if (user) {
        if (user.isRegistered) {
          loadIncomingMail();
          loadMasterMail();
          loadUserMail();
        }
        setInitializing(false);
      }
    }
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, [initializing, onAuthStateChanged]);

  if (!user || initializing) {
    return <AuthScreen />;
  } if (isRegistered) {
    return <SignInStack />;
  }
  return <Registration />;
}

const mapStateToProps = (state) => ({ user: state.auth.user, isRegistered: state.auth.user && state.auth.user.isRegistered });

export default connect(
  mapStateToProps,
  {
    loadUser,
    loadDomains,
    loadIncomingMail,
    loadMasterMail,
    loadUserMail,
  },
)(AuthNavigator);
