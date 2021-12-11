/**
 * Author: Isamu Isozaki
 * Combine reducers
 */
import {combineReducers} from 'redux';
import authReducer from './auth';
import groupReducer from './group';
import preferenceReducer from './preference';
import receiptReducer from './receipt';
import transactionReducer from './transaction';
import wishlistReducer from './wishlist';



export default combineReducers({
  auth: authReducer,
  group: groupReducer,
  preference: preferenceReducer,
  receipt: receiptReducer,
  transaction: transactionReducer,
  wishlist: wishlistReducer,
});
