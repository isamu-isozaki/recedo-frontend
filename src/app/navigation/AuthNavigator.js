/**
 * Author: Isamu Isozaki
 * Handles firebase sign in
 */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadUser, loadUsersByIds } from 'app/store/auth';
import { loadGroups } from 'app/store/group';
import { loadPreferences } from 'app/store/preference';
import { loadReceipts } from 'app/store/receipt';
import { loadTransactions } from 'app/store/transaction';
import { loadWishlists, loadWishlistItemsByIds } from 'app/store/wishlist';
import {keyBy} from 'lodash';
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
  preferenceInitializing,
  receiptInitializing,
  transactionInitializing,
  wishlistInitializing,
  loadUser,
  loadUsersByIds,
  loadGroups,
  loadPreferences,
  loadReceipts,
  loadTransactions,
  loadWishlists,
  loadWishlistItemsByIds,
}) {
  const [initializing, setInitializing] = useState(true);
  const [preinitializing, setPreinitializing] = useState(true);
  const loadedEverything = !userInitializing && !userIdsIsInitializing && !groupInitializing && !preferenceInitializing && !receiptInitializing && !transactionInitializing && !wishlistInitializing;
  const DebounceDueTime = 400;
  let debounceTimeout;
  // Below relies on the fact that auth change gets called multiple times unpredictably. fix so that
  // once everything is loaded, it can mobe on to 
  async function handleAuthStateChanged(result) {
    if (!result) {
      setInitializing(true);
    } if(initializing && loadedEverything) {
      setInitializing(false)
    } if (result && initializing && preinitializing) {
      setPreinitializing(false)
      // Only do the below once
      const user = await loadUser()
      const {groups, invitedGroups} = await loadGroups()
      const additionalUsers = getGroupUsers({...groups, ...invitedGroups}, Object.keys(groups), Object.keys(invitedGroups), [user._id])
      await loadUsersByIds(additionalUsers)
      await loadTransactions()
      await loadPreferences()
      const wishlists = await loadWishlists()
      let wishlistItems = []
      Object.keys(wishlists).forEach(wishlistKey => {
        wishlistItems = [...wishlistItems, ...wishlists[wishlistKey].wishlistItemIds]
      })
      wishlistItems = wishlistItems.filter(onlyUnique)
      await loadWishlistItemsByIds(wishlistItems)
      await loadReceipts()
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
  preferenceInitializing: PropTypes.bool,
  receiptInitializing: PropTypes.bool,
  transactionInitializing: PropTypes.bool,
  wishlistInitializing: PropTypes.bool,
  loadUser: PropTypes.func,
  loadUsersByIds: PropTypes.func,
  loadGroups: PropTypes.func,
  loadPreferences: PropTypes.func,
  loadReceipts: PropTypes.func,
  loadTransactions: PropTypes.func,
  loadWishlists: PropTypes.func,
  loadWishlistItemsByIds: PropTypes.func,
}
const mapStateToProps = (state) => ({ 
  user: state.auth.user,
  userInitializing: state.auth.isInitializing,
  userIdsIsInitializing: state.auth.idsIsInitializing,
  groupInitializing: state.group.isInitializing,
  preferenceInitializing: state.preference.isInitializing,
  receiptInitializing: state.receipt.isInitializing,
  transactionInitializing: state.transaction.isInitializing,
  wishlistInitializing: state.wishlist.isInitializing,
});

export default connect(
  mapStateToProps,
  {
    loadUser,
    loadUsersByIds,
    loadGroups,
    loadPreferences,
    loadReceipts,
    loadTransactions,
    loadWishlists,
    loadWishlistItemsByIds,
  },
)(AuthNavigator);
