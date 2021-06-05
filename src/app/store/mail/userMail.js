/**
 * Author: Isamu Isozaki
 * User Mail Redux
 */
import {
  deleteUserMail,
  getUserMail,
  postUserMail,
  putUserMail,
} from 'app/api/address/userMail';
import _ from 'lodash';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';



const initialState = {
    byId: {},
    allIds: [],
    error: false,
};

export default function userReducer(state = initialState, 
  {type, payload}) 
{
  switch (type) {
    case LOAD_USER_SUCCESS:
      return {...state,  byId: payload.userMails, allIds: Object.keys(payload.userMails)};
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        byId: _.omitBy(state.byId, (val, key) => key === payload.userMailId),
        allIds: state.allIds.filter(key => key !== payload.userMailId)
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        byId: _.mapValues(state.byId, (val, key) => {
          if(key !== payload.userMailId) {
            return val;
          }
          return payload.userMail;
        }),
        };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        byId: {...state.byId, [payload.userMail._id]: payload.userMail},
        allIds: [...state.allIds, payload.userMail._id],
      };
  
    case USER_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

/**
 * 
 * @param {object} param0
 * Load user mails of user
 */
export function loadUserMail({params} = {}) {
  return async (dispatch) => {
      try {
        const { payload } = await getUserMail({ params });
        const { userMails } = payload;
        dispatch({ type: LOAD_USER_SUCCESS, payload: { userMails } });
    }
    catch (e) {
      dispatch({ type: USER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * userMailId {string}. Id of user mail to delete
 * Removes user mail both from db and current state 
 */
export function removeUserMail({userMailId,...params}) {
  return async (dispatch) => {
    try {
      await deleteUserMail({ userMailId, ...params });
      dispatch({ type: REMOVE_USER_SUCCESS, payload: { userMailId } });
    }
    catch (e) {
      dispatch({ type: USER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * userMailId {string}. Id of user mail to delete
 * data {object}. Updates
 * Updates user mail both in db and current state 
 */
export function updateUserMail({userMailId,...data}) {
  return async (dispatch) => {
    try {
      const { payload } = await putUserMail({ userMailId, ...data });
      const { userMail } = payload;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { userMailId, userMail: { ...data, ...userMail } } });
    }
    catch (e) {
      dispatch({ type: USER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * data {object}. Updates
 * Creates user mail both in db and current state 
 */
export function createUserMail({...data}) {
  return async (dispatch) => {
    try {
      const {payload} = await postUserMail({ ...data });
      const { userMail } = payload;
      dispatch({ type: CREATE_USER_SUCCESS, payload: { userMail: { ...data, ...userMail } } });
    }
    catch (e) {
      dispatch({ type: USER_FAIL, payload: {} });
    }
  }
}