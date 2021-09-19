/**
 * Author: Isamu Isozaki
 * Combine reducers
 */
import {combineReducers} from 'redux';
import authReducer from './auth';
import groupReducer from './group';
import transactionReducer from './transaction';




export default combineReducers({
  auth: authReducer,
  group: groupReducer,
  transaction: transactionReducer,
});
