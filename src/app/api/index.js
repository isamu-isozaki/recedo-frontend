/**
 * Author: Isamu Isozaki
 */
import axios from 'axios';
import {REACT_APP_API_URL} from '../config';
import firebase from 'firebase/app';
import 'firebase/auth';
/**
 * Create api
 */
const api = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: 'json',
});

/**
 * Attach firebase id token so that the backend can know who made the request
 */
api.interceptors.request.use(
  async function(config) {
    const user = firebase.auth().currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.authorization = 'Bearer ' + idToken;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

/**
 * Parse response
 */
api.interceptors.response.use(
  function(res) {
    return res.data;
  },
  function(err) {
    return Promise.reject(err);
  },
);

export default api;
