import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'api/auth';
import * as UserAPI from 'api/user';

// action types
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const SET_SUBMIT_STATUS = 'auth/SET_SUBMIT_STATUS';
const LOGOUT = 'auth/LOGOUT';
const UPDATE_USER_INFO = 'auth/UPDATE_USER_INFO';

// action creator
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // ({email, password})
export const setSubmitStatus = createAction(SET_SUBMIT_STATUS);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const updateUserInfo = createAction(UPDATE_USER_INFO, UserAPI.updateUserInfo);

// initial state
const initialState = Map({
  modal: Map({
    visible: false,
    mode: 'login'
  }),
  form: Map({
    email: '',
    password: ''
  }),
  error: null,
  loginResult: null,
  socialInfo: null,
  redirectToRegister: false,

  //session info
  session: Map({
    user: Map({
        _id: null,
        username: null,
        email: null,
        firstname: null,
        lastname: null
    }),
    logged: false
  }),
  submitStatus: false
});

// reducer
export default handleActions({
  [SET_SUBMIT_STATUS]: (state, action) => {
    return state.set('submitStatus', action.payload);
  },

  ...pender({
    type: LOCAL_LOGIN,
    onSuccess: (state, action) => {
      const { data: loginResult } = action.payload;
      const { user } = loginResult;
      
      return state.setIn(['session', 'user'], fromJS(user))
        .setIn(['session', 'logged'], true);
    },
    onFailure: (state, action) => {
      return state.set('error', fromJS({
        localLogin: ['Wrong user information.']
      }))
    }
  }),
  ...pender({
    type: LOGOUT,
    onSuccess: (state, action) => {
      return state
      .setIn(['session', 'logged'], false)
      .setIn(['session', 'user', 'userId'], null)
      .setIn(['session', 'user', 'username'], null)
      .setIn(['session', 'user', 'email'], null)
      .setIn(['session', 'user', 'firstname'], null)
      .setIn(['session', 'user', 'lastname'], null);
    },
    onFailure: (state, action) => {
      
    }
  }),

  ...pender({
    type: UPDATE_USER_INFO,
    onSuccess: (state, action) => {
      // const { data: result } = action.payload;
      // const { user } = result;
      
      // return state.setIn(['session', 'user'], fromJS(user));
    },
    onFailure: (state, action) => {
      
    }
  }),
}, initialState);