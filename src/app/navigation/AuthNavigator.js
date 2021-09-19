/**
 * Author: Isamu Isozaki
 * Handles firebase sign in
 */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadUser, loadUsersByIds } from 'app/store/auth';
import { loadGroups } from 'app/store/group';
import { loadTransactions } from 'app/store/transaction';



import { connect } from 'react-redux';
import AuthScreen from '../screens/AuthScreen';
import SignInStack from './SignInStack';
import PropTypes from 'prop-types';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getGroupUsers(byId, groupIds, invitedGroupIds, userIds) {
  const groups = groupIds.map(groupId => byId[groupId])
  const invitedGroups = invitedGroupIds.map(groupId => byId[groupId])
  let groupUsers = []
  
  for(let i = 0; i < groups.length; i++) {
    groupUsers = [...groupUsers, ...groups[i].userIds, ...groups[i].invitedUserIds]
  }
  for(let i = 0; i < invitedGroups.length; i++) {
    groupUsers = [...groupUsers, ...invitedGroups[i].userIds, ...invitedGroups[i].invitedUserIds]
  }
  groupUsers = groupUsers.filter(onlyUnique);
  groupUsers = groupUsers.filter(userId => !userIds.includes(userId))

  return groupUsers
}
/**
 *
 * @param {object} param0
 */
function AuthNavigator({
  user,
  userInitializing,
  userIdsIsInitializing,
  groupInitializing,
  transactionInitializing,
  loadUser,
  loadUsersByIds,
  loadGroups,
  loadTransactions
}) {
  const [initializing, setInitializing] = useState(true);
  const [preinitializing, setPreinitializing] = useState(true);
  const loadedEverything = !userInitializing && !userIdsIsInitializing && !groupInitializing && !transactionInitializing;

  const DebounceDueTime = 400;
  let debounceTimeout;
  // Below relies on the fact that auth change gets called multiple times unpredictably. fix so that
  // once everything is loaded, it can mobe on to 
  async function handleAuthStateChanged(result) {
    if (!result) {
      console.log('no result')
      setInitializing(true);
    } if(initializing && loadedEverything) {
      console.log('loaded everything')
      setInitializing(false)
    } if (result && initializing && preinitializing) {
      console.log('init')
      setPreinitializing(false)
      // Only do the below once
      const user = await loadUser()
      const {groups, invitedGroups} = await loadGroups()
      const additionalUsers = getGroupUsers({...groups, ...invitedGroups}, Object.keys(groups), Object.keys(invitedGroups), [user._id])
      await loadUsersByIds(additionalUsers)
      await loadTransactions()
    }

  }
  
  function onAuthStateChanged(result) {
    if (debounceTimeout)
        clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() =>
    {
        debounceTimeout = null;

        handleAuthStateChanged(result);
    }, DebounceDueTime);
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, [initializing, onAuthStateChanged]);
  if (!user || initializing) {
    return <AuthScreen />;
  } if (user.isRegistered) {
    return <SignInStack />;
  } else {
    return (<div>You are not registered</div>)
  }
}

AuthNavigator.propTypes = {
  user: PropTypes.object,
  userInitializing: PropTypes.bool,
  userIdsInitializing: PropTypes.bool,
  groupInitializing: PropTypes.bool,
  transactionInitializing: PropTypes.bool,
  loadUser: PropTypes.func,
  loadUsersByIds: PropTypes.func,
  loadGroups: PropTypes.func,
  loadTransactions: PropTypes.func,
}
const mapStateToProps = (state) => ({ 
  user: state.auth.user,
  userInitializing: state.auth.isInitializing,
  userIdsIsInitializing: state.auth.idsIsInitializing,
  groupInitializing: state.group.isInitializing,
  transactionInitializing: state.transaction.isInitializing,
});

export default connect(
  mapStateToProps,
  {
    loadUser,
    loadUsersByIds,
    loadGroups,
    loadTransactions,
  },
)(AuthNavigator);
