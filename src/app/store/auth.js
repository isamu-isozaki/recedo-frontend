/**
 * Author: Isamu Isozaki
 * User Redux
 */
import {getCurrentUser, putCurrentUser} from 'app/api/users';
import {SHOW_ERROR_PROMISES} from 'app/config';
import firebase from 'firebase/app';
import 'firebase/auth';

const SET_INITIALIZING = 'SET_INITIALIZING';
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_USER = 'SET_USER';

const initialState = {
  isInitializing: true,
  isLoggedIn: false,
  user: null,
};

export default function authReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_INITIALIZING:
      return {...state, isInitializing: payload.isInitializing};

    case SET_LOGGED_IN:
      return {...state, isLoggedIn: payload.isLoggedIn};

    case SET_USER:
      return {...state, user: payload.user};

    default:
      return state;
  }
}

/**
 * Load current user from db
 */
export function loadUser() {
  return async dispatch => {
    try {
      const {payload} = await getCurrentUser();
      dispatch(setUser(payload));
      return payload.user;
    } catch (error) {
      // TODO: Indicate error to user
      if (SHOW_ERROR_PROMISES) {
        console.log(error);
      }
      return null;
    }
  };
}

/**
 * 
 * @param {object} userChanges 
 * Update user with user changes
 */
export function updateUser(userChanges) {
  return async (dispatch, getState) => {
    const {auth} = getState();
    try {
      const userWithChanges = {...auth.user, ...userChanges};
      dispatch(setUser({user: userWithChanges}));
      await putCurrentUser(userChanges);
      return userWithChanges;
    } catch (error) {
      // TODO: Indicate error to user
      if (SHOW_ERROR_PROMISES) {
        console.log(error);
      }
      return auth.user;
    }
  };
}

export function setInitializing(isInitializing) {
  return {type: SET_INITIALIZING, payload: {isInitializing}};
}

export function setLoggedIn(isLoggedIn) {
  return {type: SET_LOGGED_IN, payload: {isLoggedIn}};
}

export function setUser(user) {
  return {type: SET_USER, payload: user};
}

export function doSignup(email, password, name) {
  return async dispatch => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await dispatch(loadUser());
    dispatch(updateUser({name}));
    dispatch(setLoggedIn(true));
  };
}

export function doLogin(email, password) {
  return async dispatch => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(setLoggedIn(true));
  };
}

export function doLogout() {
  return async dispatch => {
    dispatch(setLoggedIn(false));
    dispatch(setUser({user: null}));
    try {
      await firebase.auth().signOut();
    } catch (error) {
      if (SHOW_ERROR_PROMISES) {
        console.log(error);
      }
    }
  };
}

export function onAuthStateChanged(result) {
  return async (dispatch, getState) => {
    const {isInitializing} = getState().auth;

    if (isInitializing) {
      if (result) {
        try {
          await dispatch(loadUser());
          dispatch(setLoggedIn(true));
        } catch (error) {
          if (SHOW_ERROR_PROMISES) {
            console.log(error);
          }
        }
      }

      dispatch(setInitializing(false));
    }
  };
}
