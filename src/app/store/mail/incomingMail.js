/**
 * Author: Isamu Isozaki
 * Incoming Mail Redux
 */
import {
  deleteIncomingMail,
  getIncomingMail,
  postIncomingMail,
  putIncomingMail,
} from 'app/api/address/incomingMail';
import _ from 'lodash';
export const LOAD_INCOMING_SUCCESS = 'LOAD_INCOMING_SUCCESS';
export const REMOVE_INCOMING_SUCCESS = 'REMOVE_INCOMING_SUCCESS';
export const UPDATE_INCOMING_SUCCESS = 'UPDATE_INCOMING_SUCCESS';
export const CREATE_INCOMING_SUCCESS = 'CREATE_INCOMING_SUCCESS';
export const INCOMING_FAIL = 'INCOMING_FAIL';



const initialState = {
    byId: {},
    allIds: [],
    error: false,
};

export default function incomingReducer(state = initialState, 
  {type, payload}) 
{
  switch (type) {
    case LOAD_INCOMING_SUCCESS:
      return {...state,  byId: payload.incomingMails, allIds: Object.keys(payload.incomingMails)};
    case REMOVE_INCOMING_SUCCESS:
      return {
        ...state,
        byId: _.omitBy(state.byId, (val, key) => key === payload.incomingMailId),
        allIds: state.allIds.filter(key => key !== payload.incomingMailId)
      };
    case UPDATE_INCOMING_SUCCESS:
      return {
        ...state,
        byId: _.mapValues(state.byId, (val, key) => {
          if(key !== payload.incomingMailId) {
            return val;
          }
          return payload.incomingMail;
        }),
        };
    case CREATE_INCOMING_SUCCESS:
      return {
        ...state,
        byId: {...state.byId, [payload.incomingMail._id]: payload.incomingMail},
        allIds: [...state.allIds, payload.incomingMail._id],
      };
  
    case INCOMING_FAIL:
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
 * Load incoming mails of user
 */
export function loadIncomingMail({params} = {}) {
  return async (dispatch) => {
      try {
        const { payload } = await getIncomingMail({ params });
        const { incomingMails } = payload;
        dispatch({ type: LOAD_INCOMING_SUCCESS, payload: { incomingMails } });
    }
    catch (e) {
      dispatch({ type: INCOMING_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * incomingMailId {string}. Id of incoming mail to delete
 * Removes incoming mail both from db and current state 
 */
export function removeIncomingMail({incomingMailId,...params}) {
  return async (dispatch) => {
    try {
      await deleteIncomingMail({ incomingMailId, ...params });
      dispatch({ type: REMOVE_INCOMING_SUCCESS, payload: { incomingMailId } });
    }
    catch (e) {
      dispatch({ type: INCOMING_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * incomingMailId {string}. Id of incoming mail to delete
 * data {object}. Updates
 * Updates incoming mail both in db and current state 
 */
export function updateIncomingMail({incomingMailId,...data}) {
  return async (dispatch) => {
    try {
      const { payload } = await putIncomingMail({ incomingMailId, ...data });
      const { incomingMail } = payload;
      dispatch({ type: UPDATE_INCOMING_SUCCESS, payload: { incomingMailId, incomingMail: { ...data, ...incomingMail } } });
    }
    catch (e) {
      dispatch({ type: INCOMING_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * data {object}. Updates
 * Creates incoming mail both in db and current state 
 */
export function createIncomingMail({...data}) {
  return async (dispatch) => {
    try {
      const { payload } = await postIncomingMail({ ...data });
      const { incomingMail } = payload;
      dispatch({ type: CREATE_INCOMING_SUCCESS, payload: { incomingMail: { ...data, ...incomingMail } } });
    }
    catch (e) {
      dispatch({ type: INCOMING_FAIL, payload: {} });
    }
  }
}