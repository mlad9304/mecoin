import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS, toJS } from 'immutable';
import * as ChatApi from 'api/chat';
import { pender } from 'redux-pender';

// action types
const SET_SOCKET_STATE = 'mechat/SET_SOCKET_STATE';

// action creator
export const setSocketState = createAction(SET_SOCKET_STATE);


// initial state

const initialState = Map({
  chat: Map({
      socket: Map({
          auth: null,
          username: null
      }),
  }),
});

// reducer
export default handleActions({

  [SET_SOCKET_STATE]: (state, action) => {
    const { auth, username } = action.payload;
    return state.setIn(['chat', 'socket', 'auth'], auth)
                .setIn(['chat', 'socket', 'username'], username);
  },
}, initialState);
