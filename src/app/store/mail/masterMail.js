/**
 * Author: Isamu Isozaki
 * Master Mail Redux
 */
import {
  deleteMasterMail,
  getMasterMail,
  postMasterMail,
  putMasterMail,
} from 'app/api/address/masterMail';
import _ from 'lodash';
export const LOAD_MASTER_SUCCESS = 'LOAD_MASTER_SUCCESS';
export const MASTER_FAIL = 'MASTER_FAIL';
export const REMOVE_MASTER_SUCCESS = 'REMOVE_MASTER_SUCCESS';
export const UPDATE_MASTER_SUCCESS = 'UPDATE_MASTER_SUCCESS';
export const CREATE_MASTER_SUCCESS = 'CREATE_MASTER_SUCCESS';



const initialState = {
    byId: {},
    allIds: [],
    error: false,
};

export default function masterReducer(state = initialState, 
  {type, payload}) 
{
  switch (type) {
    case LOAD_MASTER_SUCCESS:
      return {...state,  byId: payload.masterMails, allIds: Object.keys(payload.masterMails)};
    case REMOVE_MASTER_SUCCESS:
      return {
        ...state,
        byId: _.omitBy(state.byId, (val, key) => key === payload.masterMailId),
        allIds: state.allIds.filter(key => key !== payload.masterMailId)
      };
    case UPDATE_MASTER_SUCCESS:
      return {
        ...state,
        byId: _.mapValues(state.byId, (val, key) => {
          if(key !== payload.masterMailId) {
            return val;
          }
          return payload.masterMail;
        }),
        };
    case CREATE_MASTER_SUCCESS:
      return {
        ...state,
        byId: {...state.byId, [payload.masterMail._id]: payload.masterMail},
        allIds: [...state.allIds, payload.masterMail._id],
      };
  
    case MASTER_FAIL:
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
 * Load master mails of user
 */
export function loadMasterMail({params} = {}) {
  return async (dispatch) => {
      try {
        const { payload } = await getMasterMail({ params });
        const { masterMails } = payload;
        dispatch({ type: LOAD_MASTER_SUCCESS, payload: { masterMails } });
    }
    catch (e) {
      dispatch({ type: MASTER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * masterMailId {string}. Id of master mail to delete
 * Removes master mail both from db and current state 
 */
export function removeMasterMail({masterMailId,...params}) {
  return async (dispatch) => {
    try {
      await deleteMasterMail({ masterMailId, ...params });
      dispatch({ type: REMOVE_MASTER_SUCCESS, payload: { masterMailId } });
    }
    catch (e) {
      dispatch({ type: MASTER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * masterMailId {string}. Id of master mail to delete
 * data {object}. Updates
 * Updates master mail both in db and current state 
 */
export function updateMasterMail({masterMailId,...data}) {
  return async (dispatch) => {
    try {
      const { payload } = await putMasterMail({ masterMailId, ...data });
      const { masterMail } = payload;
      dispatch({ type: UPDATE_MASTER_SUCCESS, payload: { masterMailId, masterMail: { ...data, ...masterMail } } });
    }
    catch (e) {
      dispatch({ type: MASTER_FAIL, payload: {} });
    }
  }
}

/**
 * 
 * @param {object} param0
 * data {object}. Updates
 * Creates master mail both in db and current state 
 */
export function createMasterMail({...data}) {
  return async (dispatch) => {
    try {
      const { payload } = await postMasterMail({ ...data });
      const { masterMail } = payload;
      dispatch({ type: CREATE_MASTER_SUCCESS, payload: { masterMail: { ...data, ...masterMail } } });
    }
    catch (e) {
      dispatch({ type: MASTER_FAIL, payload: {} });
    }
  }
}