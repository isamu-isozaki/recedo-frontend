/**
 * Author: Isamu Isozaki
 * Combine reducers
 */
import {combineReducers} from 'redux';
import authReducer from './auth';
import incomingMailReducer from './mail/incomingMail';
import masterMailReducer from './mail/masterMail';
import userMailReducer from './mail/userMail';
import domainReducer from './domains';


export default combineReducers({
  auth: authReducer,
  incomingMail: incomingMailReducer,
  masterMail: masterMailReducer,
  userMail: userMailReducer,
  domains: domainReducer,
});
