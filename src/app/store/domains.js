/**
 * Author: Isamu Isozaki
 * Redux for domains
 */
import {
    getDomains
} from 'app/api/domains';
export const LOAD_DOMAIN_SUCCESS = 'LOAD_DOMAIN_SUCCESS';
export const DOMAIN_FAIL = 'DOMAIN_FAIL';


const initialState = {
    byId: {},
    allIds: [],
    error: false,
};

export default function incomingReducer(state = initialState, 
  {type, payload}) 
{
  switch (type) {
    case LOAD_DOMAIN_SUCCESS:
      return {...state,  byId: payload.domains, allIds: Object.keys(payload.domains)};
    case DOMAIN_FAIL:
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
 * Load all the domains 
 */
export function loadDomains({params} = {}) {
  return async (dispatch) => {
      try {
        const payload = await getDomains({ params });
        const { domains } = payload.payload;
        dispatch({ type: LOAD_DOMAIN_SUCCESS, payload: { domains } });
    }
    catch (e) {
      dispatch({ type: DOMAIN_FAIL, payload: {} });
    }
  }
}
