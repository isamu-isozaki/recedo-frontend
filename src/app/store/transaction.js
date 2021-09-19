/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-28T23:54:32.711Z
Modified: !date!
Modified By: modifier
*/

import {
    getTransactions,
    postPay,
} from 'app/api/transaction';
import _ from 'lodash'
export const LOAD_TRANSACTION_SUCCESS = 'LOAD_TRANSACTION_SUCCESS';
export const PAY_SUCCESS = 'PAY_SUCCESS';
export const TRANSACTION_FAIL = 'TRANSACTION_FAIL';

const initialState = {
    isInitializing: true,
    byId: {},
    fromIds: [],
    toIds: [],
    error: false,
};

export default function transactionReducer(state = initialState, 
{type, payload}) 
{
    switch (type) {
        case LOAD_TRANSACTION_SUCCESS: {
            const {fromTransactions, toTransactions} = payload
            const byId = {...fromTransactions, ...toTransactions}
            return {...state, isInitializing: false, byId,  fromIds: Object.keys(fromTransactions), toIds: Object.keys(toTransactions)};
        }
        case PAY_SUCCESS: {
            const { transaction } = payload
            const newById = {...state.byId, [transaction._id]: transaction}
            const newFromIds = [...state.fromIds, transaction._id]
            return {...state, byId: newById, fromIds: newFromIds}
        }
        case TRANSACTION_FAIL: {
            console.log('FAIL')
            return state
        }
        default:
            return state;
    }
}

export function loadTransactions({params} = {}) {
    return async (dispatch) => {
        try {
            const { payload } = await getTransactions({ params });
            const {fromTransactions, toTransactions} = payload;
            dispatch({ type: LOAD_TRANSACTION_SUCCESS, payload: { fromTransactions, toTransactions } });
            return { fromTransactions, toTransactions }
        }
        catch (e) {
            dispatch({ type: TRANSACTION_FAIL, payload: {} });
            return e
        }
    }
}

export function pay(toId, amount, message) {
    return async (dispatch) => {
        try {
            const { payload } = await postPay({ toId, amount, message });
            const { transaction } = payload;
            dispatch({ type: PAY_SUCCESS, payload: { transaction } });
            return { transaction }
        }
        catch (e) {
            dispatch({ type: TRANSACTION_FAIL, payload: {} });
            return e
        }
    }
}
