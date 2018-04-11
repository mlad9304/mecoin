import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'api/auth';

// action types
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const SET_SUBMIT_STATUS = 'auth/SET_SUBMIT_STATUS';
const LOGOUT = 'auth/LOGOUT';

// action creator
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // ({email, password})
export const setSubmitStatus = createAction(SET_SUBMIT_STATUS);
export const logout = createAction(LOGOUT, AuthAPI.logout);

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
    sessionID: null,
    user: Map({
        _id: null,
        username: ""
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
      const { username, _id } = loginResult;
      const sessionID = _id;
      // console.log('LOCAL_LOGIN Successed');
      // console.log(loginResult);
      return state.setIn(['session', 'user', 'username'], username).setIn(['session', 'logged'], true)
        .setIn(['session', 'sessionID'], sessionID)
        .setIn(['session', 'user', '_id'], _id);
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
      .setIn(['session', 'sessionID'], null)
      .setIn(['session', 'user', '_id'], null)
      .setIn(['session', 'user', 'username'], "");
    },
    onFailure: (state, action) => {
      
    }
  })
}, initialState);