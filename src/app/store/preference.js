/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-28T23:54:32.711Z
Modified: !date!
Modified By: modifier
*/

import {
    getPreferences,
    putPreference,
} from 'app/api/preference';
import _ from 'lodash'
export const LOAD_PREFERENCE_SUCCESS = 'LOAD_PREFERENCE_SUCCESS';
export const UPDATE_PREFERENCE_SUCCESS = 'UPDATE_PREFERENCE_SUCCESS';
export const PREFERENCE_FAIL = 'PREFERENCE_FAIL';

const initialState = {
    isInitializing: true,
    byId: {},
    allIds: {},
    deepUpdate: true,
    error: false,
};

export default function preferenceReducer(state = initialState, 
{type, payload}) 
{
    switch (type) {
        case LOAD_PREFERENCE_SUCCESS: {
            const {preferences} = payload
            return {...state, isInitializing: false, byId: preferences, allIds: Object.keys(preferences)};
        }
        case UPDATE_PREFERENCE_SUCCESS: {
            const { preference } = payload
            const newById = {...state.byId, [preference._id]: preference}

            const newFromIds = state.allIds.includes(preference._id) ? state.allIds : [...state.allIds, preference._id]
            return {...state, byId: newById, allIds: newFromIds, deepUpdate: !state.deepUpdate}
        }
        case PREFERENCE_FAIL: {
            console.log(type)
            return state
        }
        default:
            return state;
    }
}

export function loadPreferences({params} = {}) {
    return async (dispatch) => {
        try {
            const { payload } = await getPreferences({ params });
            const {preferences} = payload;
            dispatch({ type: LOAD_PREFERENCE_SUCCESS, payload: { preferences } });
            return preferences
        }
        catch (e) {
            dispatch({ type: PREFERENCE_FAIL, payload: {} });
            return e
        }
    }
}

export function updatePreference(wishlistId, wishlistItemId, want) {
    return async (dispatch) => {
        try {
            const { payload } = await putPreference(wishlistId, wishlistItemId, want);
            const { preference } = payload;
            dispatch({ type: UPDATE_PREFERENCE_SUCCESS, payload: { preference } });
            return { preference }
        }
        catch (e) {
            dispatch({ type: PREFERENCE_FAIL, payload: {} });
            return e
        }
    }
}
